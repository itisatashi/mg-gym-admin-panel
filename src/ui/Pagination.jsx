function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or less
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Show: 1 ... current-1, current, current+1 ... last
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between p-4 border-t border-border">
      {/* Showing info */}
      <span className="text-sm text-text-muted">
        Showing {startItem}-{endItem} of {totalItems} members
      </span>

      {/* Page controls */}
      <div className="flex items-center gap-2">
        {/* Prev button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm border border-border rounded-lg 
                     hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed 
                     transition-colors"
        >
          ← Prev
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className="px-2 text-text-muted">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 text-sm rounded-lg transition-colors
                ${
                  currentPage === page
                    ? "bg-accent text-white"
                    : "border border-border hover:bg-white/5"
                }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm border border-border rounded-lg 
                     hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed 
                     transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Pagination;
