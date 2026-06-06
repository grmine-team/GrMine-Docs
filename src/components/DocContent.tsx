import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { useState, type ReactNode, type ReactElement } from 'react';

interface DocContentProps {
  content: string;
}

function extractText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (!children) return '';
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (typeof children === 'object' && 'props' in (children as object)) {
    return extractText((children as ReactElement).props.children);
  }
  return '';
}

function decodeHtmlEntities(text: string): string {
  if (typeof document === 'undefined') return text;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ExamplePre(props: any) {
  const { children, ...rest } = props;
  const [showCode, setShowCode] = useState(true);

  const codeEl = children as ReactElement | undefined;
  const className: string = codeEl?.props?.className || '';
  const isHtml = className.includes('language-html');

  if (!isHtml) {
    return <pre {...rest}>{children}</pre>;
  }

  const rawText = decodeHtmlEntities(extractText(children));

  return (
    <div className="doc-example">
      <div className="doc-example-preview" dangerouslySetInnerHTML={{ __html: rawText }} />
      <div className="doc-example-toolbar">
        <button
          className="gm-btn gm-btn-ghost gm-btn-sm"
          onClick={() => setShowCode((s) => !s)}
        >
          {showCode ? '收起代码' : '展开代码'}
        </button>
      </div>
      {showCode && (
        <div className="doc-example-source">
          <pre>{children}</pre>
        </div>
      )}
    </div>
  );
}

export default function DocContent({ content }: DocContentProps) {
  return (
    <div className="doc-content gm-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{ pre: ExamplePre }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
