import { useParams, Link } from '@tanstack/react-router';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Play,
  Server,
  Star,
  Tv,
} from 'lucide-react';
import { useMovieDetail } from '@/hooks/use-movie-detail';
import { envConfig } from '@/constants/config';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function MovieDetailPage() {
  const { id } = useParams({ from: '/movie/$id' });
  const { movie, isLoading, error } = useMovieDetail(id);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[1920px] px-6 py-8 sm:px-10 lg:px-16">
        <Skeleton className="mb-6 h-9 w-24 rounded-full bg-[#121214]" />
        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-10">
          <Skeleton className="aspect-[2/3] w-full rounded-xl bg-[#121214]" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-3/4 rounded-lg bg-[#121214]" />
            <Skeleton className="h-5 w-1/2 rounded bg-[#121214]" />
            <div className="flex gap-2">
              <Skeleton className="h-7 w-20 rounded-full bg-[#121214]" />
              <Skeleton className="h-7 w-20 rounded-full bg-[#121214]" />
            </div>
            <Skeleton className="h-44 w-full rounded-xl bg-[#121214]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm text-primary">{error || 'Movie not found'}</p>
        <Button
          variant="outline"
          asChild
          className="rounded-full border-white/10"
        >
          <Link to="/">
            <ArrowLeft className="size-4" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? envConfig.imageBaseUrl + movie.poster_path
    : 'https://placehold.co/500x750?text=No+Poster';

  const backdropUrl = movie.backdrop_path
    ? `${envConfig.backdropBaseUrl}${movie.backdrop_path}`
    : null;

  return (
    <div className="relative pb-16">
      {/* Background Backdrop Blur Banner */}
      {backdropUrl && (
        <div className="absolute inset-0 -top-20 h-[500px] w-full overflow-hidden opacity-25">
          <img
            src={backdropUrl}
            alt=""
            className="h-full w-full object-cover object-top blur-md"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>
      )}

      <div className="relative mx-auto w-full max-w-[1920px] px-4 pt-4 sm:px-10 lg:px-16">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-2 mb-6 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <Link to="/">
            <ArrowLeft className="size-4" />
            <span>Back</span>
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] lg:gap-12">
          {/* Left Column: Poster & Action Buttons */}
          <div className="flex flex-col gap-4">
            <div className="group relative mx-auto max-w-[280px] sm:max-w-none w-full overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0e] shadow-2xl shadow-black">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full object-cover"
              />
            </div>

            <Button
              size="lg"
              className="gap-2 rounded-xl bg-gradient-to-r from-[#d50032] to-[#ff3d2e] py-6 min-h-[48px] font-bold text-white shadow-lg shadow-primary/30 hover:opacity-95"
            >
              <Play className="size-5 fill-white" />
              <span>Watch Now</span>
            </Button>

            {/* Server Selectors */}
            <div className="rounded-xl border border-white/5 bg-[#0e0e11] p-3.5">
              <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-zinc-400">
                <Server className="size-3.5 text-primary" />
                <span>CHOOSE STREAMING SERVER</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-lg border border-primary/40 bg-primary/10 py-2 font-semibold text-white transition hover:bg-primary/20"
                >
                  Server 1 (VIP)
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-white/5 bg-white/5 py-2 font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white"
                >
                  Server 2 (Fast)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Metadata & Synopsis */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="mt-2 text-base italic text-zinc-400">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}
            </div>

            {/* Genre Chips */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-6 rounded-xl border border-white/5 bg-[#0e0e11] px-5 py-3.5 text-sm">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span>{movie.vote_average.toFixed(1)}</span>
                <span className="text-xs text-zinc-500 font-normal">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Calendar className="size-4 text-zinc-500" />
                <span>
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Clock className="size-4 text-zinc-500" />
                <span>{movie.runtime} Mins</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary/20 border border-primary/30 px-2 py-0.5 text-[11px] font-bold text-primary">
                  MOVIE
                </span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
                  {movie.status || 'Released'}
                </span>
              </div>
            </div>

            {/* Synopsis Box */}
            <div className="rounded-xl border border-white/5 bg-[#0c0c0e] p-5">
              <h2 className="mb-2.5 text-base font-bold text-white flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-primary" />
                <span>Synopsis</span>
              </h2>
              <p className="leading-relaxed text-sm text-zinc-300">
                {movie.overview ||
                  'Synopsis is currently not available for this movie.'}
              </p>
            </div>

            {/* Player Preview Box */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#08080a] shadow-xl">
              {backdropUrl ? (
                <img
                  src={backdropUrl}
                  alt=""
                  className="h-full w-full object-cover opacity-40"
                />
              ) : (
                <div className="h-full w-full bg-zinc-950" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40">
                <button
                  type="button"
                  className="flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/50 transition-transform duration-300 hover:scale-110"
                  aria-label="Play Movie"
                >
                  <Play className="ml-1 size-7 fill-white" />
                </button>
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
                  <Tv className="size-3.5 text-emerald-400" />
                  <span>Click button to start streaming (HD 1080p)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
