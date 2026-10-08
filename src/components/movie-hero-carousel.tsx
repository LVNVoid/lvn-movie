import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Info, Play, Star } from 'lucide-react';
import { envConfig } from '@/constants/config';
import { getMovieLogo } from '@/services/movie-service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/types/movie';

interface MovieHeroCarouselProps {
  movies: Movie[];
}

export function MovieHeroCarousel({ movies }: MovieHeroCarouselProps) {
  const heroMovies = movies.filter((m) => Boolean(m.backdrop_path)).slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [movieLogos, setMovieLogos] = useState<Record<number, string | null>>({});

  const total = heroMovies.length;

  // Fetch official title logo graphic from TMDB for each movie in the hero carousel
  useEffect(() => {
    let isCancelled = false;

    async function loadLogos() {
      const results = await Promise.all(
        heroMovies.map(async (m) => {
          const logo = await getMovieLogo(m.id);
          return [m.id, logo] as const;
        }),
      );

      if (!isCancelled) {
        setMovieLogos(Object.fromEntries(results));
      }
    }

    if (heroMovies.length > 0) {
      loadLogos();
    }

    return () => {
      isCancelled = true;
    };
  }, [movies]);

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, [total, isPaused]);

  if (total === 0) return null;

  const currentMovie = heroMovies[currentIndex];
  const currentLogo = movieLogos[currentMovie.id];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <div
      className="group relative -mx-4 -mt-20 mb-12 h-[620px] w-screen max-w-none overflow-hidden bg-black sm:-mx-8 sm:h-[720px] lg:-mx-12 lg:h-[820px] xl:-mx-16"
      style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured Popular Movies"
    >
      {/* Background Images Layer with Crossfade */}
      {heroMovies.map((movie, index) => {
        const isActive = index === currentIndex;
        const backdropUrl = movie.backdrop_path
          ? `${envConfig.backdropBaseUrl}${movie.backdrop_path}`
          : `${envConfig.imageBaseUrl}${movie.poster_path}`;

        return (
          <div
            key={movie.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <img
              src={backdropUrl}
              alt={movie.title}
              className="h-full w-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        );
      })}

      {/* Fullscreen Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent sm:via-black/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />

      {/* Content Container (Edge to Edge with Comfortable Padding) */}
      <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col justify-end px-6 pb-14 sm:px-12 sm:pb-16 lg:px-16">
        <div className="max-w-2xl space-y-4">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-0.5 text-xs font-black tracking-wider text-white shadow-sm shadow-primary/40">
              TRENDING #{currentIndex + 1}
            </span>
            <span className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-bold text-emerald-400 backdrop-blur-md">
              4K ULTRA HD
            </span>
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 bg-black/60 px-2.5 py-0.5 text-xs font-bold text-amber-400 backdrop-blur-md border border-white/10"
            >
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span>{currentMovie.vote_average.toFixed(1)}</span>
            </Badge>
            {currentMovie.release_date && (
              <span className="text-xs font-semibold text-zinc-300">
                {new Date(currentMovie.release_date).getFullYear()}
              </span>
            )}
          </div>

          {/* Official Movie Title: uses official logo PNG from TMDB or stylized text fallback */}
          <div className="min-h-[80px] sm:min-h-[100px] flex items-end">
            {currentLogo ? (
              <img
                src={`${envConfig.imageBaseUrl}${currentLogo}`}
                alt={currentMovie.title}
                className="max-h-24 sm:max-h-32 md:max-h-36 lg:max-h-40 w-auto max-w-[85%] object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]"
                loading="eager"
              />
            ) : (
              <h2 className="text-3xl font-black tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
                {currentMovie.title}
              </h2>
            )}
          </div>

          {/* Synopsis */}
          <p className="line-clamp-2 text-sm text-zinc-300 drop-shadow sm:line-clamp-3 sm:text-base leading-relaxed">
            {currentMovie.overview || 'Synopsis is currently not available.'}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="gap-2 rounded-full bg-gradient-to-r from-[#d50032] to-[#ff3d2e] px-7 font-bold text-white shadow-lg shadow-primary/40 hover:opacity-95"
            >
              <Link
                to="/movie/$id"
                params={{ id: String(currentMovie.id) }}
              >
                <Play className="size-4 fill-white" />
                <span>Watch Now</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 rounded-full border-white/20 bg-black/40 px-6 font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
            >
              <Link
                to="/movie/$id"
                params={{ id: String(currentMovie.id) }}
              >
                <Info className="size-4" />
                <span>More Info</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Carousel Navigation Arrows & Indicators */}
        <div className="mt-8 flex items-center justify-between">
          {/* Indicators */}
          <div className="flex items-center gap-2">
            {heroMovies.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="size-9 rounded-full border-white/10 bg-black/50 text-white backdrop-blur-md hover:border-white/30 hover:bg-black/70 hover:text-white"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleNext}
              aria-label="Next slide"
              className="size-9 rounded-full border-white/10 bg-black/50 text-white backdrop-blur-md hover:border-white/30 hover:bg-black/70 hover:text-white"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
