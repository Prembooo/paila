# Implementation Plan: Phase 1 — Digital Citizen Curriculum

## Overview

This is a **content-authoring and content-validation** plan, not a software-coding plan. The deliverable is a curriculum product: structured bilingual (English + Nepali) text lessons, an AI prompt set, facilitator guides, and finally a static course website generated from the text.

Tasks follow the mandatory authoring pipeline and the task numbering/dependencies enforce it:

- **Stage 1 — Curriculum_Architecture** (domains, modules, IDs, sequence, outcomes O01–O12, outcome mapping, deferred-topics register, shared assets, templates)
- **Stage 2 — Text Content_System** (every lesson's six sections in English, then full Nepali parity; complete only when every module has text) — begins only after Stage 1 passes its gate
- **Stage 3 — AI_Prompt_Set** (3–7 Nepali prompts per lesson, each with a verify step) — begins only after Stage 2 is content-complete
- **Stage 4 — Presentation materials** (the static, bilingual, offline-capable/PWA course website generated from the text) — begins only after Stage 3

The `AI_Companion` (Sabda browser extension) is an **existing external tool** the curriculum is designed around; no task builds it. The reusable asset is the pipeline (structured Markdown + architecture + site template), so future courses reuse the same template.

Tasks marked with `*` are optional validation/audit/pilot sub-tasks that can be deferred for a faster pilot; core authoring tasks are never optional. Each task references the requirement clauses and/or design sections it implements.

## Tasks

- [x] 1. Stage 1 — Author the Curriculum_Architecture
  - [x] 1.1 Define the Phase_1_Outcomes set (`architecture/outcomes.md`)
    - Author outcomes O01–O12 with stable `O{nn}` IDs, English + Nepali statements, an observable check per outcome, and primary domains
    - Match outcome wording to observable Learner behaviors (confident/safe/independent/critical-thinking)
    - _Requirements: 1.9, 2.1_
    - _Design: Phase_1_Outcomes Set; Data Models (Phase_1_Outcome)_

  - [x] 1.2 Define the domain map, modules, IDs, sequence, and outcome mapping (`architecture/domain-map.md`)
    - Assign every Domain (`D{n}`) and Learning_Module (`D{n}-M{m}`) a unique ID, English + Nepali title, and ordinal sequence — recorded before any lesson body
    - Map each Module to ≥1 Phase_1_Outcome ID; allocate Domain 3 strictly more lessons than any other domain and at least four
    - Add the cross-cutting thread-coverage matrix (AI literacy × domain; emotional/attention; digital money)
    - _Requirements: 1.1, 1.2, 5.7, 5.8, 9.1, 9.5, 10.1, 11.1_
    - _Design: Identifier Scheme; Hierarchy; Cross-Cutting Threads; Data Models (Domain / Learning_Module)_

  - [x] 1.3 Create the deferred-topics register (`architecture/deferred-topics.md`)
    - Define `DEF-{nnn}` entry schema (topic, assigned_phase, reason) and seed it with excluded topics (coding, office tools, certification, career training, admin configuration)
    - _Requirements: 2.2, 2.3, 2.4, 2.5_
    - _Design: Deferred-Topics Register; Data Models (Deferred-topic entry)_

  - [x] 1.4 Author the shared assets (`shared/glossary.md`, `shared/project-themes.md`, `shared/safety-playbook.md`)
    - Glossary: term → simple English definition + Nepali equivalent + first-used-in
    - Project themes: ≥5 themes (football, art, farming, festivals, marketplaces) with English/Nepali names and a default flag
    - Safety playbook: the stop → don't-share → consult-trusted-person pattern and refuse+verify pattern, referenced by ID from lessons
    - _Requirements: 13.7, 13.8, 17.1, 17.3, 6.7, 11.5, 11.6_
    - _Design: Content_System & File Organization (shared/); Data Models (Glossary term, Project theme)_

  - [x] 1.5 Author the canonical templates (`templates/lesson-template.md`, `templates/facilitator-template.md`, `templates/prompt-template.md`)
    - Lesson template: the six fixed sections in order + the front-matter metadata schema (gates fields)
    - Facilitator template: the 8-part guide structure in Nepali
    - Prompt template: the prompt record format (goal_ne, prompt_ne, prompt_en, verify_step_ne, guardrail)
    - _Requirements: 12.1, 12.2, 16.1, 12.3, 9.4_
    - _Design: Lesson_Template Design; Lesson metadata schema; Facilitator_Guide Design; AI_Prompt_Set prompt record format_

  - [x]* 1.6 Run the Stage 1 architecture quality gates
    - Outcome-mapping gate: every Module maps to ≥1 outcome and every outcome served by ≥1 Module (**Property 1**)
    - Scope gate: no Module/topic is an excluded topic or admin task; violations routed to the register (**Property 9**)
    - Domain-3 dominance check: D3 has strictly more lessons than any other domain and ≥4 (**Property 5**)
    - _Requirements: 1.2, 1.3, 2.2, 2.3, 2.5, 5.7, 5.8_
    - _Design: Quality Gates (outcome-mapping, scope); Correctness Properties 1, 5, 9_

- [x] 2. Checkpoint — Architecture sequencing gate
  - Confirm Stage 1 artifacts are complete and approved before any Stage 2 text is authored; ensure no out-of-sequence work. Ensure all gates pass, ask the user if questions arise.
  - _Requirements: 1.4, 1.6_
  - _Design: Authoring Pipeline; Quality Gates (sequencing); Correctness Property 2_

- [x] 3. Stage 2 — Author Domain 1 content (Devices & Digital World → O01)
  - [x] 3.1 Author D1 lessons in English (six sections each: M1 Technology Around Us, M2 Hardware vs Software, M3 First Hands-On)
    - ≥3 device categories with ≥2 everyday uses each; hardware vs software with ≥2 examples each; OS conceptual definition; observable Practical Activity with step-by-step instructions and an offline alternative; ≤5 English loanwords per page; ≥1 local rural example; labeled AI literacy element; risks paired with actions
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 9.1, 12.4, 12.7, 14.8, 15.1_
    - _Design: Domain Content Design (D1); Lesson_Template Design; Content authoring rules_

  - [x] 3.2 Produce full Nepali parity for all D1 lessons (`lesson.ne.md`)
    - 100% Nepali translation of instructions, examples, and assessment; `has_nepali: true`
    - _Requirements: 13.1, 13.2, 13.3_
    - _Design: Content_System & File Organization; Quality Gates (translation)_

  - [x] 3.3 Author D1 facilitator guides in Nepali (`facilitator.ne.md` per lesson)
    - Objectives, numbered delivery sequence, duration, materials/setup, on-screen navigation steps, AI supervision notes, role reminder, escalation
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_
    - _Design: Facilitator_Guide Design_

  - [x]* 3.4 Validate D1 lessons against the per-lesson gates
    - Lesson-structure (six sections in order), tone (risk+action), AI-literacy presence, offline-alternative, loanword limit
    - _Requirements: 12.6, 15.5, 9.1, 12.7, 3.1_
    - _Design: Quality Gates; Correctness Properties 3, 7, 10_

- [x] 4. Stage 2 — Author Domain 2 content (Understanding the Internet → O02, O03)
  - [x] 4.1 Author D2 lessons in English (M1 What Is the Internet, M2 Ways to Search, M3 Modern & AI Search)
    - Internet/website/browser explained with ≥3 rural examples; guided practice for all 6 result types (web/image/video/maps/news/shopping); AI vs keyword search (≥2 differences); recommendation algorithms (≥2 factors, ≥1 consequence); ≥2 term-refinement techniques; ≥2 recovery steps; safe-search + avoid personal-info/payment results
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 9.1, 12.4, 12.7, 14.8_
    - _Design: Domain Content Design (D2); Search-skills rules_

  - [x] 4.2 Produce full Nepali parity for all D2 lessons
    - _Requirements: 13.1, 13.2, 13.3_
    - _Design: Content_System & File Organization; Quality Gates (translation)_

  - [x] 4.3 Author D2 facilitator guides in Nepali
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_
    - _Design: Facilitator_Guide Design_

  - [x]* 4.4 Validate D2 lessons against the per-lesson gates
    - _Requirements: 12.6, 15.5, 9.1, 12.7, 13.2_
    - _Design: Quality Gates; Correctness Properties 3, 7, 10_

- [x] 5. Stage 2 — Author Domain 3 content (Information Literacy & Critical Thinking → O04, O05, O06) — largest domain
  - [x] 5.1 Author D3 lessons in English (M1 Facts vs Opinions, M2 Evaluating Sources, M3 Spotting Misinformation, M4 Trusting AI Well, M5 Learning With AI)
    - Observable facts/opinions test + ≥3 paired examples; named ordered 4-question source checklist; ≥2 misinformation warning signs + cross-check ≥2 independent sources; AI_Hallucination defined in Nepali + ≥2 verification techniques + "unverified → don't share → consult"; better-questions/follow-ups feeding the capstone; ensure D3 has the most lessons (≥4)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 9.1, 12.4, 12.7, 14.8_
    - _Design: Domain Content Design (D3); AI interaction flow_

  - [x] 5.2 Produce full Nepali parity for all D3 lessons
    - _Requirements: 13.1, 13.2, 13.3_
    - _Design: Content_System & File Organization; Quality Gates (translation)_

  - [x] 5.3 Author D3 facilitator guides in Nepali
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_
    - _Design: Facilitator_Guide Design_

  - [x]* 5.4 Validate D3 lessons and re-confirm Domain-3 dominance
    - Per-lesson gates plus re-check that D3 strictly leads all domains in lesson count (**Property 5**)
    - _Requirements: 12.6, 15.5, 9.1, 5.7, 5.8_
    - _Design: Quality Gates; Correctness Properties 3, 5, 7, 10_

- [x] 6. Stage 2 — Author Domain 4 content (Safety, Privacy & Security → O07, O08, O11)
  - [x] 6.1 Author D4 lessons in English (M1 Digital Footprint, M2 Private Information, M3 Passwords & Accounts, M4 Scams & Synthetic Media, M5 Digital Money Safety)
    - Digital_Footprint defined in Nepali + ≥3 actions; ≥5 private-info categories with a risk each; strong-password rule (≥8 chars, ≥3 of 4 types); ≥3 account-security actions; ≥4 context scams with warning signs; Synthetic_Media with ≥2 cues; money: wallets conceptually + ≥3 scams + refuse+verify, framed as safety not finance; reference the safety playbook stop→don't-share→consult pattern
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 9.1, 12.7, 14.8_
    - _Design: Domain Content Design (D4); Safety response pattern; Cross-Cutting Threads (money)_

  - [x] 6.2 Produce full Nepali parity for all D4 lessons
    - _Requirements: 13.1, 13.2, 13.3_
    - _Design: Content_System & File Organization; Quality Gates (translation)_

  - [x] 6.3 Author D4 facilitator guides in Nepali
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_
    - _Design: Facilitator_Guide Design_

  - [x]* 6.4 Validate D4 lessons against the per-lesson gates
    - Per-lesson gates plus tone gate emphasis (no fear/shame; every scam paired with an action)
    - _Requirements: 12.6, 15.1, 15.5, 9.1, 12.7_
    - _Design: Quality Gates; Correctness Properties 3, 7, 10_

- [x] 7. Stage 2 — Author Domain 5 content (Responsible Social Media + Emotional/Attention Self-Defense → O09, O10)
  - [x] 7.1 Author D5 lessons in English (M1 Why Social Media Exists, M2 Attention Economy, M3 Emotional & Attention Self-Defense, M4 Posting & Communicating Responsibly, M5 Positive Digital Identity)
    - ≥3 platforms with worked examples; ≥3 attention-design techniques + how each increases time; comparison/FOMO/rage-bait defined in Nepali with examples + ≥2 coping strategies as observable steps + distress pause-and-seek-help prompt; ≥5 avoid-to-post categories; ≥4 respectful behaviors (positive/negative example each); ≥3 practice scenarios; simulated content only (never a live post); ≥3 positive-identity actions; everyday AI-in-use examples (search/keyboard/feeds)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 10.1, 10.2, 10.3, 10.5, 9.1, 9.5, 12.7, 14.8_
    - _Design: Domain Content Design (D5); Cross-Cutting Threads (emotion)_

  - [x] 7.2 Produce full Nepali parity for all D5 lessons
    - _Requirements: 13.1, 13.2, 13.3_
    - _Design: Content_System & File Organization; Quality Gates (translation)_

  - [x] 7.3 Author D5 facilitator guides in Nepali
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_
    - _Design: Facilitator_Guide Design_

  - [x]* 7.4 Validate D5 lessons against the per-lesson gates
    - Per-lesson gates plus confirm the self-check activity and the distress safety prompt are present
    - _Requirements: 12.6, 10.4, 10.5, 15.5, 9.1, 7.8_
    - _Design: Quality Gates; Correctness Properties 3, 7, 10_

- [x] 8. Stage 2 — Author Domain 6 content + Capstone (Independent Learner → O12)
  - [x] 8.1 Author D6 lessons in English (M1 Learning Anything, M2 Better Questions & Trustworthy Resources, M3 Plan Your Project, M4 Capstone)
    - Set a learning goal/plan (goal, steps, timeframe); formulate/rephrase/narrow questions; find trustworthy resources (creator, ≥2 sources, unreliable signs); capstone produces a researched answer/short explainer in Nepali/primary language; cite ≥2 sources + describe verification; privacy check before sharing; demonstrate ≥1 skill from every domain; allow alternative artifact format; facilitator-supported fallback
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.10, 9.1, 12.7, 14.8_
    - _Design: Domain Content Design (D6); Assessment & Capstone Design; Capstone artifact flow_

  - [x] 8.2 Produce full Nepali parity for all D6 lessons
    - _Requirements: 13.1, 13.2, 13.3_
    - _Design: Content_System & File Organization; Quality Gates (translation)_

  - [x] 8.3 Author D6 facilitator guides in Nepali (including the capstone guided-support fallback)
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 8.10_
    - _Design: Facilitator_Guide Design_

  - [x] 8.4 Author assessment/self-check items and wire project-theme selection into Mini Projects and the Capstone
    - Behavior-based observable checks matching outcome wording; present themes in Nepali before projects; allow select/change without losing progress; assign a default; reject off-list/unsafe themes with redirect
    - _Requirements: 2.1, 10.4, 17.1, 17.2, 17.3, 17.4, 17.5_
    - _Design: Assessment & Capstone Design; Project themes_

  - [x]* 8.5 Validate D6 lessons and the capstone cross-domain skill mapping
    - Per-lesson gates plus confirm the capstone exercises ≥1 observable skill from each of the six domains
    - _Requirements: 12.6, 8.7, 15.5, 9.1_
    - _Design: Quality Gates; Correctness Properties 3, 7, 10_

- [x] 9. Checkpoint — Content-complete and parity gates (close Stage 2)
  - [x] 9.1 Run the content-complete gate across all modules
    - Confirm every Learning_Module has authored text content so Content_System is "complete" and Stage 3 may begin
    - _Requirements: 1.5_
    - _Design: Quality Gates (content-complete); Authoring Pipeline_

  - [x]* 9.2 Run translation-parity, lesson-structure, tone, and AI-literacy gates across the full content set
    - 100% Nepali parity (**Property 4**); six sections in order on every lesson (**Property 3**); risk paired with action everywhere (**Property 7**); ≥1 labeled AI element per domain (**Property 10**)
    - _Requirements: 13.2, 12.1, 12.2, 15.5, 9.1_
    - _Design: Quality Gates; Correctness Properties 3, 4, 7, 10_

- [x] 10. Stage 3 — Author the AI_Prompt_Set (begins only after content is complete)
  - [x] 10.1 Author `prompts.md` for every D1 and D2 lesson
    - 3–7 Nepali prompts per lesson using the prompt record format; each prompt carries a mandatory verify step; scope-limited (no personal info); language-flexible guidance
    - _Requirements: 12.3, 9.3, 9.4, 5.5, 3.5, 13.4_
    - _Design: AI_Prompt_Set Design; Guardrail patterns_

  - [x] 10.2 Author `prompts.md` for every D3 and D4 lesson
    - Include hallucination-awareness and verify-against-≥2-sources prompts (D3); safety refuse+verify prompts (D4)
    - _Requirements: 12.3, 9.4, 5.4, 5.5, 5.6, 11.5_
    - _Design: AI_Prompt_Set Design; AI interaction flow_

  - [x] 10.3 Author `prompts.md` for every D5 and D6 lesson
    - Include AI-assisted-not-dependent contrasting framing and capstone research/verification prompts
    - _Requirements: 12.3, 9.2, 9.4, 8.2, 8.8_
    - _Design: AI_Prompt_Set Design; Guardrail patterns_

  - [x]* 10.4 Run the prompt-count and verify-before-rely gate across all prompt sets
    - Every lesson has 3–7 prompts and every prompt has a verify step (**Property 6**); confirm `ai_prompt_ids` match lesson front-matter
    - _Requirements: 12.3, 9.4, 5.5_
    - _Design: Quality Gates (prompt-count); Correctness Property 6_

- [x] 11. Checkpoint — Prompt gate (close Stage 3)
  - Confirm all prompt sets pass before presentation materials are produced. Ensure all gates pass, ask the user if questions arise.
  - _Requirements: 1.4, 12.3_
  - _Design: Authoring Pipeline; Quality Gates_

- [x] 12. Cross-cutting validation — traceability and full quality-gate pass
  - [x] 12.1 Build the requirements-traceability matrix (forward + backward)
    - Confirm every Module maps to an outcome and every requirement maps to ≥1 design element and ≥1 lesson/prompt/guide artifact
    - _Requirements: 1.2, 1.3_
    - _Design: Requirements Traceability map; Testing Strategy (traceability check); Correctness Property 1_

  - [x]* 12.2 Run the complete Quality Gates table against every lesson
    - Outcome-mapping, sequencing, content-complete, translation, lesson-structure, prompt-count, offline, scope, tone, AI-literacy (**Properties 1–10**)
    - _Requirements: 1.2, 1.4, 1.5, 2.2, 2.3, 5.7, 9.1, 9.4, 12.1, 12.3, 12.7, 13.2, 14.1, 15.5_
    - _Design: Quality Gates; Correctness Properties 1–10; Testing Strategy (gate validation)_

- [x] 13. Stage 4 — Build the static course website (generated from the text)
  - [x] 13.1 Build the reusable bilingual site template
    - Render the six lesson sections; tap-to-reveal Nepali/English; embed self-check quizzes; copyable "Ask Sabda" prompts; on-demand glossary lookup; simple local progress; no backend/accounts/server; intended as a reusable template for future courses
    - _Requirements: 1.8, 12.1, 13.2, 13.7, 13.8, 10.4_
    - _Design: Delivery and Tooling Model; Integration approach; Lesson_Template_

  - [x] 13.2 Generate the site from the bilingual Markdown Content_System
    - Compile lessons/prompts/facilitator guides into the site; reference the source Content_System IDs (presentation derived from text)
    - _Requirements: 1.7, 1.8_
    - _Design: Integration approach (chosen delivery format); Authoring Pipeline_

  - [x] 13.3 Produce the offline bundle and PWA packaging
    - Offline-capable site copyable to lab machines / installable as a PWA; ≥80% of core activities completable offline; state connectivity needs before each activity; no PII/credentials stored on device; clear-personal-data reminder
    - _Requirements: 14.3, 14.4, 14.5, 14.6, 14.7_
    - _Design: Rural/Offline/Shared-Device Design; Distribution to the lab_

  - [x] 13.4 Configure lab distribution (Tier 1) and mobile basic-content delivery (Tier 2)
    - Tier 1: single URL or offline bundle opened in Sabda on ≥5 shared computers, no one-per-computer requirement; Tier 2: lesson text in Nepali/English readable on an entry-level smartphone using the phone's standard apps
    - _Requirements: 14.1, 14.2_
    - _Design: Delivery and Tooling Model (Tier 1/Tier 2); Distribution to the lab_

  - [x]* 13.5 Validate the offline gate and lab-first/mobile-basic availability
    - Offline gate (Practical Activity offline alternative present); full lab experience + mobile basic-content availability (**Property 8**)
    - _Requirements: 12.7, 14.1, 14.2, 14.3_
    - _Design: Quality Gates (offline); Correctness Property 8_

- [x] 14. Piloting and content validation (curriculum testing strategy)
  - [x] 14.1 Author content-review checklists and the readability/language audit rubric
    - Checklists encoding sentence-length (≤15 words), everyday vocabulary, loanword limits, term-before-use, Nepali parity, six-section order, risk+action pairing, AI-literacy presence
    - _Requirements: 13.1, 13.2, 13.7, 12.1, 15.5, 9.1_
    - _Design: Content authoring rules; Testing Strategy_

  - [x]* 14.2 Run the readability and language audit on a lesson sample
    - _Requirements: 13.1, 13.2, 13.7, 3.1_
    - _Design: Testing Strategy (readability & language audit)_

  - [x]* 14.3 Run the safety/tone audit
    - Confirm every risk is paired with a constructive action, no fear/shame language, safety-playbook patterns referenced where needed
    - _Requirements: 15.1, 15.5, 6.7, 11.5_
    - _Design: Testing Strategy (safety/tone audit); Correctness Property 7_

  - [x]* 14.4 Run the offline / shared-device dry run on a sample lesson
    - Deliver with connectivity disabled and on a shared device; confirm offline path and no-PII-stored rules hold
    - _Requirements: 14.3, 14.5, 14.6, 14.7_
    - _Design: Testing Strategy (offline/shared-device dry run)_

  - [x]* 14.5 Run the AI guardrail check across prompt sets
    - Confirm verification steps trigger, AI stays in scope, and personal-info requests are refused; language-flexibility and voice-fallback behaviors documented
    - _Requirements: 9.4, 5.5, 3.5, 13.4, 13.5, 13.6_
    - _Design: Testing Strategy (AI guardrail check); Guardrail patterns_

  - [x]* 14.6 Prepare and run the facilitator pilot
    - A low-tech facilitator delivers a lesson using only the guide; capture gaps and feed them back into the guide authoring stage
    - _Requirements: 16.1, 16.2, 16.4, 16.5_
    - _Design: Testing Strategy (facilitator pilot)_

  - [x]* 14.7 Prepare and run the learner pilot
    - A small cohort runs a domain; observe whether outcomes are demonstrably met; capture confusion points and loop findings back to the relevant authoring stage
    - _Requirements: 2.1, 8.7_
    - _Design: Testing Strategy (learner pilot)_

- [x] 15. Final checkpoint
  - Ensure all quality gates and pilots pass and findings have looped back to the relevant authoring stage. Ensure all tests pass, ask the user if questions arise.
  - _Design: Testing Strategy; Quality Gates_

## Notes

- Tasks marked with `*` are optional validation/audit/pilot sub-tasks and can be skipped for a faster pilot; core authoring tasks are never optional.
- The pipeline is strictly staged: Stage 1 (Architecture) → Stage 2 (Text Content) → Stage 3 (AI Prompts) → Stage 4 (Presentation). Checkpoints (tasks 2, 9, 11, 15) enforce that no stage starts before its predecessor is complete.
- "Tests" here means content validation, traceability, and human pilot testing — not software unit tests. The validation sub-tasks map directly to the design's Quality Gates and Correctness Properties 1–10.
- The `AI_Companion` (Sabda) is an existing external tool; no task builds it. The only software-style task set is the lightweight static-site build (Stage 4), which is generated from the authored text and intended as a reusable template.
- Each task references its requirement clauses and design sections for traceability.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.4", "1.5"] },
    { "id": 1, "tasks": ["1.2"] },
    { "id": 2, "tasks": ["1.3"] },
    { "id": 3, "tasks": ["1.6"] },
    { "id": 4, "tasks": ["3.1", "4.1", "5.1", "6.1", "7.1", "8.1"] },
    { "id": 5, "tasks": ["3.2", "4.2", "5.2", "6.2", "7.2", "8.2"] },
    { "id": 6, "tasks": ["3.3", "4.3", "5.3", "6.3", "7.3", "8.3", "8.4"] },
    { "id": 7, "tasks": ["3.4", "4.4", "5.4", "6.4", "7.4", "8.5"] },
    { "id": 8, "tasks": ["9.1"] },
    { "id": 9, "tasks": ["9.2"] },
    { "id": 10, "tasks": ["10.1", "10.2", "10.3"] },
    { "id": 11, "tasks": ["10.4"] },
    { "id": 12, "tasks": ["12.1"] },
    { "id": 13, "tasks": ["12.2"] },
    { "id": 14, "tasks": ["13.1", "14.1"] },
    { "id": 15, "tasks": ["13.2"] },
    { "id": 16, "tasks": ["13.3"] },
    { "id": 17, "tasks": ["13.4"] },
    { "id": 18, "tasks": ["13.5"] },
    { "id": 19, "tasks": ["14.2", "14.3", "14.4", "14.5"] },
    { "id": 20, "tasks": ["14.6"] },
    { "id": 21, "tasks": ["14.7"] }
  ]
}
```
