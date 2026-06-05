# 排版

GrMine UI 的排版系统追求清晰层级与舒适阅读体验。

## 字体族

| 用途 | 字体 | CSS 变量 |
|------|------|----------|
| 标题 | Outfit | `--gm-font-heading` |
| 正文 | IBM Plex Sans | `--gm-font-body` |
| 代码 | JetBrains Mono | `--gm-font-mono` |

字体栈定义：

```css
:root {
  --gm-font-heading: 'Outfit', system-ui, sans-serif;
  --gm-font-body: 'IBM Plex Sans', system-ui, sans-serif;
  --gm-font-mono: 'JetBrains Mono', monospace;
}
```

## 字号层级

| 变量 | 大小 | 用途 |
|------|------|------|
| `--gm-text-xs` | 0.75rem | 辅助标注 |
| `--gm-text-sm` | 0.875rem | 次要文字 |
| `--gm-text-base` | 1rem | 正文 |
| `--gm-text-lg` | 1.125rem | 小标题 |
| `--gm-text-xl` | 1.25rem | 区块标题 |
| `--gm-text-2xl` | 1.5rem | 页面标题 |
| `--gm-text-3xl` | 1.875rem | 大标题 |
| `--gm-text-4xl` | 2.25rem | 展示标题 |

## 行高

| 变量 | 值 | 适用 |
|------|-----|------|
| `--gm-leading-tight` | 1.25 | 标题 |
| `--gm-leading-normal` | 1.5 | 正文 |
| `--gm-leading-relaxed` | 1.75 | 长文阅读 |

## 字重

| 变量 | 值 | 用途 |
|------|-----|------|
| `--gm-font-normal` | 400 | 正文 |
| `--gm-font-medium` | 500 | 强调 |
| `--gm-font-semibold` | 600 | 标题 |

## 使用示例

```html
<h1 class="gm-heading gm-text-3xl">页面标题</h1>
<p class="gm-body gm-text-base">正文内容</p>
<code class="gm-code gm-text-sm">const x = 1;</code>
```
