# Offline & Shared-Device Dry Run (अफलाइन र साझा उपकरण परीक्षण)

> Purpose: prove a sample lesson works **with connectivity disabled** and **on a shared device**,
> and that **no personal data or credentials are left behind** (SP-5).
> उद्देश्य: इन्टरनेटविना र साझा उपकरणमा लेसन चल्छ र व्यक्तिगत जानकारी बाँकी रहँदैन भनी पुष्टि गर्ने।

Do this before any rural pilot, on the **same kind of device** learners will use.

---

## 1. Setup (तयारी)

1. Choose one sample lesson with a Practical Activity (e.g. a D1 lesson).
2. Use a **shared device** (a lab phone/computer that others will use after you).
3. **Disable connectivity:** turn on airplane mode / turn off Wi-Fi and mobile data.
4. Have only the printed/offline lesson materials at hand.

## 2. Offline path test (अफलाइन बाटो परीक्षण)

| # | Step | Expected result | Pass? |
|---|---|---|---|
| O1 | Open the lesson's offline materials | All six sections readable without internet | |
| O2 | Read sections 1–3 (Goal, Starter, AI Exploration) | Content makes sense; AI prompts are readable even if AI is offline | |
| O3 | Do the Practical Activity using the **offline alternative** | Task completes with no internet (e.g. paper/draw/say-aloud) | |
| O4 | Reach the activity's success criteria | Learner meets the stated observable success check | |
| O5 | Do Reflection + Mini Project offline | Both completable without connectivity | |

If any step needs the internet, the lesson's `requires_connectivity` / `offline_alternative` is wrong — flag it.

## 3. Shared-device hygiene test — SP-5 (साझा उपकरण सफाइ)

| # | Step | Expected result | Pass? |
|---|---|---|---|
| S1 | During the lesson, no password or personal login is saved | Nothing prompts to "remember password"; nothing saved | |
| S2 | No personal data (name, phone, photos) stored on the device | No personal files left in apps or storage | |
| S3 | Before handing the device on, clear anything entered | Browsing data / typed entries cleared (SP-5) | |
| S4 | Hand device to a second person and re-open the app | No trace of the previous learner's data | |

This protects personal information and supports **O07** (protect personal info / digital footprint).

## 4. Result (नतिजा)

- Lesson tested: __________  ·  Device type: __________  ·  Date: __________
- **Gate:** all Offline steps pass **and** all Shared-device steps pass.
- Issues found:

| Issue | Section affected | Fix needed | Owner |
|---|---|---|---|
|  |  |  |  |

_If the offline path fails, return the lesson to authoring. If hygiene fails, fix the facilitator setup and SP-5 wording, then re-test._
