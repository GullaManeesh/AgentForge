import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Report({ report }) {
  if (!report) return null;

  return (
    <motion.article
      className="result-card"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="result-header">
        <div className="result-icon-wrap">
          <FileText size={18} />
        </div>
        <div>
          <h2>Research Report</h2>
          <p>Structured findings ready for review.</p>
        </div>
      </div>

      <pre>{report}</pre>
    </motion.article>
  );
}