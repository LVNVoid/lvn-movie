import { Link } from '@tanstack/react-router';
import { Play, Star } from 'lucide-react';
import { envConfig } from '@/constants/config';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? envConfig.imageBaseUrl + movie.poster_path
    : 'https://placehold.co/500x750?text=No+Poster';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  return (
    <Link
      to="/movie/$id"
      params={{ id: String(movie.id) }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-[#0c0c0e] border border-white/5 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1.5"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
        <img
          src={posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient shadow overlay on poster bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Quality Tag (Top Left) */}
        <div className="absolute left-2 top-2 rounded bg-emerald-600/90 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
          HD
        </div>

        {/* Rating Badge (Top Right) */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full border border-white/10 bg-black/75 px-2 py-0.5 text-[11px] font-bold text-amber-400 backdrop-blur-md">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>

        {/* Hover Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/60 transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 size-5 fill-white" />
          </div>
        </div>
      </div>

      {/* Movie Information Caption */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-100 transition-colors duration-200 group-hover:text-primary">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center justify-between text-xs text-zinc-400">
          <span>{releaseYear}</span>
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-400 font-medium">
            Movie
          </span>
        </div>
      </div>
    </Link>
  );
}
