# Digital Literacy Course — Static Site

A small, offline-first website built from the Phase 1 curriculum Markdown. No
backend, no accounts, no server required. It runs in a computer lab without
internet and opens on a basic mobile browser.

The pages are **derived from** the source files in `../curriculum/` and keep the
source IDs (lesson IDs, outcome IDs) visible so content stays traceable.

---

## What gets built

Running the build reads `../curriculum/` and generates `dist/`:

- **`index.html`** — lists the 6 domains and every lesson, with English / Nepali
  labels. Shows a green check on lessons you have marked done (saved on the device).
- **One page per lesson** (e.g. `D1-M1-L1.html`) — the six lesson sections, a
  language toggle (English / नेपाली) with no reload, the lesson's "Ask the AI"
  prompt cards (copyable, each with its verify step), and a "Mark lesson done"
  button.
- **`glossary.html`** and **`safety.html`** — the shared glossary and safety playbook.
- **PWA files** — `manifest.webmanifest` and `service-worker.js` so the site keeps
  working offline after the first load (when served over http/https).

26 lesson pages are generated across the 6 domains.

---

## 1. Build it

You need Node.js installed (any recent version; tested on v18+). There are **no
dependencies to install** — the generator is self-contained.

From inside the `site/` folder:

```
node build.js
```

You should see a summary like:

```
  Domains:        6
  Lesson pages:   26
  Total HTML:     29
  Output:         .../site/dist
Build complete.
```

Everything is written to the `dist/` folder.

---

## 2. Open it

### Option A — open the file directly (simplest, fully offline)

Double-click **`dist/index.html`**, or open it in any browser via `file://`.
All pages, the language toggle, the copy buttons, and the done-progress work
this way. (The service worker stays off on `file://`, but you are already
reading local files, so it is offline by definition.)

### Option B — serve the folder (enables the installable PWA + caching)

From the `site/` folder, use any static file server, for example:

```
npx serve dist
```

or with Python:

```
python -m http.server 8000 --directory dist
```

Then open `http://localhost:8000`. Served this way, the service worker caches
the pages and assets, so the browser keeps working offline after the first
visit, and the site can be "Add to Home Screen" installed.

---

## 3. Copy it to lab machines (offline use)

The whole site is just static files. To put it on lab computers:

1. Run `node build.js` once on any machine.
2. Copy the **entire `dist/` folder** to each lab machine (USB drive, shared
   folder, or network copy).
3. On each machine, open `dist/index.html` in a browser. No internet needed.

Because there are no external CDNs, fonts, or scripts, the site renders the same
with or without a network connection.

---

## 4. On a phone (Tier 2 basic content)

The layout is mobile-first: large fonts, high contrast, big tap targets, and a
single-column reading flow that works on a basic smartphone browser. Learners can:

- tap a lesson, switch between **English** and **नेपाली**,
- copy an "Ask the AI" prompt, and
- mark a lesson done (stored only on that phone).

To use it offline on a phone, either open the copied `dist/` files locally or
visit the served site once so the service worker caches it.

---

## Sabda (in-lab AI / translation / read-aloud)

This site shows the curriculum and the ready-made AI prompts, but it does **not**
contain an AI model. **Sabda** is the in-lab layer that provides the AI companion,
translation, and read-aloud. Learners copy a prompt from a lesson's "Ask the AI"
card and ask Sabda, then always complete the printed **verify** step before
relying on the answer.

---

## Privacy

The site stores **no personal information**. The only things saved in the
browser's `localStorage` are:

- a language preference (`en` or `ne`), and
- a per-lesson "done" flag (e.g. `dl.done.D1-M1-L1 = 1`).

There are no accounts, no analytics, and no network calls to third parties.

---

## Reusing the template for another course

The look and behaviour live in `template/` (`styles.css`, `app.js`,
`manifest.webmanifest`, `service-worker.js`, `icon.svg`). To build a different
subject, point `build.js` at another curriculum folder with the same shape
(domains → modules → `lesson.en.md` / `lesson.ne.md` / `prompts.md`, plus a
shared glossary and safety playbook) and rebuild. The template is content-agnostic.

## Folder layout

```
site/
  package.json        # build script (no dependencies)
  build.js            # the generator (reads ../curriculum, writes dist/)
  template/           # reusable HTML/CSS/JS + PWA assets
    styles.css
    app.js
    manifest.webmanifest
    service-worker.js
    icon.svg
  dist/               # generated output (safe to delete and rebuild)
  README.md
```
