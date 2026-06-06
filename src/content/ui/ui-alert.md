# Alert 提示

提示组件用于向用户展示重要信息，如操作反馈、警告或错误通知。

## 基础用法

<div class="gm-example">
  <div class="gm-alert gm-alert-info">
    <span class="gm-alert-icon">ℹ</span>
    <div class="gm-alert-content">这是一条信息提示。</div>
  </div>
  <div class="gm-alert gm-alert-success">
    <span class="gm-alert-icon">✓</span>
    <div class="gm-alert-content">操作成功完成。</div>
  </div>
  <div class="gm-alert gm-alert-warning">
    <span class="gm-alert-icon">⚠</span>
    <div class="gm-alert-content">请注意此操作不可逆。</div>
  </div>
  <div class="gm-alert gm-alert-danger">
    <span class="gm-alert-icon">✕</span>
    <div class="gm-alert-content">操作失败，请重试。</div>
  </div>
</div>

```html
<div class="gm-alert gm-alert-info">
  <span class="gm-alert-icon">ℹ</span>
  <div class="gm-alert-content">这是一条信息提示。</div>
</div>
<div class="gm-alert gm-alert-success">
  <span class="gm-alert-icon">✓</span>
  <div class="gm-alert-content">操作成功完成。</div>
</div>
<div class="gm-alert gm-alert-warning">
  <span class="gm-alert-icon">⚠</span>
  <div class="gm-alert-content">请注意此操作不可逆。</div>
</div>
<div class="gm-alert gm-alert-danger">
  <span class="gm-alert-icon">✕</span>
  <div class="gm-alert-content">操作失败，请重试。</div>
</div>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-alert-info` | 信息提示，蓝色调 |
| `gm-alert-success` | 成功提示，绿色调 |
| `gm-alert-warning` | 警告提示，黄色调 |
| `gm-alert-danger` | 错误提示，红色调 |

## 带标题

<div class="gm-example">
  <div class="gm-alert gm-alert-warning">
    <span class="gm-alert-icon">⚠</span>
    <div class="gm-alert-content">
      <div class="gm-alert-title">注意</div>
      <div class="gm-alert-desc">您的账户即将到期，请及时续费。</div>
    </div>
  </div>
</div>

```html
<div class="gm-alert gm-alert-warning">
  <span class="gm-alert-icon">⚠</span>
  <div class="gm-alert-content">
    <div class="gm-alert-title">注意</div>
    <div class="gm-alert-desc">您的账户即将到期，请及时续费。</div>
  </div>
</div>
```

## 可关闭

<div class="gm-example">
  <div class="gm-alert gm-alert-info">
    <span class="gm-alert-icon">ℹ</span>
    <div class="gm-alert-content">此消息可关闭</div>
    <button class="gm-alert-close">×</button>
  </div>
</div>

```html
<div class="gm-alert gm-alert-info">
  <span class="gm-alert-icon">ℹ</span>
  <div class="gm-alert-content">此消息可关闭</div>
  <button class="gm-alert-close">×</button>
</div>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-alert-icon` | 图标区域 |
| `gm-alert-content` | 内容区域 |
| `gm-alert-title` | 标题 |
| `gm-alert-desc` | 描述文字 |
| `gm-alert-close` | 关闭按钮 |

## 暗色模式

暗色模式下提示框背景色加深，左侧色条保持醒目，确保信息层级清晰可辨。
