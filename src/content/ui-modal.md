# Modal 模态框

模态框用于在当前页面上层展示内容，要求用户进行交互后才能返回主界面。

## 基础用法

```html
<div class="gm-modal">
  <div class="gm-modal__overlay"></div>
  <div class="gm-modal__dialog">
    <div class="gm-modal__header">
      <h3 class="gm-modal__title">确认操作</h3>
      <button class="gm-modal__close">&times;</button>
    </div>
    <div class="gm-modal__body">
      确定要删除此项目吗？此操作不可撤销。
    </div>
    <div class="gm-modal__footer">
      <button class="gm-btn gm-btn--ghost">取消</button>
      <button class="gm-btn gm-btn--danger">删除</button>
    </div>
  </div>
</div>
```

## 尺寸

```html
<div class="gm-modal__dialog gm-modal__dialog--sm">小尺寸</div>
<div class="gm-modal__dialog">默认尺寸</div>
<div class="gm-modal__dialog gm-modal__dialog--lg">大尺寸</div>
```

| 修饰符 | 说明 |
|--------|------|
| `gm-modal__dialog--sm` | 小尺寸模态框 |
| `gm-modal__dialog--lg` | 大尺寸模态框 |

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-modal` | 模态框容器 |
| `gm-modal__overlay` | 遮罩层 |
| `gm-modal__dialog` | 对话框主体 |
| `gm-modal__header` | 头部区域 |
| `gm-modal__title` | 标题 |
| `gm-modal__close` | 关闭按钮 |
| `gm-modal__body` | 内容区域 |
| `gm-modal__footer` | 底部操作区 |

## 注意事项

- 显示/隐藏需通过 JavaScript 控制类名或属性
- 点击遮罩层关闭是常见交互模式
- 打开模态框时应锁定页面滚动

## 暗色模式

暗色模式下遮罩层使用更深的半透明黑色，对话框背景使用 `--gm-neutral-800`。
