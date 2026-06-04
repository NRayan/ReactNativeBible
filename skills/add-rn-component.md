---
name: add-rn-component
description: Adds a new React Native component entry to the React Native Bible app. Use this skill whenever the user wants to add a component to the app, says something like "add FlatList", "create content for ScrollView", "add a new component to the components tab", or asks to populate the components content. This skill handles fetching the official RN docs, writing the content files, locale translations, and wiring everything together.
---

# Add RN Component

Adds a new component entry to the React Native Bible app — content files, locale translations, and registration in the components index.

---

## Project structure

```
src/
  content/
    components/
      index.ts                        ← register the component here
      componentProps/{id}.tsx         ← one file per component (.tsx — always)
  i18n/
    content/
      en/components.json
      pt/components.json
      es/components.json
  features/
    components/
      constants.ts      ← COMPONENT_TAGS
  content/
    components/
      types.ts          ← RNComponent, ComponentProp, ComponentContentKey
```

---

## Types

```ts
type ComponentTag = "interaction" | "navigation" | "layout" | "feedback"

// Union of all leaf keys in en/components.json, prefixed with "content."
// e.g. "content.button.subtitle" | "content.button.props.title" | ...
// TypeScript rejects invalid keys at compile time.
type ComponentContentKey = `content.${NestedKeyOf<typeof enComponents>}`

type ComponentProp = {
  name: string
  type: string
  required: boolean
  description: ComponentContentKey  // e.g. "content.button.props.title"
}

type RNComponent = {
  id: string
  name: string
  tag: ComponentTag
  subtitle: ComponentContentKey     // e.g. "content.button.subtitle"
  description: ComponentContentKey  // e.g. "content.button.description"
  previewComponent: React.ReactNode
  props: ComponentProp[]
  gotchas: ComponentContentKey[]    // e.g. ["content.button.gotchas.gotcha1"]
  codeSnippet: string
}
```

---

## Step 1 — Research the component

Fetch the official React Native docs page for the component:

```
https://reactnative.dev/docs/{component-name-lowercase}
```

From the docs, extract:
- A one-line subtitle (plain English, no markdown)
- A 2–3 paragraph description (markdown with backticks for prop/component names)
- **Main props only** — 4–8 props that matter most, not the full list. Prioritise required props and props with non-obvious behaviour.
- **Gotchas** — platform differences, common mistakes, known limitations. 3–5 max.
- A practical code snippet showing real usage (optional — skip for simple components)

---

## Step 2 — Create the content file

Create `src/content/components/componentProps/{id}.tsx`:

> The extension is always `.tsx` — `previewComponent` contains JSX so `.ts` is not valid.

```tsx
import type { RNComponent } from "@content/components/types"
import { ComponentName } from "react-native"

export const componentId: RNComponent = {
  id: "{id}",
  name: "{Name}",
  tag: "{tag}",
  subtitle: "content.{id}.subtitle",
  description: "content.{id}.description",
  previewComponent: <ComponentName />,  // simple, representative render
  props: [
    {
      name: "propName",
      type: "string",
      required: true,
      description: "content.{id}.props.propName",
    },
  ],
  gotchas: [
    "content.{id}.gotchas.gotcha1",
    "content.{id}.gotchas.gotcha2",
  ],
  codeSnippet: `...`,
}
```

---

## Step 3 — Write locale files

Add the component entry to all three locale files.

**`src/i18n/content/en/components.json`** — write in English based on the docs research.

**`src/i18n/content/pt/components.json`** — translate to Brazilian Portuguese.

**`src/i18n/content/es/components.json`** — translate to Spanish.

Structure:

```json
{
  "existing-component": { ... },
  "{id}": {
    "subtitle": "...",
    "description": "...",
    "props": {
      "propName": "..."
    },
    "gotchas": {
      "gotcha1": "...",
      "gotcha2": "..."
    }
  }
}
```

### Translation rules

- Keep untranslated: component names (`FlatList`, `ScrollView`), prop names (`keyExtractor`, `onEndReached`), platform terms (`UIKit`, `RecyclerView`), and anything inside backticks
- Descriptions should be concise — one sentence per prop
- Gotchas use `*bold*` for the label prefix: `*Android* — description here`
- Technical terms like "callback", "ref", "render" are acceptable untranslated in pt/es

---

## Step 4 — Register the component

In `src/content/components/index.ts`, import and add to the correct tag array:

```ts
import { componentId } from "@content/components/componentProps/{id}"

export const components: ComponentsContent = {
  interaction: [..., componentId],  // add to the correct category
  navigation: [],
  layout: [],
  feedback: [],
}
```

---

## Prop type conventions

| Prop type | Write as |
|---|---|
| Any function | `function` |
| String enum | `string` |
| Number | `number` |
| Boolean | `boolean` |
| Color value | `ColorValue` |
| Style object | `StyleProp<ViewStyle>` |
| React element | `ReactElement` |
| Render function | `function` |

---

## Preview component rules

- Must be a valid React Native render — no hooks, no state
- Should be representative but simple
- If the component requires mandatory props, provide minimal ones
- If a meaningful preview isn't possible (e.g. `Modal`), use a placeholder `<View>`

---

## Quality checklist

Before finishing, verify:

- [ ] Props list is curated (4–8 max), not exhaustive
- [ ] All description fields in `.tsx` file are i18n keys with `content.` prefix, not raw text
- [ ] All three locale files have the same keys
- [ ] Gotchas use `*label*` prefix pattern
- [ ] Component is registered in `index.ts` under the correct tag
- [ ] `previewComponent` renders without errors
