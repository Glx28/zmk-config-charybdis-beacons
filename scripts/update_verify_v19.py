"""
Quick script to update verify_every_key.js with v1.9 layout changes.
This script updates the EXPECTED_CSV string with the 12 v1.9 positions.
"""

import sys

# Read the verify_every_key.js file
file_path = r"C:\Users\sondr\splitted_zmk_keyboard\scripts\zmk-studio\verify_every_key.js"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the replacements for v1.9 layout (with escaped quotes for JS string)
replacements = [
    # Layer 0, x:10, y:3 - Change Left Brace to Period
    (
        '\\"0\\",\\"0\\",\\"10\\",\\"3\\",\\"{\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard Left Brace\\",\\"default_transform: | Key::Keyboard Left Brace\\",\\"default_transform:default_transform\\",\\"\\"',
        '\\"0\\",\\"0\\",\\"10\\",\\"3\\",\\".\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard Period\\",\\"default_transform: | Key::Keyboard Period\\",\\"default_transform:default_transform\\",\\"\\"'
    ),

    # Layer 0, x:12, y:3 - Change Dash to Apostrophe
    (
        '\\"0\\",\\"0\\",\\"12\\",\\"3\\",\\"-\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard Dash and Underscore\\",\\"default_transform: | Key::Keyboard Dash and Underscore\\",\\"default_transform:default_transform\\",\\"\\"',
        '\\"0\\",\\"0\\",\\"12\\",\\"3\\",\\"' + "'" + '\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard Left Apos and Double\\",\\"default_transform: | Key::Keyboard Left Apos and Double\\",\\"default_transform:default_transform\\",\\"\\"'
    ),

    # Layer 1, x:1, y:2 - Change F1 to Win+S
    (
        '\\"1\\",\\"1\\",\\"1\\",\\"2\\",\\"F1\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard F1\\",\\"default_transform: | Key::Keyboard F1\\",\\"default_transform:default_transform\\",\\"\\"',
        '\\"1\\",\\"1\\",\\"1\\",\\"2\\",\\"Search\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"L GUI+Keyboard S\\",\\"default_transform: | Key::Keyboard S\\",\\"default_transform:default_transform\\",\\"L GUI\\"'
    ),

    # Layer 1, x:2, y:2 - Change F2 to Alt+Space
    (
        '\\"1\\",\\"1\\",\\"2\\",\\"2\\",\\"F2\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard F2\\",\\"default_transform: | Key::Keyboard F2\\",\\"default_transform:default_transform\\",\\"\\"',
        '\\"1\\",\\"1\\",\\"2\\",\\"2\\",\\"PT Run\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"L Alt+Keyboard Spacebar\\",\\"default_transform: | Key::Keyboard Spacebar\\",\\"default_transform:default_transform\\",\\"L Alt\\"'
    ),

    # Layer 1, x:9, y:3 - Change Ctrl+Z to Left Bracket
    (
        '\\"1\\",\\"1\\",\\"9\\",\\"3\\",\\"Z\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard Z\\",\\"default_transform: | Key::Keyboard Z\\",\\"default_transform:default_transform\\",\\"L Ctrl\\"',
        '\\"1\\",\\"1\\",\\"9\\",\\"3\\",\\"[\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard Left Brace\\",\\"default_transform: | Key::Keyboard Left Brace\\",\\"default_transform:default_transform\\",\\"\\"'
    ),

    # Layer 1, x:10, y:3 - Change Ctrl+S to Right Bracket
    (
        '\\"1\\",\\"1\\",\\"10\\",\\"3\\",\\"S\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard S\\",\\"default_transform: | Key::Keyboard S\\",\\"default_transform:default_transform\\",\\"L Ctrl\\"',
        '\\"1\\",\\"1\\",\\"10\\",\\"3\\",\\"]\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard Right Brace\\",\\"default_transform: | Key::Keyboard Right Brace\\",\\"default_transform:default_transform\\",\\"\\"'
    ),

    # Layer 1, x:11, y:3 - Change Ctrl+X to Backslash
    (
        '\\"1\\",\\"1\\",\\"11\\",\\"3\\",\\"X\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard X\\",\\"default_transform: | Key::Keyboard X\\",\\"default_transform:default_transform\\",\\"L Ctrl\\"',
        '\\"1\\",\\"1\\",\\"11\\",\\"3\\",\\"\\\\\\\\\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard Backslash and Pipe\\",\\"default_transform: | Key::Keyboard Backslash and Pipe\\",\\"default_transform:default_transform\\",\\"\\"'
    ),

    # Layer 1, x:12, y:3 - Change Ctrl+Y to Minus
    (
        '\\"1\\",\\"1\\",\\"12\\",\\"3\\",\\"Y\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard Y\\",\\"default_transform: | Key::Keyboard Y\\",\\"default_transform:default_transform\\",\\"L Ctrl\\"',
        '\\"1\\",\\"1\\",\\"12\\",\\"3\\",\\"-\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"Keyboard Dash and Underscore\\",\\"default_transform: | Key::Keyboard Dash and Underscore\\",\\"default_transform:default_transform\\",\\"\\"'
    ),

    # Layer 2, x:12, y:2 - Change Transparent to Toggle Layer 6
    (
        '\\"2\\",\\"2\\",\\"12\\",\\"2\\",\\"Transparent\\",\\"Transparent\\",\\"Transparent\\",\\"Transparent\\",\\"default_transform\\",\\"default_transform:\\",\\"default_transform:default_transform\\",\\"\\"',
        '\\"2\\",\\"2\\",\\"12\\",\\"2\\",\\"Scroll\\",\\"Toggle Layer\\",\\"Toggle Layer\\",\\"Toggle Layer\\",\\"default_transform\\",\\"default_transform:\\",\\"default_transform:default_transform | Layer::6\\",\\"\\"'
    ),

    # Layer 3, x:11, y:3 - Change Transparent to Alt+Space
    (
        '\\"3\\",\\"3\\",\\"11\\",\\"3\\",\\"Transparent\\",\\"Transparent\\",\\"Transparent\\",\\"Transparent\\",\\"default_transform\\",\\"default_transform:\\",\\"default_transform:default_transform\\",\\"\\"',
        '\\"3\\",\\"3\\",\\"11\\",\\"3\\",\\"PT Run\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"L Alt+Keyboard Spacebar\\",\\"default_transform: | Key::Keyboard Spacebar\\",\\"default_transform:default_transform\\",\\"L Alt\\"'
    ),
]

# Apply each replacement
for old_str, new_str in replacements:
    if old_str in content:
        content = content.replace(old_str, new_str)
        print(f"[OK] Applied replacement for: {old_str[:40]}...")
    else:
        print(f"[MISS] Pattern not found: {old_str[:40]}...")

# Layer 3, x:6, y:2 is a new position - we need to insert it
# Find the position after Layer 3, x:5, y:2
search_after = '\\"3\\",\\"3\\",\\"5\\",\\"2\\"'
search_before = '\\\\r\\\\n\\"3\\",\\"3\\",\\"7\\",\\"2\\"'

if search_after in content:
    # Find the end of the Layer 3, x:5, y:2 line
    idx = content.find(search_after)
    # Find the next \\r\\n after that
    next_newline = content.find('\\\\r\\\\n', idx)
    if next_newline != -1:
        # Insert the new entry after this line
        layer3_x6_entry = '\\"3\\",\\"3\\",\\"6\\",\\"2\\",\\"Search\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"L GUI+Keyboard S\\",\\"default_transform: | Key::Keyboard S\\",\\"default_transform:default_transform\\",\\"L GUI\\"\\\\r\\\\n'
        content = content[:next_newline+4] + layer3_x6_entry + content[next_newline+4:]
        print("[OK] Inserted Layer 3, x:6, y:2 (Win+S)")
    else:
        print("[MISS] Could not find newline after Layer 3, x:5, y:2")
else:
    print("[MISS] Could not find Layer 3, x:5, y:2")

# Write the updated content back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\n[DONE] verify_every_key.js updated with v1.9 layout changes!")
