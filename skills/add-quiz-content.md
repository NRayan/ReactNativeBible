---
name: add-quiz-content
description: Adds quiz questions to the Learn tab of the React Native Bible app. Use this skill whenever the user wants to add quiz questions for a section, says something like "add quiz for Layout", "create questions for the Performance section", or asks to populate quiz content. This skill handles pulling the planned questions from the content map, verifying answers against the app's own content, writing plausible distractors, i18n content in three languages, and registering the questions in the quiz index.
---

# Add Quiz Content

Adds questions to a `SectionQuiz` entry — i18n content in three languages and registration in the quiz index.

---

## Important

- Never choose which section or topic to write questions about — always wait for the user to specify
- Never generate quiz questions unless explicitly asked (e.g. "add quiz questions about Flexbox")
- If the user's request is ambiguous about the topic, ask for clarification before proceeding
- **Use only the questions already listed for that section in `QUIZ_CONTENT.md`.** Do not invent additional questions, and do not skip questions that are mapped there, unless the user explicitly asks for something different from what's mapped
- If a section has no entry yet in `QUIZ_CONTENT.md`, stop and tell the user — do not draft the question map yourself as part of this skill

---

## Project structure

```
src/
  content/
    quiz/
      index.ts                  ← register the SectionQuiz here
      QUIZ_CONTENT.md           ← content map: all sections and questions, each with a base answer
  i18n/
    content/
      en/quiz.json             ← English content (source of truth)
      pt/quiz.json             ← Brazilian Portuguese translation
      es/quiz.json             ← Spanish translation
  features/
    learn/
      types.ts                  ← SectionQuiz, QuizQuestion, QuizOption, QuizContentKey
```

> **`QUIZ_CONTENT.md` is the content map.** It lists every section's questions along with a short base answer for each — the intended correct-answer direction, not final copy. After adding new questions, update this file if question wording changed during writing, to keep the map in sync with what actually exists in `index.ts`.

---

## Types

```ts
// Union of all leaf keys in en/quiz.json, prefixed with "content."
// TypeScript rejects invalid keys at compile time.
type QuizContentKey = `content.${NestedKeyOf<typeof enQuiz>}`

type QuizOption = {
  label: QuizContentKey
  isCorrect: boolean  // exactly 1 option per question must be true
}

type QuizQuestion = {
  id: string          // e.g. "q1", "q2" — sequential within the section
  question: QuizContentKey
  explanation: QuizContentKey
  options: QuizOption[]  // minimum 4, maximum 6
}

type SectionQuiz = {
  sectionId: string   // matches Section.id in learn/index.ts
  questions: QuizQuestion[]
}
```

> **Note:** `QuizOption` has no `id` field. The display letters (A, B, C, D…) are assigned at runtime by `useQuizScreen` after shuffling — they are not stored in the data.

---

## Step 1 — Pull the question and verify the answer

**This step is mandatory. Never write final content from memory, and never skip verification just because a base answer already exists.**

For each question mapped to the target section in `QUIZ_CONTENT.md`:

1. Take the question text and base answer already written there — this gives you the question and the direction of the correct answer, not the final explanation or the wrong options
2. Verify that base answer against the app's own content — the relevant topic(s) in `src/content/learn/index.ts` and `src/i18n/content/en/learn.json` (or `learn.md` if available), since the questions were written to match what the app actually teaches
3. If the app's content doesn't fully support the base answer, or is more precise/different in some detail, use the app's content as the source of truth and flag the discrepancy to the user rather than silently rewriting the map

Only after this verification should you move to drafting the full question, explanation, and distractors. Do not invent API behaviour beyond what's confirmed either in `QUIZ_CONTENT.md` or the app's own content.

---

## Step 2 — Design the questions

### Distractor quality rules — the most important part of this skill

Every wrong option must be **technically plausible** and require knowledge to rule out — but must not stray far from the correct answer. A reader who has skimmed the topic should be genuinely unsure; only someone who studied it carefully should get it right.

**Distractor patterns that work:**

- **Same enum, wrong value** — if the answer is `"column"`, offer `"row"`, `"column-reverse"`, `"row-reverse"`
- **Swapped axis** — if the answer involves `justifyContent`, distract with `alignItems` (or vice versa)
- **Adjacent API** — for `useWindowDimensions`, distract with `Dimensions.get("window")` and vice versa
- **Common misconception** — things that feel right but are wrong: "React Native's default `flexDirection` is `"row"` like the web" is a classic wrong belief
- **Slight name variation** — `StyleSheet.flatten` vs `StyleSheet.absoluteFill` vs `StyleSheet.hairlineWidth`
- **Almost-true statement** — a statement that would be correct in CSS or the web but is not true in React Native

**Distractor patterns that are banned:**

- Options that are obviously unrelated (a layout question should never have a performance concept as an option)
- Answers that are far shorter, simpler, or more extreme than the correct answer — length, complexity, and plausibility must be comparable across all options; a distractor should never be a wild swing that's easy to rule out on sight
- Nonsense or placeholder values (`"none"`, `"auto"`, `"default"` when those aren't real values for the prop)
- Trivially wrong answers that any developer would dismiss on sight

**Calibration check:** after writing the options, ask yourself: *"Would an experienced React Native developer who hasn't studied this specific detail pick one of the wrong answers?"* If yes, the distractors are good. If the wrong answers are obvious or absurdly far from the correct one, rewrite them.

### Question style

- Ask about **behaviour**, **defaults**, **differences**, and **constraints** — not definitions
- Frame questions precisely — avoid ambiguity about what is being asked
- One sentence per question when possible; two sentences maximum
- Options must be grammatically consistent with the question stem

**Good question patterns:**
- "What is the default value of `flexDirection` in React Native?"
- "Which hook automatically re-renders when the device is rotated?"
- "What does `flex: 1` do when only one sibling has it?"
- "Which `position` value removes an element from the Flexbox flow?"

**Bad question patterns:**
- "What is Flexbox?" (too vague, tests memorization of a definition)
- "Is `alignItems` important?" (yes/no framing, trivially answered)

---

## Step 3 — Write the English content

Add questions to **`src/i18n/content/en/quiz.json`** under the matching section key.

### JSON structure

```json
{
  "{section_id}": {
    "{question_id}": {
      "question": "...",
      "explanation": "...",
      "options": {
        "1": "...",
        "2": "...",
        "3": "...",
        "4": "..."
      }
    }
  }
}
```

- `{section_id}` matches `SectionQuiz.sectionId` and `Section.id` in `learn/index.ts` (e.g. `"layout"`, `"performance"`)
- `{question_id}` is sequential: `"q1"`, `"q2"`, `"q3"`…
- `options` keys are `"1"` through `"6"` — use only as many as needed (minimum 4)
- `explanation` must state **why the correct answer is correct** and briefly explain why the most tempting wrong answer is wrong
- **Never reference an option by its position number** (e.g. "Option 2", "the third option"). Options are shuffled at runtime, so position numbers are meaningless to the user. If you need to call out a distractor, describe its content instead — e.g. "The option about lazy loading…", "The option that mentions bytecode precompilation…"

### Example

```json
{
  "layout": {
    "q1": {
      "question": "What is the default value of `flexDirection` in React Native?",
      "explanation": "`flexDirection` defaults to `\"column\"` in React Native, so children stack vertically. This differs from the web, where the CSS default is `\"row\"`. Changing to `\"row\"` makes children line up horizontally.",
      "options": {
        "1": "\"row\"",
        "2": "\"column\"",
        "3": "\"row-reverse\"",
        "4": "\"column-reverse\""
      }
    }
  }
}
```

---

## Step 4 — Translate to Portuguese and Spanish

Replicate the **exact same key structure** in:

- **`src/i18n/content/pt/quiz.json`** — Brazilian Portuguese
- **`src/i18n/content/es/quiz.json`** — Spanish

### Translation rules

- Keep untranslated: prop names, API names, values inside backticks, enum literals (`"column"`, `"absolute"`)
- Technical terms like "hook", "render", "layout", "flex" are acceptable untranslated
- The option labels for code values (e.g. `"\"column\""`, `"\"row\""`) must remain unchanged
- Prose in `question` and `explanation` should read naturally in the target language, not word-for-word

---

## Step 5 — Register in the quiz index

Add or update the `SectionQuiz` in **`src/content/quiz/index.ts`**.

If the file does not exist yet, create it:

```ts
import type { SectionQuiz } from "@features/learn/types";

export const quizzes: SectionQuiz[] = [
  {
    sectionId: "{section_id}",
    questions: [
      {
        id: "q1",
        question: "content.{section_id}.q1.question",
        explanation: "content.{section_id}.q1.explanation",
        options: [
          { label: "content.{section_id}.q1.options.1", isCorrect: false },
          { label: "content.{section_id}.q1.options.2", isCorrect: true },
          { label: "content.{section_id}.q1.options.3", isCorrect: false },
          { label: "content.{section_id}.q1.options.4", isCorrect: false },
        ],
      },
    ],
  },
];
```

If the file already exists, add a new `SectionQuiz` entry or append questions to an existing one.

**Rules:**
- `sectionId` must match an existing `Section.id` in `src/content/learn/index.ts`
- `question.id` must be unique within the section (`"q1"`, `"q2"`…)
- Exactly **one** option per question must have `isCorrect: true`
- Options have no `id` field — the display letters are assigned at runtime after shuffling

---

## Code style

- Always use double quotes in code examples and prop values — `"column"` not `'column'`, `flexDirection="row"` not `flexDirection='row'`

---

## Quality checklist

Before finishing, verify:

- [ ] Every question used matches one already listed for that section in `QUIZ_CONTENT.md` — no invented questions
- [ ] Every base answer was verified against the app's own content (`learn/index.ts` / `learn.json`) — no answers written from memory
- [ ] Every wrong option is plausible — an experienced developer could be tripped up by it
- [ ] No option is obviously wrong due to being too short, too vague, too extreme, or unrelated to the topic
- [ ] All options have comparable length and complexity
- [ ] `en/quiz.json` has the new questions with `question`, `explanation`, and all `options` keys (`"1"`–`"4"` minimum)
- [ ] `pt/quiz.json` and `es/quiz.json` have the **exact same key structure** as `en`
- [ ] Code values in option labels (enum strings, prop names) are untranslated in pt and es
- [ ] `src/content/quiz/index.ts` has exactly one `isCorrect: true` per question
- [ ] `QuizOption` entries have no `id` field
- [ ] TypeScript accepts all `QuizContentKey` values (no type errors)
