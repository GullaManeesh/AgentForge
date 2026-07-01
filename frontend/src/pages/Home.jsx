import { useState } from "react";
import axios from "axios";
import { ArrowRight, BrainCircuit, ShieldCheck, Sparkles } from "lucide-react";

import SearchForm from "../components/SearchForm";
import Loading from "../components/Loading";
import ReportCard from "../components/ReportCard";
import CritiqueCard from "../components/CritiqueCard";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState("");
  const [critique, setCritique] = useState("");

  async function handleResearch(topic) {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${API_BASE_URL}/research`, { topic });

      setReport(response.data.report || "");
      setCritique(response.data.critique || "");
    } catch (err) {
      setError("Unable to generate research right now. Check the backend connection and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-panel relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            <Sparkles size={14} /> AI Research Workspace
          </div>

        <h1 className="hero-title mt-5">
          Modern research reports and structured critiques, powered by AI.
        </h1>



        <div className="hero-meta">
          <div className="meta-pill">
            <BrainCircuit size={16} /> Multi-agent workflow
          </div>
          <div className="meta-pill">
            <ShieldCheck size={16} /> Research-paper presentation
          </div>
          <div className="meta-pill">
            <ArrowRight size={16} /> Fast topic-to-report flow
          </div>
        </div>

        <SearchForm onSearch={handleResearch} loading={loading} />

        {!report && !critique && !loading ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-5 text-sm leading-8 text-slate-600">
            Enter a topic above to generate a report and critique.
          </div>
        ) : null}
      </section>

      {error ? (
        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {loading ? <Loading /> : null}

      <section className="section-grid">
        <div className="results-grid">
          <ReportCard report={report} />
          <CritiqueCard critique={critique} />
        </div>
      </section>
    </main>
  );
}