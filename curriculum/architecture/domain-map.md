# Curriculum Architecture — Domain Map

Phase 1: **Digital Citizen**. This file defines every Domain and Learning_Module, their IDs, sequence, lesson counts, and outcome mapping. It is authored before any lesson body (Requirement 1.1).

## Domain & Module Map

Lesson counts: **Domain 3 has the most lessons (6), strictly more than any other domain, and at least four** (Requirements 5.7, 5.8).

| Domain | Title (EN) | शीर्षक (NE) | Seq | Modules | Lessons | Outcomes |
|---|---|---|---|---|---|---|
| **D1** | Understanding Devices & the Digital World | उपकरण र डिजिटल संसार | 1 | D1-M1…D1-M4 | 4 | O01 |
| **D2** | Understanding the Internet | इन्टरनेट बुझ्ने | 2 | D2-M1, D2-M2, D2-M3 | 4 | O02, O03 |
| **D3** | Information Literacy & Critical Thinking | सूचना साक्षरता र आलोचनात्मक सोच | 3 | D3-M1…D3-M5 | 6 | O04, O05, O06 |
| **D4** | Digital Safety, Privacy & Security | डिजिटल सुरक्षा, गोपनीयता | 4 | D4-M1…D4-M5 | 5 | O07, O08, O11 |
| **D5** | Responsible Social Media + Attention Self-Defense | जिम्मेवार सामाजिक सञ्जाल | 5 | D5-M1…D5-M5 | 5 | O09, O10 |
| **D6** | Becoming an Independent Learner (Capstone) | स्वतन्त्र सिकारु (क्यापस्टोन) | 6 | D6-M1…D6-M4 | 4 | O12 |

D3 reaches 6 lessons because its most important module, **D3-M2 Evaluating Sources**, is split into two lessons (D3-M2-L1 "Who/Why made this?" and D3-M2-L2 "Evidence & cross-checking"). This keeps **D3 strictly the largest** domain (6 > 5).

## Module → Outcome Mapping

| Module | Title (EN) | Outcomes | Thread tags |
|---|---|---|---|
| D1-M1 | What Is a Computer? (types of devices) | O01 | AI |
| D1-M2 | Parts of a Computer | O01 | — |
| D1-M3 | Hardware, Software & the Operating System | O01 | AI |
| D1-M4 | First Hands-On: Using a Computer | O01 | AI |
| D2-M1 | What Is the Internet (L1) · Using a Web Browser (L2) | O02 | — |
| D2-M2 | Ways to Search | O03 | AI |
| D2-M3 | Modern & AI Search | O03 | AI |
| D3-M1 | Facts vs Opinions | O04 | — |
| D3-M2 | Evaluating Sources (L1 Who/Why, L2 Evidence & cross-check) | O04, O05 | — |
| D3-M3 | Spotting Misinformation | O05 | AI |
| D3-M4 | Trusting AI Well | O06 | AI |
| D3-M5 | Learning With AI | O06 | AI |
| D4-M1 | Digital Footprint | O07 | — |
| D4-M2 | Private Information | O07 | — |
| D4-M3 | Passwords & Accounts | O07, O08 | — |
| D4-M4 | Scams & Synthetic Media | O08 | AI |
| D4-M5 | Digital Money Safety | O11 | Money |
| D5-M1 | Why Social Media Exists | O09 | — |
| D5-M2 | The Attention Economy | O10 | Attention |
| D5-M3 | Emotional & Attention Self-Defense | O10 | Attention |
| D5-M4 | Posting & Communicating Responsibly | O09 | — |
| D5-M5 | Positive Digital Identity | O09 | AI |
| D6-M1 | Learning Anything | O12 | AI |
| D6-M2 | Better Questions & Trustworthy Resources | O12 | AI |
| D6-M3 | Plan Your Project | O12 | — |
| D6-M4 | Capstone | O12 (+ all domains) | AI |

**Coverage check:** every module maps to ≥1 outcome ✓; every outcome O01–O12 appears ≥1 time ✓ (Property 1).

## Cross-Cutting Thread Matrix (thread × domain)

Each thread must appear where marked (Requirements 9.1, 9.5, 10, 11).

| Thread | D1 | D2 | D3 | D4 | D5 | D6 |
|---|---|---|---|---|---|---|
| **AI literacy** (≥1 labeled element per domain) | ✓ M1/M3 | ✓ M2/M3 | ✓ M3/M4/M5 | ✓ M4 | ✓ M5 | ✓ M1/M2/M4 |
| **"AI you already use"** (≥3 domains) | ✓ | ✓ | — | — | ✓ | ✓ |
| **Emotional/attention defense** | — | — | — | — | ✓ M2/M3 | — |
| **Digital money safety** | — | — | — | ✓ M5 | — | — |

## Sequence rule
Domains are delivered in order D1→D6. Within Stage 2 authoring, the six domains may be written in parallel, but D6's capstone depends on skills introduced across D1–D5.
