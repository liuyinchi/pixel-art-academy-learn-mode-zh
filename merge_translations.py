#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Merge new translations into translations_zh.json.

Usage:
  python merge_translations.py <translated_file.json>

The translated file should be a JSON object with the same keys as to_translate.json,
but with Chinese translations as values:

  {
    "Namespace|||key": "Chinese translation",
    ...
  }

This script will merge them into translations_zh.json (adding new entries
and updating existing ones).
"""
import json
import sys
import os

def merge(translated_path):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.join(script_dir, 'translations_zh.json')

    # Load existing translations
    with open(base_path, 'r', encoding='utf-8') as f:
        existing = json.load(f)
    print(f"  Existing translations: {len(existing)}")

    # Load new translations
    with open(translated_path, 'r', encoding='utf-8') as f:
        new_trans = json.load(f)
    print(f"  New translations: {len(new_trans)}")

    # Validate: all keys must contain |||
    invalid = [k for k in new_trans if '|||' not in k]
    if invalid:
        print(f"  WARNING: {len(invalid)} keys missing '|||' separator, skipping them:")
        for k in invalid[:5]:
            print(f"    - {k}")

    # Merge (new entries override existing)
    added = 0
    updated = 0
    for key, value in new_trans.items():
        if '|||' not in key:
            continue
        if not isinstance(value, str) or not value.strip():
            continue
        if key in existing:
            if existing[key] != value:
                updated += 1
        else:
            added += 1
        existing[key] = value

    # Write back
    with open(base_path, 'w', encoding='utf-8') as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)

    print(f"  Result: {added} added, {updated} updated, total {len(existing)}")
    print(f"  Saved to: {base_path}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python merge_translations.py <translated_file.json>")
        print()
        print("Example workflow:")
        print("  1. Open to_translate.json, translate the values to Chinese")
        print("  2. Save as my_translations.json")
        print("  3. Run: python merge_translations.py my_translations.json")
        print("  4. Re-run the install patch to apply")
        sys.exit(1)

    merge(sys.argv[1])
