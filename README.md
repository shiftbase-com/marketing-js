# Marketing JS

Interactive calculators and tools used as lead magnets on [shiftbase.com](https://www.shiftbase.com). Each snippet is a self-contained vanilla JavaScript widget that can be embedded on any page via [jsDelivr](https://www.jsdelivr.com/).

## Available snippets

| Snippet | Mount ID | Description |
|---|---|---|
| `nl-roi-businesscase` | `sb-roi-businesscase` | ROI & business case calculator |
| `nl-zelftest-rooster` | `sb-zelftest-rooster` | Schedule self-assessment checklist |
| `example-counter` | `sb-counter` | Demo snippet (click counter) |

## How to embed

1. Add the shared stylesheet in the `<head>` of your page (once per page):

```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/shiftbase-com/marketing-js@trunk/shared/styles.css">
```

2. Place a `<div>` with the correct mount ID where you want the widget to appear, followed by the snippet script:

```html
<div id="sb-roi-businesscase"></div>
<script
  src="https://cdn.jsdelivr.net/gh/shiftbase-com/marketing-js@trunk/snippets/nl-roi-businesscase/snippet.js">
</script>
```

The snippet will automatically render inside the `<div>`. Each snippet preview page includes a ready-to-copy embed block.

## HubSpot

When embedding via a HubSpot embed module, make sure the module or column width is set to at least **800px**. By default HubSpot may limit the embed wrapper to 540px, which compresses the layout.

## CDN caching

jsDelivr caches files aggressively. After pushing changes to `trunk`, a GitHub Action automatically purges the cache for any changed files in `shared/` and `snippets/`. If you need to purge manually, replace `cdn` with `purge` in the URL:

```
https://purge.jsdelivr.net/gh/shiftbase-com/marketing-js@trunk/shared/styles.css
```

## Local development

Open `index.html` in the browser (via `file://` or Live Server) for an overview of all snippets. Each snippet folder also has its own `index.html` for a standalone preview. No build step needed.

## Creating a new snippet

1. Create a folder under `snippets/` with a descriptive name (kebab-case)
2. Create `snippet.js` — wrap all code in an IIFE: `(function() { ... })();`
3. The snippet mounts itself on a `<div>` with a specific `id` (e.g. `sb-counter`)
4. Create `index.html` for local preview — load `../../shared/styles.css` and your script
5. Add a link to the snippet grid in the root `index.html`

### Conventions

- All CSS classes use the `sb-` prefix to avoid conflicts with host pages
- The root container gets the class `sb-widget`
- No external dependencies — everything is vanilla JS
- No `document.write()`, no globals
- Snippet-specific styles are injected via JS; shared styles live in `shared/styles.css`
