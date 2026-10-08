import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies, TV shows..."
        className="h-10 w-full rounded-full border border-white/10 bg-[#121216] pl-10 pr-12 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-primary/60 focus:bg-[#16161b] focus:ring-2 focus:ring-primary/20"
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onChange('')}
          className="absolute right-1.5 top-1/2 size-7 min-h-0 min-w-0 -translate-y-1/2 rounded-full text-zinc-400 hover:text-white"
          aria-label="Clear search"
        >
          <X className="size-3.5" />
        </Button>
      ) : (
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
          /
        </kbd>
      )}
    </div>
  );
}
