#!/usr/bin/env python3
"""Make the small lesson-page files (math/unit0/lesson-1.html …) for every unit listed below.

Each page only loads the shared lesson engine and the unit's data file.
The words, questions and answers live in lessons/data/<unit>.js.

Run from the site folder:  python3 _tools/make_lesson_pages.py
"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (folder for the pages, data id = file name in lessons/data)
UNITS = [
    ("math/unit0", "math-u0"),
    ("math/unit1", "math-u1"),
    ("science/unit0", "sci-u0"),
    ("science/unit1", "sci-u1"),
]
DATA_FILE = {"math-u0": "math-u0.js", "math-u1": "math-u1.js", "sci-u0": "science-u0.js", "sci-u1": "science-u1.js"}

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lesson — Mrs. Tesnar's 5th Grade</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,600&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../site.css">
<link rel="stylesheet" href="../../lessons/lesson.css">
<script src="../../brand.js"></script>
</head>
<body>
<script src="../../site-bar.js"></script>
<!-- This page shows lesson {n}. The lesson's words live in lessons/data/{datafile}. -->
<main id="lesson" data-unit="{uid}" data-n="{n}"><noscript>Turn on JavaScript to see this lesson.</noscript></main>
<div class="site-footer">© Mrs. Tesnar's 5th Grade</div>
<script src="../../lessons/lesson.js"></script>
<script src="../../lessons/data/{datafile}"></script>
<script>LessonKit.boot();</script>
</body>
</html>
"""


def lesson_numbers(path):
    """Lesson numbers in a data file: lines that start a lesson with `n: <number>,`."""
    src = open(path, encoding="utf-8").read()
    return sorted({int(m) for m in re.findall(r"^\s*n:\s*(\d+),", src, re.M)})


for folder, uid in UNITS:
    data = os.path.join(ROOT, "lessons", "data", DATA_FILE[uid])
    if not os.path.exists(data):
        continue
    os.makedirs(os.path.join(ROOT, folder), exist_ok=True)
    nums = lesson_numbers(data)
    for n in nums:
        out = os.path.join(ROOT, folder, f"lesson-{n}.html")
        with open(out, "w", encoding="utf-8") as f:
            f.write(PAGE.format(n=n, uid=uid, datafile=DATA_FILE[uid]))
    print(f"{folder}: {len(nums)} lesson pages")
