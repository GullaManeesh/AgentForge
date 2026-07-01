import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";

export default function Critique({ critique }) {
  if (!critique) return null;

  return (
    <motion.article
      className="result-card result-card-accent"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
    >
      <div className="result-header">
        <div className="result-icon-wrap accent">
          <MessageSquareQuote size={18} />
        </div>
        <div>
          <h2>Critique</h2>
          <p>Sharp review with strengths and gaps.</p>
        </div>
      </div>

      <pre>{critique}</pre>
    </motion.article>
  );
}