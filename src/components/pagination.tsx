import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate up to 5 page numbers around the current page
  const pageNumbers: number[] = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      aria-label="Pagination Navigation"
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handlePrev}
        disabled={currentPage <= 1 || isLoading}
        className="rounded-full border-white/10 bg-[#121216] px-3.5 text-xs font-semibold text-zinc-300 hover:border-white/25 hover:bg-white/10 hover:text-white disabled:opacity-30"
      >
        <ChevronLeft className="size-3.5 mr-1" />
        <span>Prev</span>
      </Button>

      {startPage > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={isLoading}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#121216] text-xs font-semibold text-zinc-400 hover:text-white"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-1 text-xs text-zinc-600">...</span>
          )}
        </>
      )}

      {pageNumbers.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            className={`flex size-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                : 'border border-white/10 bg-[#121216] text-zinc-400 hover:border-white/25 hover:text-white'
            }`}
          >
            {page}
          </button>
        );
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-1 text-xs text-zinc-600">...</span>
          )}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={isLoading}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#121216] text-xs font-semibold text-zinc-400 hover:text-white"
          >
            {totalPages}
          </button>
        </>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage >= totalPages || isLoading}
        className="rounded-full border-white/10 bg-[#121216] px-3.5 text-xs font-semibold text-zinc-300 hover:border-white/25 hover:bg-white/10 hover:text-white disabled:opacity-30"
      >
        <span>Next</span>
        <ChevronRight className="size-3.5 ml-1" />
      </Button>
    </nav>
  );
}
