# Tooltip 工具提示

工具提示用于在悬停或聚焦时展示简短辅助信息，不占用页面空间。

## 基础用法

<div class="gm-example">
  <span class="gm-tooltip-wrapper" style="margin:2rem;display:inline-flex">
    悬停查看
    <span class="gm-tooltip">这是一条提示</span>
  </span>
</div>

```html
<span class="gm-tooltip-wrapper">
  悬停查看
  <span class="gm-tooltip">这是一条提示</span>
</span>
```

## 搭配按钮

<div class="gm-example">
  <span class="gm-tooltip-wrapper">
    <button class="gm-btn gm-btn-icon gm-btn-primary">+</button>
    <span class="gm-tooltip">新建项目</span>
  </span>
</div>

```html
<span class="gm-tooltip-wrapper">
  <button class="gm-btn gm-btn-icon gm-btn-primary">+</button>
  <span class="gm-tooltip">新建项目</span>
</span>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-tooltip-wrapper` | 包裹容器，需设为 `inline-flex` |
| `gm-tooltip` | 提示框，默认在上方居中显示 |

## 设计细节

- 提示框悬停时自动显示（通过 CSS `:hover` 控制）
- 提示框出现时有微妙的淡入动画
- 箭头指向触发元素
- 提示框最大宽度 240px，超出自动换行

## 暗色模式

暗色模式下提示框背景使用深灰色，文字为浅色。
