import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { HiChartPie } from "react-icons/hi2";

import { useAllMembers } from "./useAllMembers";
import { PLAN_TYPES } from "../../helpers/planTypes";
import { isActive } from "../../helpers/dateHelpers";
import Spinner from "../../ui/Spinner";

const COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b"];

function PlanDistributionChart() {
  const { members, isLoading } = useAllMembers();

  if (isLoading) return <Spinner size={60} />;

  // Only count active members
  const activeMembers = members?.filter((m) => isActive(m.endDate)) || [];
  const total = activeMembers.length;

  // Group by plan type
  const data = PLAN_TYPES.map((plan, i) => ({
    name: plan.label,
    value: activeMembers.filter((m) => m.planType === plan.value).length,
    color: COLORS[i],
  })).filter((d) => d.value > 0);

  return (
    <div className="card p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/20 rounded-lg">
          <HiChartPie className="text-xl text-accent" />
        </div>
        <h2 className="text-lg font-semibold">Active Members by Plan</h2>
      </div>

      {data.length === 0 ? (
        <p className="text-center text-text-muted py-10">
          No active members yet
        </p>
      ) : (
        <>
          {/* Donut Chart */}
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                dataKey="value"
                paddingAngle={3}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "14px",
                }}
                formatter={(value, name) => [`${value} members`, name]}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-col gap-2 mt-4">
            {data.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center justify-between text-sm"
              >``
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: entry.color }}
                  />
                  <span className="text-text-secondary">{entry.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{entry.value}</span>
                  <span className="text-text-muted w-12 text-right">
                    {Math.round((entry.value / total) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PlanDistributionChart;
