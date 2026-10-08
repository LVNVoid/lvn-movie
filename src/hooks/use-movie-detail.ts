import { useEffect, useState } from 'react';
import { getMovieDetail } from '@/services/movie-service';
import type { MovieDetail } from '@/types/movie';

export function useMovieDetail(id: string) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchDetail() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMovieDetail(id);
        if (!isCancelled) {
          setMovie(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load movie details',
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      fetchDetail();
    }

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return { movie, isLoading, error };
}
