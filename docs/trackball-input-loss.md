# PMW3610 input loss: cause and permanent fix

## Confirmed cause

The repository pins `badjeff/zmk-pmw3610-driver` at `5c5af40de4d8cdf55dc63c4c5907af1e52da6a95` in `config/west.yml`. In that revision, `src/pmw3610.c`'s `pmw3610_report_data()` accumulated sensor deltas, copied them into report values, then cleared both accumulators before submitting X and Y separately with `K_NO_WAIT`. It ignored both `input_report()` return values.

When Zephyr's input queue was full, an axis event could be rejected after its counts had already been erased. The loss was silent. Since X and Y are separate queue events, losing one can distort diagonal or curved movement; losing successive events can look like a pause or freeze. This is a confirmed code defect and a plausible cause of the reported dropped/choppy movement. It does not by itself prove the cause of every long freeze or apparent reversal.

## Permanent fix

`patches/pmw3610-lossless-input-reporting.patch` changes the driver to:

- Wait for queue capacity with `K_FOREVER` instead of abandoning a report with `K_NO_WAIT`.
- Subtract each axis from its accumulator only after that axis is accepted by `input_report()`.
- Log and return an unexpected enqueue error while retaining the unsent delta.

This is lossless backpressure: a full queue delays the producer until the higher-priority input thread consumes events, rather than deleting motion.

The right-half GitHub Actions build applies this patch immediately after `west update`. West checks this project out at the workspace root as `zmk-pmw3610-driver` (not under `modules/`). Because the patch is pinned to the configured driver revision, a driver update or changed source context makes CI fail at the patch step instead of silently dropping the fix. Keep the west pin and patch aligned.

`CONFIG_INPUT_THREAD_PRIORITY=-2` and `CONFIG_INPUT_QUEUE_MAX_MSGS=128` in `charybdis_right.conf` help the consumer drain bursts. They are supporting capacity settings, not substitutes for retaining deltas.

## Regression rule

Never restore the old sequence that clears `dx`/`dy` before enqueueing or uses `K_NO_WAIT` without checking the result and preserving the rejected delta. Any alternative nonblocking design must retry or retain rejected movement per axis. Keep the driver patch in the right-half CI path and verify that step passes before flashing.

## Validation and current profile

The first patched right-half firmware built successfully in GitHub Actions run [44595272729](https://github.com/Glx28/zmk-config-charybdis-beacons/actions/runs/44595272729), and the user reported substantially smoother tracking afterward, with some longer freezes still observed. The same driver fix is also present in the later profile build [44602209493](https://github.com/Glx28/zmk-config-charybdis-beacons/actions/runs/44602209493). The code fix is confirmed; complete resolution of all remaining freezes is not established.

Current cursor/scroll gains are defined in `config/charybdis.keymap`; sensor, rest, and queue settings are in `config/boards/shields/charybdis/charybdis_right.conf` and `.overlay`. Read those files before changing or describing the profile. Do not copy old tuning values from this document.
