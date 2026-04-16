import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownModal.css';

interface MarkdownModalProps {
  title: string;
  content: string;
  filename?: string;
  onClose: () => void;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

export function MarkdownModal({ title, content, filename, onClose }: MarkdownModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    el.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key === 'Escape') onClose();
  }

  function handleDownload() {
    const name = filename ?? `${slugify(title)}.md`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <dialog
      ref={dialogRef}
      className="md-modal"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="md-modal__inner">
        <div className="md-modal__header">
          <h2 className="md-modal__title">{title}</h2>
          <div className="md-modal__actions">
            <button
              className="md-modal__download"
              onClick={handleDownload}
              aria-label="마크다운 파일 다운로드"
              title="다운로드"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <button
              className="md-modal__close"
              onClick={onClose}
              aria-label="닫기"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="md-modal__body">
          <div className="md-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </dialog>
  );
}
