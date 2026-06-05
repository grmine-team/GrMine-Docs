import { BookOpen } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="hero-section"
        style={{
          padding: 'var(--gm-space-20) var(--gm-space-6)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--gm-space-3)',
            marginBottom: 'var(--gm-space-4)',
          }}
        >
          <BookOpen size={32} style={{ color: 'var(--gm-accent)' }} />
          <h1 className="gm-h1" style={{ margin: 0 }}>
            GrMine Docs
          </h1>
        </div>
        <p
          style={{
            fontSize: 'var(--gm-text-lg)',
            color: 'var(--gm-fg-muted)',
            maxWidth: '32rem',
            margin: '0 auto',
            lineHeight: 'var(--gm-leading-relaxed)',
          }}
        >
          集中管理 GrMine 系列项目的开发文档，为开发者提供清晰、优雅的阅读体验。
        </p>
      </section>

      {/* Projects Grid */}
      <section style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 var(--gm-space-6) var(--gm-space-16)' }}>
        <h2 className="gm-h3" style={{ marginBottom: 'var(--gm-space-6)' }}>
          项目
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
            gap: 'var(--gm-space-4)',
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
