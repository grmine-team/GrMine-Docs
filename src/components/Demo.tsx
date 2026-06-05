import { useState } from 'react';

interface DemoProps {
  code: string;
  title?: string;
}

export default function Demo({ code, title }: DemoProps) {
  const [showCode, setShowCode] = useState(false);

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
        dangerouslySetInnerHTML={{ __html: code }}
      />
      {showCode && (
        <div className="demo-block__source">
          <pre>
            <code className="language-html">{code.trim()}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
