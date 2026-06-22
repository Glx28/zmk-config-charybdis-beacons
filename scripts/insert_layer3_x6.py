"""Insert Layer 3, x:6, y:2 entry into verify_every_key.js"""

file_path = r"C:\Users\sondr\splitted_zmk_keyboard\scripts\zmk-studio\verify_every_key.js"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Look for Layer 3, x:5, y:2
search_5 = '\\"3\\",\\"3\\",\\"5\\",\\"2\\"'
search_7 = '\\"3\\",\\"3\\",\\"7\\",\\"2\\"'

idx5 = content.find(search_5)
idx7 = content.find(search_7)

if idx5 >= 0 and idx7 >= 0:
    # Find the \\r\\n between them
    between = content[idx5:idx7]
    print(f"Content between Layer 3 x:5 and x:7:")
    print(repr(between[:200]))

    # Find the end of the x:5 line (should be at the \\r\\n before x:7)
    rn_idx = content.rfind('\\r\\n', idx5, idx7)
    if rn_idx >= 0:
        # Insert after this \\r\\n
        insert_pos = rn_idx + 4  # After \\r\\n
        new_entry = '\\"3\\",\\"3\\",\\"6\\",\\"2\\",\\"Search\\",\\"Key Press\\",\\"Key Press\\",\\"Key Press\\",\\"L GUI+Keyboard S\\",\\"default_transform: | Key::Keyboard S\\",\\"default_transform:default_transform\\",\\"L GUI\\"\\r\\n'

        content = content[:insert_pos] + new_entry + content[insert_pos:]

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"[OK] Inserted Layer 3, x:6, y:2 at position {insert_pos}")
    else:
        print("[MISS] Could not find \\r\\n between x:5 and x:7")
else:
    print(f"[MISS] Could not find both positions: x:5={idx5}, x:7={idx7}")
