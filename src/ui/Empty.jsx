export default function EmptyState({ message = "No data found" }) {
  return <div className="card p-8 text-center text-text-muted">{message}</div>;
}
