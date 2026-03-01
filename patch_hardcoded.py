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
import re
import sys

# Must match extract_hardcoded.py: only replace inside these contexts
METHOD_NAMES = [
    'directive', 'instructions', 'description', 'name', 'shortName',
    'fullName', 'title', 'label', 'text', 'message', 'hint',
    'studyPlanDirective',
]
METHODS_RE = '|'.join(METHOD_NAMES)
PAT_STATIC = re.compile(
    r'static\s+(' + METHODS_RE + r')\(\)\s*\{\s*\n\s*return\s+"((?:[^"\\]|\\.)*)"\s*;'
)
PAT_TEMPLATE = re.compile(
    r'return\s+"\\n\s+((?:[^"\\]|\\[^u"]|\\u[0-9a-fA-F]{4})*)\\n\s*"\s*;'
)


PAT_HTML_RAW = re.compile(r"HTML\.Raw\('((?:[^'\\]|\\.)*)'\)")


def try_replace_html_raw(content, en_text, zh_text):
    """Replace text between > and < strictly INSIDE HTML.Raw() calls only."""
    en_in_file = en_text.replace("'", "\\'")
    ws = r'(?:\\n| |\t)*'
    escaped_en = re.escape(en_in_file)
    tag_pattern = re.compile(r'(>' + ws + r')' + escaped_en + r'(' + ws + r'<)')

    found = [False]

    def replace_in_raw(m):
        if found[0]:
            return m.group(0)
        raw_content = m.group(1)
        new_raw, count = tag_pattern.subn(
            lambda mm: mm.group(1) + zh_text + mm.group(2),
            raw_content, count=1
        )
        if count > 0:
            found[0] = True
            return "HTML.Raw('" + new_raw + "')"
        return m.group(0)

    new_content = PAT_HTML_RAW.sub(replace_in_raw, content)
    return new_content, found[0]


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
        # Replace longer strings first to avoid corrupting a long string when a
        # shorter substring is replaced (e.g. "values" inside "values and colors")
        replacements = sorted(replacements, key=lambda x: -len(x[0]))

        filepath = os.path.join(packages_dir, filename)
        if not os.path.exists(filepath):
            print(f"  Warning: {filename} not found, skipping")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        patched = 0
        for raw_en, zh_text in replacements:
            # Escape for JS double-quoted string
            zh_escaped = zh_text.replace('\\', '\\\\')
            zh_escaped = zh_escaped.replace('"', '\\"')
            zh_escaped = zh_escaped.replace('\n', '\\n')
            zh_escaped = zh_escaped.replace('\r', '')

            done = False

            # Try Pattern 1: static method return "..."
            for m in PAT_STATIC.finditer(content):
                if m.group(2) == raw_en:
                    content = content[:m.start(2)] + zh_escaped + content[m.end(2):]
                    patched += 1
                    done = True
                    break

            # Try Pattern 2: Blaze template return "\n ... \n"
            if not done:
                for m in PAT_TEMPLATE.finditer(content):
                    if m.group(1).strip() == raw_en.strip():
                        content = content[:m.start(1)] + zh_escaped + content[m.end(1):]
                        patched += 1
                        done = True
                        break

            # Try Pattern 3: HTML.Raw('...>text<...')
            if not done:
                zh_html = zh_text.replace("'", "\\'")
                zh_html = zh_html.replace('\n', '\\n')
                zh_html = zh_html.replace('\r', '')
                content, replaced = try_replace_html_raw(content, raw_en, zh_html)
                if replaced:
                    patched += 1
                    done = True

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
