---
name: mount-learn-content-preview
description: Generates a human-readable English preview of one or more already-registered Learn tab topics by reading existing project files. Use this skill when the user wants to review content that is already in the project, says something like "preview the metro topic", "show me the flexbox content", or "generate a preview for X". Never choose which topics to preview — always wait for the user to specify them. Does not research docs, does not create new content, does not modify any project file except .gitignore.
---

# Mount Learn Content Preview

Reads existing topic content from `src/content/learn/index.ts` and `src/i18n/content/en/learn.json`, resolves i18n keys to their English text values, and saves a human-readable flat file to `.preview/learn/{topic_id}.md` for review.

No docs are fetched. No content is created or modified.

---

## Important

- Never choose which topics to preview — always wait for the user to name them explicitly
- Do not fetch any external URLs
- Do not write to `en/learn.json`, `pt/learn.json`, `es/learn.json`, or `index.ts`
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

- `src/content/learn/index.ts` — provides the ordered list of `ContentBlock` entries for each topic
- `src/i18n/content/en/learn.json` — provides the English text for every i18n key

---

## Step 3 — Locate the requested topics

In `index.ts`, find each requested topic by its `id`. The topic's `body` array defines the blocks in display order.

For each block in `body`:

| Block type | Where to get the value |
|---|---|
| `heading` | Resolve `value` as an i18n key in `en/learn.json`. Strip the `"content."` prefix and navigate the JSON by the remaining dot-separated path. |
| `text` | Same as `heading`. |
| `code` | The `value` field is already a literal string in `index.ts` — use it as-is. The `language` field is also in `index.ts`. |
| `image` | `imagePath` is a `require()` call — extract just the filename. `caption` is an i18n key — resolve it from `en/learn.json`. |

Also resolve `title` and `subtitle` from `en/learn.json` using the same key resolution.

---

## Step 4 — Generate the preview file

### Single topic

Create `.preview/learn/{topic_id}.md` for the requested topic.

### Entire section

When the user requests all topics of a section, create a single file `.preview/learn/{section_id}.md` containing every topic in the section's order. Separate topics with a `---` divider line (blank line before and after).

### Structure per topic:

```
{topic_id}

title: "..."

subtitle: "..."

[heading] "..."

[text] "..."

[code] language: tsx
// resolved code here

[heading] "..."

[text] "..."

[image] name: "filename.png", caption: "..."
```

### Format rules

- One blank line between every block
- `[heading]`, `[text]`, `[code]`, `[image]` are literal block-type labels — keep them exactly as shown
- `[code]` blocks: write `language: {lang}` on the same line as `[code]`, then the code on the next lines, unquoted
- `[image]` blocks: `name` is the filename extracted from the `require()` path; `caption` is the resolved English text
- All resolved text must be the actual content from `en/learn.json` — never the raw i18n key strings
- Do not translate or rephrase — output the English text exactly as it appears in the JSON

### Example

Given this entry in `index.ts`:

```ts
{
  id: "flexbox_basics",
  title: "content.flexbox_basics.title",
  subtitle: "content.flexbox_basics.subtitle",
  body: [
    { type: "heading", value: "content.flexbox_basics.body.heading1" },
    { type: "text",    value: "content.flexbox_basics.body.text1" },
    { type: "code", language: "typescript", value: "const x = 1;" },
    { type: "heading", value: "content.flexbox_basics.body.heading2" },
    { type: "text",    value: "content.flexbox_basics.body.text2" },
  ],
}
```

And these values in `en/learn.json`:

```json
"flexbox_basics": {
  "title": "Flexbox Basics",
  "subtitle": "The layout system React Native uses for every component",
  "body": {
    "heading1": "How Flexbox works in React Native",
    "text1": "React Native uses Flexbox for layout...",
    "heading2": "Common pitfalls",
    "text2": "A View with no explicit size..."
  }
}
```

The output file `.preview/learn/flexbox_basics.md` should be:

```
flexbox_basics

title: "Flexbox Basics"

subtitle: "The layout system React Native uses for every component"

[heading] "How Flexbox works in React Native"

[text] "React Native uses Flexbox for layout..."

[code] language: typescript
const x = 1;

[heading] "Common pitfalls"

[text] "A View with no explicit size..."

> ⚠️ This is a preview only. No files were modified.
```

---

## Step 5 — End of file footer

Append the following line at the end of every preview file, separated by a blank line:

```
> ⚠️ This is a preview only. No files were modified.
```

---

## After saving

Tell the user which files were saved under `.preview/learn/`.
