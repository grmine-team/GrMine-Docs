## 1. 架构设计

```mermaid
flowchart TB
    subgraph "前端层"
        "React 18 + TypeScript"
        "React Router v7"
        "GrMine UI CSS"
        "Tailwind CSS"
    end
    subgraph "内容层"
        "Markdown 文件 (src/content/)"
        "项目配置 (projects.ts)"
    end
    subgraph "构建层"
        "Vite"
        "GitHub Pages 部署"
    end
    "Markdown 文件" --> "Vite 构建"
    "项目配置" --> "Vite 构建"
    "Vite 构建" --> "GitHub Pages"
    "React 18 + TypeScript" --> "渲染文档页面"
```

## 2. 技术说明

- 前端：React 18 + TypeScript + Vite
- 样式：GrMine UI CSS（本地引用 `../GrMine UI/grmine-ui.css`）+ Tailwind CSS 辅助
- 路由：React Router v7
- 状态管理：Zustand（侧边栏状态、主题状态）
- Markdown 渲染：react-markdown + remark-gfm + rehype-highlight
- 图标：lucide-react
- 初始化工具：已有项目，无需重新初始化
- 部署：GitHub Pages（静态站点）

## 3. 路由定义

| 路由 | 用途 |
|------|------|
| `/` | 首页，展示项目列表 |
| `/:project` | 项目文档首页，显示该项目的第一篇文档 |
| `/:project/:slug` | 具体文档页面，slug 为文档文件名 |

## 4. 数据模型

### 4.1 项目配置

```typescript
interface Project {
  id: string;           // 项目唯一标识，如 "ui"
  name: string;         // 项目显示名称，如 "GrMine UI"
  description: string;  // 项目简短描述
  icon: string;         // Lucide 图标名
  tags: string[];       // 标签，如 ["CSS", "组件库"]
  docs: DocEntry[];     // 文档目录结构
}

interface DocEntry {
  slug: string;         // 文件名（不含扩展名），如 "ui-button"
  title: string;        // 显示标题，如 "Button 按钮"
  category: string;     // 分类，如 "组件"
}

interface DocContent {
  project: string;      // 所属项目 ID
  slug: string;         // 文档标识
  content: string;      // Markdown 原文
  frontmatter?: {       // 可选 frontmatter
    title?: string;
    order?: number;
  };
}
```

## 5. 目录结构

```
src/
├── components/
│   ├── Layout.tsx          # 文档页布局（侧边栏 + 内容区）
│   ├── Sidebar.tsx         # 侧边栏导航组件
│   ├── Navbar.tsx          # 顶部导航栏
│   ├── DocContent.tsx      # Markdown 渲染组件
│   ├── ProjectCard.tsx     # 首页项目卡片
│   ├── SearchDialog.tsx    # 搜索弹窗
│   └── ThemeToggle.tsx     # 主题切换按钮
├── content/                # Markdown 文档（已有）
├── data/
│   └── projects.ts         # 项目配置数据
├── hooks/
│   └── useTheme.ts         # 主题 Hook（已有）
├── pages/
│   ├── Home.tsx            # 首页
│   └── DocPage.tsx         # 文档页
├── stores/
│   └── sidebarStore.ts     # 侧边栏状态
├── App.tsx
├── index.css
└── main.tsx
```

## 6. GrMine UI 集成方式

- 通过 Vite 构建时将 `../GrMine UI/grmine-ui.css` 复制到项目中引用
- 在 `index.css` 中通过 `@import` 引入 GrMine UI
- 组件使用 GrMine UI 的 CSS 类名（`gm-` 前缀），结合 Tailwind 工具类补充布局
- 暗色模式通过 `data-theme="dark"` 属性切换，与 GrMine UI 的暗色模式完全兼容

## 7. GitHub Pages 部署

- 使用 `vite.config.ts` 配置 `base` 路径
- 构建输出到 `dist/` 目录
- 通过 GitHub Actions 自动部署（`.github/workflows/static.yml`）
- 所有路由需处理 404 回退到 `index.html`（SPA 模式）
