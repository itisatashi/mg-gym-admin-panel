import { HiExclamationTriangle } from "react-icons/hi2";
import { getDaysUntil, isExpiringSoon } from "../../helpers/dateHelpers";
import { useAllMembers } from "./useAllMembers";
import Spinner from "../../ui/Spinner";
import ExpiringMemberRow from "./ExpiringMemberRow";

function ExpiringMembers() {
  const { members, isLoading } = useAllMembers();

  if (isLoading) return <Spinner size={60} />;

  const expiringMembers =
    members
      ?.filter((member) => isExpiringSoon(member.endDate))
      .sort((a, b) => getDaysUntil(a.endDate) - getDaysUntil(b.endDate)) || [];

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-5 border-b border-border">
        <div className="p-2 bg-warning/20 rounded-lg">
          <HiExclamationTriangle className="text-xl text-warning" />
        </div>
        <div>
          <h2 className="font-semibold">Expiring Soon</h2>
          <p className="text-sm text-text-muted">
            {expiringMembers.length} members expiring in the next 7 days
          </p>
        </div>
      </div>

      {/* List */}
      {expiringMembers.length === 0 ? (
        <div className="p-8 text-center text-text-muted">
          No members expiring this week 🎉
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          {expiringMembers.map((member) => (
            <ExpiringMemberRow key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpiringMembers;
