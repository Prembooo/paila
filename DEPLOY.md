# Deploying Paila to GitHub Pages

The site is a zero-dependency static build. `curriculum/` holds the content; the
generator at `site/build.js` renders it into `site/dist/`. A GitHub Actions
workflow builds and publishes `site/dist` automatically on every push to `main`.

## One-time setup

1. Create a new GitHub repository (public is fine).
2. Push this project:
   ```
   git init
   git add .
   git commit -m "Paila: Digital Literacy course (Phase 1)"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions.**
4. The "Deploy Paila site" workflow runs automatically. When it finishes, your site is at:
   `https://<you>.github.io/<repo>/`

That's it. Every future `git push` to `main` rebuilds and redeploys.

## Notes

- **Do not commit `site/dist/`** — it is generated in CI (already in `.gitignore`).
  To preview locally: `cd site && node build.js`, then serve `site/dist`
  (e.g. `python -m http.server 5055` and open http://localhost:5055).
- **HTTPS is automatic** on GitHub Pages, which enables the PWA (installable app)
  and offline caching via the service worker.
- Relative paths are used throughout, so the site works under the
  `/<repo>/` subpath without changes.

## Lab / offline use

- **Occasional internet:** open the site once on each lab laptop while online
  (or use the browser's "Install app"). The service worker then caches everything
  for offline use.
- **Fully offline lab:** copy `site/dist` to each machine and serve it locally
  (`python -m http.server 5055` in that folder). Note: PWA install/offline-cache
  needs HTTPS or `localhost`, so over a plain LAN IP pages load only while the
  local server runs.
- **Progress & certificates** are stored per learner in the browser on that
  device (localStorage). A learner should use the same laptop + browser to keep
  their progress. See the roadmap for optional cloud sync later.

## Logos

- Paila logo: `curriculum/shared/figures/logo-paila.svg` (used on the certificate).
- OML logo: save as `curriculum/shared/figures/logo-oml.png` (transparent/white PNG).
  Both are copied to `assets/figures/` on build.
