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
    setIsMobileMenuOpen(false);
    const searchInput = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#070709]/95 shadow-2xl shadow-black/90 backdrop-blur-2xl'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between px-4 sm:px-8 lg:px-16">
        {/* Left: Brand Identity & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-10">
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-base font-black tracking-tight text-white transition-opacity hover:opacity-90"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/30 transition-transform group-hover:scale-105">
              <Film className="size-4" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-black tracking-tight text-white">LVN</span>
            </div>
          </Link>

          {/* Navigation Links: Visible on large screens */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main Navigation"
          >
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
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Search Trigger (Hidden on small mobile to avoid crowding) */}
          <button
            type="button"
            onClick={handleSearchClick}
            className="hidden sm:flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label="Search movies"
            title="Search catalog"
          >
            <Search className="size-4" />
          </button>

          {/* Watchlist / Saved Button (Hidden on small mobile) */}
          <Link
            to="/"
            className="hidden sm:flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label="My Watchlist"
            title="My Watchlist"
          >
            <Bookmark className="size-4" />
          </Link>

          {/* User Profile Avatar */}
          <div className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-gradient-to-tr from-zinc-800 to-zinc-700 text-xs font-bold text-zinc-200 shadow-sm cursor-pointer hover:border-white/30 transition">
            LV
          </div>

          {/* Mobile & Tablet Hamburger Toggle (Visible under 1024px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex size-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Slide-down Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#070709]/95 px-6 py-5 backdrop-blur-2xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              <span>Home</span>
            </Link>
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <Flame className="size-4 text-amber-400" />
              <span>Trending</span>
            </Link>
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <Sparkles className="size-4 text-primary" />
              <span>Top Rated</span>
            </Link>

            <div className="my-2 border-t border-white/10" />

            {/* Mobile Actions */}
            <button
              type="button"
              onClick={handleSearchClick}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <Search className="size-4 text-zinc-400" />
              <span>Search Catalog</span>
            </button>
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <Bookmark className="size-4 text-zinc-400" />
              <span>My Watchlist</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
