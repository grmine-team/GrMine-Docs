# Card 卡片

卡片用于承载一组相关内容，提供视觉上的分组与层次感。

## 基础用法

```html
<div class="gm-card">
  <div class="gm-card-body">
    这是一个基础卡片，仅包含内容区域。
  </div>
</div>
```

## 带标题和描述

```html
<div class="gm-card">
  <div class="gm-card-header">
    <div class="gm-card-title">卡片标题</div>
    <div class="gm-card-desc">辅助说明文字</div>
  </div>
  <div class="gm-card-body">
    卡片正文内容区域，可以放置任意内容。
  </div>
</div>
```

## 带操作区

```html
<div class="gm-card">
  <div class="gm-card-header">
    <div class="gm-card-title">确认操作</div>
  </div>
  <div class="gm-card-body">
    确定要执行此操作吗？此操作不可撤销。
  </div>
  <hr class="gm-card-separator" />
  <div class="gm-card-footer">
    <button class="gm-btn gm-btn-sm gm-btn-ghost">取消</button>
    <button class="gm-btn gm-btn-sm gm-btn-primary">确认</button>
  </div>
</div>
```

## 可交互卡片

```html
<div class="gm-card gm-card-interactive">
  <div class="gm-card-body">
    悬停此卡片查看交互效果，适合用作可点击的列表项。
  </div>
</div>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-card` | 卡片容器 |
| `gm-card-header` | 头部区域 |
| `gm-card-title` | 标题文字 |
| `gm-card-desc` | 描述文字 |
| `gm-card-body` | 内容区域 |
| `gm-card-footer` | 底部操作区 |
| `gm-card-separator` | 分割线 |
| `gm-card-interactive` | 可交互卡片（悬停效果） |

## 暗色模式

暗色模式下卡片背景切换为深灰色，边框与阴影自动适配。
