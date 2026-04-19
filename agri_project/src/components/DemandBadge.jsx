export default function DemandBadge({ demand = "Medium" }) {
  const cls = String(demand).toLowerCase();
  return <span className={`demand-badge demand-${cls}`}>{demand} Demand</span>;
}