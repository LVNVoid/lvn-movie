import { Outlet } from '@tanstack/react-router';
import { MessageSquare, Send } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white">
      {/* Precision Dynamic Sticky Navbar */}
      <Navbar />

      {/* Surface Canvas */}
      <main className="pt-16">
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
