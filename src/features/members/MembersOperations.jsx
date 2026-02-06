import FilterSelect from "../../ui/FilterSelect";
import SearchInput from "../../ui/SearchInput";
import AddMemberForm from "./AddMemberForm";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "expiring", label: "Expiring" },
  { value: "expired", label: "Expired" },
];

function MembersOperations() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <SearchInput paramName="search" placeholder="Search members..." />

        <FilterSelect
          paramName="status"
          options={statusOptions}
          defaultLabel="All Status"
        />
      </div>
      <AddMemberForm />
    </div>
  );
}

export default MembersOperations;
