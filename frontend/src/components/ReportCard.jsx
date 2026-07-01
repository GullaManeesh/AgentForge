import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileText } from "lucide-react";

const markdownComponents = {
  h1: ({ children }) => <h1 className="mb-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-4 mt-10 border-b border-slate-200 pb-3 text-2xl font-semibold tracking-tight text-slate-950">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-3 mt-8 text-xl font-semibold tracking-tight text-slate-950">{children}</h3>,
  p: ({ children }) => <p className="mb-5 leading-8 text-slate-700">{children}</p>,
  ul: ({ children }) => <ul className="mb-5 list-disc space-y-3 pl-6 text-slate-700">{children}</ul>,
  ol: ({ children }) => <ol className="mb-5 list-decimal space-y-3 pl-6 text-slate-700">{children}</ol>,
  li: ({ children }) => <li className="leading-8">{children}</li>,
  strong: ({ children }) => <strong className="my-4 block font-semibold text-slate-950">{children}</strong>,
  hr: () => <hr className="my-8 border-slate-200 sm:my-10" />,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-slate-300 bg-slate-50 px-6 py-5 text-slate-600">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-full border-collapse text-left text-sm text-slate-700">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-100 text-slate-900">{children}</thead>,
  th: ({ children }) => <th className="border-b border-slate-200 px-4 py-4 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b border-slate-100 px-4 py-4 align-top">{children}</td>,
  code: ({ inline, children }) =>
    inline ? (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.92em] font-medium text-slate-900">{children}</code>
    ) : (
      <code className="block overflow-x-auto rounded-2xl bg-slate-950 px-6 py-5 font-mono text-sm leading-8 text-slate-100">{children}</code>
    ),
  pre: ({ children }) => <pre className="my-8 overflow-x-auto rounded-2xl bg-slate-950 p-0 text-slate-100">{children}</pre>,
};

export default function ReportCard({ report }) {
  if (!report) return null;

  return (
    <article className="card-shell">
      <header className="card-header">
        <div className="card-icon">
          <FileText size={18} />
        </div>
        <div>
          <h2 className="card-title">Research Report</h2>
          <p className="card-subtitle">Professional markdown rendering with research-paper styling.</p>
        </div>
      </header>

      <div className="prose-card prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-a:text-slate-950 prose-a:underline prose-a:decoration-slate-300 prose-a:underline-offset-4 prose-strong:text-slate-950 prose-table:my-0 prose-thead:bg-slate-100 prose-th:border-slate-200 prose-td:border-slate-100">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {report}
        </ReactMarkdown>
      </div>
    </article>
  );
}
