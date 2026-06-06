# Form 表单

表单组件用于收集用户输入，包含输入框、选择器、复选框等元素。

## 基础用法

```html
<div class="gm-form-group">
  <label class="gm-label">用户名</label>
  <input class="gm-input" type="text" placeholder="请输入用户名" />
</div>
<div class="gm-form-group">
  <label class="gm-label">密码</label>
  <input class="gm-input" type="password" placeholder="请输入密码" />
</div>
<button class="gm-btn gm-btn-primary" type="submit">提交</button>
```

## 输入框变体

```html
<input class="gm-input" placeholder="默认输入框" />
<input class="gm-input gm-input-sm" placeholder="小尺寸" />
<input class="gm-input gm-input-lg" placeholder="大尺寸" />
<input class="gm-input gm-input-error" placeholder="错误状态" />
<input class="gm-input" disabled placeholder="禁用状态" />
```

## 辅助文字与错误提示

```html
<div class="gm-form-group">
  <label class="gm-label">邮箱</label>
  <input class="gm-input gm-input-error" type="email" />
  <span class="gm-error-text">请输入有效的邮箱地址</span>
</div>
<div class="gm-form-group">
  <label class="gm-label">昵称</label>
  <input class="gm-input" type="text" />
  <span class="gm-hint">2-20 个字符</span>
</div>
```

## 选择控件

```html
<select class="gm-select">
  <option>选项一</option>
  <option>选项二</option>
</select>

<label class="gm-checkbox">
  <input type="checkbox" checked />
  <span>同意条款</span>
</label>

<label class="gm-radio">
  <input type="radio" name="opt" checked />
  <span>选项 A</span>
</label>

<label class="gm-switch">
  <input type="checkbox" checked />
  <span>启用通知</span>
</label>
```

## 文本域

```html
<textarea class="gm-textarea" placeholder="请输入内容..."></textarea>
```

## 表单布局

| 类名 | 说明 |
|------|------|
| `gm-form-group` | 表单组，包含标签与输入 |
| `gm-form-row` | 行内表单布局，子元素等分 |
| `gm-label` | 表单标签 |
| `gm-label-required` | 必填标签（显示红色星号） |
| `gm-hint` | 辅助提示文字 |
| `gm-error-text` | 错误提示 |

## 暗色模式

输入框在暗色模式下使用深色背景与浅色边框，聚焦态强调色保持一致。
