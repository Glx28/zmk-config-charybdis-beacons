import csv, hashlib, importlib.util, json
from pathlib import Path
root=Path(__file__).resolve().parents[2]
source=root/'layout/review_candidates/l2_workspace_direct_keys_20261109_source.csv'
out=root/'layout/review_candidates/l2_workspace_controls_20261110.csv'
fields=['layer','x','y','visual_label','behavior','parameter','modifiers','purpose','usage_notes','source']
with source.open(encoding='utf-8-sig',newline='') as f: rows=list(csv.DictReader(f))
key=lambda r:(int(r['layer']),int(r['x']),int(r['y']))
by={key(r):r for r in rows}
if len(rows)!=616: raise SystemExit(f'Expected 616 rows, got {len(rows)}')
# Move all existing application shortcuts out of L2 RHS. Keep editors, workspace slots and layer access.
groups={
  6:[(7,2),(11,0),(12,0),(12,1),(12,3),(0,1),(0,2)], # M-Files 7
  5:[(0,1),(0,2),(1,3),(3,3)],                      # Teams 4
  8:[(0,2),(3,0)],                                  # Outlook 2
  4:[(0,1),(1,0),(1,1),(5,1)],                      # Excel 4
}
move_sources=[(2,7,1),(2,8,1),(2,12,0),(2,9,1),(2,10,1),(2,11,1),(2,12,1),
              (2,7,2),(2,8,2),(2,9,2),(2,10,2),(2,11,2),(2,12,2),
              (2,9,3),(2,10,3),(2,11,3),(2,12,3)]
if len(move_sources)!=17: raise SystemExit('Bad source list')
# Deterministic group order, preserving function pairs inside each target layer.
source_groups={
  6:[(2,7,1),(2,8,1),(2,12,0),(2,9,1),(2,10,1),(2,11,1),(2,12,1)],
  5:[(2,7,2),(2,8,2),(2,9,2),(2,10,2)],
  8:[(2,11,2),(2,12,2)],
  4:[(2,9,3),(2,10,3),(2,11,3),(2,12,3)],
}
report=[]
for layer, sources in source_groups.items():
  targets=[(layer,x,y) for x,y in groups[layer]]
  for src,dst in zip(sources,targets):
    old=by[src]; target=by[dst]
    if target['behavior']!='Transparent': raise SystemExit(f'Target not transparent: {dst}: {target}')
    if old['behavior']=='Transparent': raise SystemExit(f'Source unexpectedly transparent: {src}')
    moved=dict(old); moved.update(layer=str(dst[0]),x=str(dst[1]),y=str(dst[2]),source='manual review candidate: moved from L2 for direct workspace keys',usage_notes=f"Moved from L2 x{src[1]},y{src[2]} to free L{layer} position; direct workspace slots use F13-F20.")
    target.update(moved)
    old.update(visual_label='transparent',behavior='Transparent',parameter='',modifiers='',purpose='',usage_notes='',source='transparent')
    report.append((src,dst,moved['visual_label'],moved['purpose']))
# Remove the old high-effort shared workspace duplicates from the previous map.
# These were left over because they were not ordinary application shortcuts.
for x in (9,10,11,12):
 r=by[(2,x,0)]
 if r['behavior']=='Key Press' and r['parameter'] in {'F13','F14','F15','F16'}:
  r.update(visual_label='transparent',behavior='Transparent',parameter='',modifiers='',purpose='',usage_notes='',source='transparent')
# Dedicated per-profile physical triggers, same slot meaning on both hosts.
slots=[
 (7,2,'🔁 Full','F13','Main workspace','Shared action: matching full-screen workspace on personal and work PCs.'),
 (8,2,'🔁 Split','F14','Main split workspace','Shared action: matching split workspace on personal and work PCs.'),
 (9,2,'🔁 Browser','F15','Browser and web apps','Shared action: matching browser workspace on personal and work PCs.'),
 (10,2,'🔁 Collab','F16','Collaboration workspace','Shared action: matching collaboration workspace on personal and work PCs.'),
 (11,2,'💼 Admin','F17','M-Files Admin workspace','Work-only workspace; no personal counterpart.'),
 (12,2,'💼 Excel','F18','Excel and Teams workspace','Work-only workspace; no personal counterpart.'),
 (7,1,'💼 M-Files','F19','M-Files and Teams workspace','Work-only workspace; no personal counterpart.'),
 (8,1,'💼 Jira+MF','F20','Jira, Admin, and M-Files workspace','Work-only workspace; no personal counterpart.'),
]
for x,y,label,keycode,purpose,detail in slots:
 r=by[(2,x,y)]
 r.update(visual_label=label,behavior='Key Press',parameter=keycode,modifiers='',purpose=purpose,usage_notes=detail,source='manual review candidate: direct workspace key')
# Keep editors and dynamic access controls in L2. Norwegian symbol cluster untouched.
if by[(2,0,2)]['visual_label']!='\\': raise SystemExit('L2 Norwegian backslash changed')
for pos in [(2,7,0),(2,8,0),(2,7,3),(2,8,3)]:
 if by[pos]['behavior']=='Transparent': raise SystemExit(f'Expected editor/access binding missing at {pos}')
ordered=sorted(rows,key=key)
with out.open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(ordered)
# Update canonical CSV and JSON. JSON keeps exporter-compatible Studio parameters.
canonical=root/'layout/keybindings_explained.csv'; canonical.write_bytes(out.read_bytes())
keys=[]
for r in ordered:
 param=r['parameter']
 if r['behavior']=='Key Press' and param.startswith('F') and param[1:].isdigit(): param='Keyboard '+param
 elif r['behavior']=='Key Press' and param and not param.startswith('Keyboard '): param='Keyboard '+param
 keys.append({'layer':int(r['layer']),'x':int(r['x']),'y':int(r['y']),'behavior':r['behavior'],'parameter':param,'modifiers':[x for x in r['modifiers'].split('+') if x],'label':r['visual_label'],'rationale':r['usage_notes'] or r['purpose'],'optimizer_changed':False,'apply_batch':True})
layout={'project':'Charybdis usage-ranked layout','version':'L2-direct-workspaces-20261110','keyCount':616,'layers':list(range(11)),'keys':keys}
(root/'layout/final_user_layout_v2.json').write_text(json.dumps(layout,indent=2)+'\n',encoding='utf-8')
# Changed keys relative to previous applied candidate.
with source.open(encoding='utf-8-sig',newline='') as f: base=list(csv.DictReader(f))
bbase={key(r):r for r in base}
semantic=lambda r:tuple(r.get(k,'') for k in ['visual_label','behavior','parameter','modifiers','purpose'])
changed=[r for r in ordered if semantic(r)!=semantic(bbase[key(r)])]
exporter_path=root.parent/'charybdis-tools/runtime/evolved_v2_export/export_and_analyze_linux.py'
spec=importlib.util.spec_from_file_location('exporter',exporter_path); exporter=importlib.util.module_from_spec(spec); spec.loader.exec_module(exporter)
full=[{'layer':int(r['layer']),'x':int(r['x']),'y':int(r['y']),'label':r['visual_label'],'behavior':r['behavior'],'parameter':r['parameter'],'modifiers':[x for x in r['modifiers'].split('+') if x],'purpose':r['purpose'],'usage_notes':r['usage_notes'],'source':r['source']} for r in ordered]
changed_full=[b for b in full if semantic({'visual_label':b['label'],'behavior':b['behavior'],'parameter':b['parameter'],'modifiers':'+'.join(b['modifiers']),'purpose':b['purpose']})!=semantic(bbase[(b['layer'],b['x'],b['y'])])]
scripts=root/'scripts/zmk-studio'; version='L2-direct-workspaces-20261110'
(scripts/'review_l2_workspace_direct_keys_20261110_apply.js').write_text(exporter.generate_apply_js(changed_full,version=version),encoding='utf-8')
verify=exporter.generate_verify_js(changed_full).replace('window.CHARYBDIS_VERSION = "evolved-v2";',f'window.CHARYBDIS_VERSION = "{version}";')
# The exporter skips Transparent bindings. Include them here so moved L2 source slots are checked too.
import io
csvbuf=io.StringIO(newline='')
writer=csv.writer(csvbuf,lineterminator='\n',quoting=csv.QUOTE_ALL)
writer.writerow(['layer','x','y','label','behavior','parameter','modifiers'])
for b in changed_full:
    writer.writerow([b['layer'],b['x'],b['y'],b['label'],b['behavior'],b['parameter'],'+'.join(b['modifiers'])])
expected=csvbuf.getvalue().rstrip('\n')
marker='const EXPECTED_CSV = `'
start=verify.index(marker)+len(marker)
end=verify.index('`;',start)
verify=verify[:start]+expected+verify[end:]
(scripts/'review_l2_workspace_direct_keys_20261110_verify.js').write_text(verify,encoding='utf-8')
# Machine-readable and human-readable slot mapping.
slotdoc={'version':version,'personal':{'F13':'Charybdis Workspace - Full.lnk','F14':'Charybdis Workspace - Split.lnk','F15':'Charybdis Workspace - Browser.lnk','F16':'Charybdis Workspace - Collaboration.lnk'},'work':{'F13':'Charybdis Workspace - Full.lnk','F14':'Charybdis Workspace - Split.lnk','F15':'Charybdis Workspace - Browser.lnk','F16':'Charybdis Workspace - Collaboration.lnk','F17':'Charybdis Workspace - M-Files Admin.lnk','F18':'Charybdis Workspace - Excel Teams.lnk','F19':'Charybdis Workspace - M-Files Teams.lnk','F20':'Charybdis Workspace - Jira M-Files Admin.lnk'},'work_profiles':{'F13':'{76A17134-86F3-4C27-B373-C60B35B6CD90}','F14':'{89F00F95-FBB0-40D3-BE20-33AEA154F2E3}','F15':'{E43EA5B1-0064-43E6-91F1-C19A96866D1D}','F16':'{810CAF85-0993-4A6C-9A36-B03BA1F2BAA9}','F17':'{004C4673-C81E-4025-A38A-370950F2DDC0}','F18':'{C5B74492-D902-4346-88C6-076E6D8C33EA}','F19':'{8E42B2C9-D90B-4050-AD3B-2057AB16428F}','F20':'{78CB235A-505F-4240-8E8C-889187428C5C}'},'personal_profiles':{'F13':'{c13b457c-2062-438a-b3c1-019260008347}','F14':'{19ce47a5-b782-4787-9e17-73072c4f1232}','F15':'{EF2E4129-C3E0-4D84-B532-9B93D1ADED81}','F16':'{263E9109-A154-4DFA-80DE-30F357FCEF01}'}}
(root.parent/'portable-charybdis/docs/workspace-keymap-20261110.json').write_text(json.dumps(slotdoc,indent=2)+'\n',encoding='utf-8')
report_text='\n'.join(f'L{a[0]} x{a[1]} y{a[2]} → L{b[0]} x{b[1]} y{b[2]}: {label} — {purpose}' for a,b,label,purpose in report)
(root/'layout/review_candidates/l2_workspace_direct_keys_20261110.md').write_text(f'''# L2 workspace keys — corrected placement and labels

Version: `{version}`

## Shared workspace controls

| L2 position | Coach label | HID sent to Windows | Personal workspace | Work workspace |
|---|---|---|---|---|
| x7,y2 | 🔁 Full | F13 | Charybdis Personal - Full | M - MF - Cop |
| x8,y2 | 🔁 Split | F14 | Charybdis Personal - Split | M - MF - Cop+JR |
| x9,y2 | 🔁 Browser | F15 | Charybdis Personal - Browser | M - Edge - Cop+JR |
| x10,y2 | 🔁 Collab | F16 | Discord collaboration | M - JR - SF+TM |
| x11,y2 | 💼 Admin | F17 | Work-only | M - Adm - Cop+JR |
| x12,y2 | 💼 Excel | F18 | Work-only | M - XL - Cop+TM |

Fill the easy L2 y2 row first. Shared actions occupy x7–x10,y2; work-only actions continue at x11–x12,y2. The remaining work-only actions use x7–x8,y1. This keeps mutual workspaces closest and avoids leaving y2 empty while placing actions on y0.

| L2 position | Coach label | HID | Work workspace |
|---|---|---|---|
| x7,y1 | 💼 M-Files | F19 | M-Files + Teams |
| x8,y1 | 💼 Jira+MF | F20 | Jira + Admin + M-Files |

Coach now names the action. F13–F20 remain only the internal HID transport keys that AHK receives.

## Root cause found in personal workspace map

F15 pointed to `di br te`, whose actual saved apps were Discord, Edge, and Terminal. F16 pointed to `di br te split`, whose apps were Edge, Terminal, and Discord. Neither was the intended browser/web-app workspace. The saved `temp, brave and chatgpt, with webapp` profile includes the intended Brave YouTube and ChatGPT web apps mixed with stale duplicate Edge/ChatGPT windows, PowerShell, and PowerToys Settings. This mismatch explains why a workspace key could start PowerToys but fail to produce the expected app arrangement.

The corrected personal Browser profile must contain only the Brave YouTube app and ChatGPT Edge web app, preserving their saved central-monitor positions. Keep the existing left Edge/Coach window and right Terminal context out of that workspace. Full/Split links retain their saved profiles; collaboration continues to use the existing Discord profile. Work-host IDs remain local to that PC and are documented in `portable-charybdis/docs/workspace-keymap-20261110.json`.

## Other changes

Editors remain at L2 x7,y0 and x8,y0. Dynamic layer access and Norwegian symbols stay in place. L0/L1/L7 unchanged. Existing L2 application actions move to lower non-thumb positions as listed in `l2_workspace_direct_keys_20261109.md`.

This candidate changes only the new workspace block and labels beyond the previous direct-workspace layout. Its apply script is separate from the prior saved version. Studio application/save status must be confirmed separately.
''',encoding='utf-8')
print('changed',len(changed),'candidate_sha256',hashlib.sha256(out.read_bytes()).hexdigest())
print('moved',len(report))
