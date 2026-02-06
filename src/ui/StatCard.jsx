function StatCard({ icon, label, value, color = "accent" }) {
  const colorClasses = {
    accent: "from-accent to-cyan-400",
    green: "from-green-500 to-emarald-400",
    yellow: "from-yellow-500 to-orange-400",
    blue: "from-blue-500 to-indigo-400",
  };

  return (
    <div className="card p-6 flex items-center gap-4">
      <div
        className={`p-4 rounded-xl bg-linear-to-br ${colorClasses[color]} text-white text-2xl`}
      >
        {icon}
      </div>

      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-text-muted">{label}</p>
      </div>
    </div>
  );
}

export default StatCard;
