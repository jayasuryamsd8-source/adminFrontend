import { memo } from "react";

function Pagination({
  page,
  limit,
  total,
  onPageChange,
}) {
  // Defensive checks (never trust props blindly)
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));

  // If only one page OR no data, pagination is unnecessary
  if (total <= safeLimit) return null;

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  function goPrev() {
    if (!isFirst) onPageChange(page - 1);
  }

  function goNext() {
    if (!isLast) onPageChange(page + 1);
  }

  return (
    <nav
      className="flex items-center justify-between mt-4"
      aria-label="Pagination Navigation"
    >
      {/* Page info */}
      <p
        className="text-sm text-gray-600"
        aria-live="polite"
      >
        Page <strong>{page}</strong> of{" "}
        <strong>{totalPages}</strong> —{" "}
        <strong>{total}</strong> records
      </p>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          aria-disabled={isFirst}
          aria-label="Previous page"
          className="
            px-3 py-1 border rounded
            hover:bg-gray-100
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          Prev
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={isLast}
          aria-disabled={isLast}
          aria-label="Next page"
          className="
            px-3 py-1 border rounded
            hover:bg-gray-100
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          Next
        </button>
      </div>
    </nav>
  );
}

// Memoized to prevent unnecessary re-renders
export default memo(Pagination);
