# LVN Cinema - Design System (DESIGN.md)

## 1. Visual World & Direction
- **Identity**: Cinematic Precision Dark (Inspired by Apple TV & Raycast standards).
- **Surface Mode**: Experience / Operate (Deep immersive media discovery).
- **Core Invariant**: Pitch black `#070709` base, acrylic frosted glass surfaces, crimson accent `#e50914`, and IMDb gold rating `#f5c518`.
- **Slop Prevention**: Zero gradient text, zero decorative kicker/eyebrow labels above headings, real SVG icons only (Lucide), single-source elevation.

## 2. Color Tokens (Tailwind v4 `@theme inline`)
```css
--background: #070709;
--foreground: #f4f4f6;
--card: #101014;
--card-foreground: #f4f4f6;
--primary: #e50914;
--primary-foreground: #ffffff;
--secondary: #17171d;
--secondary-foreground: #e4e4e7;
--muted: #1c1c24;
--muted-foreground: #8e8e99;
--border: rgba(255, 255, 255, 0.08);
--input: rgba(255, 255, 255, 0.1);
--ring: #e50914;
--radius: 0.75rem; /* 12px */
```

## 3. Typography
- **Primary Typeface**: `Inter` (Google Fonts, weights 400, 500, 600, 700, 800, 900).
- **Tracking**: `-0.015em` body, `-0.025em` to `-0.035em` for headings.
- **Scale**:
  - Hero Display: `text-3xl` to `text-6xl`, font weight 900.
  - Section Headings: `text-2xl` to `text-3xl`, font weight 800.
  - Card Titles: `text-sm`, font weight 600.
  - Captions & Meta: `text-xs` to `text-[11px]`, font weight 500.

## 4. Layout Architecture
- **Canvas**: Fullscreen widescreen fluid canvas up to `1920px` max-width.
- **Edge-to-Edge Hero Banner**: Cinematic 100vw viewport width with vertical and horizontal vignette masks.
- **Grid Density**: Responsive multi-column layout (2 cols mobile up to 8–9 cols on ultrawide displays).
- **Navigation**: Floating acrylic island navbar (`backdrop-blur-2xl`, rounded-full, subtle white border).

## 5. Components & Micro-Interactions
- **Movie Card**:
  - `aspect-[2/3]` poster container.
  - Top-left: Emerald `HD` tag (`bg-emerald-600/90`).
  - Top-right: Translucent black pill with IMDb gold star rating.
  - Hover: `-translate-y-1.5` lift, ambient shadow expansion, centered red play button reveal.
- **Search Bar**:
  - Frosted capsule input with keyboard shortcut `/` indicator badge.
- **Hero Title Presentation**:
  - Uses official transparent PNG logo from TMDB API `/movie/{id}/images` with text fallback.
- **Browser Surfaces**:
  - Custom `::selection` in primary crimson tint.
  - Custom dark scrollbar.
  - Zero raw layout overflow.
