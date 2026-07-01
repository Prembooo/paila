# Phase 1 — Validation & Requirements Traceability

This report records the cross-cutting validation (tasks 12.1, 12.2) and the quality-gate pass for the Phase 1 curriculum content.

## 1. Authored inventory

- **Architecture:** outcomes.md (O01–O12), domain-map.md, deferred-topics.md
- **Shared:** glossary.md, project-themes.md, safety-playbook.md (SP-1…SP-5)
- **Templates:** lesson-template.md, facilitator-template.md, prompt-template.md
- **Lessons:** 26 across 6 domains, each with `lesson.en.md` + `lesson.ne.md` + `facilitator.ne.md`
  - D1: 3 · D2: 3 · **D3: 6 (largest)** · D4: 5 · D5: 5 · D6: 4
- **AI prompt sets:** one `prompts.md` per lesson (26 total), 3–7 Nepali prompts each, every prompt with a verify step
- **Assessment:** D6 `assessment-self-check.md`

## 2. Requirements → artifact traceability (forward)

| Req | Where satisfied |
|---|---|
| 1 (architecture first, staged) | architecture/*; staged authoring Stages 1→2→3→4; presentation derived in Stage 4 |
| 2 (scope boundary) | deferred-topics.md; conceptual-only device topics in D1 |
| 3 (D1 devices) | D1-M1/M2/M3 lessons |
| 4 (D2 internet/search) | D2-M1/M2/M3 lessons |
| 5 (D3 info literacy) | D3-M1…M5 (6 lessons); cross-check + AI hallucination in M3/M4 |
| 6 (D4 safety) | D4-M1…M4 |
| 7 (D5 social media) | D5-M1/M4/M5 |
| 8 (D6 capstone) | D6-M1…M4 + assessment-self-check.md |
| 9 (AI literacy thread) | AI-literacy element in every domain (thread matrix) + prompts |
| 10 (attention/emotion) | D5-M2/M3 (+ self-check, distress prompt) |
| 11 (digital money) | D4-M5 (refuse+verify, SP-2) |
| 12 (lesson structure) | lesson-template.md; all 26 lessons six-section |
| 13 (language) | full Nepali parity on every lesson; glossary; term-before-use |
| 14 (rural/offline/shared) | offline alternatives in each Practical Activity; SP-5; lab+mobile tiers |
| 15 (tone/age) | safety-first, risk+action pairing; no fear/shame |
| 16 (facilitator) | facilitator.ne.md per lesson; escalation; AI-supervision |
| 17 (community themes) | project-themes.md; theme-aware Mini Projects/Capstone |

## 3. Correctness Properties — gate results

| Property | Result |
|---|---|
| P1 Outcome coverage | PASS — every module maps to ≥1 outcome; every O01–O12 used (domain-map) |
| P2 Authoring order | PASS — Stage 1→2→3 completed in order; Stage 4 derives from text |
| P3 Lesson completeness | PASS — all 26 lessons have the six sections in order |
| P4 Language parity | PASS — every lesson has a full `lesson.ne.md` (has_nepali: true) |
| P5 Domain 3 dominance | PASS — D3 = 6 lessons, strictly > D4/D5 = 5 |
| P6 Verify-before-rely | PASS — every prompt has a `verify_step_ne` |
| P7 Risk-action pairing | PASS — risks paired with actions; safety-playbook referenced |
| P8 Lab-first / mobile-basic | PASS (by design) — full experience in lab, core content on mobile |
| P9 Scope integrity | PASS — excluded topics live only in deferred-topics.md |
| P10 AI literacy presence | PASS — ≥1 labeled AI element per domain (thread matrix) |

## 4. Open follow-ups (for the human pilot)
- Readability spot-check on a Nepali sample by a native facilitator.
- Confirm rural examples are locally accurate for the specific community.
- Pilot the capstone cross-domain skill checklist with real learners.

_Validation status: all automated/structural gates PASS. Human pilots (task 14) remain to confirm real-world fit._
