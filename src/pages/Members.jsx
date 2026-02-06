import MembersOperations from "../features/members/MembersOperations";
import MembersTable from "../features/members/MembersTable";

function Members() {
  return (
    <div className="flex flex-col gap-6">
      <MembersOperations />
      <MembersTable />
    </div>
  );
}

export default Members;
