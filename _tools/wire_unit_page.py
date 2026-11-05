#!/usr/bin/env python3
"""Add the automatic lesson list to a unit page.
Usage: python3 _tools/wire_unit_page.py math 3      (or: science 2)"""
import re, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
subj, u = sys.argv[1], sys.argv[2]
page = os.path.join(ROOT, subj, f"unit{u}.html")
uid = (f"math-u{u}" if subj == "math" else f"sci-u{u}")
datafile = (f"math-u{u}.js" if subj == "math" else f"science-u{u}.js")
label = "Lessons" if subj == "math" else "Tasks"
s = open(page, encoding="utf-8").read()
if "data-lesson-list" in s:
    sys.exit(0)
s = s.replace('<link rel="stylesheet" href="../site.css">', '<link rel="stylesheet" href="../site.css">\n<link rel="stylesheet" href="../lessons/lesson.css">', 1)
m = re.search(r'<div class="section-label">', s)
i = m.start() if m else s.find('\n</div>\n<div class="site-footer">')
s = s[:i] + f'<div class="section-label">{label}</div>\n<div data-lesson-list="{uid}" data-base="unit{u}/"></div>\n' + s[i:]
s = s.replace('</body>', f'<script src="../lessons/lesson.js"></script>\n<script src="../lessons/data/{datafile}"></script>\n<script>LessonKit.boot();</script>\n</body>', 1)
open(page, "w", encoding="utf-8").write(s)
print("wired", page)
