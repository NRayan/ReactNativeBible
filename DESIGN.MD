# Design System — React Native Bible

## Visual identity

The design system is inspired by [shadcn/ui](https://ui.shadcn.com/), adapted for mobile (React Native). Dark theme is the primary and default experience. Light theme is a secondary option available via settings.

The aesthetic is flat, minimal, and developer-focused — no gradients, no shadows, no decorative elements. Typography and spacing do the heavy lifting.

---

## Theme — Dark (primary)

| Token | Value | Usage |
|---|---|---|
| `background` | `#09090b` | App background |
| `surface` | `#18181b` | Cards, code blocks, list items |
| `surface-pressed` | `#1c1c1f` | Pressed state (TouchableOpacity, Pressable) |
| `border` | `#27272a` | All borders (0.5px) |
| `text-primary` | `#fafafa` | Headings, titles |
| `text-secondary` | `#a1a1aa` | Body text, descriptions |
| `text-muted` | `#71717a` | Labels, captions, placeholders |
| `text-disabled` | `#52525b` | Disabled states, icons |
| `accent` | `#67e8f9` | Active tab, CTA button, links |
| `accent-foreground` | `#083344` | Text on accent background |
| `success` | `#86efac` | Correct answer, completed topic |
| `danger` | `#fca5a5` | Wrong answer, error state |
| `surface-accent` | `#083344` | Background for accent-highlighted elements |
| `surface-success` | `#052e16` | Background for success-highlighted elements |
| `surface-danger` | `#2c0a0a` | Background for danger-highlighted elements |

---

## Theme — Light (secondary)

| Token | Value | Usage |
|---|---|---|
| `background` | `#fafafa` | App background |
| `surface` | `#f4f4f5` | Cards, code blocks |
| `surface-pressed` | `#efefef` | Pressed state (TouchableOpacity, Pressable) |
| `border` | `#e4e4e7` | All borders (0.5px) |
| `text-primary` | `#09090b` | Headings, titles |
| `text-secondary` | `#71717a` | Body text, descriptions |
| `text-muted` | `#a1a1aa` | Labels, captions, placeholders |
| `text-disabled` | `#d4d4d8` | Disabled states, icons |
| `accent` | `#0891b2` | Active tab, CTA button, links |
| `accent-foreground` | `#ecfeff` | Text on accent background |
| `success` | `#16a34a` | Correct answer, completed topic |
| `danger` | `#dc2626` | Wrong answer, error state |
| `surface-accent` | `#ecfeff` | Background for accent-highlighted elements |
| `surface-success` | `#f0fdf4` | Background for success-highlighted elements |
| `surface-danger` | `#fef2f2` | Background for danger-highlighted elements |

---

## Typography

| Token | Size | Weight | Color token |
|---|---|---|---|
| `screen-title` | 22px | 500 | `text-primary` |
| `heading` | 18px | 500 | `text-primary` |
| `section-label` | 11px | 400 | `text-muted` (uppercase, 0.04em spacing) |
| `body` | 14px | 400 | `text-secondary` |
| `body-emphasis` | 14px | 500 | `text-primary` |
| `caption` | 11px | 400 | `text-disabled` |
| `code` | 12px | 400 | `text-secondary` (monospace) |
| `tab-label` | 10px | 400 | `text-disabled` / `accent` (active) |

Font stack: system default sans-serif. Monospace for code blocks.

---

## Spacing & radius

| Token | Value |
|---|---|
| `border-width` | `0.5px` |
| `radius-small` | `6px` (tags, badges) |
| `radius-default` | `8px` (list items, inputs) |
| `radius-large` | `10px` (cards, code blocks) |
| `touch-target-min` | `44px` |

---

## Rules

- No gradients, no drop shadows, no blur effects
- All borders are `0.5px` — never `1px` except featured/highlighted cards
- Flat surfaces only — depth is communicated through color steps, not elevation
- Icons from Tabler Icons, outline style only, 16–20px
- Sentence case everywhere — never title case, never all caps (except small labels with explicit letter-spacing)
- Dark theme ships as default — light theme is opt-in via Settings