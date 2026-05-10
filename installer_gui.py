#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pixel Art Academy Learn Mode - 简体中文汉化补丁安装器
All-in-one GUI installer, can be packaged as a standalone .exe via PyInstaller.
"""
import os
import sys
import struct
import json
import re
import shutil
import threading
import queue
import time
import tkinter as tk
import urllib.error
import urllib.request
from tkinter import scrolledtext, messagebox, filedialog


# ============================================================
# Resource / Path Helpers
# ============================================================

def resource_path(relative_path):
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)


def app_dir_path():
    return os.path.dirname(os.path.abspath(sys.argv[0]))


def data_path(relative_path):
    external = os.path.join(app_dir_path(), relative_path)
    return external if os.path.exists(external) else resource_path(relative_path)


def writable_data_path(relative_path):
    return os.path.join(app_dir_path(), relative_path)


def find_game_dir():
    exe_dir = app_dir_path()
    if os.path.isdir(os.path.join(exe_dir, "resources", "app")):
        return exe_dir
    parent = os.path.dirname(exe_dir)
    if os.path.isdir(os.path.join(parent, "resources", "app")):
        return parent
    return None


# ============================================================
# ASAR Extraction
# ============================================================

def extract_asar(asar_path, dest_dir, log_fn=print):
    with open(asar_path, 'rb') as f:
        _pickle_payload_size = struct.unpack('<I', f.read(4))[0]
        header_buf_size = struct.unpack('<I', f.read(4))[0]
        header_buf = f.read(header_buf_size)
        _header_pickle_payload = struct.unpack('<I', header_buf[0:4])[0]
        json_str_len = struct.unpack('<I', header_buf[4:8])[0]
        header_json = header_buf[8:8 + json_str_len].decode('utf-8')
        header = json.loads(header_json)
        data_offset = 8 + header_buf_size

        file_count = [0]
        error_count = [0]

        def extract_node(node, current_path):
            os.makedirs(current_path, exist_ok=True)
            if 'files' not in node:
                return
            for name, child in node['files'].items():
                child_path = os.path.join(current_path, name)
                if 'files' in child:
                    extract_node(child, child_path)
                elif 'offset' in child:
                    try:
                        offset = int(child['offset'])
                        size = int(child['size'])
                        f.seek(data_offset + offset)
                        data = f.read(size)
                        os.makedirs(os.path.dirname(child_path), exist_ok=True)
                        with open(child_path, 'wb') as out:
                            out.write(data)
                        file_count[0] += 1
                    except Exception:
                        error_count[0] += 1

        extract_node(header, dest_dir)
        return file_count[0], error_count[0]


# ============================================================
# Translation Injection
# ============================================================

PLACEHOLDER_TRANSLATION_KEYS = {
    'message', 'description', 'displayName', 'shortName', 'fullName',
    'unlockInstructions', 'directive', 'instructions', 'name',
    'title', 'hint', 'text', 'label',
}


def _english_text(trans_obj):
    en_data = trans_obj.get('en') if isinstance(trans_obj, dict) else None
    if not isinstance(en_data, dict):
        return None
    for region in ('best', 'us'):
        region_data = en_data.get(region)
        if isinstance(region_data, dict) and region_data.get('text'):
            return region_data['text']
    return None


def _is_placeholder_translation(key, trans_obj):
    return key in PLACEHOLDER_TRANSLATION_KEYS and key == _english_text(trans_obj)


def inject_translations(cache_path, trans_path, log_fn=print):
    log_fn(f"  读取翻译文件: {os.path.basename(trans_path)}")
    with open(trans_path, 'r', encoding='utf-8') as f:
        translations = json.load(f)

    log_fn(f"  读取缓存文件: {os.path.basename(cache_path)}")
    with open(cache_path, 'r', encoding='utf-8') as f:
        cache = json.load(f)

    injected = 0
    skipped = 0
    cleaned = 0

    for _ns, keys in cache.items():
        if not isinstance(keys, dict):
            continue
        for key, entry in keys.items():
            if not isinstance(entry, list) or len(entry) < 2:
                continue
            trans_obj = entry[1]
            if _is_placeholder_translation(key, trans_obj) and 'zh' in trans_obj:
                del trans_obj['zh']
                cleaned += 1

    for full_key, zh_text in translations.items():
        parts = full_key.split('|||', 1)
        if len(parts) != 2:
            continue
        ns, key = parts
        if ns not in cache or key not in cache[ns]:
            skipped += 1
            continue
        entry = cache[ns][key]
        trans_obj = entry[1]
        trans_obj["zh"] = {
            "cn": {"text": zh_text, "quality": 0},
            "best": {"text": zh_text, "quality": 0, "languageRegion": "zh-CN"}
        }
        injected += 1

    log_fn(f"  写入缓存: {injected} 条已注入, {skipped} 条跳过, {cleaned} 条占位翻译已清理")
    with open(cache_path, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, separators=(',', ':'))

    return injected


# ============================================================
# Hardcoded String Patching
# ============================================================

METHOD_NAMES = [
    # Do not patch displayName here. Several game classes derive IDs and
    # resource paths from static displayName(), so translating it hides content.
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

# Keep GUI auto-translation in sync with extract_hardcoded.py. Scanning all
# retronator_*.js files produces many false positives from libraries/stores.
HARDCODED_TARGET_PACKAGES = [
    'retronator_pixelartacademy-learnmode.js',
    'retronator_pixelartacademy-learnmode-app.js',
    'retronator_pixelartacademy-learnmode-intro.js',
    'retronator_pixelartacademy-learnmode-design.js',
    'retronator_pixelartacademy-learnmode-pixelartfundamentals.js',
    'retronator_pixelartacademy-pixelpad.js',
    'retronator_pixelartacademy-pixelpad-drawing.js',
    'retronator_pixelartacademy-pixelpad-instructions.js',
    'retronator_pixelartacademy-pixelpad-music.js',
    'retronator_pixelartacademy-pixelpad-notifications.js',
    'retronator_pixelartacademy-pixelpad-pico8.js',
    'retronator_pixelartacademy-pixelpad-pixeltosh.js',
    'retronator_pixelartacademy-pixelpad-todo.js',
    'retronator_pixelartacademy-pixelpad-studyplan.js',
    'retronator_pixelartacademy-tutorials.js',
    'retronator_pixelartacademy-challenges.js',
    'retronator_pixelartacademy-pixeltosh.js',
    'retronator_pixelartacademy-pixeltosh-pinball.js',
    'retronator_pixelartacademy-pixeltosh-drawquickly.js',
    'retronator_pixelartacademy-pixeltosh-writer.js',
    'retronator_pixelartacademy-pico8.js',
    'retronator_pixelartacademy-pico8-invasion.js',
    'retronator_pixelartacademy-pico8-jungle.js',
    'retronator_pixelartacademy-pico8-snake.js',
    'retronator_pixelartacademy.js',
    'retronator_pixelartacademy-practice.js',
    'retronator_pixelartacademy-studyguide.js',
    'retronator_pixelartacademy-learning.js',
    'retronator_pixelartacademy-music.js',
    'retronator_pixelartacademy-publication.js',
]


def _try_replace_html_raw(content, en_text, zh_text):
    en_in_file = en_text.replace("'", "\\'")
    ws = r'(?:\\n| |\t)*'
    escaped_en = re.escape(en_in_file)
    tag_pattern = re.compile(r'(>' + ws + r')' + escaped_en + r'(' + ws + r'<)')

    total_count = [0]

    def replace_in_raw(m):
        raw_content = m.group(1)
        new_raw, count = tag_pattern.subn(
            lambda mm: mm.group(1) + zh_text + mm.group(2), raw_content
        )
        if count > 0:
            total_count[0] += count
            return "HTML.Raw('" + new_raw + "')"
        return m.group(0)

    new_content = PAT_HTML_RAW.sub(replace_in_raw, content)
    return new_content, total_count[0]


def patch_hardcoded(packages_dir, translations, log_fn=print):
    log_fn(f"  翻译条目: {len(translations)}")

    by_file = {}
    for key, zh_text in translations.items():
        parts = key.split('|||', 1)
        if len(parts) != 2:
            continue
        filename, raw_en = parts
        if not zh_text or not zh_text.strip():
            continue
        by_file.setdefault(filename, []).append((raw_en, zh_text))

    total_patched = 0

    for filename, replacements in by_file.items():
        replacements = sorted(replacements, key=lambda x: -len(x[0]))
        filepath = os.path.join(packages_dir, filename)
        if not os.path.exists(filepath):
            log_fn(f"  警告: {filename} 未找到，跳过")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        patched = 0
        for raw_en, zh_text in replacements:
            zh_escaped = (zh_text.replace('\\', '\\\\')
                          .replace('"', '\\"')
                          .replace('\n', '\\n')
                          .replace('\r', ''))
            done = False

            for m in PAT_STATIC.finditer(content):
                if m.group(2) == raw_en:
                    content = content[:m.start(2)] + zh_escaped + content[m.end(2):]
                    patched += 1
                    done = True
                    break

            if not done:
                for m in PAT_TEMPLATE.finditer(content):
                    if m.group(1).strip() == raw_en.strip():
                        content = content[:m.start(1)] + zh_escaped + content[m.end(1):]
                        patched += 1
                        done = True
                        break

            if not done:
                zh_html = (zh_text.replace("'", "\\'")
                           .replace('\n', '\\n')
                           .replace('\r', ''))
                content, replaced_count = _try_replace_html_raw(content, raw_en, zh_html)
                if replaced_count:
                    patched += replaced_count

        if patched > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            log_fn(f"  {filename}: {patched}/{len(replacements)} 已替换")
            total_patched += patched

    log_fn(f"  共计: {total_patched} 个字符串已替换")
    return total_patched


# ============================================================
# Manual JS Patching
# ============================================================

def _is_safe_replacement(content, find_str):
    pos = 0
    while True:
        pos = content.find(find_str, pos)
        if pos < 0:
            return True
        if pos > 0:
            before = content[pos - 1]
            if before.isalnum() or before == '_':
                return False
        after_pos = pos + len(find_str)
        if after_pos < len(content):
            after = content[after_pos]
            if after.isalnum() or after == '_':
                return False
        pos += 1


def patch_manual(packages_dir, patches, log_fn=print):
    log_fn(f"  手动补丁: {len(patches)} 条")

    by_file = {}
    for patch in patches:
        filename = patch.get('file')
        if filename:
            by_file.setdefault(filename, []).append(patch)

    total_patched = 0

    for filename, file_patches in by_file.items():
        filepath = os.path.join(packages_dir, filename)
        if not os.path.exists(filepath):
            log_fn(f"  警告: {filename} 未找到，跳过")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        patched = 0
        for patch in file_patches:
            find_str = patch.get('find', '')
            replace_str = patch.get('replace', '')
            if not find_str or find_str not in content:
                continue
            if not _is_safe_replacement(content, find_str):
                log_fn(f"  警告: 手动补丁上下文不安全，已跳过: {patch.get('comment', find_str[:40])}")
                continue
            if patch.get('replace_all', False):
                count = content.count(find_str)
                content = content.replace(find_str, replace_str)
            else:
                content = content.replace(find_str, replace_str, 1)
                count = 1
            patched += count

        if patched > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            log_fn(f"  {filename}: {patched} 个手动补丁已应用")
            total_patched += patched

    log_fn(f"  共计: {total_patched} 个手动补丁已应用")
    return total_patched


# ============================================================
# Automatic AI Translation
# ============================================================

TAG_TEXT_RE = re.compile(r'>([^<]+)<')


def _load_json(path, default):
    if not os.path.exists(path):
        return default
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def _save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')


def _has_chinese(text):
    return any('\u4e00' <= ch <= '\u9fff' for ch in str(text))


RUNTIME_DIAGNOSTICS_MARKER = "PAA-ZH runtime diagnostics"

RUNTIME_DIAGNOSTICS_SNIPPET = r"""
        // PAA-ZH runtime diagnostics
        try {
            const paaZhGameLogFile = join(path.resolve(__dirname, '..', '..', '..'), 'paa-zh-runtime.log');
            const paaZhUserLogFile = join(this.userDataDir, 'paa-zh-runtime.log');
            const paaZhAppend = (kind, message) => {
                const entry = `[${new Date().toISOString()}] ${kind}: ${message}\n`;
                try {
                    fs.appendFileSync(paaZhGameLogFile, entry, 'utf8');
                } catch (primaryError) {
                    try {
                        fs.appendFileSync(paaZhUserLogFile, entry, 'utf8');
                    } catch (secondaryError) {
                        if (this.l && this.l.warn) {
                            this.l.warn(`PAA-ZH diagnostics log failed: ${secondaryError.toString()}`);
                        }
                    }
                }
            };
            this.webContents.on('console-message', (_event, level, message, line, sourceId) => {
                const text = String(message || '');
                if (
                    level >= 2
                    || text.indexOf('[PAA-ZH-RUNTIME]') >= 0
                    || /(?:TypeError|ReferenceError|RangeError|SyntaxError|Unhandled|Exception|Meteor code must always run within a Fiber)/i.test(text)
                ) {
                    paaZhAppend('renderer-console', `${text} (${sourceId || 'unknown'}:${line || 0})`);
                }
            });
            this.webContents.on('did-fail-load', (_event, errorCode, errorDescription, validatedURL) => {
                paaZhAppend('did-fail-load', `${errorCode} ${errorDescription} ${validatedURL}`);
            });
            this.webContents.on('render-process-gone', (_event, details) => {
                paaZhAppend('render-process-gone', JSON.stringify(details));
            });
            this.webContents.on('crashed', () => {
                paaZhAppend('renderer-crashed', 'webContents crashed');
            });
            this.webContents.on('did-finish-load', () => {
                this.webContents.executeJavaScript(`
                    (() => {
                        if (window.__PAA_ZH_DIAGNOSTICS_INSTALLED__) return;
                        window.__PAA_ZH_DIAGNOSTICS_INSTALLED__ = true;
                        const stringify = (value) => {
                            try {
                                if (value instanceof Error) return value.stack || value.message || String(value);
                                if (typeof value === 'string') return value;
                                return JSON.stringify(value);
                            } catch (e) {
                                return String(value);
                            }
                        };
                        window.addEventListener('error', (event) => {
                            console.error('[PAA-ZH-RUNTIME]', stringify({
                                type: 'error',
                                message: event.message,
                                source: event.filename,
                                line: event.lineno,
                                column: event.colno,
                                stack: event.error && (event.error.stack || event.error.message)
                            }));
                        });
                        window.addEventListener('unhandledrejection', (event) => {
                            console.error('[PAA-ZH-RUNTIME]', stringify({
                                type: 'unhandledrejection',
                                reason: stringify(event.reason)
                            }));
                        });
                    })();
                `, true).catch((e) => {
                    paaZhAppend('diagnostics-inject', e && e.message ? e.message : String(e));
                });
            });
        } catch (e) {
            if (this.l && this.l.warn) {
                this.l.warn(`PAA-ZH diagnostics setup failed: ${e.toString()}`);
            }
        }
"""


def _chunk_entries(data, max_chars=9000):
    entries = []
    for section in ('cache', 'hardcoded'):
        for key, value in data.get(section, {}).items():
            entries.append((section, key, value))

    chunks = []
    current = {'cache': {}, 'hardcoded': {}}
    current_size = 0
    for section, key, value in entries:
        item_size = len(key) + len(str(value)) + 16
        if current_size and current_size + item_size > max_chars:
            chunks.append(current)
            current = {'cache': {}, 'hardcoded': {}}
            current_size = 0
        current[section][key] = value
        current_size += item_size
    if current_size:
        chunks.append(current)
    return chunks


def _extract_json_object(text):
    text = text.strip()
    fence = re.search(r'```(?:json)?\s*(.*?)\s*```', text, re.S | re.I)
    if fence:
        text = fence.group(1).strip()
    start = text.find('{')
    end = text.rfind('}')
    if start < 0 or end < start:
        raise ValueError('AI 返回内容中没有找到 JSON 对象')
    return json.loads(text[start:end + 1])


def _chat_completion(api_key, base_url, model, messages, use_response_format=True):
    payload = {
        'model': model,
        'messages': messages,
        'temperature': 0.1,
    }
    if use_response_format:
        payload['response_format'] = {'type': 'json_object'}

    request = urllib.request.Request(
        base_url.rstrip('/') + '/chat/completions',
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        body = json.loads(response.read().decode('utf-8'))
    return body['choices'][0]['message']['content']


def _translate_chunk(chunk, index, total, api_key, base_url, model):
    system_prompt = (
        '你是一位游戏汉化专家，负责 Pixel Art Academy Learn Mode 的简体中文本地化。'
        '只翻译玩家可见的英文文本。人名、游戏名、曲名、素材名、代码标识符、URL、文件路径保持原文。'
        '如果某条不是玩家可见文本或应保留英文，把 value 设为 null。'
        '保留 key、换行、占位符、%%name%%、{name}、HTML 实体和专有名词。'
        '只输出 JSON 对象，不要解释。'
    )
    user_prompt = (
        f'这是第 {index}/{total} 批待处理文本。'
        '请返回完全相同结构的 JSON：{"cache": {...}, "hardcoded": {...}}。'
        '每个 key 必须原样保留；value 是简体中文翻译，或 null。\n\n'
        + json.dumps(chunk, ensure_ascii=False, indent=2)
    )
    messages = [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': user_prompt},
    ]
    try:
        content = _chat_completion(api_key, base_url, model, messages, True)
    except urllib.error.HTTPError as e:
        if e.code != 400:
            raise
        content = _chat_completion(api_key, base_url, model, messages, False)
    parsed = _extract_json_object(content)
    return {
        'cache': parsed.get('cache', {}),
        'hardcoded': parsed.get('hardcoded', {}),
    }


# ============================================================
# Font Patching
# ============================================================

FONT_MAP = {
    "Adventure Retronator":   "fp8.ttf",
    "Freehand Retronator":    "fp8.ttf",
    "Checkout Retronator":    "fp8.ttf",
    "Small Print Retronator": "fp8.ttf",
    "Daily Retronator":       "fp10.ttf",
    "Typecast Retronator":    "fp12.ttf",
    "Study Plan Retronator":  "fp8.ttf",
}


def patch_fonts(css_path, font_src_dir, font_dest_dir, log_fn=print):
    for ttf in ("fp8.ttf", "fp10.ttf", "fp12.ttf"):
        src = os.path.join(font_src_dir, ttf)
        dst = os.path.join(font_dest_dir, ttf)
        if os.path.exists(src):
            shutil.copy2(src, dst)
        else:
            log_fn(f"  警告: 字体文件 {ttf} 未找到")
            return 0
    log_fn("  字体文件已复制")

    with open(css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()

    patched = 0
    for font_name, ttf_file in FONT_MAP.items():
        escaped_name = re.escape(font_name)
        pattern = (
            r"(font-family:\s*['\"]" + escaped_name + r"['\"][^;]*;\s*\r?\n\s*)"
            r"src:\s*url\(data:[^)]+\)\s*format\(['\"]woff['\"]\);"
        )
        replacement = r"\g<1>src: url('" + ttf_file + "') format('truetype');"
        new_css, count = re.subn(pattern, replacement, css_content)
        if count > 0:
            css_content = new_css
            patched += count

    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css_content)
    log_fn(f"  已替换 {patched} 个字体声明")
    return patched


# ============================================================
# Installer Core
# ============================================================

class PatchInstaller:
    def __init__(self, game_dir, log_fn=print):
        self.game_dir = game_dir
        self.log = log_fn

        self.app_dir = os.path.join(game_dir, "resources", "app")
        self.app_extracted = os.path.join(self.app_dir, "app_extracted")
        self.meteor_extracted = os.path.join(self.app_dir, "meteor_extracted")
        self.app_js = os.path.join(self.app_extracted, "app.js")
        self.package_json = os.path.join(self.app_dir, "package.json")
        self.cache_json = os.path.join(
            self.meteor_extracted, "app", "artificial", "babel", "cache.json"
        )
        self.css_file = os.path.join(self.meteor_extracted, "merged-stylesheets.css")
        self.packages_dir = os.path.join(self.meteor_extracted, "packages")

        exe_dir = app_dir_path()
        self.backup_dir = os.path.join(exe_dir, "backup")

        self.trans_file = data_path("translations_zh.json")
        self.hardcoded_file = data_path("hardcoded_zh.json")
        self.skipped_file = data_path("hardcoded_skipped.json")
        self.manual_patches_file = data_path("manual_patches.json")
        self.fonts_dir = resource_path("fonts")

        self.writable_trans_file = writable_data_path("translations_zh.json")
        self.writable_hardcoded_file = writable_data_path("hardcoded_zh.json")
        self.writable_skipped_file = writable_data_path("hardcoded_skipped.json")

    def _install_runtime_diagnostics(self):
        if not os.path.exists(self.app_js):
            self.log("[警告] app.js 不存在，无法安装运行时错误日志")
            return False

        with open(self.app_js, 'r', encoding='utf-8') as f:
            content = f.read()

        if RUNTIME_DIAGNOSTICS_MARKER in content:
            self.log("[OK] 运行时错误日志已启用 (跳过)")
            return True

        anchor = "        this.webContents = this.window.webContents;\n"
        if anchor not in content:
            self.log("[警告] 未找到窗口初始化位置，无法安装运行时错误日志")
            return False

        content = content.replace(anchor, anchor + RUNTIME_DIAGNOSTICS_SNIPPET + "\n", 1)
        with open(self.app_js, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        self.log("[OK] 已启用运行时错误日志 paa-zh-runtime.log")
        return True

    def _runtime_log_paths(self):
        paths = [os.path.join(self.game_dir, "paa-zh-runtime.log")]
        appdata = os.environ.get("APPDATA")
        if appdata:
            user_dir = os.path.join(appdata, "Pixel Art Academy Learn Mode")
            paths.append(os.path.join(user_dir, "paa-zh-runtime.log"))
        unique = []
        for path in paths:
            if path not in unique:
                unique.append(path)
        return unique

    def _read_text(self, path):
        with open(path, 'r', encoding='utf-8', errors='replace') as f:
            return f.read()

    def _tail_text(self, path, max_lines=80):
        try:
            with open(path, 'r', encoding='utf-8', errors='replace') as f:
                lines = f.read().splitlines()
        except OSError:
            return ""
        return "\n".join(lines[-max_lines:])

    def self_check(self, show_header=True, log_details=True):
        checks = []
        details = []

        def record(level, message):
            checks.append((level, message))
            if log_details or level != "OK":
                prefix = "[OK]" if level == "OK" else "[警告]" if level == "WARN" else "[错误]"
                self.log(f"{prefix} {message}")

        def ok(message):
            record("OK", message)

        def warn(message):
            record("WARN", message)

        def fail(message):
            record("FAIL", message)

        def read_package(filename):
            path = os.path.join(self.packages_dir, filename)
            if not os.path.exists(path):
                fail(f"缺少 JS 模块: {filename}")
                return ""
            try:
                return self._read_text(path)
            except OSError as error:
                fail(f"读取 JS 模块失败: {filename} ({error})")
                return ""

        if show_header:
            self.log("=" * 45)
            self.log("  汉化补丁自检 / 诊断报告")
            self.log("=" * 45)
            self.log("")

        ok(f"游戏目录: {self.game_dir}")

        if not os.path.exists(self.package_json):
            fail("缺少 resources/app/package.json")
        else:
            try:
                package_data = _load_json(self.package_json, {})
                main_entry = package_data.get("main")
                if main_entry == "app_extracted/index.js":
                    ok("package.json 已指向解包后的汉化入口")
                elif main_entry == "app.asar":
                    fail("package.json 仍指向原版 app.asar，汉化尚未安装或已被 Steam 还原")
                else:
                    warn(f"package.json main 字段不是预期值: {main_entry}")
            except Exception as error:
                fail(f"package.json 解析失败: {error}")

        if not os.path.exists(self.app_js):
            fail("缺少 app_extracted/app.js")
        else:
            try:
                app_content = self._read_text(self.app_js)
                if "meteor_extracted" in app_content:
                    ok("app.js 已指向 meteor_extracted")
                else:
                    fail("app.js 仍在加载 meteor.asar，汉化资源可能没有生效")
                if RUNTIME_DIAGNOSTICS_MARKER in app_content:
                    ok("运行时错误日志钩子已安装")
                else:
                    warn("运行时错误日志钩子未安装，请重新安装汉化补丁")
            except OSError as error:
                fail(f"读取 app.js 失败: {error}")

        if not os.path.exists(self.cache_json):
            fail("缺少翻译缓存 cache.json")
        else:
            try:
                translations = _load_json(self.trans_file, {})
                cache = _load_json(self.cache_json, {})
                matched = 0
                missing = []
                for full_key in translations:
                    if "|||" not in full_key:
                        continue
                    namespace, key = full_key.split("|||", 1)
                    entry = cache.get(namespace, {}).get(key)
                    if not isinstance(entry, list) or len(entry) < 2:
                        continue
                    matched += 1
                    trans_obj = entry[1]
                    zh_text = None
                    if isinstance(trans_obj, dict):
                        zh_text = trans_obj.get("zh", {}).get("cn", {}).get("text")
                    if not zh_text:
                        missing.append(full_key)
                if matched == 0:
                    fail("cache.json 中没有匹配到补丁翻译键")
                elif missing:
                    fail(f"cache.json 有 {len(missing)} 条翻译未注入")
                    details.append("未注入示例:\n" + "\n".join(missing[:20]))
                else:
                    ok(f"cache.json 翻译注入完整 ({matched} 条)")
            except Exception as error:
                fail(f"cache.json 或 translations_zh.json 检查失败: {error}")

        if not os.path.isdir(self.packages_dir):
            fail("缺少 meteor_extracted/packages 目录")
        else:
            js_files = [name for name in os.listdir(self.packages_dir) if name.endswith(".js")]
            if js_files:
                ok(f"JS 模块目录存在 ({len(js_files)} 个文件)")
            else:
                fail("meteor_extracted/packages 目录里没有 JS 模块")

            studyplan = read_package("retronator_pixelartacademy-pixelpad-studyplan.js")
            if studyplan:
                marker = "StudyPlan.Interests = function ()"
                if marker not in studyplan:
                    fail("未找到 StudyPlan.Interests 模块，兴趣面板可能缺失")
                else:
                    before_interests, after_marker = studyplan.split(marker, 1)
                    interests_section = after_marker.split(
                        "/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////",
                        1
                    )[0]
                    if "\n    localizedInterestName(interest) {" in interests_section:
                        ok("已获得兴趣面板包含本地化显示名函数")
                    else:
                        fail("已获得兴趣面板缺少 localizedInterestName，可能显示 0 个兴趣")
                    if "this.localizedInterestName(interest)" in interests_section:
                        ok("已获得兴趣排序使用本地化显示名")
                    else:
                        fail("已获得兴趣排序未使用本地化显示名")
                    if "localizedInterestName(interest)" in before_interests:
                        fail("localizedInterestName 被插入到了错误的早期模块")
                    else:
                        ok("localizedInterestName 没有插入到错误模块")

            menu = read_package("retronator_landsofillusions-ui.js")
            if menu:
                if '<button class="menu-button">菜单</button>' in menu:
                    ok("右上角 MENU 已汉化为 菜单")
                else:
                    warn("右上角 MENU 未汉化，可能仍显示英文")

            pixeltosh = read_package("retronator_pixelartacademy-pixeltosh.js")
            if pixeltosh:
                if "caption: '文件'" in pixeltosh:
                    ok("Pixeltosh File 菜单已汉化")
                else:
                    warn("Pixeltosh File 菜单未汉化")
                if 'return "关闭";' in pixeltosh and 'return "退出";' in pixeltosh:
                    ok("Pixeltosh Close/Quit 已汉化")
                else:
                    warn("Pixeltosh Close/Quit 未完全汉化")

            invasion = read_package("retronator_pixelartacademy-pico8-invasion.js")
            if invasion:
                required_zh = [
                    "防御者会",
                    "起始位置在",
                    "入侵者生成在",
                    "— 速度：",
                    "防御者（16×16 像素）",
                ]
                leftover_en = [
                    "A defender moves",
                    "They appear",
                    "Every once in a while, a random invader shoots a projectile",
                    " pixels per move",
                    "Defender (16×16 pixels)",
                ]
                if all(text in invasion for text in required_zh):
                    ok("Invasion 文档关键文本已汉化")
                else:
                    warn("Invasion 文档仍有关键中文文本缺失")
                if any(text in invasion for text in leftover_en):
                    warn("Invasion 文档仍残留关键英文说明")
                else:
                    ok("Invasion 文档关键英文残留已清除")

            suspicious_interest_ids = []
            internal_pattern = re.compile(
                r"static\s+(requiredInterests|interests)\s*\(\)\s*\{[^{}]*?return\s*\[([^\]]*)\]",
                re.S
            )
            for filename in js_files:
                path = os.path.join(self.packages_dir, filename)
                try:
                    content = self._read_text(path)
                except OSError:
                    continue
                for match in internal_pattern.finditer(content):
                    if _has_chinese(match.group(2)):
                        suspicious_interest_ids.append(f"{filename}:{match.group(1)}")
                        if len(suspicious_interest_ids) >= 20:
                            break
                if len(suspicious_interest_ids) >= 20:
                    break
            if suspicious_interest_ids:
                warn("发现疑似被翻译的内部兴趣 ID，可能导致目标/课程缺失")
                details.append("疑似内部 ID 位置:\n" + "\n".join(suspicious_interest_ids))
            else:
                ok("未发现被翻译的内部兴趣 ID")

        runtime_logs = [path for path in self._runtime_log_paths() if os.path.exists(path) and os.path.getsize(path) > 0]
        if runtime_logs:
            warn(f"检测到运行时错误日志: {runtime_logs[0]}")
            details.append("最近的运行时错误日志:\n" + self._tail_text(runtime_logs[0]))
        else:
            ok("未发现汉化运行时错误日志")

        failures = [message for level, message in checks if level == "FAIL"]
        warnings = [message for level, message in checks if level == "WARN"]
        report_path = os.path.join(self.game_dir, "汉化自检报告.txt")
        report_lines = [
            "Pixel Art Academy Learn Mode 简体中文汉化补丁自检报告",
            f"生成时间: {time.strftime('%Y-%m-%d %H:%M:%S')}",
            f"游戏目录: {self.game_dir}",
            "",
            f"错误: {len(failures)}",
            f"警告: {len(warnings)}",
            "",
        ]
        report_lines.extend(f"[{level}] {message}" for level, message in checks)
        if details:
            report_lines.append("")
            report_lines.extend(details)
        try:
            with open(report_path, 'w', encoding='utf-8', newline='') as f:
                f.write("\n".join(report_lines) + "\n")
        except OSError:
            report_path = writable_data_path("汉化自检报告.txt")
            with open(report_path, 'w', encoding='utf-8', newline='') as f:
                f.write("\n".join(report_lines) + "\n")

        self.log("")
        if failures:
            self.log(f"[错误] 自检发现 {len(failures)} 个错误，报告已生成: {report_path}")
        elif warnings:
            self.log(f"[警告] 自检通过但有 {len(warnings)} 个警告，报告已生成: {report_path}")
        else:
            self.log(f"[OK] 自检通过，报告已生成: {report_path}")
        return not failures

    # ---- INSTALL ----

    def install(self):
        self.log("=" * 45)
        self.log("  Pixel Art Academy Learn Mode")
        self.log("  简体中文汉化补丁 — 安装")
        self.log("=" * 45)
        self.log("")

        app_asar = os.path.join(self.app_dir, "app.asar")
        meteor_asar = os.path.join(self.app_dir, "meteor.asar")

        if not os.path.exists(app_asar) and not os.path.exists(self.app_js):
            self.log("[错误] 未找到游戏文件。请将本程序放到游戏根目录下。")
            return False

        if not os.path.exists(self.trans_file):
            self.log("[错误] 未找到翻译文件 translations_zh.json")
            return False

        # Steam verification/reinstall restores package.json to app.asar, but
        # it does not remove our old extracted folders. Reusing those stale
        # folders can reapply broken or outdated patched JS files.
        with open(self.package_json, 'r', encoding='utf-8') as f:
            pkg_content = f.read()
        if re.search(r'"main"\s*:\s*"app\.asar"', pkg_content):
            stale_paths = [
                (self.app_extracted, "旧 app_extracted"),
                (self.meteor_extracted, "旧 meteor_extracted"),
                (self.backup_dir, "旧备份"),
            ]
            removed = 0
            for path, label in stale_paths:
                if os.path.exists(path):
                    self.log(f"[*] 检测到原版入口，清理{label} ...")
                    shutil.rmtree(path)
                    removed += 1
            if removed:
                self.log("[OK] 已清理旧解包/备份，将从当前游戏文件重新安装")

        # Step 0: Extract asar
        if not os.path.exists(self.app_js):
            self.log("[*] 步骤 0: 解包 app.asar (首次安装) ...")
            files, errors = extract_asar(app_asar, self.app_extracted, self.log)
            if not os.path.exists(self.app_js):
                self.log("[错误] 解包 app.asar 失败")
                return False
            self.log(f"[OK] app.asar 已解包 ({files} 个文件)")

        if not os.path.exists(self.cache_json):
            self.log("[*] 步骤 0: 解包 meteor.asar (可能需要一分钟) ...")
            files, errors = extract_asar(meteor_asar, self.meteor_extracted, self.log)
            if not os.path.exists(self.cache_json):
                self.log("[错误] 解包 meteor.asar 失败")
                return False
            self.log(f"[OK] meteor.asar 已解包 ({files} 个文件)")

        os.makedirs(self.backup_dir, exist_ok=True)

        # Step 1: Redirect Electron to load from extracted directories
        self.log("[*] 步骤 1/5: 重定向游戏加载路径 ...")

        pkg_backup = os.path.join(self.backup_dir, "package.json.bak")
        if not os.path.exists(pkg_backup):
            shutil.copy2(self.package_json, pkg_backup)
            self.log("[OK] package.json 已备份")

        with open(self.package_json, 'r', encoding='utf-8') as f:
            pkg_content = f.read()

        if re.search(r'"main"\s*:\s*"app\.asar"', pkg_content):
            pkg_content = re.sub(
                r'"main"\s*:\s*"app\.asar"',
                '"main": "app_extracted/index.js"',
                pkg_content
            )
            with open(self.package_json, 'w', encoding='utf-8', newline='') as f:
                f.write(pkg_content)
            self.log('[OK] package.json: main -> app_extracted/index.js')
        else:
            self.log("[OK] package.json 已是补丁状态 (跳过)")

        app_js_backup = os.path.join(self.backup_dir, "app.js.bak")
        if not os.path.exists(app_js_backup):
            shutil.copy2(self.app_js, app_js_backup)
            self.log("[OK] app.js 已备份")

        with open(self.app_js, 'r', encoding='utf-8') as f:
            app_content = f.read()

        if "meteor.asar" in app_content:
            app_content = app_content.replace("meteor.asar", "meteor_extracted")
            with open(self.app_js, 'w', encoding='utf-8', newline='') as f:
                f.write(app_content)
            self.log("[OK] app.js: meteor.asar -> meteor_extracted")
        else:
            self.log("[OK] app.js 已是补丁状态 (跳过)")

        # Step 2: Add runtime diagnostics so players can report real game errors.
        self.log("[*] 步骤 2/5: 启用运行时错误日志 ...")
        self._install_runtime_diagnostics()

        # Step 3: Inject translations into cache.json
        self.log("[*] 步骤 3/5: 注入中文翻译到 cache.json ...")

        cache_backup = os.path.join(self.backup_dir, "cache.json.bak")
        if not os.path.exists(cache_backup):
            shutil.copy2(self.cache_json, cache_backup)
            self.log("[OK] cache.json 已备份")

        injected = inject_translations(self.cache_json, self.trans_file, self.log)
        self.log(f"[OK] 翻译注入完成 ({injected} 条)")

        # Step 4: Patch hardcoded strings and manual JS patches
        has_hardcoded = os.path.exists(self.hardcoded_file)
        has_manual = os.path.exists(self.manual_patches_file)
        if has_hardcoded or has_manual:
            self.log("[*] 步骤 4/5: 替换 JS 中的硬编码和手动补丁文本 ...")

            hardcoded_trans = {}
            manual_patches = []
            if has_hardcoded:
                with open(self.hardcoded_file, 'r', encoding='utf-8') as f:
                    hardcoded_trans = json.load(f)
            if has_manual:
                with open(self.manual_patches_file, 'r', encoding='utf-8') as f:
                    manual_patches = json.load(f)

            js_backup_dir = os.path.join(self.backup_dir, "packages_bak")
            if os.path.exists(js_backup_dir):
                for fn in os.listdir(js_backup_dir):
                    if fn.endswith('.js'):
                        shutil.copy2(
                            os.path.join(js_backup_dir, fn),
                            os.path.join(self.packages_dir, fn)
                        )
                self.log("[OK] JS 文件已从备份还原 (避免重复替换)")
            else:
                os.makedirs(js_backup_dir, exist_ok=True)
                target_files = set(
                    k.split('|||')[0] for k in hardcoded_trans if '|||' in k
                )
                target_files.update(
                    patch.get('file') for patch in manual_patches if patch.get('file')
                )
                for pkg in target_files:
                    src = os.path.join(self.packages_dir, pkg)
                    if os.path.exists(src) and pkg:
                        shutil.copy2(src, os.path.join(js_backup_dir, pkg))
                self.log("[OK] 原始 JS 文件已备份")

            if has_hardcoded:
                patch_hardcoded(self.packages_dir, hardcoded_trans, self.log)
                self.log("[OK] 硬编码字符串替换完成")
            if has_manual:
                patch_manual(self.packages_dir, manual_patches, self.log)
                self.log("[OK] 手动补丁应用完成")
        else:
            self.log("[*] 步骤 4/5: 未找到 JS 补丁文件，跳过")

        # Step 5: Patch fonts in CSS
        self.log("[*] 步骤 5/5: 替换字体以支持中文显示 ...")

        css_backup = os.path.join(self.backup_dir, "merged-stylesheets.css.bak")
        if not os.path.exists(css_backup):
            shutil.copy2(self.css_file, css_backup)
            self.log("[OK] CSS 已备份")

        font8 = os.path.join(self.fonts_dir, "fp8.ttf")
        if os.path.exists(font8):
            patch_fonts(self.css_file, self.fonts_dir, self.meteor_extracted, self.log)
            self.log("[OK] 字体替换完成")
        else:
            self.log("[警告] 字体文件未找到，跳过字体替换")

        self.log("")
        self.log("[*] 安装后自检 ...")
        self.self_check(show_header=False, log_details=False)

        self.log("")
        self.log("=" * 45)
        self.log("  安装完成！请从 Steam 启动游戏。")
        self.log("=" * 45)
        return True

    # ---- UNINSTALL ----

    def uninstall(self):
        self.log("=" * 45)
        self.log("  卸载汉化补丁 — 恢复英文原版")
        self.log("=" * 45)
        self.log("")

        if not os.path.exists(self.backup_dir):
            self.log("[错误] 未找到备份文件夹，可能尚未安装汉化。")
            return False

        restored = 0
        restores = [
            ("package.json.bak", self.package_json, "package.json"),
            ("app.js.bak", self.app_js, "app.js"),
            ("cache.json.bak", self.cache_json, "cache.json"),
            ("merged-stylesheets.css.bak", self.css_file, "merged-stylesheets.css"),
        ]

        for backup_name, target, display_name in restores:
            backup_path = os.path.join(self.backup_dir, backup_name)
            if os.path.exists(backup_path):
                shutil.copy2(backup_path, target)
                self.log(f"[OK] {display_name} 已恢复")
                restored += 1

        js_backup_dir = os.path.join(self.backup_dir, "packages_bak")
        if os.path.exists(js_backup_dir):
            for fn in os.listdir(js_backup_dir):
                if fn.endswith('.js'):
                    shutil.copy2(
                        os.path.join(js_backup_dir, fn),
                        os.path.join(self.packages_dir, fn)
                    )
            self.log("[OK] JS 文件已恢复")
            restored += 1

        for f_name in ("fp8.ttf", "fp10.ttf", "fp12.ttf"):
            fp = os.path.join(self.meteor_extracted, f_name)
            if os.path.exists(fp):
                os.remove(fp)
        self.log("[OK] 字体文件已移除")

        self.log("")
        self.log("=" * 45)
        self.log(f"  卸载完成！({restored} 个文件已恢复)")
        self.log("=" * 45)
        return True

    # ---- REINSTALL AFTER GAME UPDATE ----

    def reinstall_after_update(self):
        self.log("=" * 45)
        self.log("  游戏更新后 — 重新应用汉化补丁")
        self.log("=" * 45)
        self.log("")
        self.log("当 Steam 更新游戏后，汉化可能失效。")
        self.log("正在重新解包并应用汉化补丁...")
        self.log("")

        if os.path.exists(self.backup_dir):
            self.log("清除旧备份文件...")
            for f_name in ("package.json.bak", "cache.json.bak",
                           "app.js.bak", "merged-stylesheets.css.bak"):
                fp = os.path.join(self.backup_dir, f_name)
                if os.path.exists(fp):
                    os.remove(fp)
            js_bak = os.path.join(self.backup_dir, "packages_bak")
            if os.path.exists(js_bak):
                shutil.rmtree(js_bak)
            self.log("")

        if os.path.exists(self.app_extracted):
            self.log("删除旧的解包目录...")
            shutil.rmtree(self.app_extracted, ignore_errors=True)
            if os.path.exists(self.meteor_extracted):
                shutil.rmtree(self.meteor_extracted, ignore_errors=True)
            self.log("")

        self.log("重新安装汉化补丁...")
        self.log("")
        return self.install()

    # ---- AUTO TRANSLATE ----

    def _extract_cache_missing(self):
        existing_keys = set(_load_json(self.trans_file, {}).keys())
        cache = _load_json(self.cache_json, {})

        missing = {}
        skipped = {'no_en': 0, 'already_translated': 0, 'bitmapInfo': 0, 'parser': 0, 'placeholder': 0}

        for ns, keys in cache.items():
            if not isinstance(keys, dict):
                continue
            for key, entry in keys.items():
                if not isinstance(entry, list) or len(entry) < 2:
                    continue
                full_key = f"{ns}|||{key}"
                trans_obj = entry[1]
                if full_key in existing_keys:
                    skipped['already_translated'] += 1
                    continue
                if 'zh' in trans_obj and 'cn' in trans_obj['zh']:
                    skipped['already_translated'] += 1
                    continue

                en_text = None
                if 'en' in trans_obj:
                    en_data = trans_obj['en']
                    if isinstance(en_data, dict):
                        if isinstance(en_data.get('best'), dict):
                            en_text = en_data['best'].get('text')
                        elif isinstance(en_data.get('us'), dict):
                            en_text = en_data['us'].get('text')
                if not en_text:
                    skipped['no_en'] += 1
                    continue
                if key == 'bitmapInfo':
                    skipped['bitmapInfo'] += 1
                    continue
                if 'Parser' in ns:
                    skipped['parser'] += 1
                    continue
                # Skip auto-inserted placeholder entries where the cached English
                # text is just the literal property name (e.g. key='description',
                # en='description'). These come from the game's t10e auto-insert
                # behavior and translating them leaks the property name into the UI.
                if key == en_text and key in PLACEHOLDER_TRANSLATION_KEYS:
                    skipped['placeholder'] += 1
                    continue
                missing[full_key] = en_text

        self.log(f"  cache 新增待翻译: {len(missing)} 条")
        self.log(f"  cache 跳过: {skipped}")
        return missing

    def _extract_hardcoded_missing(self):
        existing_keys = set(_load_json(self.hardcoded_file, {}).keys())
        skipped_keys = set(_load_json(self.skipped_file, {}).keys())
        missing = {}
        counts = {}

        if not os.path.isdir(self.packages_dir):
            return missing

        for filename in HARDCODED_TARGET_PACKAGES:
            filepath = os.path.join(self.packages_dir, filename)
            if not os.path.exists(filepath):
                continue
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            found = {}
            for match in PAT_STATIC.finditer(content):
                raw_text = match.group(2)
                cleaned = raw_text.replace('\\n', '\n').strip()
                if _has_chinese(cleaned):
                    continue
                if len(cleaned) >= 3 and re.search(r'[a-zA-Z]{2}', cleaned):
                    found[raw_text] = cleaned

            for match in PAT_TEMPLATE.finditer(content):
                raw_text = match.group(1).strip()
                cleaned = raw_text.replace('\\n', '\n').strip()
                if _has_chinese(cleaned):
                    continue
                if len(cleaned) >= 5 and re.search(r'[a-zA-Z]{3}', cleaned):
                    found[raw_text] = cleaned

            for match in PAT_HTML_RAW.finditer(content):
                html_content = match.group(1)
                for text_match in TAG_TEXT_RE.finditer(html_content):
                    raw_in_file = text_match.group(1)
                    cleaned = raw_in_file.replace('\\n', ' ').replace("\\'", "'").strip()
                    if _has_chinese(cleaned):
                        continue
                    if len(cleaned) < 2:
                        continue
                    if not re.search(r'[a-zA-Z]{2}', cleaned):
                        continue
                    if re.search(r'[{};=]', cleaned):
                        continue
                    found[cleaned] = cleaned

            for raw, cleaned in found.items():
                key = f"{filename}|||{raw}"
                if key in existing_keys or key in skipped_keys:
                    continue
                missing[key] = cleaned
                counts[filename] = counts.get(filename, 0) + 1

        for filename, count in counts.items():
            self.log(f"  {filename}: {count} 条")
        self.log(f"  硬编码新增待翻译: {len(missing)} 条")
        return missing

    def _merge_ai_translations(self, original, translated):
        translations = _load_json(self.trans_file, {})
        hardcoded = _load_json(self.hardcoded_file, {})
        skipped = _load_json(self.skipped_file, {})

        added_cache = 0
        added_hardcoded = 0
        added_skipped = 0

        for key, value in translated.get('cache', {}).items():
            if key not in original.get('cache', {}):
                continue
            if isinstance(value, str) and value.strip() and _has_chinese(value):
                translations[key] = value
                added_cache += 1

        for key, value in translated.get('hardcoded', {}).items():
            if key not in original.get('hardcoded', {}):
                continue
            if isinstance(value, str) and value.strip() and _has_chinese(value):
                hardcoded[key] = value
                added_hardcoded += 1
            else:
                skipped[key] = original['hardcoded'][key]
                added_skipped += 1

        _save_json(self.writable_trans_file, translations)
        _save_json(self.writable_hardcoded_file, hardcoded)
        _save_json(self.writable_skipped_file, skipped)

        self.trans_file = self.writable_trans_file
        self.hardcoded_file = self.writable_hardcoded_file
        self.skipped_file = self.writable_skipped_file

        self.log(f"  translations_zh.json 新增/更新: {added_cache} 条")
        self.log(f"  hardcoded_zh.json 新增/更新: {added_hardcoded} 条")
        self.log(f"  hardcoded_skipped.json 新增/更新: {added_skipped} 条")

    def auto_translate_and_install(self, api_key, base_url, model):
        self.log("=" * 45)
        self.log("  自动补翻译并安装")
        self.log("=" * 45)
        self.log("")
        self.log("[*] 先重新应用现有汉化，确保基于当前游戏版本提取新增文本...")
        if not self.reinstall_after_update():
            return False

        self.log("")
        self.log("[*] 提取新增英文文本...")
        missing = {
            'cache': self._extract_cache_missing(),
            'hardcoded': self._extract_hardcoded_missing(),
        }
        total = len(missing['cache']) + len(missing['hardcoded'])
        self.log(f"  合计待处理: {total} 条")
        if total == 0:
            self.log("[OK] 没有需要补充翻译的新增文本。")
            return True

        chunks = _chunk_entries(missing)
        translated_all = {'cache': {}, 'hardcoded': {}}
        self.log("")
        self.log(f"[*] 调用 AI 翻译，共 {len(chunks)} 批...")
        for index, chunk in enumerate(chunks, 1):
            self.log(f"  翻译第 {index}/{len(chunks)} 批...")
            for attempt in range(1, 4):
                try:
                    translated = _translate_chunk(chunk, index, len(chunks), api_key, base_url, model)
                    translated_all['cache'].update(translated.get('cache', {}))
                    translated_all['hardcoded'].update(translated.get('hardcoded', {}))
                    break
                except Exception as e:
                    if attempt == 3:
                        self.log(f"[错误] 第 {index} 批翻译失败: {e}")
                        return False
                    self.log(f"    失败，准备重试 {attempt}/2: {e}")
                    time.sleep(2 * attempt)

        self.log("")
        self.log("[*] 合并 AI 翻译结果...")
        self._merge_ai_translations(missing, translated_all)

        self.log("")
        self.log("[*] 重新应用包含新增翻译的汉化补丁...")
        return self.install()


# ============================================================
# GUI Application
# ============================================================

class InstallerApp:
    BG_DARK = "#2b2b2b"
    BG_LOG = "#1e1e1e"
    FG_LIGHT = "#e0e0e0"
    FG_DIM = "#aaaaaa"
    WINDOW_WIDTH = 760
    WINDOW_HEIGHT_NORMAL = 570
    WINDOW_HEIGHT_MAINTAINER = 660

    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Pixel Art Academy Learn Mode - 简体中文汉化补丁")
        self._set_window_height(self.WINDOW_HEIGHT_NORMAL)
        self.root.resizable(False, False)
        self.root.configure(bg="#f0f0f0")

        self.game_dir = None
        self.running = False
        self._log_queue = queue.Queue()
        self.api_key_var = tk.StringVar()
        self.base_url_var = tk.StringVar(value="https://api.openai.com/v1")
        self.model_var = tk.StringVar(value="gpt-4o-mini")
        self.maintainer_tools_visible = False
        self.api_key_visible = False

        self._build_ui()
        self._detect_game()
        self._poll_log_queue()

    # ---- UI Construction ----

    def _set_window_height(self, height):
        # Temporarily allow resize: on Windows, geometry() cannot shrink a
        # window whose resizable flag is False — it only enlarges.
        self.root.resizable(True, True)
        self.root.geometry(f"{self.WINDOW_WIDTH}x{height}")
        self.root.update_idletasks()
        self.root.resizable(False, False)

    def _build_ui(self):
        # Title banner
        title_frame = tk.Frame(self.root, bg=self.BG_DARK, padx=20, pady=12)
        title_frame.pack(fill=tk.X)

        tk.Label(
            title_frame, text="Pixel Art Academy Learn Mode",
            font=("Segoe UI", 15, "bold"), fg=self.FG_LIGHT, bg=self.BG_DARK
        ).pack()
        tk.Label(
            title_frame, text="简体中文汉化补丁安装器",
            font=("Microsoft YaHei UI", 11), fg=self.FG_DIM, bg=self.BG_DARK
        ).pack()

        # Game directory row
        dir_frame = tk.Frame(self.root, padx=15, pady=8)
        dir_frame.pack(fill=tk.X)

        tk.Label(
            dir_frame, text="游戏目录:", font=("Microsoft YaHei UI", 9)
        ).pack(side=tk.LEFT)

        self.dir_var = tk.StringVar(value="正在检测...")
        tk.Label(
            dir_frame, textvariable=self.dir_var,
            font=("Consolas", 9), fg="#006699", anchor="w"
        ).pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(5, 5))

        self.browse_btn = tk.Button(
            dir_frame, text="浏览...", command=self._browse_game,
            font=("Microsoft YaHei UI", 9)
        )
        self.browse_btn.pack(side=tk.RIGHT)

        # Action buttons
        btn_frame = tk.Frame(self.root, padx=15, pady=5)
        btn_frame.pack(fill=tk.X)

        common = dict(font=("Microsoft YaHei UI", 11, "bold"), height=2, cursor="hand2")

        self.install_btn = tk.Button(
            btn_frame, text="  安装汉化  ", bg="#4CAF50", fg="white",
            activebackground="#45a049",
            command=lambda: self._run_task("install"), **common
        )
        self.install_btn.pack(side=tk.LEFT, padx=(0, 6), fill=tk.X, expand=True)

        self.check_btn = tk.Button(
            btn_frame, text="  自检报告  ", bg="#2196F3", fg="white",
            activebackground="#1976D2",
            command=lambda: self._run_task("self_check"), **common
        )
        self.check_btn.pack(side=tk.LEFT, padx=6, fill=tk.X, expand=True)

        self.uninstall_btn = tk.Button(
            btn_frame, text="  卸载汉化  ", bg="#f44336", fg="white",
            activebackground="#d32f2f",
            command=lambda: self._run_task("uninstall"), **common
        )
        self.uninstall_btn.pack(side=tk.LEFT, padx=6, fill=tk.X, expand=True)

        self.update_btn = tk.Button(
            btn_frame, text=" 更新后重新汉化 ", bg="#FF9800", fg="white",
            activebackground="#e68900",
            command=lambda: self._run_task("reinstall"), **common
        )
        self.update_btn.pack(side=tk.LEFT, padx=(6, 0), fill=tk.X, expand=True)

        maintainer_toggle_frame = tk.Frame(self.root, padx=15)
        maintainer_toggle_frame.pack(fill=tk.X, pady=(0, 5))

        self.maintainer_toggle_btn = tk.Button(
            maintainer_toggle_frame, text="显示维护者工具",
            font=("Microsoft YaHei UI", 9), command=self._toggle_maintainer_tools
        )
        self.maintainer_toggle_btn.pack(side=tk.RIGHT)

        self.maintainer_container = tk.Frame(self.root, bg="#f0f0f0")
        self.maintainer_container.pack(fill=tk.X)

        self.api_frame = tk.LabelFrame(
            self.maintainer_container, text="AI 自动补翻译（维护者工具）",
            padx=12, pady=8, font=("Microsoft YaHei UI", 9)
        )

        tk.Label(self.api_frame, text="API Key:", font=("Microsoft YaHei UI", 9)).grid(
            row=0, column=0, sticky="w"
        )
        self.api_key_entry = tk.Entry(
            self.api_frame, textvariable=self.api_key_var, show="*",
            font=("Consolas", 9)
        )
        self.api_key_entry.grid(row=0, column=1, sticky="ew", padx=(6, 6))

        self.api_key_toggle_btn = tk.Button(
            self.api_frame, text="显示", width=6,
            font=("Microsoft YaHei UI", 9), command=self._toggle_api_key_visibility
        )
        self.api_key_toggle_btn.grid(row=0, column=2, sticky="ew", padx=(0, 10))

        tk.Label(self.api_frame, text="模型:", font=("Microsoft YaHei UI", 9)).grid(
            row=0, column=3, sticky="w"
        )
        self.model_entry = tk.Entry(
            self.api_frame, textvariable=self.model_var, font=("Consolas", 9), width=18
        )
        self.model_entry.grid(row=0, column=4, sticky="ew", padx=(6, 0))

        tk.Label(self.api_frame, text="Base URL:", font=("Microsoft YaHei UI", 9)).grid(
            row=1, column=0, sticky="w", pady=(6, 0)
        )
        self.base_url_entry = tk.Entry(
            self.api_frame, textvariable=self.base_url_var, font=("Consolas", 9)
        )
        self.base_url_entry.grid(
            row=1, column=1, columnspan=4, sticky="ew",
            padx=(6, 0), pady=(6, 0)
        )
        self.api_frame.columnconfigure(1, weight=1)
        self.api_frame.columnconfigure(4, weight=0)

        self.auto_frame = tk.Frame(self.maintainer_container, padx=15)

        self.auto_translate_btn = tk.Button(
            self.auto_frame, text="  自动补翻译并安装  ", bg="#673AB7", fg="white",
            activebackground="#5E35B1",
            command=lambda: self._run_task("auto_translate"), **common
        )
        self.auto_translate_btn.pack(fill=tk.X)

        # Log output
        log_frame = tk.Frame(self.root, padx=15, pady=8)
        log_frame.pack(fill=tk.BOTH, expand=True)

        self.log_text = scrolledtext.ScrolledText(
            log_frame, font=("Consolas", 10), bg=self.BG_LOG, fg="#cccccc",
            insertbackground="white", wrap=tk.WORD, state=tk.DISABLED,
            relief=tk.FLAT, borderwidth=1
        )
        self.log_text.pack(fill=tk.BOTH, expand=True)

        self.log_text.tag_configure("ok", foreground="#4EC94E")
        self.log_text.tag_configure("error", foreground="#FF6B6B")
        self.log_text.tag_configure("warn", foreground="#cccccc")
        self.log_text.tag_configure("info", foreground="#5DADE2")
        self.log_text.tag_configure("title", foreground="#F4D03F")

        # Status bar
        self.status_var = tk.StringVar(value="就绪")
        tk.Label(
            self.root, textvariable=self.status_var,
            font=("Microsoft YaHei UI", 9), fg="#666666",
            anchor="w", padx=15, pady=3, bg="#f0f0f0"
        ).pack(fill=tk.X, side=tk.BOTTOM)

    # ---- Game Directory ----

    def _detect_game(self):
        self.game_dir = find_game_dir()
        if self.game_dir:
            self.dir_var.set(self.game_dir)
            self.status_var.set("已检测到游戏目录")
        else:
            self.dir_var.set("未检测到，请手动选择")
            self.status_var.set(
                '请将本程序放到游戏根目录下，或点击「浏览」选择游戏目录'
            )

    def _browse_game(self):
        path = filedialog.askdirectory(
            title="选择 Pixel Art Academy Learn Mode 游戏根目录"
        )
        if not path:
            return
        if os.path.isdir(os.path.join(path, "resources", "app")):
            self.game_dir = path
            self.dir_var.set(path)
            self.status_var.set("游戏目录已设置")
        else:
            messagebox.showerror(
                "错误",
                "所选目录不是有效的游戏根目录。\n"
                "请选择包含 resources 文件夹的目录。"
            )

    def _toggle_maintainer_tools(self):
        if self.maintainer_tools_visible:
            self.api_frame.pack_forget()
            self.auto_frame.pack_forget()
            self.maintainer_toggle_btn.configure(text="显示维护者工具")
            self.maintainer_tools_visible = False
            target_height = self.WINDOW_HEIGHT_NORMAL
        else:
            self.api_frame.pack(fill=tk.X, padx=15, pady=(0, 8))
            self.auto_frame.pack(fill=tk.X, pady=(0, 5))
            self.maintainer_toggle_btn.configure(text="隐藏维护者工具")
            self.maintainer_tools_visible = True
            target_height = self.WINDOW_HEIGHT_MAINTAINER
        # Flush layout changes (pack/pack_forget) before resizing the window,
        # so geometry() applies on top of the up-to-date child layout.
        self.root.update_idletasks()
        self._set_window_height(target_height)

    def _toggle_api_key_visibility(self):
        self.api_key_visible = not self.api_key_visible
        if self.api_key_visible:
            self.api_key_entry.configure(show="")
            self.api_key_toggle_btn.configure(text="隐藏")
        else:
            self.api_key_entry.configure(show="*")
            self.api_key_toggle_btn.configure(text="显示")

    # ---- Thread-safe Logging ----

    def _enqueue_log(self, message):
        self._log_queue.put(message)

    def _poll_log_queue(self):
        while True:
            try:
                msg = self._log_queue.get_nowait()
            except queue.Empty:
                break
            self._write_log(msg)
        self.root.after(50, self._poll_log_queue)

    def _write_log(self, message):
        self.log_text.configure(state=tk.NORMAL)
        tag = None
        if message.startswith("[OK]"):
            tag = "ok"
        elif message.startswith("[错误]"):
            tag = "error"
        elif message.startswith("[警告]"):
            tag = "warn"
        elif message.startswith("[*]"):
            tag = "info"
        elif message.startswith("="):
            tag = "title"

        if tag:
            self.log_text.insert(tk.END, message + "\n", tag)
        else:
            self.log_text.insert(tk.END, message + "\n")

        self.log_text.see(tk.END)
        self.log_text.configure(state=tk.DISABLED)

    # ---- Task Execution ----

    def _set_buttons_state(self, state):
        for btn in (self.install_btn, self.check_btn, self.uninstall_btn,
                    self.update_btn, self.auto_translate_btn, self.browse_btn,
                    self.maintainer_toggle_btn, self.api_key_toggle_btn):
            btn.configure(state=state)
        for entry in (self.api_key_entry, self.base_url_entry, self.model_entry):
            entry.configure(state=state)

    def _run_task(self, action):
        if self.running:
            return
        if not self.game_dir:
            messagebox.showerror("错误", "请先选择游戏目录！")
            return

        api_config = None
        if action == "auto_translate":
            api_key = self.api_key_var.get().strip()
            base_url = self.base_url_var.get().strip() or "https://api.openai.com/v1"
            model = self.model_var.get().strip() or "gpt-4o-mini"
            if not api_key:
                messagebox.showerror("错误", "请先填写 API Key。")
                return
            api_config = (api_key, base_url, model)

        self.running = True
        self._set_buttons_state(tk.DISABLED)

        self.log_text.configure(state=tk.NORMAL)
        self.log_text.delete("1.0", tk.END)
        self.log_text.configure(state=tk.DISABLED)

        def task():
            try:
                installer = PatchInstaller(self.game_dir, self._enqueue_log)
                if action == "install":
                    self.status_var.set("正在安装...")
                    result = installer.install()
                elif action == "self_check":
                    self.status_var.set("正在自检...")
                    result = installer.self_check()
                elif action == "uninstall":
                    self.status_var.set("正在卸载...")
                    result = installer.uninstall()
                elif action == "reinstall":
                    self.status_var.set("正在重新安装...")
                    result = installer.reinstall_after_update()
                elif action == "auto_translate":
                    self.status_var.set("正在自动补翻译...")
                    result = installer.auto_translate_and_install(*api_config)
                else:
                    result = False

                if action == "self_check":
                    self.status_var.set("自检通过" if result else "自检发现问题")
                else:
                    self.status_var.set("操作完成！" if result else "操作失败")
            except Exception as e:
                self._enqueue_log(f"\n[错误] 发生异常: {e}")
                self.status_var.set("操作失败")
            finally:
                self.running = False
                self.root.after(0, lambda: self._set_buttons_state(tk.NORMAL))

        threading.Thread(target=task, daemon=True).start()

    # ---- Main Loop ----

    def run(self):
        self.root.mainloop()


# ============================================================
# Entry Point
# ============================================================

if __name__ == '__main__':
    app = InstallerApp()
    app.run()
