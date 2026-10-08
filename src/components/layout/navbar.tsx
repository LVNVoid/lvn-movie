import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Film, Search, Bookmark, Menu, X, Flame, Sparkles } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = () => {
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#070709]/90 shadow-2xl shadow-black/90 backdrop-blur-xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between px-4 sm:px-8 lg:px-16">
        {/* Left: Brand Identity & Desktop Navigation */}
        <div className="flex items-center gap-8 lg:gap-12">
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-base font-black tracking-tight text-white transition-opacity hover:opacity-90"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/30 transition-transform group-hover:scale-105">
              <Film className="size-4" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-black tracking-tight text-white">LVN</span>
              <span className="text-[11px] font-extrabold tracking-widest text-zinc-400">
                CINEMA
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
            <Link
              to="/"
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              Home
            </Link>
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              <Flame className="size-3.5 text-amber-400" />
              <span>Trending</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              <Sparkles className="size-3.5 text-primary" />
              <span>Top Rated</span>
            </Link>
          </nav>
        </div>

        {/* Right: Functional Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={handleSearchClick}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label="Search movies"
            title="Search catalog"
          >
            <Search className="size-4" />
          </button>

          {/* Watchlist / Saved Button */}
          <Link
            to="/"
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label="My Watchlist"
            title="My Watchlist"
          >
            <Bookmark className="size-4" />
          </Link>

          {/* User Profile Avatar */}
          <div className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-gradient-to-tr from-zinc-800 to-zinc-700 text-xs font-bold text-zinc-200 shadow-sm cursor-pointer hover:border-white/30 transition">
            LV
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#070709]/95 px-6 py-4 backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              <span>Home</span>
            </Link>
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              <Flame className="size-4 text-amber-400" />
              <span>Trending</span>
            </Link>
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              <Sparkles className="size-4 text-primary" />
              <span>Top Rated</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
