"""Main entry point for DEAP + pyribs evolutionary keyboard layout optimization.

Usage: python run_evolution.py <build_dir>
"""
import sys
import os
import json
import random
import time
import copy
from pathlib import Path

import numpy as np

from deap import base, creator, tools, algorithms

from representation import (
    build_position_index, build_shortcut_pool, build_layer_to_positions,
    encode_current_layout, decode_genome,
)
from fitness import FitnessEvaluator
from operators import custom_mutate, pmx_crossover

QD_AVAILABLE = False
try:
    from ribs.archives import GridArchive
    from ribs.emitters import EvolutionStrategyEmitter
    from ribs.schedulers import Scheduler
    QD_AVAILABLE = True
except ImportError:
    pass


def load_config():
    config_path = Path(__file__).parent / "config.json"
    with open(config_path) as f:
        return json.load(f)


def load_build_data(build_dir):
    def load(name):
        with open(os.path.join(build_dir, name), encoding="utf-8") as f:
            return json.load(f)

    canonical = load("canonical.json")
    scores = load("app_shortcut_scores.json")

    usage_stats = {}
    try:
        usage_stats = load("usage_stats.json")
    except FileNotFoundError:
        pass

    conjunction_pairs = {}
    try:
        reorg = load("reorganize_proposals.json")
        if "conjunction_pairs_count" in reorg:
            pass
    except FileNotFoundError:
        pass

    return canonical, scores, usage_stats, conjunction_pairs


def build_conjunction_pairs_from_scores(scores):
    pairs = {}
    for app in scores["apps"]:
        by_cat = {}
        for s in app["shortcuts"]:
            if not s.get("mapped"):
                continue
            cat = s.get("category", "general")
            by_cat.setdefault(cat, []).append(s)
        for cat, shortcuts in by_cat.items():
            for i in range(len(shortcuts)):
                for j in range(i + 1, len(shortcuts)):
                    w = min(shortcuts[i]["importance"], shortcuts[j]["importance"]) * 0.3
                    key = "|".join(sorted([shortcuts[i]["keys"], shortcuts[j]["keys"]]))
                    pairs[key] = pairs.get(key, 0) + w
    return pairs


def seed_population(current_genome, n_pop, positions, shortcut_pool, layer_positions):
    population = [copy.copy(current_genome)]

    for _ in range(min(n_pop // 10, 50)):
        ind = copy.copy(current_genome)
        n_swaps = random.randint(1, 5)
        for _ in range(n_swaps):
            from operators import swap_within_layer
            ind = swap_within_layer(ind, positions, layer_positions)
        population.append(ind)

    while len(population) < n_pop:
        ind = copy.copy(current_genome)
        n_swaps = random.randint(5, 20)
        for _ in range(n_swaps):
            from operators import swap_within_layer, swap_to_empty, migrate_shortcut
            r = random.random()
            if r < 0.5:
                ind = swap_within_layer(ind, positions, layer_positions)
            elif r < 0.75:
                ind = swap_to_empty(ind, positions, layer_positions)
            else:
                ind = migrate_shortcut(ind, positions, shortcut_pool, layer_positions)
        population.append(ind)

    return population[:n_pop]


def run_nsga2(evaluator, current_genome, positions, shortcut_pool, config):
    layer_positions = build_layer_to_positions(positions)
    n_pos = len(positions)

    if hasattr(creator, "FitnessMulti"):
        del creator.FitnessMulti
    if hasattr(creator, "Individual"):
        del creator.Individual

    creator.create("FitnessMulti", base.Fitness, weights=(-1.0, -1.0, -1.0))
    creator.create("Individual", list, fitness=creator.FitnessMulti)

    toolbox = base.Toolbox()
    toolbox.register("evaluate", evaluator.evaluate)
    toolbox.register("select", tools.selNSGA2)

    def mate(ind1, ind2):
        c1, c2 = pmx_crossover(list(ind1), list(ind2), positions, layer_positions)
        return creator.Individual(c1), creator.Individual(c2)

    def mutate(ind):
        result = custom_mutate(list(ind), positions, shortcut_pool, layer_positions)
        return (creator.Individual(result[0]),)

    toolbox.register("mate", mate)
    toolbox.register("mutate", mutate)

    pop_size = config.get("pop_size", 2000)
    n_gen = config.get("generations", 500)
    cxpb = config.get("crossover_rate", 0.7)
    mutpb = config.get("mutation_rate", 0.15)

    print(f"Seeding population: {pop_size} individuals, {n_pos} mutable positions")
    raw_pop = seed_population(current_genome, pop_size, positions, shortcut_pool, layer_positions)
    population = [creator.Individual(ind) for ind in raw_pop]

    for ind in population:
        ind.fitness.values = toolbox.evaluate(ind)

    stats = tools.Statistics(lambda ind: ind.fitness.values)
    stats.register("min", lambda fits: tuple(min(f[i] for f in fits) for i in range(3)))
    stats.register("avg", lambda fits: tuple(np.mean([f[i] for f in fits]) for i in range(3)))

    logbook = tools.Logbook()
    logbook.header = ["gen", "nevals", "min", "avg"]

    convergence = []
    t0 = time.time()

    for gen in range(n_gen):
        offspring = algorithms.varAnd(population, toolbox, cxpb, mutpb)

        for ind in offspring:
            if not ind.fitness.valid:
                ind.fitness.values = toolbox.evaluate(ind)

        population = toolbox.select(population + offspring, pop_size)

        record = stats.compile(population)
        logbook.record(gen=gen, nevals=len(offspring), **record)

        if gen % 50 == 0 or gen == n_gen - 1:
            elapsed = time.time() - t0
            best = min(population, key=lambda ind: ind.fitness.values[0])
            print(f"  Gen {gen:4d}: effort={best.fitness.values[0]:.1f} "
                  f"adj={-best.fitness.values[1]:.1f} viol={best.fitness.values[2]:.1f} "
                  f"({elapsed:.1f}s)")
            convergence.append({
                "gen": gen, "elapsed_s": round(elapsed, 1),
                "best_effort": round(best.fitness.values[0], 2),
                "best_adjacency": round(-best.fitness.values[1], 2),
                "best_violations": round(best.fitness.values[2], 2),
            })

    front = tools.sortNondominated(population, len(population), first_front_only=True)[0]
    front.sort(key=lambda ind: ind.fitness.values[0])
    return front, convergence


def run_qd(evaluator, current_genome, positions, shortcut_pool, config):
    if not QD_AVAILABLE:
        print("pyribs not available, skipping QD. Install with: pip install pyribs")
        return None, []

    layer_positions = build_layer_to_positions(positions)
    n_pos = len(positions)

    grid_dims = config.get("qd_grid_dims", [10, 10])
    archive = GridArchive(
        solution_dim=n_pos,
        dims=grid_dims,
        ranges=[(0.0, 1.0), (0.0, 1.0)],
    )

    seed = np.array(current_genome, dtype=np.float64)
    archive.add(seed, -evaluator.evaluate(current_genome)[0], evaluator.behavior_descriptors(current_genome))

    n_gen = min(config.get("generations", 500), 200)
    print(f"Running QD MAP-Elites: {n_gen} iterations, grid {grid_dims}")

    for gen in range(n_gen):
        if archive.stats.num_elites > 0:
            elite_idx = random.randint(0, archive.stats.num_elites - 1)
            elites = list(archive)
            if elite_idx < len(elites):
                parent = list(elites[elite_idx].solution.astype(int))
            else:
                parent = copy.copy(current_genome)
        else:
            parent = copy.copy(current_genome)

        child = custom_mutate(parent, positions, shortcut_pool, layer_positions)[0]
        child_arr = np.array(child, dtype=np.float64)
        fitness_tuple = evaluator.evaluate(child)
        obj = -fitness_tuple[0]
        bds = evaluator.behavior_descriptors(child)

        archive.add(child_arr, obj, bds)

        if gen % 50 == 0:
            print(f"  QD gen {gen}: {archive.stats.num_elites} elites, "
                  f"coverage={archive.stats.coverage:.1%}")

    results = []
    for elite in archive:
        genome = list(elite.solution.astype(int))
        bd = elite.measures
        results.append({
            "genome": genome,
            "objective": float(elite.objective),
            "behavior": {"app_balance": float(bd[0]), "thumb_utilization": float(bd[1])},
        })

    results.sort(key=lambda r: -r["objective"])
    return results, archive


def main():
    if len(sys.argv) < 2:
        print("Usage: python run_evolution.py <build_dir>")
        sys.exit(1)

    build_dir = sys.argv[1]
    config = load_config()

    if config.get("seed") is not None:
        random.seed(config["seed"])
        np.random.seed(config["seed"])

    print("=" * 60)
    print("CHARYBDIS EVOLUTIONARY LAYOUT OPTIMIZER")
    print("=" * 60)

    canonical, scores, usage_stats, _ = load_build_data(build_dir)
    conjunction_pairs = build_conjunction_pairs_from_scores(scores)

    frozen = set(config.get("frozen_layers", [0, 6, 7, 8]))
    positions = build_position_index(canonical, frozen)
    shortcut_pool = build_shortcut_pool(scores)

    print(f"\nPositions: {len(positions)} mutable ({sum(1 for p in positions if p.is_thumb)} thumb)")
    print(f"Shortcuts: {len(shortcut_pool)} in corpus")
    print(f"Conjunction pairs: {len(conjunction_pairs)}")

    device = "cpu"
    evaluator = FitnessEvaluator(
        positions, shortcut_pool, config,
        usage_stats=usage_stats,
        conjunction_pairs=conjunction_pairs,
        device=device,
    )

    current_genome = encode_current_layout(canonical, positions, shortcut_pool, frozen)
    assigned_count = sum(1 for g in current_genome if g >= 0)
    print(f"Current layout: {assigned_count}/{len(current_genome)} positions assigned")

    seed_fitness = evaluator.evaluate(current_genome)
    seed_breakdown = evaluator.evaluate_full(current_genome)
    print(f"Seed fitness: effort={seed_fitness[0]:.1f}, adj={-seed_fitness[1]:.1f}, viol={seed_fitness[2]:.1f}")
    print(f"Breakdown: {json.dumps({k: round(float(v), 2) for k, v in seed_breakdown.items()})}")

    # Run NSGA-II
    print(f"\n--- NSGA-II ({config.get('pop_size', 2000)} pop, {config.get('generations', 500)} gen) ---")
    front, convergence = run_nsga2(evaluator, current_genome, positions, shortcut_pool, config)

    pareto_solutions = []
    for i, ind in enumerate(front[:config.get("pareto_front_size", 20)]):
        genome = list(ind)
        breakdown = evaluator.evaluate_full(genome)
        bd = evaluator.behavior_descriptors(genome)
        changes = decode_genome(genome, positions, shortcut_pool)
        seed_changes = [c for c in changes if current_genome[positions[0].gene_idx if not changes else 0] != genome[0]]

        pareto_solutions.append({
            "id": f"evo_{i}",
            "fitness": {
                "effort": round(ind.fitness.values[0], 2),
                "adjacency": round(-ind.fitness.values[1], 2),
                "violations": round(ind.fitness.values[2], 2),
            },
            "behavior": {"app_balance": round(bd[0], 3), "thumb_utilization": round(bd[1], 3)},
            "scoring_breakdown": {k: round(float(v), 2) for k, v in breakdown.items()},
            "total_assignments": sum(1 for g in genome if g >= 0),
            "changes_from_current": sum(1 for i in range(len(genome)) if genome[i] != current_genome[i]),
            "changes": changes[:50],
        })

    # Run QD (optional)
    qd_results = None
    qd_archive_stats = {}
    if QD_AVAILABLE:
        print(f"\n--- Quality-Diversity MAP-Elites ---")
        qd_elites, qd_archive = run_qd(evaluator, current_genome, positions, shortcut_pool, config)
        if qd_elites:
            qd_results = []
            for i, elite in enumerate(qd_elites[:20]):
                genome = elite["genome"]
                changes = decode_genome(genome, positions, shortcut_pool)
                qd_results.append({
                    "id": f"qd_{i}",
                    "objective": elite["objective"],
                    "behavior": elite["behavior"],
                    "total_assignments": sum(1 for g in genome if g >= 0),
                    "changes": changes[:50],
                })
            if qd_archive:
                qd_archive_stats = {
                    "num_elites": int(qd_archive.stats.num_elites),
                    "coverage": round(float(qd_archive.stats.coverage), 4),
                    "qd_score": round(float(qd_archive.stats.qd_score), 2),
                }

    output = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "config": config,
        "positions_count": len(positions),
        "shortcuts_count": len(shortcut_pool),
        "conjunction_pairs_count": len(conjunction_pairs),
        "seed_fitness": {
            "effort": round(seed_fitness[0], 2),
            "adjacency": round(-seed_fitness[1], 2),
            "violations": round(seed_fitness[2], 2),
        },
        "seed_breakdown": {k: round(float(v), 2) for k, v in seed_breakdown.items()},
        "pareto_front": pareto_solutions,
        "convergence": convergence,
    }

    if qd_results:
        output["qd_archive"] = qd_archive_stats
        output["qd_solutions"] = qd_results

    class NumpyEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, (np.integer,)):
                return int(obj)
            if isinstance(obj, (np.floating,)):
                return float(obj)
            if isinstance(obj, np.ndarray):
                return obj.tolist()
            return super().default(obj)

    out_path = os.path.join(build_dir, "evolution_results.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, cls=NumpyEncoder)

    print(f"\n{'=' * 60}")
    print(f"RESULTS: {len(pareto_solutions)} Pareto front solutions")
    if qd_results:
        print(f"QD: {qd_archive_stats.get('num_elites', 0)} elites, "
              f"{qd_archive_stats.get('coverage', 0):.1%} coverage")
    print(f"Written to: {out_path}")
    print("=" * 60)


if __name__ == "__main__":
    main()
