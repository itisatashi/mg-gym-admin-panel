import DashboardStats from "../features/dashboard/DashboardStats";
import ExpiringMembers from "../features/dashboard/ExpiringMembers";

function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardStats />
      <ExpiringMembers />
    </div>
  );
}

export default Dashboard;
