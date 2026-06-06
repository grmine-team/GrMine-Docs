import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: 'var(--gm-space-8)',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '6rem',
        fontWeight: 700,
        fontFamily: 'var(--gm-font-heading)',
        color: 'var(--gm-accent)',
        lineHeight: 1,
        marginBottom: 'var(--gm-space-4)',
        letterSpacing: '-0.04em',
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: 'var(--gm-font-heading)',
        fontSize: 'var(--gm-text-2xl)',
        fontWeight: 600,
        color: 'var(--gm-fg)',
        marginBottom: 'var(--gm-space-3)',
      }}>
        页面未找到
      </h1>
      <p style={{
        fontSize: 'var(--gm-text-base)',
        color: 'var(--gm-fg-muted)',
        marginBottom: 'var(--gm-space-8)',
        maxWidth: '24rem',
      }}>
        你访问的页面不存在，可能已被移动或删除。
      </p>
      <div style={{ display: 'flex', gap: 'var(--gm-space-3)' }}>
        <Link to="/" className="gm-btn gm-btn-primary" style={{ textDecoration: 'none' }}>
          <Home size={16} />
          返回首页
        </Link>
        <button className="gm-btn gm-btn-secondary" onClick={() => history.back()}>
          <ArrowLeft size={16} />
          返回上页
        </button>
      </div>
    </div>
  );
}
