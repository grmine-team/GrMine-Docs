import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import Demo from './Demo';

interface DocContentProps {
  content: string;
}

/**
 * Extract HTML code blocks from markdown content.
 * Returns array of segments: { type: 'md', text } | { type: 'demo', code }
 */
function parseSegments(content: string): { type: 'md' | 'demo'; text?: string; code?: string }[] {
  const segments: { type: 'md' | 'demo'; text?: string; code?: string }[] = [];
  // Match ```html code blocks, handling both LF and CRLF line endings
  const regex = /```html\s*\r?\n([\s\S]*?)\r?```/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    // Push markdown segment before this code block
    if (match.index > lastIndex) {
      segments.push({ type: 'md', text: content.slice(lastIndex, match.index) });
    }
    // Push demo segment
    segments.push({ type: 'demo', code: match[1] });
    lastIndex = regex.lastIndex;
  }

  // Push remaining markdown
  if (lastIndex < content.length) {
    segments.push({ type: 'md', text: content.slice(lastIndex) });
  }

  // If no html code blocks found, return entire content as md
  if (segments.length === 0) {
    segments.push({ type: 'md', text: content });
  }

  return segments;
}

export default function DocContent({ content }: DocContentProps) {
  const segments = parseSegments(content);

  return (
    <div className="doc-content gm-prose">
      {segments.map((seg, i) =>
        seg.type === 'demo' ? (
          <Demo key={i} code={seg.code!.replace(/\r?\n$/, '')} />
        ) : (
          <ReactMarkdown
            key={i}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {seg.text}
          </ReactMarkdown>
        )
      )}
    </div>
  );
}
