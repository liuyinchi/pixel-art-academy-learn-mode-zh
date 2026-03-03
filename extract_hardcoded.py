#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extract hardcoded English strings from JS package files.

These are strings NOT in the translation system (cache.json), but directly
embedded in compiled JavaScript (static class methods + Blaze templates).

Usage:
  python extract_hardcoded.py [packages_dir]

Output:
  hardcoded_to_translate.json - {key: English text} for translation

Key format: "filename|||raw_js_string"
  - filename: the JS package file
  - raw_js_string: the exact string as it appears in the JS source (with \\n for newlines)
"""
import re
import json
import os
import sys

# Packages that contain user-facing hardcoded strings
TARGET_PACKAGES = [
    # --- learnmode core ---
    'retronator_pixelartacademy-learnmode.js',
    'retronator_pixelartacademy-learnmode-app.js',
    'retronator_pixelartacademy-learnmode-intro.js',
    'retronator_pixelartacademy-learnmode-design.js',
    'retronator_pixelartacademy-learnmode-pixelartfundamentals.js',
    # --- pixelpad ---
    'retronator_pixelartacademy-pixelpad.js',
    'retronator_pixelartacademy-pixelpad-drawing.js',
    'retronator_pixelartacademy-pixelpad-instructions.js',
    'retronator_pixelartacademy-pixelpad-music.js',
    'retronator_pixelartacademy-pixelpad-notifications.js',
    'retronator_pixelartacademy-pixelpad-pico8.js',
    'retronator_pixelartacademy-pixelpad-pixeltosh.js',
    'retronator_pixelartacademy-pixelpad-todo.js',
    'retronator_pixelartacademy-pixelpad-studyplan.js',
    # --- tutorials (large) ---
    'retronator_pixelartacademy-tutorials.js',
    # --- challenges ---
    'retronator_pixelartacademy-challenges.js',
    # --- pixeltosh apps ---
    'retronator_pixelartacademy-pixeltosh.js',
    'retronator_pixelartacademy-pixeltosh-pinball.js',
    'retronator_pixelartacademy-pixeltosh-drawquickly.js',
    'retronator_pixelartacademy-pixeltosh-writer.js',
    # --- pico8 ---
    'retronator_pixelartacademy-pico8.js',
    'retronator_pixelartacademy-pico8-invasion.js',
    'retronator_pixelartacademy-pico8-jungle.js',
    'retronator_pixelartacademy-pico8-snake.js',
    # --- other ---
    'retronator_pixelartacademy.js',
    'retronator_pixelartacademy-practice.js',
    'retronator_pixelartacademy-studyguide.js',
    'retronator_pixelartacademy-learning.js',
    'retronator_pixelartacademy-music.js',
    'retronator_pixelartacademy-publication.js',
]

# Method names that contain user-facing text
METHOD_NAMES = [
    'directive', 'instructions', 'description', 'name', 'shortName',
    'fullName', 'title', 'label', 'text', 'message', 'hint',
    'studyPlanDirective',
]

# Pattern 1: static methodName() { \n return "..."; }
METHODS_RE = '|'.join(METHOD_NAMES)
PAT_STATIC = re.compile(
    r'static\s+(' + METHODS_RE + r')\(\)\s*\{\s*\n\s*return\s+"((?:[^"\\]|\\.)*)"\s*;'
)

# Pattern 2: Blaze template return "\n   Text\n  ";
PAT_TEMPLATE = re.compile(
    r'return\s+"\\n\s+((?:[^"\\]|\\[^u"]|\\u[0-9a-fA-F]{4})*)\\n\s*"\s*;'
)

# Pattern 3: HTML.Raw('...') - visible text between HTML tags
PAT_HTML_RAW = re.compile(r"HTML\.Raw\('((?:[^'\\]|\\.)*)'\)")
TAG_TEXT_RE = re.compile(r'>([^<]+)<')


def extract(packages_dir):
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Load existing hardcoded translations to exclude already-translated
    hz_path = os.path.join(script_dir, 'hardcoded_zh.json')
    existing_keys = set()
    if os.path.exists(hz_path):
        with open(hz_path, 'r', encoding='utf-8') as f:
            existing_keys = set(json.load(f).keys())
        print(f"  Already translated (hardcoded): {len(existing_keys)}")

    all_strings = {}

    for pkg in TARGET_PACKAGES:
        fpath = os.path.join(packages_dir, pkg)
        if not os.path.exists(fpath):
            continue

        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        found = {}

        # Pattern 1: static methods
        for m in PAT_STATIC.finditer(content):
            raw_text = m.group(2)
            cleaned = raw_text.replace('\\n', '\n').strip()
            if len(cleaned) >= 3 and re.search(r'[a-zA-Z]{2}', cleaned):
                found[raw_text] = cleaned

        # Pattern 2: Blaze templates
        for m in PAT_TEMPLATE.finditer(content):
            raw_text = m.group(1).strip()
            cleaned = raw_text.replace('\\n', '\n').strip()
            if len(cleaned) >= 5 and re.search(r'[a-zA-Z]{3}', cleaned):
                found[raw_text] = cleaned

        # Pattern 3: HTML.Raw('...') - text between HTML tags
        for m in PAT_HTML_RAW.finditer(content):
            html_content = m.group(1)
            for tm in TAG_TEXT_RE.finditer(html_content):
                raw_in_file = tm.group(1)
                cleaned = raw_in_file.replace('\\n', ' ').replace("\\'", "'").strip()
                if len(cleaned) < 2:
                    continue
                if not re.search(r'[a-zA-Z]{2}', cleaned):
                    continue
                if re.search(r'[{};=]', cleaned):
                    continue
                found[cleaned] = cleaned

        if found:
            all_strings[pkg] = found
            print(f"  {pkg}: {len(found)} strings")

    # Build output, excluding already translated
    output = {}
    for pkg, items in all_strings.items():
        for raw, cleaned in items.items():
            key = f"{pkg}|||{raw}"
            if key not in existing_keys:
                output[key] = cleaned

    # Write
    out_path = os.path.join(script_dir, 'hardcoded_to_translate.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n  Total: {len(output)} strings to translate")
    print(f"  Saved to: {out_path}")
    return len(output)


if __name__ == '__main__':
    if len(sys.argv) >= 2:
        packages_dir = sys.argv[1]
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        game_dir = os.path.dirname(script_dir)
        packages_dir = os.path.join(game_dir, 'resources', 'app',
                                     'meteor_extracted', 'packages')

    if not os.path.isdir(packages_dir):
        print(f"Error: packages directory not found at {packages_dir}")
        print("Please run the install patch first to extract game files.")
        sys.exit(1)

    extract(packages_dir)
