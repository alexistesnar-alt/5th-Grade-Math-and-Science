# Mrs. Tesnar's 5th Grade Math & Science — instructions for Claude

Public GitHub Pages site for Alexis Tesnar's 5th grade math and science classes (Buncombe County Schools, NC).
Built from the look of Mr. Allen's 8th grade site. Pushing to `main` publishes in about 2 minutes.

## Standing rules
- **Audience:** 5th graders, many below grade level. Short sentences, kind and specific feedback that names the mistake.
- **Privacy:** the site is public. Never commit student names, grades, rosters or answer keys.
- **Look:** Source Serif 4 headings, Inter body, JetBrains Mono numbers; navy #1E2D4F, gold #FFC107/#E0A800, off-white #F7F7F4.
  Shared top bar = `site-bar.js` (teacher name and links at the top of the file); hub styles = `site.css`; fonts = `brand.js`.
- **Math** follows Illustrative Mathematics (Kendall Hunt) and the 26-27 BCS 5th Grade Curriculum Map. Use IM's structure:
  warm-up routine → "Let's …" activities → lesson synthesis → cool-down. Write original problems; don't copy IM.
- **Science** follows the BCS 5th Grade Science Curriculum (NC 2023 science standards): each unit starts from a phenomenon.
- **Standards:** always cite NC codes (NC.5.xxx for math; LS/ESS/PS.5.x.x for science).
- **Math correctness:** compute answers in code with exact arithmetic (fractions as n/d with gcd, decimals as scaled integers);
  pages self-test on load. Mixed numbers are typed "2 1/3" like the NC EOG.
- **NC.5.MD.2** is NC's version (categorical / numerical / changes over time, line graphs) — not the Common Core line-plots-with-fractions standard.
- **Edits to existing material:** discuss first; correct in place; don't delete pages without approval.

## Where things live
| Path | What |
|---|---|
| `index.html` | Home |
| `math/`, `science/` | Year at a glance + one page per unit (standards, targets, vocabulary, links) |
| `learning-lab/` | Fluency practice (`ll.js` holds every skill generator) |
| `arcade/` | Math games (`arcade.js` shared helper; answer peek only with `?test=1`) |
| `lab/` | Virtual science lab activities (`lab.js`, `lab.css`) |
| `notes/` | Interactive science notebooks; lesson content is data inside each `science-unitN.html` |
| `practice/` | IM-style extra math practice per unit (`practice.js` engine + self-test) |
| `lessons/` | Lesson engine (`lesson.js`, `lesson.css`) + one data file per unit in `lessons/data/` |
| `math/unitN/lesson-K.html`, `science/unitN/lesson-K.html` | Per-lesson pages (tiny stubs). Regenerate with `python3 _tools/make_lesson_pages.py` |
| `vocabulary.html`, `formulas.html` | Reference pages |
| `HOW_TO_UPDATE.txt` | Plain-language guide for Mrs. Tesnar |

## Checking work
Serve locally with `python3 -m http.server 8765 --bind 127.0.0.1`, test with Playwright (phone 390px and desktop 1100px,
no console errors, no horizontal scroll). Stop the server by PID.
