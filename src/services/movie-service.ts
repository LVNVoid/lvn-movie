import { api } from '@/services/api';
import type { MovieDetail, MovieResponse } from '@/types/movie';

export async function getPopularMovies(page = 1): Promise<MovieResponse> {
  const response = await api.get<MovieResponse>('/movie/popular', {
    params: {
      page,
      language: 'en-US',
    },
  });

  return response.data;
}

export async function getMovieDetail(
  id: string | number,
): Promise<MovieDetail> {
  const response = await api.get<MovieDetail>(`/movie/${id}`, {
    params: {
      language: 'en-US',
    },
  });

  return response.data;
}

export async function searchMovies(
  query: string,
  page = 1,
): Promise<MovieResponse> {
  const response = await api.get<MovieResponse>('/search/movie', {
    params: {
      query,
      page,
      language: 'en-US',
    },
  });

  return response.data;
}

export async function getMovieLogo(
  id: string | number,
): Promise<string | null> {
  try {
    const response = await api.get<{
      logos?: Array<{ file_path: string; iso_639_1: string }>;
    }>(`/movie/${id}/images`);

    const logos = response.data.logos;
    if (!logos || logos.length === 0) return null;

    // Prioritaskan logo bahasa Inggris ('en') atau logo pertama yang tersedia
    const englishLogo = logos.find((l) => l.iso_639_1 === 'en');
    const selectedLogo = englishLogo || logos[0];

    return selectedLogo?.file_path || null;
  } catch {
    return null;
  }
}
