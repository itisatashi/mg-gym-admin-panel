import { HiUsers, HiCheckCircle, HiClock, HiSparkles } from "react-icons/hi2";
import Spinner from "../../ui/Spinner";
import { isActive, isThisMonth, isThisWeek } from "../../helpers/dateHelpers";
import StatCard from "../../ui/StatCard";
import { useAllMembers } from "./useAllMembers";

function DashboardStats() {
  const { members, isLoading } = useAllMembers();

  if (isLoading) return <Spinner size={60} />;

  //  Calculate stats
  const totalMembers = members?.length || 0;

  const activeMembers =
    members?.filter((member) => isActive(member.endDate)).length || 0;

  const expiringThisWeek =
    members?.filter(
      (member) => isActive(member.endDate) && isThisWeek(member.endDate)
    ).length || 0;

  const newThisMonth =
    members?.filter((member) => isThisMonth(member.startDate)).length || 0;

  return (
    <div className="grid grid-cols-4 gap-6">
      <StatCard
        icon={<HiUsers />}
        label="Total Members"
        value={totalMembers}
        color="accent"
      />
      <StatCard
        icon={<HiCheckCircle />}
        label="Active Plans"
        value={activeMembers}
        color="green"
      />
      <StatCard
        icon={<HiClock />}
        label="Expiring This Week"
        value={expiringThisWeek}
        color="yellow"
      />
      <StatCard
        icon={<HiSparkles />}
        label="New This Month"
        value={newThisMonth}
        color="blue"
      />
    </div>
  );
}

export default DashboardStats;
