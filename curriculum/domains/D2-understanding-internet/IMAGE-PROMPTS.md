# Domain 2 — Real Screenshots & Image Guidance

For Domain 2, **real screenshots** often teach better than diagrams, because learners then recognise the *exact* browser and search screen they will use in the lab. The lessons ship with clean labeled mockups (SVG) so they work immediately and offline, but you can replace any of them with a real screenshot.

## How to use a REAL screenshot (recommended for the browser lesson)

1. On a lab computer, open the browser your students will actually use (Chrome or Edge).
2. Take a screenshot:
   - **Windows:** press `PrtScn`, or `Windows + Shift + S` to select an area.
   - Paste into Paint, crop to just the browser window, and save as a PNG.
3. Name it clearly, e.g. `browser-real.png`, and put it in `curriculum/shared/figures/`.
4. In the lesson, swap the figure. You have two options:
   - **Simple image (no hotspots):** replace the ```hotspots block with `![A real web browser](figures/browser-real.png)`.
   - **Keep the interactive numbers:** keep the ```hotspots block but change the first line's filename to `figures/browser-real.png`, then **adjust each hotspot's x% and y%** so the numbers sit on the right spots in your screenshot (the positions are percentages of the image, left-to-right and top-to-bottom).
5. Rebuild: `node build.js`. The builder copies and shows PNG/JPG automatically.

> Tip: keep screenshots web-sized (under ~200 KB) so the site stays fast on low-bandwidth lab connections and phones. Avoid screenshots that show any real person's name, email, or private tabs.

## Suggested real screenshots for Domain 2

- **D2-M1-L2 Using a Web Browser** — a real browser window with the address bar, tabs, back/reload visible. *(Best candidate for a real screenshot.)*
- **D2-M2 Ways to Search** — a real search results page, and the row of tabs (All / Images / Videos / Maps / News / Shopping).
- **D2-M3 Modern AI Search** — side-by-side: a normal results page (list of links) and an AI answer box.

## AI-image prompts (if you prefer illustrations over screenshots)

Style: clean, simple, high-contrast, no real logos, minimal text.

- Browser: "A simple, clean illustration of a web browser window showing tabs at the top, a back arrow and reload button, a wide address bar, and a page below. Flat style, bright, no brand logos, no text labels."
- Search results: "A simple illustration of a search results page: a search bar at top and a vertical list of result links below. Flat, clean, no logos."

_Do not imitate a specific company's logo or branding in generated images; keep them generic._
