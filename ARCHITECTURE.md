# Architecture — React Native Bible

## Overview

Offline-first reference app for intermediate and advanced React Native developers. No backend, no authentication — all content lives in local JSON files and all state persists on device.

---

## Structure

The codebase is organized by feature — each folder groups everything related to a user-facing capability: screens, hooks, components, and logic.

```
src/
  features/
    learn/       ← sections, topics, quiz
    components/  ← RN components reference
    settings/    ← theme, language
  components/    ← shared components
  navigation/
  stores/
  content/       ← local JSON files
  theme/
```

---

## Feature structure

Each feature follows the same internal convention:

```
learn/
  screens/
    QuizScreen.tsx     ← view
  hooks/
    useQuiz.ts         ← viewmodel
  utils/
    quiz.ts            ← model (pure functions)
    quiz.test.ts
  components/          ← shared between screens of this feature
```

The naming is intentional — `QuizScreen`, `useQuiz`, and `quiz.ts` map directly to view, viewmodel, and model. Components that are only used by a single screen live in that screen's file. Components shared across features live in `src/components/`.

---

## Pattern

MVVM. Screens have no logic — they render what the hook returns and delegate interactions back to it. Hooks orchestrate logic and persistence. Pure functions handle computation with no React dependencies.

```ts
// hook
function useQuiz() {
  const [options, setOptions] = useState([]);
  const load = () => setOptions(selectOptions(question)); // ← pure function
  return { options, load };
}

// screen
function QuizScreen() {
  const { options, load } = useQuiz(); // ← only renders
  return <View>{options.map(o => <Text>{o}</Text>)}</View>;
}
```

---

## Internationalisation (i18n)

**Supported languages:** English (`en`), Portuguese (`pt`), Spanish (`es`)

The translation system has two distinct layers with different purposes:

**Layer 1 — UI strings** `src/i18n/locales/{lang}.json`

Short labels used by the app shell: navigation tabs, settings screen, shared actions. Keys are namespaced by feature (`settings.title`, `components.props`, `components.tags.interaction`, etc.).

**Layer 2 — Component content** `src/i18n/content/{lang}/components.json`

Long-form content for the components reference: subtitles, descriptions, prop descriptions, and gotchas. Each component gets its own object keyed by component id (`button`, `flatlist`, etc.). Keys are accessed with the `content.` prefix — e.g. `t("content.button.description")`.

**Type safety:** `src/i18n/types.ts` declares `CustomTypeOptions` merging both layers into the `translation` namespace. `src/content/components/types.ts` derives `ComponentContentKey` — a union of all valid `content.*` leaf keys — directly from the English content JSON, so invalid keys are caught at compile time.

**Conventions:**
- `common` — shared strings used across multiple screens (`close`, `cancel`, `save`, etc.)
- Feature keys mirror the feature name (`settings.title`, `learn.sections`, etc.)
- Component names, prop names, platform terms, and anything inside backticks are never translated
- `t()` is never called directly in screens — strings are resolved in the viewmodel hook and returned inside a `strings` object

---

## Components content system

The `components` feature has its own content layer separate from the app logic.

```
src/
  content/
    components/
      index.ts                    ← registers all components by tag
      types.ts                    ← RNComponent, ComponentProp, PreviewProps, ComponentContentKey
      componentProps/
        button.tsx                ← one file per component
        flatlist.tsx
        ...
  i18n/
    content/
      en/components.json          ← source of truth for content keys
      pt/components.json
      es/components.json
```

**`RNComponent`** is the central type. Key fields:
- `subtitle`, `description`, `gotchas[]` — typed as `ComponentContentKey`, a union derived from `en/components.json` with the `content.` prefix. TypeScript rejects invalid keys at compile time.
- `previewComponent` — typed as `(props: PreviewProps) => React.ReactElement`. Always a named uppercase function defined above the exported object. Import `PreviewProps` from `@content/components/types` when the preview uses the `focused` prop.
- `hasScroll?: boolean` — set to `true` for components whose preview contains a scrollable list (`FlatList`, `ScrollView`, `SectionList`). Tells the detail screen to show a focus-toggle button so the preview's scroll doesn't conflict with the page scroll.

The hook `useComponentDetail` translates all content fields through `t()` before returning them to the screen, so screens always receive resolved strings.

---

## Main libraries

| Library | Usage |
|---|---|
| React Navigation | Stack and tab navigation |
| Zustand | Global state management |
| AsyncStorage | On-device persistence |
| Jest | Unit tests |

---

## Conventions

**Types over interfaces** — `type` is used throughout the project. `interface` is never used.

**Hooks convention:**
- Screen viewmodel hooks use the `Screen` suffix: `useLearnScreen`, `useTopicScreen`, `useQuizScreen`, `useResultScreen`, `useComponentsScreen`, `useComponentDetailScreen`
- Component hooks use no suffix: `useTopicCard`, `useNativeComponentCard`, `useSectionHeader`

**Types convention:**
- Component props — always inline in the component file, named `ComponentNameProps`
- Domain and entity types — always in the feature's `types.ts`
- Store types — always in the store's `types.ts`
- Internal utility types — stay in the file where they are used

**Stores** — Zustand stores are created with `create<T>()` and exported directly as hooks (`useSettingsStore`, `useQuizStore`). Each store lives in its own folder under `src/stores/` with an `index.ts` and a `types.ts`.

```
src/
  stores/
    settings/
      index.ts    ← useSettingsStore
      types.ts
    quiz/
      index.ts    ← useQuizStore
      types.ts
```

---

## Navigation

```mermaid
flowchart TD
    Root["Root (Tab)"]

    Root --> Learn["Learn (Stack)"]
    Root --> Components["Components (Stack)"]
    Root --> Settings["Settings"]

    Learn --> Sections["SectionsScreen"]
    Sections --> Topic["TopicScreen"]
    Topic --> Quiz["QuizScreen"]
    Quiz --> Result["ResultScreen"]

    Components --> ComponentsList["ComponentsScreen"]
    ComponentsList --> ComponentDetail["ComponentDetailScreen"]
```
