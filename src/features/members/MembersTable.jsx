import { useState } from "react";
import { useUrlParams } from "../../hooks/useUrlParams";

import MemberRow from "./MemberRow";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";

import { useMembers } from "./useMembers";
import Spinner from "../../ui/Spinner";
import ErrorState from "../../ui/ErrorState";
import Empty from "../../ui/Empty";

import { PAGE_SIZE } from "../../helpers/constants";

function MembersTable() {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
  const { getParam } = useUrlParams();
  const searchQuery = getParam("search").toLocaleLowerCase();
  const statusFilter = getParam("status");

  // Fetch data from Supabase
  const { members, isLoading, error } = useMembers();
  if (isLoading) return <Spinner size={80} />;
  if (error) return <ErrorState message={error.message} />;

  // Filter based on the URL
  const filteredMembers = (members || []).filter((member) => {
    const matchesSearch = member.fullName
      .toLocaleLowerCase()
      .includes(searchQuery);

    const matchesStatus = !statusFilter || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalMembers = filteredMembers.length;
  const totalPages = Math.ceil(totalMembers / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  // Empty state
  if (filteredMembers.length === 0) {
    return <Empty message="No members found" />;
  }

  return (
    <Menus>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-text-muted text-sm">
              <th className="p-4 font-medium">Member</th>
              <th className="p-4 font-medium">Phone</th>
              <th className="p-4 font-medium">Plan</th>
              <th className="p-4 font-medium">Start Date</th>
              <th className="p-4 font-medium">End Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalMembers}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>
    </Menus>
  );
}

export default MembersTable;
