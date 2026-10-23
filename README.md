# Life-ish

**Life-ish** is a satirical browser-based life simulator, developed as an incremental beta.

**Play:** https://life-ish.pages.dev/

## Publishing

- Source repository: `re-l0/life-ish` (branch `main`).
- Hosting: Cloudflare Pages, connected to this GitHub repository. Every commit to `main` triggers a production deployment.
- Build: static site, framework preset **None**, no build command, output directory `.`.
- `index.html` links the runtime `dist/game.js`, the primary `styles.css`, creator extras, and the dashboard overhaul files.

## Current UI architecture

- `creator-pools.js`: country-specific first and last names, balanced randomized character creation cycling through all 11 cities.
- `creator-polish.css`: creator's darker liquid-glass visuals and custom image-backed pickers.
- `dashboard-overhaul.js`: creator-independent presentation layer for the game dashboard, timeline, character profile, the Lives menu, and stats. This does not change the game engine or saved state.
- `dashboard-overhaul.css`: dark glass surface and bespoke burgundy Age button (embedded image asset).
- `assets/`: logo, flag artwork, city backgrounds.
- `dist/game.js`: core compiled simulator runtime.

## Gameplay

The game saves to browser `localStorage` on each device. The disabled Lives options (Save Life, Lives in Progress, Cemetery) are **visual placeholders**, not implemented cloud saves. Starting a new life replaces the active character as before.

## Later priorities

Finish the occupation/career system, relationship and activity features, multi-life persistence, cemetery, and full character profiles. Keep designs mobile-first and avoid decorative text or nonfunctional controls.
