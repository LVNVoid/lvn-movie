import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from '@/services/movie-service';
import type { Movie } from '@/types/movie';

export function useMovies(query = '', page = 1) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const cleanQuery = query.trim();
        const data = cleanQuery
          ? await searchMovies(cleanQuery, page)
          : await getPopularMovies(page);

        if (!isCancelled) {
          setMovies(data.results);
          // TMDB limits maximum to 500 pages
          setTotalPages(Math.min(data.total_pages, 500));
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load movies');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchMovies();

    return () => {
      isCancelled = true;
    };
  }, [query, page]);

  return { movies, totalPages, isLoading, error };
}
