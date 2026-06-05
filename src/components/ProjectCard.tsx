import { Link } from 'react-router-dom';
import { Palette, type LucideIcon } from 'lucide-react';
import type { Project } from '@/data/projects';

const iconMap: Record<string, LucideIcon> = {
  Palette,
};

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = iconMap[project.icon] || Palette;

  return (
    <Link
      to={`/${project.id}/${project.docs[0]?.slug || ''}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="gm-card gm-card-interactive" style={{ height: '100%' }}>
        <div className="gm-card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gm-space-3)', marginBottom: 'var(--gm-space-3)' }}>
            <div
              className="project-icon"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: 'var(--gm-radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={20} />
            </div>
            <div>
              <div className="gm-card-title">{project.name}</div>
            </div>
          </div>
          <p style={{ fontSize: 'var(--gm-text-sm)', color: 'var(--gm-fg-muted)', marginBottom: 'var(--gm-space-3)' }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', gap: 'var(--gm-space-1)', flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <span key={tag} className="gm-badge gm-badge-default">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
