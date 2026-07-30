import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-black disabled:opacity-30 hover:bg-gray-600"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
            p === page
              ? "bg-gray-100 text-black"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-black disabled:opacity-30 hover:bg-gray-600"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}