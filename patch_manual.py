#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Apply manual find-and-replace patches to JS files.

This handles strings that cannot be auto-extracted by extract_hardcoded.py,
such as inline template text, anonymous function returns, etc.

Usage:
  python patch_manual.py <packages_dir> [manual_patches.json]

The manual_patches.json file should be a list of patch objects:
  [
    {
      "file": "target_filename.js",
      "find": "exact string to find in the file",
      "replace": "replacement string",
      "replace_all": false,          // optional, default false
      "comment": "human-readable note" // optional
    },
    ...
  ]
"""
import json
import os
import sys


def patch(packages_dir, patches_path):
    with open(patches_path, 'r', encoding='utf-8') as f:
        patches = json.load(f)

    print(f"  Manual patches loaded: {len(patches)}")

    # Group by file
    by_file = {}
    for p in patches:
        fn = p['file']
        if fn not in by_file:
            by_file[fn] = []
        by_file[fn].append(p)

    total_patched = 0

    for filename, file_patches in by_file.items():
        filepath = os.path.join(packages_dir, filename)
        if not os.path.exists(filepath):
            print(f"  Warning: {filename} not found, skipping")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        patched = 0
        for p in file_patches:
            find_str = p['find']
            replace_str = p['replace']
            replace_all = p.get('replace_all', False)
            comment = p.get('comment', find_str[:40])

            if find_str not in content:
                print(f"    Skip (not found / already patched): {comment}")
                continue

            if replace_all:
                count = content.count(find_str)
                content = content.replace(find_str, replace_str)
                patched += count
                print(f"    Patched ({count}x): {comment}")
            else:
                content = content.replace(find_str, replace_str, 1)
                patched += 1
                print(f"    Patched: {comment}")

        if patched > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  {filename}: {patched} manual patches applied")
            total_patched += patched
        else:
            print(f"  {filename}: no patches applied (already patched or text changed)")

    print(f"  Total: {total_patched} manual patches applied")
    return total_patched


if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))

    if len(sys.argv) < 2:
        print("Usage: python patch_manual.py <packages_dir> [manual_patches.json]")
        sys.exit(1)

    packages_dir = sys.argv[1]
    patches_path = (
        sys.argv[2] if len(sys.argv) > 2
        else os.path.join(script_dir, 'manual_patches.json')
    )

    patch(packages_dir, patches_path)
