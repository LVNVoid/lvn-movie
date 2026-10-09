import { useEffect, useMemo, useState } from 'react';
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
  const heroMovies = useMemo(
    () => movies.filter((m) => Boolean(m.backdrop_path)).slice(0, 5),
    [movies],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [movieLogos, setMovieLogos] = useState<Record<number, string | null>>({});

  const total = heroMovies.length;

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
  }, [heroMovies]);

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
      className="group relative -mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 -mt-16 mb-10 h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden bg-black"
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
              className="h-full w-full object-cover object-center sm:object-[center_20%]"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        );
      })}

      {/* Precision Vignettes: Only subtle bottom fade on mobile for title contrast, leave full banner visible */}
      <div className="hidden sm:block absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-44 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-16 sm:h-28 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />

      {/* Hero Content (Positioned cleanly with generous vertical room) */}
      <div className="relative z-20 mx-auto flex h-full w-full max-w-[1920px] flex-col justify-end px-5 pb-8 sm:px-12 sm:pb-16 lg:px-16">
        <div className="max-w-xl sm:max-w-2xl space-y-3 sm:space-y-3.5">
          {/* Metadata Badges (Responsive Wrap) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-primary px-2.5 sm:px-3 py-0.5 text-[11px] sm:text-xs font-bold text-white shadow-sm shadow-primary/40">
              #{currentIndex + 1} Trending Today
            </span>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs font-bold text-amber-400 backdrop-blur-md"
            >
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <span>{currentMovie.vote_average.toFixed(1)}</span>
            </Badge>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-zinc-300 backdrop-blur-md">
              4K UHD
            </span>
            {currentMovie.release_date && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-zinc-300 backdrop-blur-md">
                {new Date(currentMovie.release_date).getFullYear()}
              </span>
            )}
          </div>

          {/* Official Movie Title Logo or Heading */}
          <div className="py-0.5 min-h-[50px] sm:min-h-[84px] flex items-center">
            {currentLogo ? (
              <img
                src={`${envConfig.imageBaseUrl}${currentLogo}`}
                alt={currentMovie.title}
                onError={() =>
                  setMovieLogos((prev) => ({ ...prev, [currentMovie.id]: null }))
                }
                className="h-12 sm:h-20 lg:h-26 w-auto max-w-[85%] object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]"
                loading="eager"
              />
            ) : (
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md">
                {currentMovie.title}
              </h2>
            )}
          </div>

          {/* Synopsis */}
          <p className="line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm text-zinc-300 drop-shadow leading-relaxed max-w-lg">
            {currentMovie.overview || 'Synopsis is currently not available.'}
          </p>

          {/* CTA Buttons (Mobile Responsive Sizing) */}
          <div className="flex items-center gap-2.5 sm:gap-3 pt-1.5 w-full sm:w-auto">
            <Button
              asChild
              className="flex-1 sm:flex-initial gap-2 rounded-full bg-primary px-6 py-2.5 min-h-[44px] font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-transform active:scale-95 sm:hover:scale-105"
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
              className="flex-1 sm:flex-initial gap-2 rounded-full border-white/20 bg-black/40 px-5 py-2.5 min-h-[44px] font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:text-white active:scale-95"
            >
              <Link
                to="/movie/$id"
                params={{ id: String(currentMovie.id) }}
              >
                <Info className="size-4" />
                <span>Details</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Carousel Bottom Bar: Indicators & Responsive Arrows */}
        <div className="mt-5 sm:mt-6 flex items-center justify-between">
          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {heroMovies.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Slide ${index + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-6 sm:w-8 bg-primary'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              );
            })}
          </div>

          {/* Navigation Arrows & Counter: Hidden on small mobile to eliminate clutter */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 mr-2">
              0{currentIndex + 1} / 0{total}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="size-8 rounded-full border-white/10 bg-black/50 text-white backdrop-blur-md hover:border-white/30 hover:bg-black/80 hover:text-white"
            >
              <ChevronLeft className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleNext}
              aria-label="Next slide"
              className="size-8 rounded-full border-white/10 bg-black/50 text-white backdrop-blur-md hover:border-white/30 hover:bg-black/80 hover:text-white"
            >
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
