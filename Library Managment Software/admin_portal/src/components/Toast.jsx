import { CheckCircle2 } from "lucide-react";
import { useAdmin } from "../context/AdminContext.jsx";

export default function Toast() {
  const { toast } = useAdmin();
  if (!toast) return null;

  return (
    <div className="toast-box" role="status">
      <CheckCircle2 size={16} color="var(--orange-active)" />
      <span>{toast}</span>
    </div>
  );
}
