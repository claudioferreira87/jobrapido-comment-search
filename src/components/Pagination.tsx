interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="rounded-lg shadow p-4 mt-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      <p className="text-sm text-center mt-2">
        Showing {(currentPage - 1) * 20 + 1}-
        {Math.min(currentPage * 20, totalPages * 20)} results
      </p>
    </div>
  );
};
