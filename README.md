# Barialay Rahimi — Portfolio

Personal portfolio site for **Barialay Rahimi**, Senior Full Stack Software Engineer. Showcases experience, projects, skills, and contact details with a modern, responsive UI.

**Live site:** [https://king-01110.github.io/Rahimy_Barialay/](https://king-01110.github.io/Rahimy_Barialay/)

| Layer | Tools |
| --- | --- |||| UI | React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| Routing | React Router 7 |
| Build | Vite 8 |
| Deploy | GitHub Pages (`gh-pages` branch) |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ (recommended)
- npm

### Install and run locally

```bash
git clone https://github.com/king-01110/Rahimy_Barialay.git
cd Rahimy_Barialay
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

| Command | Description |
| --- | --- |
| `npm run build` | Type-check and build to `dist/` (includes `404.html` for GitHub Pages SPA routing) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and publish `dist/` to the `gh-pages` branch |

## Deploy to GitHub Pages

This project is configured for a **project site** at `https://<username>.github.io/<repo>/`.

1. Ensure the repo name matches the Vite `base` path in `vite.config.ts` (currently `/Rahimy_Barialay/`).
2. In GitHub: **Settings → Pages → Build and deployment → Branch:** `gh-pages` / `(root)`.
3. Deploy from your machine:

```bash
npm run deploy
```

4. Visit **https://king-01110.github.io/Rahimy_Barialay/** (use this exact URL; `/rahimy-barialay/` is not valid).

If assets fail to load after a deploy, hard-refresh the page (**Ctrl+Shift+R**) or clear site data for `king-01110.github.io` to drop an old service worker or cached `index.html`.

### Changing the repo name

If you rename the repository, update both:

- `base` in `vite.config.ts`
- `basename` in `src/main.tsx` (derived from `import.meta.env.BASE_URL` at build time)

Then run `npm run deploy` again.

## Project structure

```
├── public/              # Static assets (profile, resume, icons)
├── scripts/
│   └── copy-404.mjs     # Copies index.html → 404.html for GitHub Pages
├── src/
│   ├── components/ui/   # Reusable UI primitives
│   ├── data/            # Portfolio content (projects, skills, stats)
│   ├── pages/           # Home and blog pages
│   └── providers/       # Theme and language context
├── index.html
└── vite.config.ts
```

## Contact

- **Email:** RahimyBarialay@gmail.com
- **Phone:** +93 781 783 777
- **Location:** Kabul, Afghanistan.

## License

Private portfolio project. All rights reserved unless otherwise noted.

      
