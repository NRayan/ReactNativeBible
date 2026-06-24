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

`previewComponent` has the type `(props: PreviewProps) => React.ReactElement`, where `PreviewProps = { focused: boolean }` is exported from `@content/components/types`. Import it when the preview uses `focused`.

**Always use a named component** (uppercase) defined above the exported object — even for stateless previews. This is required because ESLint's `react-hooks/rules-of-hooks` only recognises hooks inside functions whose names start with an uppercase letter or `use`, and it keeps the pattern consistent.

```tsx
function ButtonPreview() {
    return <Button title="Press me" onPress={() => null} />;
}

export const button: RNComponent = {
    // ...
    previewComponent: ButtonPreview,
}
```

**Theme-aware styling** — if the preview needs colours that follow the selected theme, use `useThemeStore`:

```tsx
function TextInputPreview() {
    const { theme: { colors } } = useThemeStore();
    return (
        <TextInput
            style={{ backgroundColor: colors.surface, color: colors["text-primary"] }}
        />
    );
}
```

**Scrollable previews** — if the preview contains a scrollable component (`FlatList`, `ScrollView`, `SectionList`, etc.), set `hasScroll: true` on the `RNComponent` object and use `focused` to gate `scrollEnabled`. This tells the detail screen to show the focus toggle button, which prevents the preview's scroll from conflicting with the page scroll:

```tsx
import type { PreviewProps, RNComponent } from "@content/components/types";

function FlatListPreview({ focused }: PreviewProps) {
    return <FlatList scrollEnabled={focused} ... />;
}

export const flatlist: RNComponent = {
    // ...
    previewComponent: FlatListPreview,
    hasScroll: true,
}
```

**Interactive previews** — previews should be interactive when the component is inherently interactive:

- *Pressable components* (`Button`, `Pressable`, `TouchableOpacity`) — use a press counter. Start with `"Press me"`, then show `"Pressed N×"`:

```tsx
function ButtonPreview() {
    const [count, setCount] = useState(0);
    const label = count === 0 ? "Press me" : `Pressed ${count}×`;
    return <Button title={label} onPress={() => setCount(c => c + 1)} />;
}
```

- *Input components* (`TextInput`, `Switch`) — use controlled state so the user can interact with the field:

```tsx
function SwitchPreview() {
    const [value, setValue] = useState(false);
    return <Switch value={value} onValueChange={setValue} />;
}
```

- Should be representative but simple
- If the component requires mandatory props, provide minimal ones
- If a meaningful preview isn't possible (e.g. `Modal`), use a placeholder `<View>`

---

## Code style

- Always use double quotes in code examples and prop values — `"column"` not `'column'`, `variant="primary"` not `variant='primary'`

---

## Quality checklist

Before finishing, verify:

- [ ] Props list is curated (4–8 max), not exhaustive
- [ ] All description fields in `.tsx` file are i18n keys with `content.` prefix, not raw text
- [ ] All three locale files have the same keys
- [ ] Gotchas use `*label*` prefix pattern
- [ ] Component is registered in `index.ts` under the correct tag
- [ ] `previewComponent` renders without errors
- [ ] If preview contains a scrollable component, `hasScroll: true` is set and `scrollEnabled={focused}` is used
