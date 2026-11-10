# Cmd+K Command Palette Keyboard Trapping & Accessibility Specifications

## 1. Keyboard Navigation & Shortcuts
- Global shortcut listener: `(event.metaKey || event.ctrlKey) && event.key === 'k'` toggles palette modal.
- `Escape` key cleanly restores focus to the previously active DOM element.
- Arrow keys (`ArrowUp`, `ArrowDown`) navigate indexed results with automatic scroll-into-view.

## 2. Accessibility (ARIA) Invariants
- Palette container marked `role="dialog"` with `aria-modal="true"` and `aria-label="Command Navigation Palette"`.
- Search input uses `role="combobox"` with `aria-autocomplete="list"` and `aria-expanded` attributes.
