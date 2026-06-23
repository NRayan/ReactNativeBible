---
name: add-learn-content
description: Adds a new topic entry to the Learn tab of the React Native Bible app. Use this skill whenever the user wants to add a topic to the Learn section, says something like "add a topic about Animations", "create content for useEffect", "add flexbox advanced to learn", or asks to populate the learn content. This skill handles researching the official RN docs, writing i18n content in three languages, and registering the topic in the learn index.
---

# Add Learn Content

Adds a new topic to the React Native Bible Learn tab — i18n content in three languages and registration in the learn index.

---

## Project structure

```
src/
  content/
    learn/
      index.ts                  ← register the topic here (inside the correct Section)
  i18n/
    content/
      en/learn.json             ← English content (source of truth)
      pt/learn.json             ← Brazilian Portuguese translation
      es/learn.json             ← Spanish translation
  features/
    learn/
      types.ts                  ← Section, Topic, ContentBlock, LearnContentKey
```

---

## Types

```ts
// Union of all leaf keys in en/learn.json, prefixed with "content."
// e.g. "content.flexbox_basics.title" | "content.flexbox_basics.body.heading1"
// TypeScript rejects invalid keys at compile time.
type LearnContentKey = `content.${NestedKeyOf<typeof en>}`

type ContentBlock =
    { type: "heading"; value: LearnContentKey }
  | { type: "text";    value: LearnContentKey }
  | { type: "code";    language: string; value: string }  // value is a literal string, NOT a key
  | { type: "image";   uri: string; caption?: string }

type Topic = {
  id: string
  icon: TablerIconName       // Tabler Icons, outline style
  title: LearnContentKey
  subtitle: LearnContentKey
  body: ContentBlock[]
}

type Section = {
  id: string
  icon: TablerIconName
  title: LearnContentKey
  topics: Topic[]
}
```

---

## Step 1 — Research the topic

Fetch the official React Native docs page for the topic. Prefer:

```
https://reactnative.dev/docs/{topic-slug}
```

From the docs (or authoritative source), extract:
- A clear, one-line **title** (plain text, no markdown)
- A concise **subtitle** — one sentence describing what the topic is about
- **2–4 sections**, each composed of:
  - A `heading` — section title
  - 1–3 `text` blocks — prose explanation using backticks for code terms
  - Optional `code` blocks — practical TypeScript/TSX snippets showing real usage

Validate all technical claims against the docs before writing. Do not invent API behaviour.

---

## Step 2 — Write the English content

Add the topic to **`src/i18n/content/en/learn.json`**.

Use `{topic_id}` as the top-level key (snake_case, matching the `Topic.id`).

```json
{
  "existing_topic": { ... },
  "{topic_id}": {
    "title": "...",
    "subtitle": "...",
    "body": {
      "heading1": "...",
      "text1": "..."
    }
  }
}
```

The JSON only contains keys for `heading` and `text` blocks — the number and arrangement of those keys must match exactly what `index.ts` references.

### Body key conventions

- Blocks are named by **type + sequential number**: `heading1`, `heading2`, `text1`, `text2`, `text3`…
- Each type has its own independent counter that increments sequentially and never resets — `heading1` and `text1` can coexist because they count separately.
- Only `heading` and `text` blocks get i18n keys. `code` and `image` blocks use literal values directly in `index.ts` and do **not** appear in the JSON.

### Body structure is free-form

There is no required template. The body should follow the natural reading flow of the topic — let the content dictate the structure. Some topics will have a single code block; others will have none, or several, or images. All of these are valid:

```json
// Minimal — concept-only topic
{ "heading1": "...", "text1": "...", "text2": "..." }

// With a mid-section code example
{ "heading1": "...", "text1": "...", "heading2": "...", "text2": "..." }
// (code block lives in index.ts between heading2 and text2 — no key needed in JSON)

// Multiple sections, no code
{ "heading1": "...", "text1": "...", "text2": "...", "heading2": "...", "text3": "...", "text4": "..." }
```

The only hard rule: **the body must start with a `heading` block**.

---

## Step 3 — Translate to Portuguese and Spanish

Replicate the **exact same key structure** in:

- **`src/i18n/content/pt/learn.json`** — Brazilian Portuguese
- **`src/i18n/content/es/learn.json`** — Spanish

### Translation rules

- Keep untranslated: component/API names (`FlatList`, `flexDirection`), prop names, platform terms (`UIKit`, `Yoga`), and anything inside backticks
- Technical terms like "callback", "layout", "render", "flex" are acceptable untranslated
- Prose should read naturally in the target language, not word-for-word

---

## Step 4 — Register the topic

In **`src/content/learn/index.ts`**, add the new `Topic` inside the appropriate `Section.topics` array.

```ts
{
  id: "{topic_id}",       // matches the JSON key
  icon: "IconName",       // Tabler Icons outline name
  title: "content.{topic_id}.title",
  subtitle: "content.{topic_id}.subtitle",
  body: [
    // Must start with a heading. After that, arrange blocks in whatever order
    // makes the reading flow natural — there is no fixed template.
    { type: "heading", value: "content.{topic_id}.body.heading1" },
    { type: "text",    value: "content.{topic_id}.body.text1" },
    // code and image blocks use literal values, not i18n keys:
    { type: "code", language: "typescript", value: `...` },
    { type: "image", uri: "..." },
    { type: "heading", value: "content.{topic_id}.body.heading2" },
    { type: "text",    value: "content.{topic_id}.body.text2" },
  ],
}
```

If no existing `Section` fits the topic, create a new one and add its `title` key to the three locale files under `sections`.

---

## Icon selection

Use Tabler Icons in outline style. Pick an icon that visually represents the topic concept:

| Topic concept | Example icon |
|---|---|
| Layout / grid | `IconLayoutGrid` |
| Positioning / layers | `IconStack2` |
| Animation / motion | `IconPlayerPlay` |
| Performance | `IconGauge` |
| Navigation | `IconCompass` |
| State / data | `IconDatabase` |
| Hooks | `IconHook` |
| Gestures | `IconHandFinger` |

When in doubt, pick a generic but related icon — avoid letters-based icons (`IconAB` etc.) for topic entries.

---

## Quality checklist

Before finishing, verify:

- [ ] All technical claims were validated against the official docs
- [ ] `en/learn.json` has the new topic with `title`, `subtitle`, and all `body` keys
- [ ] `pt/learn.json` and `es/learn.json` have the **exact same keys** as `en`
- [ ] No `code` or `image` block values appear in the JSON — only in `index.ts`
- [ ] All `value` fields in `heading`/`text` blocks in `index.ts` use `"content.{topic_id}.body.{key}"` format
- [ ] `code` blocks in `index.ts` use literal string values (not i18n keys)
- [ ] The topic is added to the correct `Section` in `index.ts`
- [ ] `Topic.id` matches the top-level JSON key exactly
- [ ] TypeScript accepts all `LearnContentKey` values (no type errors)
