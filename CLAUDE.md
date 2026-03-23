# Marketing JS

Static JavaScript snippets for the Shiftbase marketing website.

## Structure

```
marketing-js/
├── index.html                    # Overview page (open in browser)
├── shared/
│   └── styles.css                # Central stylesheet — all snippets use this
├── snippets/
│   └── <snippet-name>/
│       ├── index.html            # Local preview (opens in browser via file://)
│       └── snippet.js            # The snippet itself (IIFE, no dependencies)
└── CLAUDE.md
```

## Creating a new snippet

1. Create a folder under `snippets/` with a descriptive name (kebab-case)
2. Create `snippet.js` — wrap all code in an IIFE: `(function() { ... })();`
3. Create `index.html` — load `../../shared/styles.css` and your snippet
4. Add a link to the `snippet-grid` in the root `index.html`

## CSS conventions

- All CSS classes start with the `sb-` prefix to avoid conflicts
- The root container of each snippet gets the class `sb-widget`
- Only use classes from `shared/styles.css` — no inline styles unless snippet-specific
- Always make styling changes in `shared/styles.css`
- The primary brand color is `#31a7f0` — use this as the default blue for buttons, accents, and interactive elements

## Snippet conventions

- Each snippet is a self-contained IIFE (Immediately Invoked Function Expression)
- No external dependencies — everything is vanilla JS
- The snippet mounts itself on an element with a specific `id` (e.g. `sb-counter`)
- No `document.write()`, no globals

## Production embed

CSS via jsDelivr:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/shiftbase-com/marketing-js@trunk/shared/styles.css">
```

JS via jsDelivr:
```html
<script src="https://cdn.jsdelivr.net/gh/shiftbase-com/marketing-js@trunk/snippets/<name>/snippet.js"></script>
```

## Local testing

Open `index.html` in the browser (via file:// or Live Server). No build step needed.
