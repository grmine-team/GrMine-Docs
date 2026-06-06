# 色彩系统

GrMine UI 采用暖调中性色 + 蓝色强调色的配色方案，兼顾可读性与温度感。

## 中性色

暖调灰色，用于文字、背景、边框等基础元素：

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-neutral-50); border: 1px solid var(--gm-border);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-neutral-100);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-neutral-200);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-neutral-300);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-neutral-400);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-neutral-500);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-neutral-600);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-neutral-700);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-neutral-800);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-neutral-900);"></div>
</div>
```

| 变量 | 色值 | 用途 |
|------|------|------|
| `--gm-neutral-50` | 极浅灰 | 页面背景 |
| `--gm-neutral-100` | 浅灰 | 卡片背景 |
| `--gm-neutral-200` | 边框灰 | 分割线、边框 |
| `--gm-neutral-300` | 禁用灰 | 禁用状态 |
| `--gm-neutral-400` | 占位灰 | 占位文字 |
| `--gm-neutral-500` | 中灰 | 辅助图标 |
| `--gm-neutral-600` | 深灰 | 次要文字 |
| `--gm-neutral-700` | 正文灰 | 正文文字 |
| `--gm-neutral-800` | 标题灰 | 标题文字 |
| `--gm-neutral-900` | 纯黑灰 | 强调文字 |

## 强调色

蓝色系，用于交互元素与关键信息：

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-accent-50); border: 1px solid var(--gm-border);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-accent-100);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-accent-200);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-accent-300);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-accent-400);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-accent-500);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-accent-600);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-accent-700);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-accent-800);"></div>
  <div style="width: 48px; height: 48px; border-radius: 8px; background: var(--gm-accent-900);"></div>
</div>
```

| 变量 | 用途 |
|------|------|
| `--gm-accent-50` | 浅色背景 |
| `--gm-accent-100` | 悬停背景 |
| `--gm-accent-200` | 边框 |
| `--gm-accent-500` | 主按钮 |
| `--gm-accent-600` | 悬停态 |
| `--gm-accent-700` | 按压态 |
| `--gm-accent-900` | 深色文字 |

## 语义色

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
  <div style="display: flex; align-items: center; gap: 6px;">
    <div style="width: 32px; height: 32px; border-radius: 6px; background: var(--gm-success);"></div>
    <span class="gm-text-sm">Success</span>
  </div>
  <div style="display: flex; align-items: center; gap: 6px;">
    <div style="width: 32px; height: 32px; border-radius: 6px; background: var(--gm-warning);"></div>
    <span class="gm-text-sm">Warning</span>
  </div>
  <div style="display: flex; align-items: center; gap: 6px;">
    <div style="width: 32px; height: 32px; border-radius: 6px; background: var(--gm-danger);"></div>
    <span class="gm-text-sm">Danger</span>
  </div>
  <div style="display: flex; align-items: center; gap: 6px;">
    <div style="width: 32px; height: 32px; border-radius: 6px; background: var(--gm-info);"></div>
    <span class="gm-text-sm">Info</span>
  </div>
</div>
```

| 变量 | 用途 |
|------|------|
| `--gm-success` | 成功状态 |
| `--gm-warning` | 警告状态 |
| `--gm-danger` | 错误状态 |
| `--gm-info` | 信息提示 |

## 使用方式

```css
.my-element {
  color: var(--gm-neutral-700);
  background: var(--gm-neutral-50);
  border: 1px solid var(--gm-neutral-200);
}
```

## 暗色模式

暗色模式下，中性色层级反转，背景使用深色，文字使用浅色。通过 `data-theme="dark"` 自动切换。
