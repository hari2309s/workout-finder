"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}) => {
  if (totalItems < 20) return null;

  const currentPageNum = Number(currentPage);
  const totalPagesNum = Number(totalPages);

  const getVisiblePages = () => {
    const range = 2;
    const pages: (number | string)[] = [];
    for (
      let i = Math.max(1, currentPageNum - range);
      i <= Math.min(totalPagesNum, currentPageNum + range);
      i++
    ) {
      pages.push(i);
    }

    const firstPage = pages[0];
    const lastPage = pages[pages.length - 1];

    if (typeof firstPage === "number" && firstPage > 2) pages.unshift("...");
    if (typeof firstPage === "number" && firstPage !== 1) pages.unshift(1);
    if (typeof lastPage === "number" && lastPage < totalPagesNum - 1)
      pages.push("...");
    if (typeof lastPage === "number" && lastPage !== totalPagesNum)
      pages.push(totalPagesNum);

    return pages;
  };

  const visiblePages = getVisiblePages();
  const pageSize = 20;

  return (
    <div className="mx-auto flex max-w-fit flex-col items-center justify-center space-y-3 rounded-lg bg-white p-4 shadow-lg sm:sticky sm:bottom-0">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPageNum === 1}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-80 text-teal-0 transition-all duration-200 hover:bg-teal-60 hover:text-teal-100 disabled:opacity-50"
          aria-label="Go to first page"
        >
          <ChevronsLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => onPageChange(Math.max(1, currentPageNum - 1))}
          disabled={currentPageNum === 1}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-80 text-teal-0 transition-all duration-200 hover:bg-teal-60 hover:text-teal-100 disabled:opacity-50"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        {visiblePages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`relative flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 ${
              typeof page === "number"
                ? currentPageNum === page
                  ? "border-2 border-teal-20 bg-teal-0 font-semibold text-white shadow-sm"
                  : "bg-teal-90 text-teal-0 hover:bg-teal-70 hover:text-teal-0"
                : "cursor-default bg-transparent text-teal-40"
            }`}
            aria-label={typeof page === "number" ? `Go to page ${page}` : "..."}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            onPageChange(Math.min(totalPagesNum, currentPageNum + 1))
          }
          disabled={currentPageNum === totalPagesNum}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-80 text-teal-0 transition-all duration-200 hover:bg-teal-60 hover:text-teal-100 disabled:opacity-50"
          aria-label="Go to next page"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <button
          onClick={() => onPageChange(totalPagesNum)}
          disabled={currentPageNum === totalPagesNum}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-80 text-teal-0 transition-all duration-200 hover:bg-teal-60 hover:text-teal-100 disabled:opacity-50"
          aria-label="Go to last page"
        >
          <ChevronsRight className="h-6 w-6" />
        </button>
      </div>
      <span className="text-sm text-teal-dark-50">
        Showing {Math.max(1, (currentPageNum - 1) * pageSize + 1)} to{" "}
        {Math.min(currentPageNum * pageSize, totalItems)} of {totalItems}{" "}
        workouts
      </span>
    </div>
  );
};

export default Pagination;
