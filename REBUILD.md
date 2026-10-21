# Portfolio rebuild

Open `index.html` in a browser, or serve this folder with `python -m http.server 8000 --bind 127.0.0.1` and visit `http://127.0.0.1:8000`.

The site is plain HTML, CSS, and JavaScript and can be hosted directly on GitHub Pages. No installation, framework build, or API keys are needed. The parent folder's original index continues to redirect here.

## Pages

- Home: portrait, introduction, selected work, and contact actions.
- About: background, areas of work, skills, and education.
- Work: all 17 existing projects, five category filters, and dedicated project pages.
- Writing: all six existing articles with dedicated reading pages.
- Contact: email, copy address, WhatsApp, phone, and GitHub.
- Résumé: a concise résumé with a browser print/save-to-PDF action.

Theme preference is saved locally when storage is available. Content and navigation work without JavaScript; filtering, theme switching, clipboard, and the print shortcut are progressive enhancements. Original video files play with native browser controls.

## Editing

The HTML pages are directly editable. Styling is in `assets/css/portfolio.css`; interactions are in `assets/js/portfolio.js`. `assets/js/theme.js` applies the saved theme before painting the page. New delivery images are in `assets/media`; original files remain in place.

The parent folder contains `tools/build_portfolio.py`, which regenerates these pages from the preserved source plus the copy and templates in that script. It requires Python and Pillow. Update the script if regenerating; it will overwrite direct HTML edits. It does not require Node or Next.js.

The exact pre-rebuild `index.html`, `assets/css/style.css`, and `assets/js/script.js` are backed up in `../backups/before-rebuild-2026-10-21/`. Those files already contained uncommitted work, which has been preserved. The previous styles and script remain in the site but are not loaded by the new pages.

## Content notes

Project identities, destinations, artwork, videos, and articles came from the existing portfolio. The degree is supported by the existing `index1.html`. The rebuild does not independently verify project production status, historical dates, or implementation claims in the retained articles. It does not publish invented testimonials, performance scores, or skill percentages.

The previous Bediako entry used an unrelated mathematics cover; its new preview is text only. Contact actions open the user's email, phone, or WhatsApp application; there is no server-side message submission. External sites and third-party communication delivery are outside local validation.

## Review

See `../qa/test-results.json` for local browser checks and `../qa/` for screenshots and the résumé print proof. Verify your preferred portrait, biography, degree details, project descriptions, and article claims before publication. No deployment or Git push has been performed.
