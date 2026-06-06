# 排版

GrMine UI 的排版系统追求清晰层级与舒适阅读体验。

## 字号层级

```html
<div style="display: flex; flex-direction: column; gap: 8px;">
  <div style="font-size: var(--gm-text-4xl); font-weight: 600; font-family: var(--gm-font-heading);">展示标题 4xl</div>
  <div style="font-size: var(--gm-text-3xl); font-weight: 600; font-family: var(--gm-font-heading);">大标题 3xl</div>
  <div style="font-size: var(--gm-text-2xl); font-weight: 600; font-family: var(--gm-font-heading);">页面标题 2xl</div>
  <div style="font-size: var(--gm-text-xl); font-weight: 600; font-family: var(--gm-font-heading);">区块标题 xl</div>
  <div style="font-size: var(--gm-text-lg); font-weight: 600; font-family: var(--gm-font-heading);">小标题 lg</div>
  <div style="font-size: var(--gm-text-base);">正文 base</div>
  <div style="font-size: var(--gm-text-sm); color: var(--gm-fg-muted);">次要文字 sm</div>
  <div style="font-size: var(--gm-text-xs); color: var(--gm-fg-subtle);">辅助标注 xs</div>
</div>
```

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

## 字体族

| 用途 | 字体 | CSS 变量 |
|------|------|----------|
| 标题 | Outfit | `--gm-font-heading` |
| 正文 | IBM Plex Sans | `--gm-font-sans` |
| 代码 | JetBrains Mono | `--gm-font-mono` |

```html
<div style="display: flex; flex-direction: column; gap: 8px;">
  <div style="font-family: var(--gm-font-heading); font-size: var(--gm-text-xl); font-weight: 600;">Outfit — 标题字体</div>
  <div style="font-family: var(--gm-font-sans); font-size: var(--gm-text-base);">IBM Plex Sans — 正文字体</div>
  <div style="font-family: var(--gm-font-mono); font-size: var(--gm-text-sm); background: var(--gm-bg-muted); padding: 8px 12px; border-radius: 6px;">JetBrains Mono — 代码字体</div>
</div>
```

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
<h1 class="gm-h1">页面标题</h1>
<p class="gm-text-base">正文内容使用基础字号和正常行高。</p>
<code class="gm-font-mono gm-text-sm" style="background: var(--gm-bg-muted); padding: 2px 6px; border-radius: 4px;">const x = 1;</code>
```
