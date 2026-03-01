#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Patch hardcoded English strings in JS package files with Chinese translations.

Usage:
  python patch_hardcoded.py <packages_dir> <hardcoded_zh.json>

The hardcoded_zh.json file should have the same keys as hardcoded_to_translate.json
but with Chinese values:
  {
    "filename|||raw_english_string": "Chinese translation",
    ...
  }
"""
import json
import os
import sys


def patch(packages_dir, translations_path):
    with open(translations_path, 'r', encoding='utf-8') as f:
        translations = json.load(f)

    print(f"  Translations loaded: {len(translations)}")

    # Group by filename
    by_file = {}
    for key, zh_text in translations.items():
        parts = key.split('|||', 1)
        if len(parts) != 2:
            continue
        filename, raw_en = parts
        if not zh_text or not zh_text.strip():
            continue
        if filename not in by_file:
            by_file[filename] = []
        by_file[filename].append((raw_en, zh_text))

    total_patched = 0

    for filename, replacements in by_file.items():
        filepath = os.path.join(packages_dir, filename)
        if not os.path.exists(filepath):
            print(f"  Warning: {filename} not found, skipping")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        patched = 0
        for raw_en, zh_text in replacements:
            # The raw_en is exactly how it appears inside the JS quotes
            # We need to escape the zh_text for JS string (handle newlines, quotes)
            zh_escaped = zh_text.replace('\\', '\\\\')
            zh_escaped = zh_escaped.replace('"', '\\"')
            zh_escaped = zh_escaped.replace('\n', '\\n')
            zh_escaped = zh_escaped.replace('\r', '')

            # Try direct replacement
            if raw_en in content:
                content = content.replace(raw_en, zh_escaped, 1)
                patched += 1

        if patched > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  {filename}: {patched}/{len(replacements)} patched")
            total_patched += patched
        else:
            print(f"  {filename}: no matches (already patched or text changed)")

    print(f"  Total: {total_patched} strings patched")
    return total_patched


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python patch_hardcoded.py <packages_dir> <hardcoded_zh.json>")
        sys.exit(1)

    patch(sys.argv[1], sys.argv[2])
