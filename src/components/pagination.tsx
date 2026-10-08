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

  return (
    <nav
      aria-label="Pagination Navigation"
      className="mt-12 flex items-center justify-center gap-3"
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handlePrev}
        disabled={currentPage <= 1 || isLoading}
        className="rounded-full border-white/10 bg-[#121214] px-4 text-xs font-semibold text-zinc-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
      >
        <ChevronLeft className="size-4" />
        <span>Previous</span>
      </Button>

      <span className="flex min-h-[44px] items-center px-3 text-xs text-zinc-400">
        Page <strong className="mx-1.5 text-white">{currentPage}</strong> of{' '}
        <span className="ml-1.5 text-zinc-300">{totalPages}</span>
      </span>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage >= totalPages || isLoading}
        className="rounded-full border-white/10 bg-[#121214] px-4 text-xs font-semibold text-zinc-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
      >
        <span>Next</span>
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
