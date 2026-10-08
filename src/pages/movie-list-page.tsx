import { useEffect, useState } from 'react';
import { AlertCircle, Film } from 'lucide-react';
import { useMovies } from '@/hooks/use-movie';
import { useDebounce } from '@/hooks/use-debounce';
import { MovieCard } from '@/components/movie-card';
import { SearchBar } from '@/components/search-bar';
import { Pagination } from '@/components/pagination';
import { MovieHeroCarousel } from '@/components/movie-hero-carousel';
import { Skeleton } from '@/components/ui/skeleton';

const GENRE_QUICK_FILTERS = [
  { label: 'All Movies', query: '' },
  { label: 'Action', query: 'Action' },
  { label: 'Sci-Fi', query: 'Sci-Fi' },
  { label: 'Animation', query: 'Animation' },
  { label: 'Horror', query: 'Horror' },
  { label: 'Drama', query: 'Drama' },
];

export function MovieListPage() {
  const [searchInput, setSearchInput] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [page, setPage] = useState(1);

  const activeQuery = searchInput || activeFilter;
  const debouncedQuery = useDebounce(activeQuery, 500);

  const { movies, totalPages, isLoading, error } = useMovies(
    debouncedQuery,
    page,
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterClick = (query: string) => {
    setActiveFilter(query);
    setSearchInput('');
  };

  const isHomeFirstPage = !debouncedQuery && page === 1;

  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 pb-20 sm:px-8 lg:px-12 xl:px-16">
      {/* Skeleton Hero Banner on initial load */}
      {isLoading && isHomeFirstPage && (
        <div className="-mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 -mt-16 mb-10">
          <Skeleton className="h-[520px] w-full rounded-none sm:h-[580px] lg:h-[640px] bg-[#121214]" />
        </div>
      )}

      {/* Hero Carousel Fullscreen Style */}
      {!isLoading && isHomeFirstPage && movies.length > 0 && (
        <MovieHeroCarousel movies={movies} />
      )}

      {/* Section Header, Quick Category Filters & Search Bar */}
      <div className="mb-8 flex flex-col gap-5 border-b border-white/5 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {debouncedQuery ? `Results for "${debouncedQuery}"` : 'Popular Movies'}
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              {debouncedQuery
                ? 'Curated results matching your keyword'
                : 'Highest rated and most watched titles today'}
            </p>
          </div>

          <SearchBar
            value={searchInput}
            onChange={(val) => {
              setSearchInput(val);
              if (val) setActiveFilter('');
            }}
          />
        </div>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {GENRE_QUICK_FILTERS.map((f) => {
            const isSelected =
              (!activeQuery && f.query === '') ||
              activeFilter === f.query ||
              (searchInput && searchInput.toLowerCase() === f.query.toLowerCase());

            return (
              <button
                key={f.label}
                type="button"
                onClick={() => handleFilterClick(f.query)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'border border-white/10 bg-[#121216] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Skeleton Loading */}
      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 min-[1800px]:grid-cols-8">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-[2/3] w-full rounded-xl bg-[#121214]" />
              <Skeleton className="h-4 w-3/4 rounded bg-[#121214]" />
              <Skeleton className="h-3 w-1/3 rounded bg-[#121214]" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <AlertCircle className="size-6" />
          </div>
          <p className="max-w-md text-sm text-zinc-400">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && movies.length === 0 && (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-white/5 text-zinc-500">
            <Film className="size-6" />
          </div>
          <p className="text-base font-semibold text-white">
            No movies found
          </p>
          <p className="text-xs text-zinc-500">
            Try searching for another keyword or selecting a different genre.
          </p>
        </div>
      )}

      {/* Movie Grid & Pagination */}
      {!isLoading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 min-[1800px]:grid-cols-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </>
      )}
    </section>
  );
}
