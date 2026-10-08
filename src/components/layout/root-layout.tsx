import { Outlet, Link } from '@tanstack/react-router';
import { Home, Film, Tv, Flame, Search, MessageSquare, Send } from 'lucide-react';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white">
      {/* Floating Island Navigation */}
      <header className="fixed left-0 right-0 top-3 z-50 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1920px]">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#0c0c10]/80 px-4 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:px-6 sm:py-2.5">
            {/* Brand Mark */}
            <div className="flex items-center gap-6 lg:gap-10">
              <Link
                to="/"
                className="group flex items-center gap-2 text-lg font-black tracking-wider transition-opacity hover:opacity-90"
              >
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-black text-white shadow-md shadow-primary/30">
                  LV
                </span>
                <span className="font-black tracking-tight text-white">N</span>
                <span className="text-xs font-extrabold tracking-widest text-zinc-400">
                  CINEMA
                </span>
                <span className="size-1.5 rounded-full bg-primary" />
              </Link>

              {/* Navigation Links */}
              <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
                <Link
                  to="/"
                  className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15"
                >
                  <Home className="size-3.5 text-primary" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Film className="size-3.5" />
                  <span>Movies</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Tv className="size-3.5" />
                  <span>TV Series</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Flame className="size-3.5 text-amber-400" />
                  <span>Trending</span>
                </Link>
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                aria-label="Search Catalog"
              >
                <Search className="size-4" />
              </Link>
              <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 sm:flex">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Surface Canvas */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Studio-Grade Minimalist Footer */}
      <footer className="mt-24 border-t border-white/10 bg-[#060608] py-14">
        <div className="mx-auto max-w-[1920px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Brand & Meta */}
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-md bg-primary text-[10px] font-black text-white">
                  LV
                </span>
                <span className="text-base font-black tracking-tight text-white">
                  LVN CINEMA
                </span>
              </div>
              <p className="text-xs text-zinc-400 max-w-sm text-center md:text-left">
                Curated cinema discovery powered by TMDB API.
              </p>
            </div>

            {/* Disclaimer */}
            <p className="max-w-xl text-center text-xs leading-relaxed text-zinc-400 md:text-left">
              LVN Movie does not host, store, or distribute any media files. All content is
              automatically retrieved from third-party services on the internet using the TMDB API
              as a metadata information source.
            </p>

            {/* Community Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                <MessageSquare className="size-3.5 text-[#5865F2]" />
                <span>Discord</span>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                <Send className="size-3.5 text-[#229ED9]" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} LVN Cinema. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
