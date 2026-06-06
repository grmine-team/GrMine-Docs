# Modal 模态框

模态框用于在当前页面上层展示内容，要求用户进行交互后才能返回主界面。

## 基础用法

```html
<div class="gm-modal-overlay">
  <div class="gm-modal">
    <div class="gm-modal-header">
      <span class="gm-modal-title">确认操作</span>
      <button class="gm-modal-close">×</button>
    </div>
    <div class="gm-modal-body">
      确定要删除此项目吗？此操作不可撤销。
    </div>
    <div class="gm-modal-footer">
      <button class="gm-btn gm-btn-ghost">取消</button>
      <button class="gm-btn gm-btn-danger">删除</button>
    </div>
  </div>
</div>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-modal-overlay` | 遮罩层，固定定位覆盖全屏 |
| `gm-modal` | 对话框主体 |
| `gm-modal-header` | 头部区域 |
| `gm-modal-title` | 标题 |
| `gm-modal-close` | 关闭按钮 |
| `gm-modal-body` | 内容区域 |
| `gm-modal-footer` | 底部操作区 |

## 注意事项

- 显示/隐藏需通过 JavaScript 控制类名或属性
- 点击遮罩层关闭是常见交互模式
- 打开模态框时应锁定页面滚动

## 暗色模式

暗色模式下遮罩层使用更深的半透明黑色，对话框背景使用深色。
