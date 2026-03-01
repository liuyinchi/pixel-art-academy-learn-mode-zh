# Pixel Art Academy Learn Mode 简体中文汉化补丁

为 Steam 游戏 [Pixel Art Academy Learn Mode](https://store.steampowered.com/app/2672610/Pixel_Art_Academy_Learn_Mode/) 提供简体中文本地化支持。

## 使用方法

提供两种安装方式，任选其一：

### 方式一：一键安装器（推荐，无需任何环境）

1. 从 [Releases](https://github.com/liuyinchi/pixel-art-academy-learn-mode-zh/releases) 页面下载 **`Pixel Art Academy 汉化补丁.exe`**
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

1. 将 `汉化补丁` 文件夹放到游戏根目录下，双击 **`安装汉化.bat`**。

```
Pixel Art Academy Learn Mode\
├── 汉化补丁\        ← 放在这里
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

## 开发者参考

### 翻译文件

| 文件 | 说明 |
|------|------|
| `translations_zh.json` | 已翻译条目（Babel cache 类型） |
| `hardcoded_zh.json` | 已翻译条目（JS 硬编码类型） |
| `待翻译汇总.json` | 所有未翻译条目（直接在此文件上翻译） |

### 手动补翻译流程

```bash
python extract_all_missing.py              # 提取所有未翻译 → 待翻译汇总.json
# 翻译 待翻译汇总.json 中的英文 value
python merge_all_translations.py 待翻译汇总.json   # 合并（自动跳过未翻译的英文）
# 双击 安装汉化.bat 重新应用
```

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
