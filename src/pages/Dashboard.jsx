import DashboardStats from "../features/dashboard/DashboardStats";
import ExpiringMembers from "../features/dashboard/ExpiringMembers";
import DailyVisits from "../features/dashboard/DailyVisits";
import RevenueOverview from "../features/dashboard/RevenueOverview";
import PlanDistributionChart from "../features/dashboard/PlanDistributionChart";
import { useUser } from "../features/authentication/useUser";

function Dashboard() {
  const { isOwner } = useUser();

  return (
    <div className="flex flex-col gap-8">
      <DashboardStats />
      <ExpiringMembers />
      <DailyVisits />

      {isOwner && (
        <div className="grid grid-cols-2 gap-5">
          <RevenueOverview />
          <PlanDistributionChart />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
