import { Link, useParams } from 'react-router-dom';
import { BookOpen, Menu, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useSearchStore } from '@/stores/searchStore';
import { getProject } from '@/data/projects';

export default function Navbar() {
  const { project: projectId } = useParams();
  const toggleSidebar = useSidebarStore((s) => s.toggle);
  const openSearch = useSearchStore((s) => s.setOpen);
  const project = projectId ? getProject(projectId) : null;

  return (
    <nav className="gm-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gm-space-3)' }}>
        {project && (
          <button
            onClick={toggleSidebar}
            className="gm-btn gm-btn-ghost gm-btn-icon gm-btn-sm menu-toggle"
            aria-label="切换侧边栏"
          >
            <Menu size={16} />
          </button>
        )}
        <Link to="/" className="gm-navbar-brand" style={{ textDecoration: 'none' }}>
          <BookOpen size={20} />
          GrMine Docs
        </Link>
        {project && (
          <span style={{ color: 'var(--gm-fg-subtle)', fontSize: 'var(--gm-text-sm)' }}>
            / {project.name}
          </span>
        )}
      </div>
      <div className="gm-navbar-actions">
        <button
          onClick={() => openSearch(true)}
          className="gm-btn gm-btn-ghost gm-btn-sm"
        >
          <Search size={14} />
          <span className="gm-hide-sm">搜索</span>
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
}
