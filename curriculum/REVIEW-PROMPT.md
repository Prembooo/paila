# Curriculum Review Prompt (for Claude Code)

Run `claude` in the project root and paste the prompt below. It produces a
`REVIEW.md` report (it does not edit lesson files). The "Quick wins" bucket is
formatted so items can be handed straight back to an AI assistant to apply.

---

# Task: Quality & accuracy audit of the Phase 1 "Digital Literacy" curriculum

You are reviewing a bilingual (English + Nepali) digital-literacy curriculum for a
Nepal NGO. Learners are rural students aged 12–18, first-generation digital users
with weak English, learning in a computer lab with a low-tech facilitator. Produce a
**review report**, do NOT edit lesson files unless I explicitly ask in a later step.

## Where the content lives
- Lessons: `curriculum/domains/D*/D*-M*/lesson.en.md` and `lesson.ne.md` (English +
  Nepali versions of the same lesson; `facilitator.ne.md` is the teacher guide).
- Review pages: `D*-M9-*/lesson.{en,ne}.md` (end-of-chapter quizzes).
- Standards & structure: `curriculum/architecture/*.md`,
  `curriculum/templates/lesson-template.md`.
- Quiz block format and rendering rules: `site/build.js` (search `renderQuiz`).
Read the template and architecture files FIRST so you judge against the intended design.

## The standards each lesson must meet
1. **Locked teach-first structure**: 1) Learning Goal, 2) Let's Learn (with a diagram),
   3) Look and Name (optional), 4) Practice, 5) Check Your Understanding (quiz),
   6) Activity (क्रियाकलाप). Flag any lesson that deviates.
2. **Reading level**: sentences ≤15 words; everyday vocabulary; every new term defined
   (with its Nepali) before first use.
3. **Bilingual parity**: `lesson.ne.md` must fully match `lesson.en.md` in meaning and
   coverage. Quiz blocks must be byte-identical between the two files.
4. **Tone**: calm, no fear or shame; every risk paired with a clear calm action.
5. **Relevance**: at least one local/rural Nepali example per lesson; computer-first
   (not phone-only).
6. **AI literacy**: where AI is taught, it must say to verify AI answers.

## What to check and report
1. **Factual accuracy & currency** — Use web search to verify and update anything
   time-sensitive, and cite sources. Pay special attention to:
   - Modern Google/AI search (AI Mode, tabs: All/Images/Videos/Maps/News/Shopping,
     voice & Lens), and how AI chatbots work.
   - Nepal-specific digital safety: eSewa/Khalti/bank OTP & SMS scams, QR/cashless
     fraud, Cyber Bureau reporting, passkeys/two-step verification.
   - AI voice/deepfake scams; social platforms (TikTok, Reels, YouTube Shorts) and
     attention/“doomscrolling” facts.
   Flag anything outdated, oversimplified to the point of being wrong, or missing.
2. **Nepali translation quality** — This is a priority. For each .ne.md vs .en.md pair,
   find and list:
   - Literal/word-for-word translations that sound unnatural to a Nepali speaker.
   - Meaning mismatches or omissions between English and Nepali.
   - Hindi-leaning or wrong word choices (e.g., prefer क्रियाकलाप over गतिविधि, अध्याय,
     proper native terms); inconsistent terminology for the same concept across lessons.
   - English technical terms left untranslated without a Nepali gloss on first use.
   Give the exact original text and a suggested corrected Nepali rewrite.
3. **Quiz correctness** — Verify every quiz: the marked answer index/value is correct,
   options are unambiguous, the explanation matches the answer, and EN/NE options align.
4. **Pedagogy & clarity** — Where a concept is hard or confusing for the audience,
   suggest a clearer explanation or a place that needs a diagram.
5. **Consistency** — Terminology, section headings, Activity wording, and outcome
   coverage (O01–O12 per the architecture files).
6. **Improvement ideas** — Concrete additions/updates per chapter that would make the
   course more current, engaging, and locally relevant.

## Output format (write to `REVIEW.md` in the repo root)
- **Summary**: overall quality, top 5 themes, and a per-chapter health table.
- **Issue list** as a table, sorted by severity (Critical / High / Medium / Low):
  `| ID | File path | Section/line | Category | Severity | Issue | Evidence (quote) | Suggested fix (EN and/or NE) | Source URL if factual |`
  Categories: Accuracy, Currency, Translation, Quiz, ReadingLevel, Structure, Tone,
  Consistency, Improvement.
- **Two action buckets** at the end:
  - **Quick wins** — small, safe edits an AI or human can apply directly (with the exact
    before→after text).
  - **Needs human judgment** — items requiring a native Nepali speaker or subject expert.
- Keep each issue specific and copy-paste actionable. Quote the exact text and give the
  exact replacement. Do not modify any lesson files in this pass — only write REVIEW.md.

## Rules
- Cite a source URL for every factual/currency claim; prefer official/primary sources.
- Be precise about what you verified vs. assumed.
- Reproduce no more than a short quote from any external source; paraphrase the rest.
