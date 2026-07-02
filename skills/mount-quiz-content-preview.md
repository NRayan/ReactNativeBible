---
name: mount-quiz-content-preview
description: Generates a human-readable English preview of all quiz questions for one section by reading existing project files. Use this skill when the user wants to review quiz questions for a section, says something like "preview the layout quiz", "show me the performance quiz questions", or "generate quiz preview for X". Never choose which section to preview — always wait for the user to name it explicitly. Does not research docs, does not create new content, does not modify any project file except .gitignore.
---

# Mount Quiz Content Preview

Reads quiz content from `src/content/quiz/index.ts` and `src/i18n/content/en/quiz.json`, resolves all i18n keys to their English text values, and saves a human-readable flat file to `.preview/quiz/{section_id}.md` for review.

The output shows every question in the section with all options, a `✓` marker on the correct one, and the full explanation below.

No docs are fetched. No content is created or modified.

---

## Important

- Never choose which section to preview — always wait for the user to name it explicitly
- Do not fetch any external URLs
- Do not write to `en/quiz.json`, `pt/quiz.json`, `es/quiz.json`, or `index.ts`
- The only project file that may be modified is `.gitignore` (to add `.preview/`)

---

## Step 1 — Check `.gitignore`

Open `.gitignore` at the project root and check whether `.preview/` is listed.

If it is not, add it:

```
# content previews (local only)
.preview/
```

---

## Step 2 — Read the source files

Read both files in full:

- `src/content/quiz/index.ts` — provides the `SectionQuiz` entries: questions with their i18n keys and `isCorrect` flags per option
- `src/i18n/content/en/quiz.json` — provides the English text for every i18n key

---

## Step 3 — Locate the requested section

In `index.ts`, find the `SectionQuiz` entry whose `sectionId` matches the requested section.

For each `QuizQuestion` in `questions`:

- `question` is an i18n key — resolve it from `en/quiz.json`
- `explanation` is an i18n key — resolve it from `en/quiz.json`
- `options` is an array — each option has a `label` (i18n key) and `isCorrect` (boolean)

### Resolving an i18n key

Keys follow the pattern `"content.{section_id}.{question_id}.question"`, `"content.{section_id}.{question_id}.explanation"`, and `"content.{section_id}.{question_id}.options.{n}"`.

Strip the `"content."` prefix and navigate `en/quiz.json` by the remaining dot-separated path. Example: key `"content.layout.q1.options.2"` → `enQuiz["layout"]["q1"]["options"]["2"]`.

---

## Step 4 — Generate the preview file

Create `.preview/quiz/{section_id}.md` for the requested section.

### Structure per question:

```
Q{n}: "{resolved question text}"

  [ ] "{option 1 text}"
  [✓] "{option 2 text}"
  [ ] "{option 3 text}"
  [ ] "{option 4 text}"

  Explanation: "{resolved explanation text}"
```

Where `[✓]` marks the option whose `isCorrect` is `true`, and `[ ]` marks the rest.

Separate questions with a blank line between the explanation and the next `Q{n}:` line.

### Format rules

- Use `[✓]` for the correct option and `[ ]` for wrong ones
- Options are listed in the same order as they appear in `index.ts` (which maps to options `"1"`, `"2"`, `"3"`, `"4"` in the JSON)
- All resolved text must be the actual content from `en/quiz.json` — never the raw i18n key strings
- Do not translate or rephrase — output the English text exactly as it appears in the JSON
- `Explanation:` is indented at the same level as the options (two spaces)

### Example

Given this entry in `index.ts`:

```ts
{
    sectionId: "layout",
    questions: [
        {
            id: "q1",
            question: "content.layout.q1.question",
            explanation: "content.layout.q1.explanation",
            options: [
                { label: "content.layout.q1.options.1", isCorrect: false },
                { label: "content.layout.q1.options.2", isCorrect: true },
                { label: "content.layout.q1.options.3", isCorrect: false },
                { label: "content.layout.q1.options.4", isCorrect: false },
            ],
        },
    ],
}
```

And these values in `en/quiz.json`:

```json
"layout": {
  "q1": {
    "question": "What is the default value of `flexDirection` in React Native?",
    "explanation": "`flexDirection` defaults to `\"column\"` in React Native...",
    "options": {
      "1": "\"row\"",
      "2": "\"column\"",
      "3": "\"column-reverse\"",
      "4": "\"row-reverse\""
    }
  }
}
```

The output file `.preview/quiz/layout.md` should be:

```
layout

Q1: "What is the default value of `flexDirection` in React Native?"

  [ ] "\"row\""
  [✓] "\"column\""
  [ ] "\"column-reverse\""
  [ ] "\"row-reverse\""

  Explanation: "`flexDirection` defaults to `\"column\"` in React Native..."

> ⚠️ This is a preview only. No files were modified.
```

---

## Step 5 — File header

Begin every preview file with the section id on its own line, followed by a blank line, before the first question:

```
{section_id}

Q1: ...
```

---

## Step 6 — End of file footer

Append the following line at the end of every preview file, separated by a blank line:

```
> ⚠️ This is a preview only. No files were modified.
```

---

## After saving

Tell the user which file was saved under `.preview/quiz/`.
