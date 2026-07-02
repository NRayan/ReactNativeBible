---
name: update-settings-screen-stack
description: Syncs the version strings in src/content/settings/stack.ts against the installed versions in package.json. Use this skill whenever the user says something like "update the stack versions", "sync stack libs", "update settings stack", or "the versions in settings are outdated". Never adds, removes, or reorders entries — only updates version strings for libs that are already in STACK_LIBS and present in package.json.
---

# Update Settings Screen Stack

Reads `src/content/settings/stack.ts` and `package.json`, then updates the `version` field of every `StackLib` entry whose package is found in `package.json`. Scope is strictly version synchronisation — no structural changes, no membership changes.

---

## Files involved

```
package.json                          ← source of truth for installed versions
src/content/settings/stack.ts         ← STACK_LIBS array to update
src/content/settings/types.ts         ← read-only reference, do not modify
```

---

## Strict rules — read before doing anything

These rules are non-negotiable. Violating any of them corrupts the settings screen intentionally maintained by the team.

1. **Never add a new entry** to `STACK_LIBS`, even if a lib exists in `package.json` and is not currently in the array.
2. **Never remove an entry** from `STACK_LIBS`, even if the lib no longer appears in `package.json`. Instead, report the conflict to the user — see Step 3.
3. **Never reorder entries.** The array order is intentional and must be preserved exactly.
4. **Never normalise version strings.** Copy the version string from `package.json` exactly as it appears — including any prefix (`^`, `~`, `>=`, `*`, or none). Do not strip, add, or change any prefix.
5. **Only touch `stack.ts`.** Do not modify `types.ts`, `SettingsScreen.tsx`, `package.json`, or any other file.

---

## Step 1 — Read both files

Read both files in full:

- `package.json` — collect all entries from both `dependencies` and `devDependencies` into a single lookup map keyed by package name.
- `src/content/settings/stack.ts` — note every `{ lib, version }` entry currently in `STACK_LIBS`, in order.

---

## Step 2 — Cross-reference

For each entry in `STACK_LIBS`, look up `item.lib` in the combined `dependencies` + `devDependencies` map from `package.json`.

Three outcomes per entry:

| Outcome | Action |
|---|---|
| Found, version differs | Queue an update: new version = value from `package.json` |
| Found, version already matches | No change needed for this entry |
| **Not found** in `package.json` | **Do not remove or change** — flag it (see Step 3) |

---

## Step 3 — Collect conflicts

Before writing anything, collect all entries that could not be resolved:

- **Lib in `STACK_LIBS` but not in `package.json`** — the lib may have been removed or renamed. Do not delete or alter the entry. After writing the updates, report each missing lib to the user with a message like:

  > ⚠️ `{lib}` is listed in `STACK_LIBS` but was not found in `package.json` (neither `dependencies` nor `devDependencies`). Its version was left unchanged. Verify whether the package was removed or renamed.

If there are no conflicts, skip this step.

---

## Step 4 — Apply updates

Edit `src/content/settings/stack.ts` — replace only the `version` strings that changed. The structure of the file must remain identical: same import, same export name, same array order, same formatting style.

**Before:**
```ts
export const STACK_LIBS: StackLib[] = [
    { lib: "react-native", version: "0.76.0" },
    { lib: "typescript", version: "5.0.0" },
];
```

**After** (if `package.json` has `"react-native": "^0.79.2"` and `"typescript": "~5.7.3"`):
```ts
export const STACK_LIBS: StackLib[] = [
    { lib: "react-native", version: "^0.79.2" },
    { lib: "typescript", version: "~5.7.3" },
];
```

Note that the `^` and `~` prefixes are copied verbatim from `package.json`.

---

## Step 5 — Report to the user

After saving, give a concise summary:

- List each lib whose version was updated, showing `old → new`.
- List each lib that was already up to date (one line is fine: "N libs were already up to date").
- List any conflicts found in Step 3.

Example:

```
Updated 2 libs:
  react-native       0.76.0 → ^0.79.2
  typescript         5.0.0  → ~5.7.3

Already up to date: react, @react-navigation/native, react-i18next (3 libs)

⚠️ some-removed-lib was not found in package.json — version left unchanged.
```
