import { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';

interface DemoProps {
  code: string;
  title?: string;
}

/**
 * Map BEM-style double-dash modifiers (--variant) to single-dash (-variant)
 * to match the actual CSS class names defined in grmine-ui.css.
 *
 * Examples:
 *   gm-btn--primary  → gm-btn-primary
 *   gm-alert--info   → gm-alert-info
 *   gm-card__header  → gm-card__header (unchanged, __ is correct)
 */
function normalizeClassNames(html: string): string {
  return html.replace(/(\w+)--/g, '$1-');
}

export default function Demo({ code, title }: DemoProps) {
  const [showCode, setShowCode] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  // Apply highlight.js when source panel opens
  useEffect(() => {
    if (showCode && codeRef.current) {
      codeRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [showCode]);

  const normalizedCode = normalizeClassNames(code);

  return (
    <div className="demo-block">
      <div className="demo-block__header">
        <span className="demo-block__title">{title || '示例'}</span>
        <button
          className="demo-block__toggle"
          onClick={() => setShowCode(!showCode)}
          type="button"
        >
          {showCode ? '隐藏代码' : '查看源码'}
        </button>
      </div>
      <div
        className="demo-block__preview"
        dangerouslySetInnerHTML={{ __html: normalizedCode }}
      />
      {showCode && (
        <div className="demo-block__source" ref={codeRef}>
          <pre>
            <code className="language-html">{code.trim()}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
