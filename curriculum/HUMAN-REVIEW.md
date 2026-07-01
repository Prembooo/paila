# Human Review Checklist (Phase 1)

Items from the audit (`REVIEW.md`) that need a person to decide or confirm. The
safe "quick win" fixes have already been applied. Paths are relative to the repo root.

---

## A. Confirm before publishing (factual / publish-time)

- [ ] **Nepal Cyber Bureau contact is current.** We added portal
      `cyberbureau.nepalpolice.gov.np` and "call 100". Phone/portal can change — verify the
      live contact (and whether to add the office number/email).
  - `curriculum/domains/D4-safety-privacy-security/D4-M4-scams-synthetic-media/lesson.en.md`
  - `curriculum/domains/D4-safety-privacy-security/D4-M4-scams-synthetic-media/lesson.ne.md`
  - `curriculum/domains/D4-safety-privacy-security/D4-M5-digital-money/lesson.en.md`
  - `curriculum/domains/D4-safety-privacy-security/D4-M5-digital-money/lesson.ne.md`

---

## B. Native Nepali speaker — naturalness / wording sign-off

- [ ] Review all the applied Nepali rewrites for tone and naturalness (they are good
      starting points, not final copy).
- [ ] **Transliteration house-style:** decide how to gloss English terms on first use, then
      apply consistently: `अटोप्ले`, `नोटिफिकेसन`, `स्क्रोल`, `बायो`, `किवर्ड`, `ह्यालुसिनेसन`, `OTP/PIN/QR`.
  - `curriculum/domains/D5-responsible-social-media/D5-M2-attention-economy/lesson.ne.md`
  - `curriculum/domains/D5-responsible-social-media/D5-M3-emotional-defense/lesson.ne.md`
  - `curriculum/domains/D5-responsible-social-media/D5-M5-digital-identity/lesson.ne.md`
  - `curriculum/domains/D2-understanding-internet/D2-M3-modern-ai-search/lesson.ne.md`
  - `curriculum/domains/D4-safety-privacy-security/D4-M2-private-info/lesson.ne.md`
- [ ] Minor naturalness flags (classifiers/plurals): "छ सामान्य तरिका छन्", "तपाईं जस्ता मानिसले…",
      "अरू कम्प्युटरसँग".
  - `curriculum/domains/D2-understanding-internet/D2-M2-ways-to-search/lesson.ne.md`
- [ ] Redundant transliteration "प्रूफ" right after `प्रमाण`.
  - `curriculum/domains/D3-information-literacy/D3-M2-evaluating-sources/L2-lesson.ne.md`
- [ ] **Platform-name script convention** (Devanagari + Latin once?): Facebook/TikTok/etc.
  - `curriculum/domains/D5-responsible-social-media/D5-M1-why-social-media/lesson.ne.md` and `D5.md`

---

## C. Editorial — canonical titles & overview pages (curriculum lead)

- [ ] **Reconcile module titles** across lesson ↔ `architecture/domain-map.md` ↔ `D*.md`:
  - D3-M4: lesson "Can We Always Trust AI?" vs map "Trusting AI Well"
  - D5-M2: lesson "The Attention Trap" vs map "The Attention Economy"
  - D5-M3: lesson "Taking Back Your Time" vs map "Emotional & Attention Self-Defense"
  - D6-M2: lesson "Better Questions & Good Sources" vs map "Better Questions & Trustworthy Resources"
  - D2-M3: lesson "Modern AI Search" vs map "Modern & AI Search"
- [ ] **Stale domain-overview pages** (`D*.md`) — update module lists/terms to match shipped lessons:
  - `curriculum/domains/D1-devices-digital-world/D1.md` (lists old module titles — highest priority)
  - `curriculum/domains/D3-information-literacy/D3.md` (`क्रस-चेक` vs `दोहोर्‍याएर जाँच`; M5 title)
  - `curriculum/domains/D4-safety-privacy-security/D4.md` (footprint term → align to `डिजिटल डोब`)
  - `curriculum/domains/D5-responsible-social-media/D5.md`, `D6-independent-learner/D6.md`

---

## D. Instructional-design decisions (curriculum lead)

> **DONE** — all items below were implemented (rebuilt & verified). Listed for the record;
> a curriculum lead may still review the choices.

- [x] **Capstone deliverable** made concrete: a one-page explainer/poster, with two cited
      sources noted and a privacy check before sharing. (`D6-M4-capstone`)
- [x] **D6 AI prompts:** `D6.md` no longer claims a "Guided AI Exploration" prompt set; it now
      points to the AI-literacy lessons (verify is reinforced in Check Your Understanding/Activity).
- [x] **Diagrams added:** `figures/project-steps.svg` (wired into D6-M3) and
      `figures/filter-bubble.svg` (wired into D2-M3, with a local "shop" analogy).
- [x] **D5 made more computer-first:** Practice in D5-M2 and D5-M3 now uses the lab computer
      (find the autoplay / notification settings).
- [x] **AI depth added:** D3-M3 now names AI-generated fake photos/voices; D3-M4 explains AI
      "guesses likely words"; D3-M5 warns AI translations/summaries can be wrong.

---

## E. Your call (workflow / cosmetic)

- [ ] **D2-M2 figure/caption mismatch.** Caption claims a Google search page, but the image is a
      plain browser and the text asks for tabs/voice/Lens not shown. Either annotate a real
      search-results screenshot (your preferred workflow) or fix the caption.
  - `curriculum/domains/D2-understanding-internet/D2-M2-ways-to-search/lesson.en.md` (+ `.ne.md`), `curriculum/shared/figures/browser-real.png`
- [ ] **Printed outcome codes in source** ("This lesson serves O0X.") — cosmetic only (stripped at
      render). Optional cleanup of 18 lesson files if you want clean source.

---

*Full evidence and exact before→after suggestions are in `REVIEW.md`.*
