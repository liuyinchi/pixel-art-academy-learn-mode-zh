# Pixel Art Academy Learn Mode 简体中文汉化补丁

为 Steam 游戏 [Pixel Art Academy Learn Mode](https://store.steampowered.com/app/2672610/Pixel_Art_Academy_Learn_Mode/) 提供简体中文本地化支持。

## 使用方法

提供两种安装方式，任选其一：

### 方式一：一键安装器（推荐，无需任何环境）

1. 从本仓库下载 **`Pixel Art Academy 汉化补丁.exe`**（点击文件名 → 右上角 Download 按钮）
2. 将 `.exe` 文件放到**游戏根目录**下：

```
Pixel Art Academy Learn Mode\
├── Pixel Art Academy 汉化补丁.exe    ← 放在这里
├── resources\
└── Pixel Art Academy Learn Mode.exe
```

3. 双击运行，在 GUI 界面中点击对应按钮：
   - **安装汉化** — 安装简体中文补丁
   - **卸载汉化** — 恢复英文原版
   - **更新后重新汉化** — Steam 更新游戏后重新应用补丁

> 如果 `.exe` 没有放在正确位置，也可以点击「浏览」手动选择游戏目录。

### 方式二：脚本安装（需要 Python 3）

#### 安装要求

- **Windows 系统**
- **Python 3**（[python.org/downloads](https://www.python.org/downloads/)，安装时 **务必勾选 "Add Python to PATH"**）

#### 操作步骤

1. 将本仓库克隆或下载到**游戏根目录**下，双击 **`安装汉化.bat`**。

```
Pixel Art Academy Learn Mode\
├── pixel-art-academy-learn-mode-zh\    ← 本仓库（克隆或下载到这里）
├── resources\
└── Pixel Art Academy Learn Mode.exe
```

2. **卸载**：双击 **`卸载汉化.bat`**
3. **游戏更新后**：双击 **`更新后重新汉化.bat`**
4. **更新后有新增英文？** 双击 **`补充翻译.bat`**，按屏幕提示操作：
   - 脚本自动提取新增的未翻译内容
   - 自动打开待翻译文件 → 复制内容到 AI（ChatGPT / Claude / DeepSeek）翻译
   - 把翻译结果粘贴回来保存 → 脚本自动合并并重新应用汉化

---

## 技术原理

本补丁采用零重编译方案，不修改游戏可执行文件：

1. **解包 asar**：用 Python 解包 Electron 的 `app.asar` 和 `meteor.asar`
2. **重定向加载**：修改 `package.json` 和 `app.js`，让 Electron 加载解包后的文件
3. **注入翻译**：将中文翻译写入 Meteor 的 Babel 翻译缓存 (`cache.json`)
4. **替换硬编码**：在 JS 源码中上下文安全地替换写死的英文字符串
5. **替换字体**：将 CSS 中的西文像素字体替换为 [Fusion Pixel](https://github.com/TakWolf/fusion-pixel-font) 中文像素字体

所有修改均可通过 `卸载汉化.bat` 一键还原。

## 补充翻译（还有英文没汉化？）

如果你发现游戏中仍有英文没有翻译，有两种方式补充：

### 方式 A：一键补翻译（推荐）

双击 **`补充翻译.bat`**，脚本会自动引导你完成 提取 → 翻译 → 合并 → 安装 全流程。

### 方式 B：手动操作

#### 第 1 步：翻译

打开项目文件夹中的 `hardcoded_to_translate.json`，把内容复制给翻译工具（ChatGPT / DeepL / Claude 等），告诉它：

> "请把每个 JSON 条目的 value（右边的值）翻译成简体中文，key（左边）不要动。直接输出完整 JSON。"

把翻译结果 **覆盖保存** 回 `hardcoded_to_translate.json`。

> **注意**：翻译后的中文文本中不能出现 ASCII 双引号 `"`，请用 `「」` 替代，否则 JSON 格式会损坏。

#### 第 2 步：合并

在项目文件夹中打开命令行，运行：

```bash
python merge_hardcoded.py
```

它会自动把翻译好的中文合并进 `hardcoded_zh.json`，跳过还没翻译的英文条目。

#### 第 3 步：重新安装补丁

双击 `安装汉化.bat` 或运行 `Pixel Art Academy 汉化补丁.exe`，重新打补丁即可。

> **提示**：如果游戏更新后出现新的未翻译内容，先运行 `更新后重新汉化.bat` 重新解包，
> 然后运行 `python extract_hardcoded.py` 重新提取待翻译字符串，再重复上面 3 步。

---

## 开发者参考

### 翻译文件

| 文件 | 说明 |
|------|------|
| `translations_zh.json` | 已翻译条目（Babel cache 类型） |
| `hardcoded_zh.json` | 已翻译条目（JS 硬编码类型） |
| `hardcoded_to_translate.json` | 硬编码中未翻译条目（翻译后用 `merge_hardcoded.py` 合并） |
| `hardcoded_skipped.json` | 不需要翻译的条目（人名、游戏名、鸣谢等，仅供参考） |
| `待翻译汇总.json` | 所有未翻译条目汇总（cache + 硬编码） |

### 工具脚本

| 脚本 | 用途 |
|------|------|
| `extract_hardcoded.py` | 从 JS 文件中提取硬编码英文字符串 |
| `extract_strings.py` | 从 cache.json 中提取未翻译条目 |
| `extract_all_missing.py` | 一键提取所有未翻译条目 |
| `merge_hardcoded.py` | 将翻译好的硬编码条目合并到 `hardcoded_zh.json` |
| `merge_translations.py` | 将翻译好的 cache 条目合并到 `translations_zh.json` |
| `merge_all_translations.py` | 合并汇总翻译文件（cache + 硬编码） |
| `patch_hardcoded.py` | 在 JS 文件中替换英文为中文（安装时自动调用） |
| `inject_translations.py` | 将翻译注入 cache.json（安装时自动调用） |
| `extract_asar.py` | 解包 Electron asar 文件 |

### 构建 .exe 安装器

更新翻译文件后，可重新构建 `.exe`：

```bash
# 方法一：双击 build_exe.bat（自动安装 PyInstaller 并构建）

# 方法二：手动构建
pip install pyinstaller
python -m PyInstaller --onefile --windowed --name "Pixel Art Academy 汉化补丁" --add-data "translations_zh.json;." --add-data "hardcoded_zh.json;." --add-data "fonts;fonts" installer_gui.py
```

### 注意事项

- JSON value 中不能出现未转义的 `"` 双引号，用 `「」` 替代
- 多行文本用 `\n` 表示换行
- 人名、游戏名等专有名词保持英文即可

## 致谢

- [Pixel Art Academy](https://pixelart.academy/) by Retronator
- [Fusion Pixel Font](https://github.com/TakWolf/fusion-pixel-font) by TakWolf
- [Pixel-Art-Academy-CN](https://github.com/Arch-AIk/Pixel-Art-Academy-CN) 参考了其中文字体方案
