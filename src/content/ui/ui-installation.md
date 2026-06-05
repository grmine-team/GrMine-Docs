# 安装

## npm 安装

推荐使用 npm 进行安装：

```bash
npm install grmine-ui
```

安装后在项目入口引入样式：

```js
import 'grmine-ui/dist/grmine-ui.css';
```

## CDN 引入

通过 CDN 直接在 HTML 中引入，无需构建工具：

```html
<link rel="stylesheet" href="https://cdn.example.com/grmine-ui@latest/dist/grmine-ui.css" />
```

## 下载源文件

也可直接下载编译后的 CSS 文件，放入项目目录中：

```html
<link rel="stylesheet" href="/path/to/grmine-ui.css" />
```

## 环境要求

GrMine UI 是纯 CSS 库，无 JavaScript 依赖，兼容以下浏览器：

- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+

## 验证安装

引入样式后，使用以下代码验证是否正常工作：

```html
<button class="gm-btn gm-btn--primary">Hello GrMine</button>
```

若按钮显示为带圆角的蓝色按钮，说明安装成功。
