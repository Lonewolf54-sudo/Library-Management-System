export default function StatPill({
  label,
  value,
  variant = "gray", // "gray", "navy", "orange"
  hasBadge = false,
  badgeText = "Review",
}) {
  return (
    <div className={`stat-pill-box ${variant}`}>
      {hasBadge && <span className="review-badge">{badgeText}</span>}
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}
