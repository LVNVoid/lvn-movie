export const envConfig = {
  apiBaseUrl: import.meta.env.VITE_TMDB_API_URL as string,
  accessToken: import.meta.env.VITE_TMDB_ACCESS_TOKEN as string,
  imageBaseUrl: import.meta.env.VITE_TMDB_IMAGE_BASE_URL as string,
  backdropBaseUrl:
    (import.meta.env.VITE_TMDB_BACKDROP_BASE_URL as string) ||
    'https://image.tmdb.org/t/p/original',
};
