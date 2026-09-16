export default function StatCard({
  label,
  value,
  description,
  accent = "#062842",
  trend,
  trendPositive,
}) {
  return (
    <article className="stat" style={{ "--accent": accent }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>{label}</span>
        {trend && (
          <span
            style={{
              fontSize: "10px",
              fontFamily: "var(--mono)",
              fontWeight: 700,
              padding: "2px 6px",
              borderRadius: "4px",
              background: trendPositive ? "var(--green-bg)" : "var(--paper-deep)",
              color: trendPositive ? "var(--green)" : "var(--muted)",
            }}
          >
            {trend}
          </span>
        )}
      </div>
      <strong>{value}</strong>
      <small>{description}</small>
    </article>
  );
}
