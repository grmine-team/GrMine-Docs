# Tooltip 工具提示

工具提示用于在悬停或聚焦时展示简短辅助信息，不占用页面空间。

## 基础用法

```html
<span class="gm-tooltip" data-tooltip="这是一条提示">
  悬停查看
</span>
```

## 方向

```html
<span class="gm-tooltip gm-tooltip--top" data-tooltip="上方提示">上</span>
<span class="gm-tooltip gm-tooltip--bottom" data-tooltip="下方提示">下</span>
<span class="gm-tooltip gm-tooltip--left" data-tooltip="左侧提示">左</span>
<span class="gm-tooltip gm-tooltip--right" data-tooltip="右侧提示">右</span>
```

| 修饰符 | 说明 |
|--------|------|
| `gm-tooltip--top` | 上方显示（默认） |
| `gm-tooltip--bottom` | 下方显示 |
| `gm-tooltip--left` | 左侧显示 |
| `gm-tooltip--right` | 右侧显示 |

## 使用方式

Tooltip 通过 `data-tooltip` 属性定义提示内容，悬停时自动显示：

```html
<button class="gm-btn gm-btn--icon gm-tooltip gm-tooltip--top"
        data-tooltip="新建项目">
  <span class="gm-icon gm-icon--plus"></span>
</button>
```

## 设计细节

- 提示框出现时有微妙的淡入动画
- 提示文字使用 `--gm-text-sm` 字号
- 箭头指向触发元素
- 提示框最大宽度 240px，超出自动换行

## 暗色模式

暗色模式下提示框背景使用 `--gm-neutral-700`，文字为浅色，与亮色模式形成反转。
