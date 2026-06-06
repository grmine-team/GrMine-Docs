# Form 表单

表单组件用于收集用户输入，包含输入框、选择器、复选框等元素。

## 输入框

```html
<input class="gm-input" type="text" placeholder="请输入用户名" />
<input class="gm-input gm-input-sm" placeholder="小尺寸" />
<input class="gm-input gm-input-lg" placeholder="大尺寸" />
<input class="gm-input gm-input-error" placeholder="错误状态" />
<input class="gm-input" disabled placeholder="禁用状态" />
```

## 输入框尺寸

| 修饰符 | 说明 |
|--------|------|
| `gm-input-sm` | 小尺寸输入框 |
| `gm-input-lg` | 大尺寸输入框 |

## 标签与提示

```html
<div class="gm-form-group">
  <label class="gm-label">用户名</label>
  <input class="gm-input" type="text" placeholder="请输入用户名" />
</div>
<div class="gm-form-group">
  <label class="gm-label gm-label-required">邮箱</label>
  <input class="gm-input gm-input-error" type="email" placeholder="请输入邮箱" />
  <span class="gm-error-text">请输入有效的邮箱地址</span>
</div>
<div class="gm-form-group">
  <label class="gm-label">备注</label>
  <textarea class="gm-textarea" placeholder="请输入备注"></textarea>
  <span class="gm-hint">最多 200 字</span>
</div>
```

## 选择器

```html
<select class="gm-select">
  <option>请选择</option>
  <option>选项一</option>
  <option>选项二</option>
</select>
<select class="gm-select gm-select-sm">
  <option>小尺寸选择器</option>
</select>
```

## 复选框与单选

```html
<label class="gm-checkbox">
  <input type="checkbox" checked />
  <span>同意条款</span>
</label>
<label class="gm-checkbox">
  <input type="checkbox" />
  <span>订阅通知</span>
</label>
<label class="gm-radio">
  <input type="radio" name="color" checked />
  <span>蓝色</span>
</label>
<label class="gm-radio">
  <input type="radio" name="color" />
  <span>绿色</span>
</label>
```

## 开关

```html
<label class="gm-switch">
  <input type="checkbox" checked />
  <span>启用通知</span>
</label>
<label class="gm-switch">
  <input type="checkbox" />
  <span>自动保存</span>
</label>
```

## 表单布局

```html
<div class="gm-form-group">
  <label class="gm-label">姓名</label>
  <input class="gm-input" placeholder="请输入姓名" />
</div>
<div class="gm-form-row">
  <div class="gm-form-group">
    <label class="gm-label">姓</label>
    <input class="gm-input" placeholder="姓" />
  </div>
  <div class="gm-form-group">
    <label class="gm-label">名</label>
    <input class="gm-input" placeholder="名" />
  </div>
</div>
```

| 类名 | 说明 |
|------|------|
| `gm-form-group` | 表单组，包含标签与输入 |
| `gm-form-row` | 行内表单布局 |
| `gm-label` | 表单标签 |
| `gm-label-required` | 必填标签（显示红色星号） |
| `gm-hint` | 辅助提示文字 |
| `gm-error-text` | 错误提示 |
| `gm-input-error` | 输入框错误状态 |

## 暗色模式

输入框在暗色模式下使用深色背景与浅色边框，聚焦态强调色保持一致。
