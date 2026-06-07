export interface DocEntry {
  slug: string;
  title: string;
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  docs: DocEntry[];
}

export const projects: Project[] = [
  {
    id: 'ui',
    name: 'GrMine UI',
    description: '追求精致极简的 CSS 组件库 — 以克制设计，构建清晰界面。',
    icon: 'Palette',
    tags: ['CSS', '组件库', '设计系统'],
    docs: [
      { slug: 'ui-getting-started', title: '快速开始', category: '入门' },
      { slug: 'ui-installation', title: '安装指南', category: '入门' },
      { slug: 'ui-design-principles', title: '设计原则', category: '入门' },
      { slug: 'ui-colors', title: '色彩系统', category: '设计令牌' },
      { slug: 'ui-spacing', title: '间距系统', category: '设计令牌' },
      { slug: 'ui-typography', title: '排版', category: '设计令牌' },
      { slug: 'ui-button', title: 'Button 按钮', category: '组件' },
      { slug: 'ui-form', title: 'Form 表单', category: '组件' },
      { slug: 'ui-card', title: 'Card 卡片', category: '组件' },
      { slug: 'ui-badge', title: 'Badge 徽标', category: '组件' },
      { slug: 'ui-alert', title: 'Alert 提示', category: '组件' },
      { slug: 'ui-table', title: 'Table 表格', category: '组件' },
      { slug: 'ui-modal', title: 'Modal 对话框', category: '组件' },
      { slug: 'ui-navbar', title: 'Navbar 导航栏', category: '组件' },
      { slug: 'ui-sidebar', title: 'Sidebar 侧边栏', category: '组件' },
      { slug: 'ui-tabs', title: 'Tabs 标签页', category: '组件' },
      { slug: 'ui-accordion', title: 'Accordion 手风琴', category: '组件' },
      { slug: 'ui-tooltip', title: 'Tooltip 工具提示', category: '组件' },
    ],
  },
  {
    id: 'oauth2',
    name: 'GrMine OAuth2.0',
    description: '基于 OAuth2.0 Authorization Code Flow 的统一认证授权系统。',
    icon: 'Shield',
    tags: ['OAuth2.0', '认证', '登录接入'],
    docs: [
      { slug: 'oauth2-getting-started', title: '快速开始', category: '入门' },
      { slug: 'oauth2-flow', title: '授权流程详解', category: '入门' },
      { slug: 'oauth2-api', title: 'API 参考', category: '接入' },
      { slug: 'oauth2-examples', title: '接入示例', category: '接入' },
      { slug: 'oauth2-faq', title: '常见问题', category: '接入' },
    ],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getDocCategories(docs: DocEntry[]): string[] {
  return [...new Set(docs.map((d) => d.category))];
}

export function getDocsByCategory(docs: DocEntry[], category: string): DocEntry[] {
  return docs.filter((d) => d.category === category);
}
