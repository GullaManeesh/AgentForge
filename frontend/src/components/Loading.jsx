import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="loading-shell flex items-center gap-4">
      <LoaderCircle className="h-5 w-5 animate-spin text-slate-950" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-950">Researching...</p>
        <div className="loading-bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}