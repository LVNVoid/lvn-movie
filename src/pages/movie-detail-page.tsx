import { useParams, Link } from '@tanstack/react-router';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Play,
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
      <div className="relative mx-auto w-full max-w-[1920px] px-4 -mt-16 pt-16 pb-16 sm:px-10 lg:px-16">
        <Skeleton className="hidden sm:block mb-6 mt-4 h-9 w-24 rounded-full bg-[#121214]" />
        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-10">
          <Skeleton className="aspect-[2/3] -mx-4 -mt-16 sm:mx-0 sm:mt-0 w-auto sm:w-full rounded-none sm:rounded-xl bg-[#121214]" />
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
    <div className="relative pb-16 -mt-16">
      {/* Background Backdrop Blur Banner */}
      {backdropUrl && (
        <div className="absolute inset-0 top-0 h-[560px] w-full overflow-hidden opacity-30">
          <img
            src={backdropUrl}
            alt=""
            className="h-full w-full object-cover object-top blur-md"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-background" />
        </div>
      )}

      <div className="relative mx-auto w-full max-w-[1920px] px-4 pt-16 sm:pt-20 sm:px-10 lg:px-16">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="hidden sm:inline-flex -ml-2 mb-6 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <Link to="/">
            <ArrowLeft className="size-4" />
            <span>Back</span>
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] lg:gap-12">
          {/* Left Column: Poster / Banner & Action Buttons */}
          <div className="flex flex-col gap-4">
            <div className="group relative -mx-4 -mt-16 sm:mx-0 sm:mt-0 w-auto sm:w-full overflow-hidden rounded-none border-0 bg-[#0c0c0e] shadow-none sm:rounded-xl sm:border sm:border-white/10 sm:shadow-2xl sm:shadow-black">
              {/* Mobile Floating Back Button over Banner */}
              <div className="absolute left-4 top-20 z-20 sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="size-9 rounded-full border-white/15 bg-black/60 p-0 text-white backdrop-blur-md hover:bg-black/80"
                >
                  <Link to="/">
                    <ArrowLeft className="size-4" />
                    <span className="sr-only">Back</span>
                  </Link>
                </Button>
              </div>

              {/* Mobile Top Vignette for Transparent Header Legibility */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/40 to-transparent sm:hidden pointer-events-none z-10" />

              <img
                src={posterUrl}
                alt={movie.title}
                className="aspect-[2/3] w-full object-cover object-center"
              />

              {/* Mobile Subtle Bottom Gradient into Background */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/60 to-transparent sm:hidden" />
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
