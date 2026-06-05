import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import DocContent from '@/components/DocContent';
import { getProject } from '@/data/projects';

const docModules = import.meta.glob<string>('/src/content/**/*.md', {
  query: '?raw',
  eager: true,
});

function loadDoc(projectId: string, slug: string): string | null {
  const key = `/src/content/${projectId}/${slug}.md`;
  return docModules[key] ?? null;
}

export default function DocPage() {
  const { project: projectId, slug } = useParams();
  const [content, setContent] = useState<string | null>(null);

  const project = projectId ? getProject(projectId) : null;

  useEffect(() => {
    if (!slug) {
      setContent(null);
      return;
    }
    const doc = loadDoc(projectId!, slug);
    setContent(doc ?? '# 404\n\n未找到该文档。');
  }, [slug]);

  if (!project) {
    return (
      <div style={{ padding: 'var(--gm-space-16)', textAlign: 'center', color: 'var(--gm-fg-muted)' }}>
        项目不存在
      </div>
    );
  }

  if (!slug) {
    const firstDoc = project.docs[0];
    if (firstDoc) {
      return <Navigate to={`/${project.id}/${firstDoc.slug}`} replace />;
    }
    return (
      <div style={{ padding: 'var(--gm-space-16)', textAlign: 'center', color: 'var(--gm-fg-muted)' }}>
        该项目暂无文档
      </div>
    );
  }

  const currentIndex = project.docs.findIndex((d) => d.slug === slug);
  const prevDoc = currentIndex > 0 ? project.docs[currentIndex - 1] : null;
  const nextDoc = currentIndex < project.docs.length - 1 ? project.docs[currentIndex + 1] : null;

  return (
    <div style={{ maxWidth: '48rem', margin: '0 auto', padding: 'var(--gm-space-8) var(--gm-space-6)' }}>
      {/* Breadcrumb */}
      <nav className="gm-breadcrumb" style={{ marginBottom: 'var(--gm-space-6)' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>首页</Link>
        <span className="gm-breadcrumb-separator">/</span>
        <span className="gm-breadcrumb-current">{project.name}</span>
        <span className="gm-breadcrumb-separator">/</span>
        <span className="gm-breadcrumb-current">
          {project.docs.find((d) => d.slug === slug)?.title || slug}
        </span>
      </nav>

      {/* Content */}
      {content === null ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gm-space-3)' }}>
          <div className="gm-skeleton gm-skeleton-heading" />
          <div className="gm-skeleton gm-skeleton-text" />
          <div className="gm-skeleton gm-skeleton-text" />
          <div className="gm-skeleton gm-skeleton-text" style={{ width: '60%' }} />
        </div>
      ) : (
        <DocContent content={content} />
      )}

      {/* Prev / Next navigation */}
      <hr className="gm-divider" style={{ marginTop: 'var(--gm-space-12)' }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--gm-space-4)',
          paddingTop: 'var(--gm-space-4)',
        }}
      >
        {prevDoc ? (
          <Link
            to={`/${project.id}/${prevDoc.slug}`}
            className="gm-btn gm-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <ChevronLeft size={14} />
            {prevDoc.title}
          </Link>
        ) : (
          <div />
        )}
        {nextDoc ? (
          <Link
            to={`/${project.id}/${nextDoc.slug}`}
            className="gm-btn gm-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            {nextDoc.title}
            <ChevronRight size={14} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
