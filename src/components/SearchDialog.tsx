import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useSearchStore } from '@/stores/searchStore';
import { projects } from '@/data/projects';

export default function SearchDialog() {
  const { isOpen, query, setOpen, setQuery } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  const lowerQuery = query.toLowerCase();
  const results = query.trim()
    ? projects.flatMap((project) =>
        project.docs
          .filter(
            (doc) =>
              doc.title.toLowerCase().includes(lowerQuery) ||
              doc.category.toLowerCase().includes(lowerQuery) ||
              project.name.toLowerCase().includes(lowerQuery)
          )
          .map((doc) => ({ project, doc }))
      )
    : [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--gm-z-overlay)',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
      }}
      onClick={() => setOpen(false)}
    >
      <div
        className="gm-card"
        style={{
          width: '100%',
          maxWidth: '36rem',
          maxHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          animation: 'gm-slide-up var(--gm-duration-normal) var(--gm-ease-spring)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--gm-space-3)',
            padding: 'var(--gm-space-4)',
            borderBottom: '1px solid var(--gm-border)',
          }}
        >
          <Search size={16} style={{ color: 'var(--gm-fg-subtle)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="搜索文档..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 'var(--gm-text-sm)',
              color: 'var(--gm-fg)',
            }}
          />
          <button onClick={() => setOpen(false)} className="gm-btn gm-btn-ghost gm-btn-icon gm-btn-sm">
            <X size={14} />
          </button>
        </div>
        {query.trim() && (
          <div style={{ overflowY: 'auto', padding: 'var(--gm-space-2)' }}>
            {results.length === 0 ? (
              <div style={{ padding: 'var(--gm-space-4)', textAlign: 'center', color: 'var(--gm-fg-muted)', fontSize: 'var(--gm-text-sm)' }}>
                未找到匹配的文档
              </div>
            ) : (
              results.map(({ project, doc }) => (
                <Link
                  key={`${project.id}-${doc.slug}`}
                  to={`/${project.id}/${doc.slug}`}
                  onClick={() => setOpen(false)}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--gm-space-3)',
                      padding: 'var(--gm-space-2) var(--gm-space-3)',
                      borderRadius: 'var(--gm-radius-md)',
                      fontSize: 'var(--gm-text-sm)',
                      color: 'var(--gm-fg)',
                      transition: 'background-color var(--gm-duration-fast) var(--gm-ease)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--gm-bg-muted)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span style={{ color: 'var(--gm-fg-subtle)', fontSize: 'var(--gm-text-xs)' }}>{project.name}</span>
                    <span style={{ color: 'var(--gm-border)' }}>/</span>
                    <span>{doc.title}</span>
                    <span className="gm-badge gm-badge-default" style={{ marginLeft: 'auto' }}>{doc.category}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
