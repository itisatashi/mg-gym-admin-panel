import { useEffect } from "react";
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
  const { getParam, setParam } = useUrlParams();
  const searchQuery = getParam("search");
  const statusFilter = getParam("status");
  const currentPage = Number(getParam("page")) || 1;

  useEffect(() => {
    if (currentPage !== 1) {
      setParam("page", "");
    }
  }, [searchQuery, statusFilter]);

  // Fetch data from Supabase
  const { members, totalCount, isLoading, error, prefetchPage } = useMembers({
    page: currentPage,
    search: searchQuery,
    status: statusFilter,
  });

  // Calculate total pages from SERVER count
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // PREFETCH next and prev
  useEffect(() => {
    if (currentPage < totalPages) {
      prefetchPage(currentPage + 1);
    }

    if (currentPage > 1) {
      prefetchPage(currentPage - 1);
    }
  }, [currentPage, totalPages, prefetchPage]);

  // Loading state
  if (isLoading) return <Spinner size={80} />;

  // Error state
  if (error) return <ErrorState message={error.message} />;

  // Empty state
  if (members.length === 0) return <Empty message="No members found" />;

  function handlePageChange(page) {
    setParam("page", page === 1 ? "" : String(page));
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
            {members.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      </div>
    </Menus>
  );
}

export default MembersTable;
