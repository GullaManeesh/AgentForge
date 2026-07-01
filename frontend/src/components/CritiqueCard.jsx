import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageSquareQuote } from "lucide-react";

function extractScore(critique) {
  const match = critique.match(/Score:\s*([^\n]+)/i);
  return match?.[1]?.trim() || "N/A";
}

function extractSection(critique, title) {
  const regex = new RegExp(`${title}:\\s*([\\s\\S]*?)(?:\\n\\n[A-Z][^:\\n]+:|$)`, "i");
  const match = critique.match(regex);
  return match?.[1]?.trim() || "";
}

function toMarkdownList(text) {
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
    .map((line) => `- ${line}`)
    .join("\n");
}

function buildCritiqueMarkdown(critique) {
  const strengths = extractSection(critique, "Strengths");
  const improvements = extractSection(critique, "Areas to Improve");
  const verdict = extractSection(critique, "One line verdict");

  return [
    "## Evaluation",
    strengths ? `### Strengths\n\n${toMarkdownList(strengths)}` : "### Strengths\n\nNo strengths provided.",
    improvements
      ? `### Areas to Improve\n\n${toMarkdownList(improvements)}`
      : "### Areas to Improve\n\nNo improvement notes provided.",
    `### Verdict\n\n${verdict || "No verdict provided."}`,
  ].join("\n\n");
}

const markdownComponents = {
  h2: ({ children }) => <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-950">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-5 mt-10 text-lg font-semibold tracking-tight text-slate-950">{children}</h3>,
  p: ({ children }) => <p className="mb-8 leading-[2.05] text-slate-700">{children}</p>,
  ul: ({ children }) => <ul className="mb-8 list-disc space-y-5 pl-6 text-slate-700">{children}</ul>,
  li: ({ children }) => <li className="leading-[2.05]">{children}</li>,
  strong: ({ children }) => <strong className="my-5 block font-semibold text-slate-950">{children}</strong>,
  hr: () => <hr className="my-14 border-slate-200 sm:my-16" />,
}

export default function CritiqueCard({ critique }) {
  if (!critique) return null;

  const score = extractScore(critique);
  const critiqueMarkdown = buildCritiqueMarkdown(critique);

  return (
    <article className="card-shell">
      <header className="card-header">
        <div className="card-icon">
          <MessageSquareQuote size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="card-title">Critique</h2>
          <p className="card-subtitle">Summary evaluation with strengths, gaps, and a final verdict.</p>
        </div>
        <div className="score-badge">{score}</div>
      </header>

      <div className="prose-card prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-li:marker:text-slate-400 prose-strong:text-slate-950">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {critiqueMarkdown}
        </ReactMarkdown>
      </div>
    </article>
  );
}
