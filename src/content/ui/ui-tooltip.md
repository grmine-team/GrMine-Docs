# Tooltip 工具提示

工具提示用于在悬停或聚焦时展示简短辅助信息，不占用页面空间。

## 基础用法

```html
<div class="gm-tooltip-wrapper">
  <button class="gm-btn gm-btn-secondary">悬停查看</button>
  <span class="gm-tooltip">这是一条提示信息</span>
</div>
```

## 不同触发元素

```html
<div style="display: flex; gap: 12px; align-items: center;">
  <div class="gm-tooltip-wrapper">
    <button class="gm-btn gm-btn-primary">按钮提示</button>
    <span class="gm-tooltip">按钮操作说明</span>
  </div>
  <div class="gm-tooltip-wrapper">
    <span style="text-decoration: underline; cursor: help;">文字提示</span>
    <span class="gm-tooltip">文字的补充说明</span>
  </div>
</div>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-tooltip-wrapper` | 包裹容器，需设置 position: relative |
| `gm-tooltip` | 提示框，默认在上方显示 |

## 设计细节

- 提示框出现时有微妙的淡入动画
- 提示文字使用小字号
- 箭头指向触发元素
- 悬停 `.gm-tooltip-wrapper` 时自动显示 `.gm-tooltip`

## 暗色模式

暗色模式下提示框背景使用深灰色，文字为浅色。
