# AI Prompt Set template (prompts.md per lesson)

> Stage 3 artifact. Authored only after the lesson text exists. **3–7 prompts per lesson**, in Nepali, each with a mandatory verify step (Requirements 12.3, 9.4, 5.5). Scope-limited: prompts must not ask the learner for personal/sensitive information (Req 3.5).

Each prompt uses this record format:

```yaml
- id: D{n}-M{m}-L{l}-P{p}
  goal_ne: ""        # what the learner practices (Nepali)
  prompt_ne: ""      # the prompt the learner asks the AI, in Nepali
  prompt_en: ""      # English reference (not shown to learner)
  verify_step_ne: "" # how to check the AI's answer (e.g. cross-check 2 sources) — SP-3
  guardrail: scope_limited_no_personal_info
```

## Example (illustrative)

```yaml
- id: D3-M3-L1-P1
  goal_ne: "विद्यार्थीले गलत सूचनाका सङ्केत पहिचान गर्न सक्ने"
  prompt_ne: "मैले देखेको यो दाबी साँचो हो कि होइन, जाँच्न मलाई के-के सोध्न सकिन्छ?"
  prompt_en: "What questions can I ask to check whether this claim is true?"
  verify_step_ne: "AI को सुझावलाई कम्तीमा २ स्वतन्त्र स्रोतसँग मिलाएर हेर्नुहोस्।"
  guardrail: scope_limited_no_personal_info
```

## Guardrail values
- `scope_limited_no_personal_info` — keep the AI on the lesson task; never request personal/sensitive data.
- `verify_required` — the verify step must be performed before relying on the answer.
- `language_flex` — accept Nepali / English / mixed; on 2 failed voice tries, switch to text and keep context (Req 13.6).
