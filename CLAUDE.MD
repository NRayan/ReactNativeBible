# CLAUDE.md

Read the following files before any task:

- `DESIGN.md` — visual identity, colors, typography, spacing rules
- `ARCHITECTURE.md` — patterns, folder structure, conventions, main libraries

## Primitive components

Always use `Box` and `Text` from `src/components/` for layout and typography. Never use `View`, `Text` from React Native directly, or hardcoded style values for spacing, color, or typography — go through the design system primitives instead.

**Exception:** files inside `src/content/components/componentProps/` may use React Native primitives directly — those files exist specifically to demonstrate those components in previews.

## Spacing

Never use raw numeric values for spacing in `style` props. Always use `s(n)` from `@theme/spacing`, where `s(n) = n * 4`. For example: `top: s(2)` instead of `top: 8`.