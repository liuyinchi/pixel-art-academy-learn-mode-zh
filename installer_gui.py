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
import tkinter as tk
from tkinter import scrolledtext, messagebox, filedialog


# ============================================================
# Resource / Path Helpers
# ============================================================

def resource_path(relative_path):
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)


def find_game_dir():
    exe_dir = os.path.dirname(os.path.abspath(sys.argv[0]))
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

def inject_translations(cache_path, trans_path, log_fn=print):
    log_fn(f"  读取翻译文件: {os.path.basename(trans_path)}")
    with open(trans_path, 'r', encoding='utf-8') as f:
        translations = json.load(f)

    log_fn(f"  读取缓存文件: {os.path.basename(cache_path)}")
    with open(cache_path, 'r', encoding='utf-8') as f:
        cache = json.load(f)

    injected = 0
    skipped = 0

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

    log_fn(f"  写入缓存: {injected} 条已注入, {skipped} 条跳过")
    with open(cache_path, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, separators=(',', ':'))

    return injected


# ============================================================
# Hardcoded String Patching
# ============================================================

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


def _try_replace_html_raw(content, en_text, zh_text):
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
                content, replaced = _try_replace_html_raw(content, raw_en, zh_html)
                if replaced:
                    patched += 1

        if patched > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            log_fn(f"  {filename}: {patched}/{len(replacements)} 已替换")
            total_patched += patched

    log_fn(f"  共计: {total_patched} 个字符串已替换")
    return total_patched


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

        exe_dir = os.path.dirname(os.path.abspath(sys.argv[0]))
        self.backup_dir = os.path.join(exe_dir, "backup")

        self.trans_file = resource_path("translations_zh.json")
        self.hardcoded_file = resource_path("hardcoded_zh.json")
        self.fonts_dir = resource_path("fonts")

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
        self.log("[*] 步骤 1/4: 重定向游戏加载路径 ...")

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

        # Step 2: Inject translations into cache.json
        self.log("[*] 步骤 2/4: 注入中文翻译到 cache.json ...")

        cache_backup = os.path.join(self.backup_dir, "cache.json.bak")
        if not os.path.exists(cache_backup):
            shutil.copy2(self.cache_json, cache_backup)
            self.log("[OK] cache.json 已备份")

        injected = inject_translations(self.cache_json, self.trans_file, self.log)
        self.log(f"[OK] 翻译注入完成 ({injected} 条)")

        # Step 3: Patch hardcoded strings in JS files
        if os.path.exists(self.hardcoded_file):
            self.log("[*] 步骤 3/4: 替换 JS 中的硬编码字符串 ...")

            with open(self.hardcoded_file, 'r', encoding='utf-8') as f:
                hardcoded_trans = json.load(f)

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
                for pkg in target_files:
                    src = os.path.join(self.packages_dir, pkg)
                    if os.path.exists(src) and pkg:
                        shutil.copy2(src, os.path.join(js_backup_dir, pkg))
                self.log("[OK] 原始 JS 文件已备份")

            patch_hardcoded(self.packages_dir, hardcoded_trans, self.log)
            self.log("[OK] 硬编码字符串替换完成")
        else:
            self.log("[*] 步骤 3/4: 未找到 hardcoded_zh.json，跳过")

        # Step 4: Patch fonts in CSS
        self.log("[*] 步骤 4/4: 替换字体以支持中文显示 ...")

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


# ============================================================
# GUI Application
# ============================================================

class InstallerApp:
    BG_DARK = "#2b2b2b"
    BG_LOG = "#1e1e1e"
    FG_LIGHT = "#e0e0e0"
    FG_DIM = "#aaaaaa"

    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Pixel Art Academy Learn Mode - 简体中文汉化补丁")
        self.root.geometry("720x540")
        self.root.resizable(False, False)
        self.root.configure(bg="#f0f0f0")

        self.game_dir = None
        self.running = False
        self._log_queue = queue.Queue()

        self._build_ui()
        self._detect_game()
        self._poll_log_queue()

    # ---- UI Construction ----

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
        elif message.startswith("[错误]") or message.startswith("[警告]"):
            tag = "error"
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
        for btn in (self.install_btn, self.uninstall_btn,
                    self.update_btn, self.browse_btn):
            btn.configure(state=state)

    def _run_task(self, action):
        if self.running:
            return
        if not self.game_dir:
            messagebox.showerror("错误", "请先选择游戏目录！")
            return

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
                elif action == "uninstall":
                    self.status_var.set("正在卸载...")
                    result = installer.uninstall()
                elif action == "reinstall":
                    self.status_var.set("正在重新安装...")
                    result = installer.reinstall_after_update()
                else:
                    result = False

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
