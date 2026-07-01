import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchForm({ onSearch, loading = false }) {
  const [topic, setTopic] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!topic.trim()) return;

    onSearch(topic);
    setTopic("");
  }

  return (
    <form className="search-panel mt-6" onSubmit={submit}>
      <div className="search-row">
        <input
          className="search-input"
          type="text"
          placeholder="Enter research topic..."
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          disabled={loading}
        />

        <button className="search-button" type="submit" disabled={loading || !topic.trim()}>
          <Search size={18} />
          <span>{loading ? "Working..." : "Research"}</span>
        </button>
      </div>
    </form>
  );
}