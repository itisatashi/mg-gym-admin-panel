import PlanPrices from "../features/settings/PlanPrices";
import { useUser } from "../features/authentication/useUser";
import ManageStaff from "../features/settings/ManageStaff";

function Settings() {
  const { isOwner } = useUser();

  return (
    <div className="flex flex-col gap-8 max-w-2xl ">
      {/* Plan Prices - Everyone can see */}
      <PlanPrices />

      {/* Manage Staff - Owner Only */}
      {isOwner && <ManageStaff />}
    </div>
  );
}

export default Settings;
