import { CheckCircle2 } from "lucide-react";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Toast() {
  const { toast } = useLibrary();
  if (!toast) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <CheckCircle2 size={18} color="var(--gold)" />
      <span>{toast}</span>
    </div>
  );
}
