# Alert 提示

提示组件用于向用户展示重要信息，如操作反馈、警告或错误通知。

## 基础用法

```html
<div class="gm-alert">这是一条普通提示。</div>
<div class="gm-alert gm-alert--info">这是一条信息提示。</div>
<div class="gm-alert gm-alert--success">操作成功完成。</div>
<div class="gm-alert gm-alert--warning">请注意此操作不可逆。</div>
<div class="gm-alert gm-alert--error">操作失败，请重试。</div>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-alert` | 默认提示，中性灰色 |
| `gm-alert--info` | 信息提示，蓝色调 |
| `gm-alert--success` | 成功提示，绿色调 |
| `gm-alert--warning` | 警告提示，黄色调 |
| `gm-alert--error` | 错误提示，红色调 |

## 可关闭

```html
<div class="gm-alert gm-alert--info gm-alert--closable">
  <span class="gm-alert__content">此消息可关闭</span>
  <button class="gm-alert__close">&times;</button>
</div>
```

| 类名 | 说明 |
|------|------|
| `gm-alert--closable` | 启用关闭按钮 |
| `gm-alert__close` | 关闭按钮 |
| `gm-alert__content` | 提示内容区域 |

## 带标题

```html
<div class="gm-alert gm-alert--warning">
  <div class="gm-alert__title">注意</div>
  <div class="gm-alert__content">您的账户即将到期。</div>
</div>
```

## 暗色模式

暗色模式下提示框背景色加深，左侧色条保持醒目，确保信息层级清晰可辨。
