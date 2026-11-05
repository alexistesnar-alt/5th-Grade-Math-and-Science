/* ==========================================================================
   LessonKit — draws every math and science lesson page.

   A lesson page is a tiny HTML file that loads this file, then a unit data
   file (lessons/data/math-u0.js …), then calls LessonKit.boot().
   The words, questions and answers for each lesson live in the data file.

   Sections on every lesson page:
     1 Goals (I can + NC standards + words to know)   2 Lesson outline + materials
     3 Interactive notes   4 Practice   5 Lab   6 Exit ticket (score at the end)

   Answers are checked with exact arithmetic (fractions as [n, d]).
   Student work is saved in this browser only (localStorage). Nothing is sent.
   ========================================================================== */
(function () {
  'use strict';
  var UNITS = {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function el(html) { var t = document.createElement('template'); t.innerHTML = String(html).trim(); return t.content.firstElementChild; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var M = '−';

  /* ---------- storage (this browser only) ---------- */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('g5ls:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('g5ls:' + k, JSON.stringify(v)); } catch (e) { /* storage off */ } }
  };

  /* ---------- exact numbers ---------- */
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } var g = gcd(n, d); return [n / g, d / g]; }
  function feq(a, b) { return a && b && a[0] * b[1] === b[0] * a[1]; }
  // Parse what a student typed: whole number, decimal, fraction "3/4" or mixed number "2 1/3".
  // Commas are allowed. Words after the number (like "cubic units") are ignored.
  function parseNum(s) {
    s = String(s).trim().replace(/,/g, '').replace(/[−–]/g, '-').replace(/\s+/g, ' ');
    s = s.replace(/\s*[a-zA-Z°%].*$/, '').trim();
    var m;
    if ((m = s.match(/^(-?\d+) (\d+)\/(\d+)$/))) { var w = +m[1], d = +m[3]; if (!d) return null; return fr((Math.abs(w) * d + (+m[2])) * (w < 0 ? -1 : 1), d); }
    if ((m = s.match(/^(-?\d+)\/(\d+)$/))) return +m[2] ? fr(+m[1], +m[2]) : null;
    if ((m = s.match(/^(-?)(\d*)\.?(\d*)$/)) && (m[2] || m[3])) {
      var p = m[3] || ''; var den = Math.pow(10, p.length); var v = (+(m[2] || 0)) * den + (+(p || 0));
      return fr(m[1] ? -v : v, den);
    }
    return null;
  }
  function showNum(f) {
    if (typeof f === 'number') return f.toLocaleString('en-US');
    var n = f[0], d = f[1];
    if (d === 1) return n.toLocaleString('en-US');
    if (Math.abs(n) > d) return Math.trunc(n / d) + ' ' + Math.abs(n % d) + '/' + d;
    return n + '/' + d;
  }
  function toFr(a) { return typeof a === 'number' ? parseNum(String(a)) : (typeof a === 'string' ? parseNum(a) : a); }
  function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(); }

  /* ======================================================================
     FIGURES — small SVG graphs drawn from numbers (no pictures to load)
     ====================================================================== */
  var FIG = {};
  var C = { navy: '#1E2D4F', ink: '#1B2333', grid: '#E3E5EA', mute: '#5B6475', gold: '#E0A800', bar: '#3B5998', fill: '#FFC107', ok: '#15803D' };
  function niceMax(v, step) { return Math.max(step, Math.ceil(v / step) * step); }
  function axisText(x, y, t, anchor, size, weight, rot) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" font-family="Inter,system-ui,sans-serif" fill="' + C.ink + '" text-anchor="' + (anchor || 'middle') + '"' +
      (weight ? ' font-weight="' + weight + '"' : '') + (rot ? ' transform="rotate(' + rot + ' ' + x + ' ' + y + ')"' : '') + '>' + esc(t) + '</text>';
  }
  // Bar graph: {title, cats:[], vals:[], yLabel, xLabel, step, max}
  FIG.bar = function (o, live) {
    var n = o.cats.length, step = o.step || 1, max = o.max || niceMax(Math.max.apply(null, o.vals.concat([step])), step);
    var L = 56, T = o.title ? 36 : 14, W = Math.max(360, 70 + n * 78), H = 300, B = 62, pw = W - L - 16, ph = H - T - B, cw = pw / n;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" role="img" aria-label="' + esc((o.title || 'Bar graph') + ': ' + o.cats.map(function (c, i) { return c + ' ' + (o.vals[i] == null ? 'blank' : o.vals[i]); }).join(', ')) + '">';
    if (o.title) s += axisText(L + pw / 2, 22, o.title, 'middle', 15, 600);
    for (var v = 0; v <= max; v += step) { var y = T + ph - v / max * ph; s += '<line x1="' + L + '" x2="' + (L + pw) + '" y1="' + y + '" y2="' + y + '" stroke="' + C.grid + '"/>' + axisText(L - 8, y + 4, String(v), 'end', 12); }
    o.cats.forEach(function (c, i) {
      var x = L + i * cw, val = o.vals[i] || 0, bh = val / max * ph;
      if (val > 0) s += '<rect x="' + (x + cw * 0.18) + '" y="' + (T + ph - bh) + '" width="' + cw * 0.64 + '" height="' + bh + '" fill="' + (o.color || C.bar) + '" rx="2"/>';
      if (live) s += '<rect class="hit" data-i="' + i + '" x="' + x + '" y="' + (T - 6) + '" width="' + cw + '" height="' + (ph + 12) + '" fill="transparent" style="cursor:pointer"/>';
      s += axisText(x + cw / 2, T + ph + 18, c, 'middle', 12.5);
    });
    s += '<line x1="' + L + '" x2="' + (L + pw) + '" y1="' + (T + ph) + '" y2="' + (T + ph) + '" stroke="' + C.ink + '" stroke-width="1.5"/><line x1="' + L + '" x2="' + L + '" y1="' + T + '" y2="' + (T + ph) + '" stroke="' + C.ink + '" stroke-width="1.5"/>';
    if (o.yLabel) s += axisText(16, T + ph / 2, o.yLabel, 'middle', 12.5, 600, -90);
    if (o.xLabel) s += axisText(L + pw / 2, H - 12, o.xLabel, 'middle', 12.5, 600);
    s += '</svg>';
    return { svg: s, geo: { L: L, T: T, ph: ph, pw: pw, cw: cw, max: max, step: step } };
  };
  // Line plot: {title, min, max, vals:[counts per tick], xLabel}
  FIG.lineplot = function (o, live) {
    var ticks = []; for (var t = o.min; t <= o.max; t++) ticks.push(t);
    var n = ticks.length, W = Math.max(360, 60 + n * 46), top = Math.max(5, Math.max.apply(null, o.vals.concat([4])) + 1);
    var T = o.title ? 34 : 12, rowH = 26, H = T + top * rowH + 60, base = T + top * rowH, L = 30, cw = (W - 2 * L) / (n - 1 || 1);
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" role="img" aria-label="' + esc((o.title || 'Line plot') + ': ' + ticks.map(function (k, i) { return k + ' has ' + (o.vals[i] || 0); }).join(', ')) + '">';
    if (o.title) s += axisText(W / 2, 22, o.title, 'middle', 15, 600);
    s += '<line x1="' + (L - 14) + '" x2="' + (W - L + 14) + '" y1="' + base + '" y2="' + base + '" stroke="' + C.ink + '" stroke-width="2"/>';
    ticks.forEach(function (k, i) {
      var x = L + i * cw;
      s += '<line x1="' + x + '" x2="' + x + '" y1="' + (base - 6) + '" y2="' + (base + 6) + '" stroke="' + C.ink + '" stroke-width="1.5"/>' + axisText(x, base + 24, String(k), 'middle', 13.5, 600);
      for (var j = 0; j < (o.vals[i] || 0); j++) { var y = base - 16 - j * rowH; s += '<text x="' + x + '" y="' + (y + 7) + '" font-size="22" font-weight="700" fill="' + C.navy + '" text-anchor="middle" font-family="Inter,sans-serif">×</text>'; }
      if (live) s += '<rect class="hit" data-i="' + i + '" x="' + (x - cw / 2) + '" y="' + T + '" width="' + cw + '" height="' + (base - T + 30) + '" fill="transparent" style="cursor:pointer"/>';
    });
    if (o.xLabel) s += axisText(W / 2, H - 8, o.xLabel, 'middle', 12.5, 600);
    s += '</svg>';
    return { svg: s, geo: { L: L, T: T, base: base, rowH: rowH, cw: cw, n: n } };
  };
  // Line graph (data that changes over time): {title, xs:[labels], vals:[], step, max, yLabel, xLabel}
  FIG.linegraph = function (o, live) {
    var n = o.xs.length, step = o.step || 1, max = o.max || niceMax(Math.max.apply(null, o.vals.filter(function (v) { return v != null; }).concat([step])), step);
    var L = 58, T = o.title ? 36 : 14, W = Math.max(380, 80 + n * 64), H = 310, B = 64, pw = W - L - 24, ph = H - T - B, cw = pw / (n - 1 || 1);
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" role="img" aria-label="' + esc((o.title || 'Line graph') + ': ' + o.xs.map(function (x, i) { return x + ' ' + (o.vals[i] == null ? 'blank' : o.vals[i]); }).join(', ')) + '">';
    if (o.title) s += axisText(L + pw / 2, 22, o.title, 'middle', 15, 600);
    for (var v = 0; v <= max; v += step) { var y = T + ph - v / max * ph; s += '<line x1="' + L + '" x2="' + (L + pw) + '" y1="' + y + '" y2="' + y + '" stroke="' + C.grid + '"/>' + axisText(L - 8, y + 4, String(v), 'end', 12); }
    var pts = [];
    o.xs.forEach(function (x, i) {
      var px = L + i * cw;
      s += '<line x1="' + px + '" x2="' + px + '" y1="' + T + '" y2="' + (T + ph) + '" stroke="' + C.grid + '"/>' + axisText(px, T + ph + 18, x, 'middle', 12);
      if (o.vals[i] != null) pts.push([px, T + ph - o.vals[i] / max * ph]);
      else pts.push(null);
    });
    var seg = []; pts.forEach(function (p) { if (p) seg.push(p.join(',')); else seg.push('|'); });
    seg.join(' ').split('|').forEach(function (chunk) { chunk = chunk.trim(); if (chunk.indexOf(' ') > 0) s += '<polyline points="' + chunk + '" fill="none" stroke="' + C.navy + '" stroke-width="2.5"/>'; });
    pts.forEach(function (p) { if (p) s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5.5" fill="' + C.fill + '" stroke="' + C.navy + '" stroke-width="2"/>'; });
    if (live) o.xs.forEach(function (x, i) { s += '<rect class="hit" data-i="' + i + '" x="' + (L + i * cw - cw / 2) + '" y="' + (T - 8) + '" width="' + cw + '" height="' + (ph + 16) + '" fill="transparent" style="cursor:pointer"/>'; });
    s += '<line x1="' + L + '" x2="' + (L + pw) + '" y1="' + (T + ph) + '" y2="' + (T + ph) + '" stroke="' + C.ink + '" stroke-width="1.5"/><line x1="' + L + '" x2="' + L + '" y1="' + T + '" y2="' + (T + ph) + '" stroke="' + C.ink + '" stroke-width="1.5"/>';
    if (o.yLabel) s += axisText(16, T + ph / 2, o.yLabel, 'middle', 12.5, 600, -90);
    if (o.xLabel) s += axisText(L + pw / 2, H - 12, o.xLabel, 'middle', 12.5, 600);
    s += '</svg>';
    return { svg: s, geo: { L: L, T: T, ph: ph, pw: pw, cw: cw, max: max, step: step } };
  };
  /* 3D prisms (isometric). spec: {boxes:[{l,w,h,x,y,z,color,labels:[l,w,h]}], cubes:true|false, layers:n (show only n layers), size}
     cubes:true draws every unit cube (for counting); false draws solid boxes with edge labels. */
  var COS = Math.cos(Math.PI / 6), SIN = 0.5;
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    var m = function (v) { return Math.max(0, Math.min(255, Math.round(f > 1 ? v + (255 - v) * (f - 1) : v * f))); };
    return '#' + [m(r), m(g), m(b)].map(function (v) { return v.toString(16).padStart(2, '0'); }).join('');
  }
  FIG.iso = function (o) {
    var S = o.size || 26, pts = [], parts = [];
    var P = function (x, y, z) { return [(x - y) * COS * S, (x + y) * SIN * S - z * S]; };
    var poly = function (arr, fill) { return '<polygon points="' + arr.map(function (p) { var q = P(p[0], p[1], p[2]); pts.push(q); return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ') + '" fill="' + fill + '" stroke="#1E2D4F" stroke-width="1.3" stroke-linejoin="round"/>'; };
    var faces = function (x, y, z, l, w, h, c) {
      return poly([[x, y, z + h], [x + l, y, z + h], [x + l, y + w, z + h], [x, y + w, z + h]], shade(c, 1.25)) +
        poly([[x + l, y, z], [x + l, y + w, z], [x + l, y + w, z + h], [x + l, y, z + h]], shade(c, 0.8)) +
        poly([[x, y + w, z], [x + l, y + w, z], [x + l, y + w, z + h], [x, y + w, z + h]], c);
    };
    var cubes = [];
    o.boxes.forEach(function (b, bi) {
      var bx = b.x || 0, by = b.y || 0, bz = b.z || 0, c = b.color || '#F2A93B', hh = o.layers != null ? Math.min(o.layers, b.h) : b.h;
      if (o.cubes) { for (var z = 0; z < hh; z++) for (var y = 0; y < b.w; y++) for (var x = 0; x < b.l; x++) cubes.push([bx + x, by + y, bz + z, c]); }
      else parts.push({ k: bx + by + bz, s: faces(bx, by, bz, b.l, b.w, b.h, c), b: b, bx: bx, by: by, bz: bz });
      // ghost outline of the full box when building layer by layer
      if (o.cubes && o.layers != null && o.layers < b.h) parts.push({ k: 1e9, s: '<g fill="none" stroke="#9AA3B5" stroke-dasharray="4 4">' + [[[bx, by + b.w, bz + b.h], [bx + b.l, by + b.w, bz + b.h], [bx + b.l, by, bz + b.h]], [[bx + b.l, by + b.w, bz], [bx + b.l, by + b.w, bz + b.h]], [[bx, by + b.w, bz], [bx, by + b.w, bz + b.h]], [[bx + b.l, by, bz], [bx + b.l, by, bz + b.h]]].map(function (line) { return '<polyline points="' + line.map(function (p) { var q = P(p[0], p[1], p[2]); pts.push(q); return q.join(','); }).join(' ') + '"/>'; }).join('') + '</g>' });
    });
    cubes.sort(function (a, b) { return (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]) || a[2] - b[2]; });
    var body = cubes.map(function (q) { return faces(q[0], q[1], q[2], 1, 1, 1, q[3]); }).join('');
    parts.sort(function (a, b) { return a.k - b.k; });
    body += parts.map(function (p) { return p.s; }).join('');
    // edge labels for solid boxes
    var lab = '';
    o.boxes.forEach(function (b) {
      if (!b.labels) return;
      var bx = b.x || 0, by = b.y || 0, bz = b.z || 0, L = b.labels;
      var t = function (p, txt, dx, dy) { var q = P(p[0], p[1], p[2]); q = [q[0] + dx, q[1] + dy]; pts.push([q[0] - 30, q[1] - 12], [q[0] + 30, q[1] + 8]); return '<text x="' + q[0].toFixed(1) + '" y="' + q[1].toFixed(1) + '" font-size="14" font-weight="700" fill="#1E2D4F" text-anchor="middle" font-family="Inter,sans-serif" paint-order="stroke" stroke="#fff" stroke-width="4">' + txt + '</text>'; };
      if (L[0]) lab += t([bx + b.l / 2, by + b.w, bz], L[0], -8, 20);
      if (L[1]) lab += t([bx + b.l, by + b.w / 2, bz], L[1], 22, 16);
      if (L[2]) lab += t([bx, by + b.w, bz + b.h / 2], L[2], -26, 4);
    });
    var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
    var minx = Math.min.apply(null, xs) - 8, maxx = Math.max.apply(null, xs) + 8, miny = Math.min.apply(null, ys) - 8, maxy = Math.max.apply(null, ys) + 8;
    var W = maxx - minx, H = maxy - miny;
    return { svg: '<svg viewBox="' + minx.toFixed(1) + ' ' + miny.toFixed(1) + ' ' + W.toFixed(1) + ' ' + H.toFixed(1) + '" width="' + Math.round(W) + '" role="img" aria-label="' + esc(o.label || 'A prism made of cubes') + '">' + body + lab + '</svg>' };
  };
  /* Fraction strip: {parts, shaded, wholes (number of strips), label, color} */
  FIG.strip = function (o) {
    var W = 320, H = 34, gap = 10, n = o.wholes || 1, shaded = o.shaded, s = '';
    for (var k = 0; k < n; k++) {
      var y = k * (H + gap);
      for (var i = 0; i < o.parts; i++) {
        var on = shaded > k * o.parts + i;
        s += '<rect x="' + (2 + i * W / o.parts) + '" y="' + (y + 2) + '" width="' + (W / o.parts) + '" height="' + H + '" fill="' + (on ? (o.color || '#FFC107') : '#fff') + '" stroke="#1E2D4F" stroke-width="2"/>';
      }
    }
    var TH = n * (H + gap);
    return { svg: '<svg viewBox="0 0 ' + (W + 4) + ' ' + TH + '" width="' + (W + 4) + '" role="img" aria-label="' + esc(o.label || (shaded + ' of ' + o.parts + ' equal parts shaded')) + '">' + s + '</svg>' };
  };
  /* Area model for fraction × fraction: {a,b,c,d} → a/b of the width (yellow) and c/d of the height (blue); overlap green. {w,h} optional whole size */
  FIG.area = function (o) {
    var S = 240, cols = o.b, rows = o.d, s = '', cw = S / cols, rh = S / rows;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var inA = c < (o.a || 0), inB = r >= rows - (o.c || 0);
      var fill = inA && inB ? '#5BB381' : inA ? '#FFE08A' : inB ? '#A9C8F0' : '#fff';
      s += '<rect x="' + (30 + c * cw) + '" y="' + (6 + r * rh) + '" width="' + cw + '" height="' + rh + '" fill="' + fill + '" stroke="#9AA3B5" stroke-width="1"/>';
    }
    s += '<rect x="30" y="6" width="' + S + '" height="' + S + '" fill="none" stroke="#1E2D4F" stroke-width="3"/>';
    s += '<text x="' + (30 + S / 2) + '" y="' + (S + 26) + '" text-anchor="middle" font-size="14" font-family="Inter,sans-serif" fill="#1B2333">' + esc(o.wLabel || '1') + '</text>';
    s += '<text x="16" y="' + (6 + S / 2) + '" text-anchor="middle" font-size="14" font-family="Inter,sans-serif" fill="#1B2333">' + esc(o.hLabel || '1') + '</text>';
    return { svg: '<svg viewBox="0 0 ' + (S + 40) + ' ' + (S + 34) + '" width="' + (S + 40) + '" role="img" aria-label="' + esc(o.label || 'Area model') + '">' + s + '</svg>' };
  };
  function tableHTML(t) {
    return '<div class="tw"><table class="dt">' + (t.caption ? '<caption style="caption-side:top;text-align:left;font-weight:600;color:#1E2D4F;padding:4px 0">' + t.caption + '</caption>' : '') +
      '<tr>' + t.head.map(function (h, i) { return '<th' + (i === 0 && t.leftCol ? ' class="l"' : '') + '>' + h + '</th>'; }).join('') + '</tr>' +
      t.rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td' + (i === 0 && t.leftCol ? ' class="l"' : '') + '>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>';
  }
  // fig spec: {bar:{…}} | {lineplot:{…}} | {linegraph:{…}} | {table:{…}} | {svg:"…"}  (+ caption)
  function figHTML(f) {
    if (!f) return '';
    var inner = f.bar ? FIG.bar(f.bar).svg : f.lineplot ? FIG.lineplot(f.lineplot).svg : f.linegraph ? FIG.linegraph(f.linegraph).svg : f.iso ? FIG.iso(f.iso).svg : f.strip ? FIG.strip(f.strip).svg : f.area ? FIG.area(f.area).svg : f.table ? tableHTML(f.table) : (f.svg || f.html || '');
    return '<figure class="fig" style="margin:10px 0">' + inner + (f.caption ? '<figcaption>' + f.caption + '</figcaption>' : '') + '</figure>';
  }

  /* ======================================================================
     QUESTIONS
     types: choice | multi | number | text | sort
     every question can have: q (html), fig, hint, why (shown after)
     ====================================================================== */
  var OK = ['Yes! ', 'Correct. ', 'Nice work. ', 'You got it. ', 'Right. '];
  function okWord() { return OK[Math.floor(Math.random() * OK.length)]; }

  function makeQ(q, i, total, opts) {
    opts = opts || {};
    var type = q.type || (q.choices ? 'choice' : q.bins ? 'sort' : q.accept ? 'text' : 'number');
    var box = el('<div class="q ' + type + '"><div class="qn"><span>' + (opts.label || 'Question') + ' ' + (i + 1) + ' of ' + total + '</span>' + (q.tag ? '<span class="tag">' + esc(q.tag) + '</span>' : '') + '</div>' +
      '<div class="qt">' + q.q + '</div>' + figHTML(q.fig) + '<div class="area"></div><div class="fb" aria-live="polite"></div></div>');
    var area = $('.area', box), fb = $('.fb', box), api = { el: box, type: type, q: q };
    if (type === 'choice' || type === 'multi') {
      var order = q.keepOrder ? q.choices.map(function (_, k) { return k; }) : shuffle(q.choices.map(function (_, k) { return k; }));
      area.innerHTML = '<div class="opts" role="' + (type === 'multi' ? 'group' : 'radiogroup') + '">' + order.map(function (k) {
        return '<button type="button" class="opt" data-k="' + k + '" role="' + (type === 'multi' ? 'checkbox' : 'radio') + '" aria-checked="false"><span class="mk"></span><span>' + q.choices[k] + '</span></button>';
      }).join('') + '</div>';
      $$('.opt', area).forEach(function (b) {
        b.onclick = function () {
          if (box.classList.contains('locked')) return;
          if (type === 'choice') $$('.opt', area).forEach(function (x) { x.classList.remove('sel'); x.setAttribute('aria-checked', 'false'); });
          b.classList.toggle('sel'); b.setAttribute('aria-checked', b.classList.contains('sel'));
          if (opts.onChange) opts.onChange();
        };
      });
      api.answered = function () { return $$('.opt.sel', area).length > 0; };
      api.isRight = function () {
        var sel = $$('.opt.sel', area).map(function (b) { return +b.dataset.k; }).sort();
        var ans = (type === 'multi' ? q.answer.slice() : [q.answer]).sort();
        return sel.length === ans.length && sel.every(function (v, j) { return v === ans[j]; });
      };
      api.mark = function () {
        var ans = type === 'multi' ? q.answer : [q.answer];
        $$('.opt', area).forEach(function (b) { var k = +b.dataset.k; if (ans.indexOf(k) >= 0) b.classList.add('right'); else if (b.classList.contains('sel')) b.classList.add('wrong'); });
      };
      api.answerText = function () { return (type === 'multi' ? q.answer : [q.answer]).map(function (k) { return q.choices[k]; }).join(' and '); };
      api.reset = function () { $$('.opt', area).forEach(function (b) { b.className = 'opt'; b.setAttribute('aria-checked', 'false'); }); };
      api.clearWrong = function () { $$('.opt.sel', area).forEach(function (b) { b.classList.remove('sel'); }); };
    } else if (type === 'number' || type === 'text') {
      area.innerHTML = '<div class="numrow"><input class="num" type="text" ' + (type === 'number' ? 'inputmode="decimal"' : '') + ' autocomplete="off" spellcheck="false" aria-label="Your answer" placeholder="' + (q.ph || (type === 'number' ? 'answer' : 'type a word')) + '"' + (type === 'text' ? ' style="font-family:Inter,sans-serif;width:14em"' : '') + '>' + (q.unit ? '<span class="unit">' + q.unit + '</span>' : '') + '</div>';
      var inp = $('input', area);
      inp.oninput = function () { if (opts.onChange) opts.onChange(); };
      if (opts.onEnter) inp.onkeydown = function (e) { if (e.key === 'Enter') opts.onEnter(); };
      api.answered = function () { return inp.value.trim() !== ''; };
      api.isRight = function () {
        if (type === 'text') { var v = norm(inp.value); return q.accept.some(function (a) { return norm(a) === v; }); }
        var got = parseNum(inp.value); if (!got) return false;
        var list = Array.isArray(q.answer) && Array.isArray(q.answer[0]) ? q.answer : [q.answer];
        return list.some(function (a) { return feq(got, toFr(a)); });
      };
      api.badFormat = function () { return type === 'number' && inp.value.trim() !== '' && !parseNum(inp.value); };
      api.mark = function () { inp.style.borderColor = api.isRight() ? '#15803D' : '#B42318'; };
      api.answerText = function () { return type === 'text' ? q.accept[0] : showNum(toFr(Array.isArray(q.answer) && Array.isArray(q.answer[0]) ? q.answer[0] : q.answer)) + (q.unit ? ' ' + q.unit.replace(/<[^>]+>/g, '') : ''); };
      api.reset = function () { inp.value = ''; inp.style.borderColor = ''; inp.disabled = false; };
      api.clearWrong = function () { inp.select(); };
      api.lock = function () { inp.disabled = true; };
    } else if (type === 'sort') {
      sortWidget(area, q, api, opts);
    }
    api.feedback = function (kind, head, body) {
      fb.className = 'fb show ' + kind;
      fb.innerHTML = '<b class="h">' + head + '</b>' + (body || '');
    };
    api.hideFeedback = function () { fb.className = 'fb'; fb.innerHTML = ''; };
    return api;
  }

  // Sort: tap a card, then tap a group.  q.bins: [names], q.items: [[text, binIndex], …]
  function sortWidget(area, q, api, opts) {
    var picked = null, place = {};
    area.innerHTML = '<div class="sort"><p class="hint">Tap a card. Then tap the group where it belongs.</p><div class="pool"></div><div class="bins">' +
      q.bins.map(function (b, k) { return '<div class="bin" data-b="' + k + '" role="button" tabindex="0" aria-label="Group: ' + esc(b.replace(/<[^>]+>/g, '')) + '"><div class="bh">' + b + '</div></div>'; }).join('') + '</div></div>';
    var pool = $('.pool', area);
    shuffle(q.items.map(function (_, k) { return k; })).forEach(function (k) {
      var c = el('<button type="button" class="card" data-k="' + k + '">' + q.items[k][0] + '</button>');
      c.onclick = function (e) {
        e.stopPropagation(); if (api.el.classList.contains('locked')) return;
        if (picked === c) { c.classList.remove('pick'); picked = null; return; }
        // A card is already picked and you tapped a card sitting in a group: drop into that group.
        if (picked && c.parentNode.classList.contains('bin')) { drop(c.parentNode); return; }
        if (picked) picked.classList.remove('pick');
        picked = c; c.classList.add('pick');
      };
      pool.appendChild(c);
    });
    function drop(bin) {
      if (!picked || api.el.classList.contains('locked')) return;
      bin.appendChild(picked); place[picked.dataset.k] = +bin.dataset.b; picked.classList.remove('pick', 'wrong'); picked = null;
      if (opts.onChange) opts.onChange();
    }
    $$('.bin', area).forEach(function (b) { b.onclick = function () { drop(b); }; b.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); drop(b); } }; });
    pool.onclick = function () { if (picked) { pool.appendChild(picked); delete place[picked.dataset.k]; picked.classList.remove('pick'); picked = null; } };
    api.answered = function () { return Object.keys(place).length === q.items.length; };
    api.isRight = function () { return q.items.every(function (it, k) { return place[k] === it[1]; }); };
    api.wrongCount = function () { return q.items.filter(function (it, k) { return place[k] !== it[1]; }).length; };
    api.mark = function () { $$('.card', area).forEach(function (c) { var k = c.dataset.k; c.classList.remove('right', 'wrong'); if (place[k] != null) c.classList.add(place[k] === q.items[k][1] ? 'right' : 'wrong'); }); };
    api.answerText = function () { return q.bins.map(function (b, k) { return '<b>' + b + ':</b> ' + q.items.filter(function (it) { return it[1] === k; }).map(function (it) { return it[0]; }).join(', '); }).join('<br>'); };
    api.clearWrong = function () { $$('.card.wrong', area).forEach(function (c) { pool.appendChild(c); delete place[c.dataset.k]; c.classList.remove('wrong'); }); };
    api.reset = function () { $$('.card', area).forEach(function (c) { c.className = 'card'; pool.appendChild(c); }); place = {}; };
  }

  /* Practice: check one question at a time. First miss → hint. Second miss → show answer. */
  function practiceSet(host, qs, key, onDone) {
    var first = {}, done = {};
    var scoreBox = el('<div class="score" aria-live="polite"></div>');
    var items = qs.map(function (q, i) {
      var api = makeQ(q, i, qs.length, { label: 'Problem', onEnter: function () { check(); } });
      var tries = 0;
      var row = el('<div class="btnrow"><button class="btn small" type="button">Check</button></div>');
      api.el.appendChild(row);
      var btn = $('button', row);
      function check() {
        if (done[i]) return;
        if (!api.answered()) { api.feedback('hint', 'Answer first.', api.type === 'sort' ? 'Put every card in a group.' : ''); return; }
        if (api.badFormat && api.badFormat()) { api.feedback('hint', 'Type a number.', 'Use digits like 24, a fraction like 3/4, or a mixed number like 2 1/3.'); return; }
        tries++;
        if (api.isRight()) {
          if (tries === 1) first[i] = true;
          done[i] = true; api.mark(); api.el.classList.add('locked'); if (api.lock) api.lock(); btn.disabled = true;
          api.feedback('ok', okWord(), q.why ? '<div>' + q.why + '</div>' : '');
          progress();
        } else if (tries === 1) {
          if (api.type === 'sort') { api.mark(); }
          api.feedback('hint', 'Not yet. Try again.', '<div>' + (q.hint || 'Read the question again and check your work.') + (api.type === 'sort' ? ' Red cards are in the wrong group. Tap one and move it.' : '') + '</div>');
          if (api.type !== 'sort') api.clearWrong();
        } else {
          done[i] = true; api.mark(); api.el.classList.add('locked'); if (api.lock) api.lock(); btn.disabled = true;
          api.feedback('no', 'Here is the answer.', '<div>The answer is <b>' + api.answerText() + '</b>.</div>' + (q.why ? '<div style="margin-top:4px">' + q.why + '</div>' : ''));
          progress();
        }
      }
      btn.onclick = check;
      host.appendChild(api.el);
      return api;
    });
    host.appendChild(scoreBox);
    var again = el('<div class="btnrow"><button class="btn ghost" type="button">Start practice over</button></div>');
    $('button', again).onclick = function () { host.innerHTML = ''; practiceSet(host, qs, key, onDone); };
    host.appendChild(again);
    function progress() {
      var n = Object.keys(done).length;
      if (n < qs.length) return;
      var f = Object.keys(first).length;
      showScore(scoreBox, f, qs.length, 'right on the first try');
      var best = store.get(key, null); if (!best || f > best.right) store.set(key, { right: f, of: qs.length });
      if (onDone) onDone();
    }
  }

  function showScore(box, right, total, words) {
    var pct = Math.round(100 * right / total);
    var msg = pct === 100 ? 'Perfect! You know this.' : pct >= 80 ? 'Great work. Look back at any you missed.' : pct >= 60 ? 'Good start. Read the feedback, then try again.' : 'Keep going. Go back to the notes, then try again.';
    box.innerHTML = '<div class="big">' + right + ' / ' + total + '</div><div class="msg">You got <b>' + right + ' of ' + total + '</b> ' + words + '. ' + msg + '</div><div class="bar"><i style="width:' + pct + '%"></i></div>';
    box.classList.add('show');
  }

  /* Exit ticket: answer everything, then check once. Score shows at the end. */
  function exitTicket(host, qs, key, onDone) {
    host.innerHTML = '';
    var apis = qs.map(function (q, i) { var a = makeQ(q, i, qs.length, { label: 'Question' }); host.appendChild(a.el); return a; });
    var scoreBox = el('<div class="score" aria-live="polite"></div>');
    var row = el('<div class="btnrow"><button class="btn gold" type="button">Check my answers</button><span class="msg" style="color:var(--muted);font-size:14.5px"></span></div>');
    host.appendChild(row); host.appendChild(scoreBox);
    var btn = $('button', row), msg = $('.msg', row);
    btn.onclick = function () {
      if (btn.dataset.state === 'done') { exitTicket(host, qs, key, onDone); host.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      var missing = apis.filter(function (a) { return !a.answered(); }).length;
      if (missing) { msg.textContent = 'Answer every question first (' + missing + ' left).'; return; }
      msg.textContent = '';
      var right = 0;
      apis.forEach(function (a) {
        var ok = a.isRight(); if (ok) right++;
        a.mark(); a.el.classList.add('locked'); if (a.lock) a.lock();
        if (ok) a.feedback('ok', okWord(), a.q.why ? '<div>' + a.q.why + '</div>' : '');
        else a.feedback('no', 'Not quite.', '<div>The answer is <b>' + a.answerText() + '</b>.</div>' + (a.q.why ? '<div style="margin-top:4px">' + a.q.why + '</div>' : ''));
      });
      showScore(scoreBox, right, qs.length, 'correct on the exit ticket');
      store.set(key, { right: right, of: qs.length, when: Date.now() });
      btn.textContent = 'Try a fresh exit ticket'; btn.className = 'btn ghost'; btn.dataset.state = 'done';
      scoreBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (onDone) onDone();
    };
  }

  /* ======================================================================
     NOTES BLOCKS
     p | tip | key | vocab | fill | example | reveal | write | fig | try
     ====================================================================== */
  function notesBlock(b, key, idx) {
    var t = b.t;
    if (t === 'p') return el('<div class="nb">' + b.html + '</div>');
    if (t === 'h') return el('<h3>' + b.html + '</h3>');
    if (t === 'tip') return el('<div class="nb nb-tip">' + b.html + '</div>');
    if (t === 'key') return el('<div class="nb nb-key"><span class="lbl">' + (b.label || 'Remember') + '</span>' + b.html + '</div>');
    if (t === 'fig') return el('<div class="nb">' + figHTML(b) + '</div>');
    if (t === 'vocab') {
      var v = el('<div class="nb"><p style="font-size:14px;color:var(--muted);margin-bottom:8px">Tap a card to flip it.</p><div class="vcards"></div></div>');
      b.words.forEach(function (w) {
        var c = el('<button type="button" class="vcard" aria-label="' + esc(w[0]) + ': tap to see the meaning"><div class="in"><div class="f"><b>' + w[0] + '</b><span>Tap to flip</span></div><div class="b"><div>' + w[1] + (w[2] ? '<i>Example: ' + w[2] + '</i>' : '') + '</div></div></div></button>');
        c.onclick = function () { c.classList.toggle('flip'); };
        $('.vcards', v).appendChild(c);
      });
      return v;
    }
    if (t === 'fill') {
      // text with blanks written as [[answer|other ok answer]]
      var answers = [];
      var html = b.html.replace(/\[\[(.+?)\]\]/g, function (_, a) { answers.push(a.split('|')); return '<input type="text" aria-label="blank ' + answers.length + '" autocomplete="off" spellcheck="false" data-a="' + (answers.length - 1) + '">'; });
      var f = el('<div class="nb fill-wrap"><div class="fill">' + html + '</div><div class="btnrow"><button class="btn small" type="button">Check my notes</button><button class="btn small ghost" type="button">Show answers</button><span class="m" style="font-size:14.5px"></span></div></div>');
      var saved = store.get(key + ':fill' + idx, {});
      $$('input', f).forEach(function (inp) {
        var a = answers[+inp.dataset.a]; inp.style.width = Math.max(5, Math.min(14, a[0].length + 2)) + 'em';
        if (saved[inp.dataset.a]) inp.value = saved[inp.dataset.a];
        inp.oninput = function () { inp.className = ''; saved[inp.dataset.a] = inp.value; store.set(key + ':fill' + idx, saved); };
      });
      var bt = $$('button', f), m = $('.m', f);
      bt[0].onclick = function () {
        var right = 0, ins = $$('input', f);
        ins.forEach(function (inp) { var a = answers[+inp.dataset.a]; var ok = a.some(function (x) { return norm(x) === norm(inp.value); }); inp.className = ok ? 'ok' : 'no'; if (ok) right++; });
        m.innerHTML = right === ins.length ? '<b style="color:var(--ok)">All ' + right + ' blanks are right!</b>' : right + ' of ' + ins.length + ' right. Fix the red blanks.';
      };
      bt[1].onclick = function () { $$('input', f).forEach(function (inp) { var a = answers[+inp.dataset.a]; if (!a.some(function (x) { return norm(x) === norm(inp.value); })) { inp.value = a[0]; inp.className = 'ok'; saved[inp.dataset.a] = a[0]; } }); store.set(key + ':fill' + idx, saved); m.textContent = 'Read the notes again with the answers filled in.'; };
      return f;
    }
    if (t === 'example') {
      var e = el('<div class="nb ex"><div class="exh">' + (b.title || 'Worked example') + '</div>' + (b.q ? '<div style="padding:12px 14px 0">' + b.q + '</div>' : '') + figHTML(b.fig).replace('<figure class="fig"', '<figure class="fig" style="padding:0 14px"') +
        '<ol>' + b.steps.map(function (s, k) { return '<li' + (k ? ' hidden' : '') + '>' + s + '</li>'; }).join('') + '</ol><div class="exb"><button class="btn small ghost" type="button">Next step</button></div></div>');
      var nx = $('.exb button', e);
      if (b.steps.length < 2) nx.remove();
      else nx.onclick = function () { var h = $('li[hidden]', e); if (h) h.hidden = false; if (!$('li[hidden]', e)) nx.remove(); };
      return e;
    }
    if (t === 'reveal') {
      var r = el('<div class="nb reveal"><div>' + b.q + '</div><div class="btnrow"><button class="btn small ghost" type="button">' + (b.btn || 'Show me') + '</button></div><div class="ans" hidden>' + b.a + '</div></div>');
      $('button', r).onclick = function () { $('.ans', r).hidden = false; $('button', r).remove(); };
      return r;
    }
    if (t === 'write') {
      var w = el('<div class="nb write"><label>' + b.q + '</label><textarea rows="' + (b.rows || 3) + '" placeholder="' + esc(b.ph || 'Write your thinking here…') + '"></textarea><div class="saved"></div></div>');
      var ta = $('textarea', w), sv = $('.saved', w), id = $('label', w);
      var fid = 'w' + Math.random().toString(36).slice(2); ta.id = fid; id.setAttribute('for', fid);
      ta.value = store.get(key + ':w' + idx, '');
      var tm; ta.oninput = function () { clearTimeout(tm); tm = setTimeout(function () { store.set(key + ':w' + idx, ta.value); sv.textContent = 'Saved on this device.'; }, 400); };
      return w;
    }
    if (t === 'try') {
      var host = el('<div class="nb"></div>');
      practiceSet(host, [b.q], key + ':try' + idx);
      $$('.btnrow:last-child', host).forEach(function (x) { if (/over/.test(x.textContent)) x.remove(); });
      $('.qn span', host).textContent = 'Try it';
      return host;
    }
    return el('<div class="nb">' + (b.html || '') + '</div>');
  }

  /* ======================================================================
     LABS
     ====================================================================== */
  var LABS = {};

  /* Graph lab — student builds a bar graph, line plot or line graph from data.
     cfg: {mode:'bar'|'lineplot'|'linegraph', title, data: {cats|xs|min,max}, vals (correct), step, max, yLabel, xLabel, intro, table, after:[questions]} */
  LABS.graph = function (host, cfg, done) {
    var mode = cfg.mode, n = mode === 'lineplot' ? cfg.max - cfg.min + 1 : (cfg.cats || cfg.xs).length;
    var cur = []; for (var i = 0; i < n; i++) cur.push(mode === 'linegraph' ? null : 0);
    var step = cfg.step || 1;
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><div class="row"><div class="col" style="flex:0 1 300px">' + (cfg.table ? tableHTML(cfg.table) : '') + '</div>' +
      '<div class="col" style="flex:1 1 380px"><div class="g fig"></div><div class="ctl pad"></div></div></div>' +
      '<div class="btnrow"><button class="btn" type="button" data-a="check">Check my graph</button><button class="btn ghost" type="button" data-a="clear">Clear</button></div><div class="status" aria-live="polite"></div><div class="after"></div></div>';
    var g = $('.g', host), status = $('.status', host), pad = $('.ctl', host);
    var labels = mode === 'lineplot' ? (function () { var a = []; for (var k = cfg.min; k <= cfg.max; k++) a.push(String(k)); return a; })() : (cfg.cats || cfg.xs);
    pad.innerHTML = '<span style="font-size:13.5px;color:var(--muted);width:100%">' + (mode === 'lineplot' ? 'Tap above a number to add an ×. Or use the buttons.' : mode === 'bar' ? 'Tap in a column to set the bar height. Or use the buttons.' : 'Tap in a column to place the point. Or use the buttons.') + '</span>' +
      '<label style="font-size:14px">Column <select class="pick" style="font:15px var(--sans);padding:6px;border-radius:6px">' + labels.map(function (l, k) { return '<option value="' + k + '">' + esc(l) + '</option>'; }).join('') + '</select></label>' +
      '<button class="btn small ghost" type="button" data-d="-1" aria-label="down">' + M + '</button><button class="btn small ghost" type="button" data-d="1" aria-label="up">+</button>';
    function draw() {
      var f = mode === 'bar' ? FIG.bar({ title: cfg.title, cats: cfg.cats, vals: cur, step: step, max: cfg.yMax, yLabel: cfg.yLabel, xLabel: cfg.xLabel }, true)
        : mode === 'lineplot' ? FIG.lineplot({ title: cfg.title, min: cfg.min, max: cfg.max, vals: cur.concat([]), xLabel: cfg.xLabel }, true)
          : FIG.linegraph({ title: cfg.title, xs: cfg.xs, vals: cur, step: step, max: cfg.yMax, yLabel: cfg.yLabel, xLabel: cfg.xLabel }, true);
      g.innerHTML = f.svg;
      var svg = $('svg', g);
      $$('.hit', svg).forEach(function (r) {
        r.addEventListener('click', function (ev) {
          var k = +r.dataset.i; $('.pick', pad).value = k;
          if (mode === 'lineplot') { cur[k] = (cur[k] || 0) + 1; draw(); return; }
          var pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
          var p = pt.matrixTransform(svg.getScreenCTM().inverse());
          var geo = f.geo, v = Math.round((geo.T + geo.ph - p.y) / geo.ph * geo.max / step) * step;
          cur[k] = Math.max(0, Math.min(geo.max, v)); draw();
        });
      });
    }
    $$('[data-d]', pad).forEach(function (b) {
      b.onclick = function () {
        var k = +$('.pick', pad).value, d = +b.dataset.d;
        var top = cfg.yMax || 99;
        if (cur[k] == null) cur[k] = 0; else cur[k] = Math.max(0, Math.min(top, cur[k] + d * (mode === 'lineplot' ? 1 : step)));
        draw(); status.textContent = labels[k] + ': ' + cur[k];
      };
    });
    $('[data-a=clear]', host).onclick = function () { for (var k = 0; k < n; k++) cur[k] = mode === 'linegraph' ? null : 0; status.textContent = ''; draw(); };
    $('[data-a=check]', host).onclick = function () {
      var wrong = []; cfg.vals.forEach(function (v, k) { if (cur[k] !== v) wrong.push(labels[k]); });
      if (!wrong.length) {
        status.innerHTML = '<b style="color:var(--ok)">Your graph matches the data!</b> ' + (cfg.success || '');
        var a = $('.after', host);
        if (cfg.after && !a.childElementCount) { a.appendChild(el('<h3>Read your graph</h3>')); practiceSet(a, cfg.after, cfg.key + ':after'); }
        if (done) done();
      } else {
        status.innerHTML = '<span style="color:#B42318"><b>Not yet.</b></span> Check ' + (wrong.length > 3 ? wrong.length + ' columns' : 'these: <b>' + wrong.map(esc).join(', ') + '</b>') + '. Count the data again.';
      }
    };
    draw();
  };

  /* Sort lab — a bigger sort with a check button. cfg: {intro, bins, items, success} */
  LABS.sort = function (host, cfg, done) {
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><div class="sw"></div><div class="btnrow"><button class="btn" type="button">Check my sort</button><button class="btn ghost" type="button">Start over</button></div><div class="status" aria-live="polite"></div></div>';
    var api = { el: host };
    sortWidget($('.sw', host), { bins: cfg.bins, items: cfg.items }, api, {});
    var st = $('.status', host), bs = $$('.btnrow button', host);
    bs[0].onclick = function () {
      if (!api.answered()) { st.textContent = 'Put every card in a group first.'; return; }
      api.mark();
      if (api.isRight()) { st.innerHTML = '<b style="color:var(--ok)">All sorted correctly!</b> ' + (cfg.success || ''); if (done) done(); }
      else st.innerHTML = '<b style="color:#B42318">' + api.wrongCount() + ' card' + (api.wrongCount() > 1 ? 's are' : ' is') + ' in the wrong group.</b> Red cards need to move. Tap one, then tap a new group.';
    };
    bs[1].onclick = function () { api.reset(); st.textContent = ''; };
  };

  /* Sketch pad — draw, label, save on this device. cfg: {intro, specimen:'leaf'|null, checklist:[…], prompt} */
  LABS.sketch = function (host, cfg, done, key) {
    var colors = ['#1B2333', '#B42318', '#1D4ED8', '#15803D', '#A16207', '#7C3AED'];
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><div class="row">' +
      (cfg.specimen ? '<div class="col" style="flex:0 1 260px"><div class="spec" style="border:1px solid var(--line-2);border-radius:10px;background:#fff;padding:8px;text-align:center"></div><div class="btnrow" style="justify-content:center"><div class="seg" role="group" aria-label="Zoom"><button type="button" data-z="1" aria-pressed="true">Whole</button><button type="button" data-z="3" aria-pressed="false">Hand lens ×3</button></div></div></div>' : '') +
      '<div class="col"><div class="pad" style="margin-bottom:8px">' + colors.map(function (c, k) { return '<button type="button" class="swatch" style="background:' + c + '" data-c="' + c + '" aria-label="color ' + (k + 1) + '" aria-pressed="' + (k === 0) + '"></button>'; }).join('') +
      '<div class="seg" role="group" aria-label="Tool" style="margin-left:6px"><button type="button" data-t="pen" aria-pressed="true">Pen</button><button type="button" data-t="label" aria-pressed="false">Label</button><button type="button" data-t="erase" aria-pressed="false">Eraser</button></div></div>' +
      '<div class="sk-wrap"><canvas width="900" height="620" aria-label="Sketch area"></canvas></div>' +
      '<div class="btnrow"><button class="btn small ghost" type="button" data-a="undo">Undo</button><button class="btn small ghost" type="button" data-a="clear">Clear</button><button class="btn small" type="button" data-a="save">Save my sketch</button><span class="m" style="font-size:14px;color:var(--muted)"></span></div></div></div>' +
      (cfg.checklist ? '<h3>Check your sketch</h3><ul class="check-list">' + cfg.checklist.map(function (c, k) { return '<li><label><input type="checkbox" data-k="' + k + '"> <span>' + c + '</span></label></li>'; }).join('') + '</ul>' : '') + '</div>';
    if (cfg.specimen) {
      var spec = $('.spec', host);
      var leaf = SPECIMENS[cfg.specimen] || '';
      var setZ = function (z) {
        spec.innerHTML = '<div style="overflow:hidden;width:100%;aspect-ratio:1/1.15;position:relative"><div style="transform:scale(' + z + ');transform-origin:' + (z > 1 ? '62% 38%' : 'center') + ';transition:transform .3s">' + leaf + '</div></div><div style="font-size:12.5px;color:var(--muted)">' + (z > 1 ? 'Up close: look at the veins and the edge.' : 'A real leaf is about 8 cm long.') + '</div>';
        $$('[data-z]', host).forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.z === z); });
      };
      $$('[data-z]', host).forEach(function (b) { b.onclick = function () { setZ(+b.dataset.z); }; });
      setZ(1);
    }
    var cv = $('canvas', host), ctx = cv.getContext('2d'), color = colors[0], tool = 'pen', strokes = store.get(key + ':sketch', []), cur = null;
    function redraw() {
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.strokeStyle = '#EEF0F4'; ctx.lineWidth = 1;
      for (var x = 30; x < cv.width; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, cv.height); ctx.stroke(); }
      for (var y = 30; y < cv.height; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cv.width, y); ctx.stroke(); }
      strokes.forEach(function (s) {
        if (s.text) { ctx.fillStyle = s.c; ctx.font = '600 26px Inter, sans-serif'; ctx.fillText(s.text, s.x, s.y); return; }
        ctx.strokeStyle = s.erase ? '#fff' : s.c; ctx.lineWidth = s.erase ? 28 : 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath(); s.p.forEach(function (p, k) { if (k) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }); if (s.p.length === 1) ctx.lineTo(s.p[0][0] + .1, s.p[0][1]); ctx.stroke();
      });
    }
    function pos(e) { var r = cv.getBoundingClientRect(); return [Math.round((e.clientX - r.left) * cv.width / r.width), Math.round((e.clientY - r.top) * cv.height / r.height)]; }
    cv.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      if (tool === 'label') {
        var t = window.prompt('Type your label:'); if (t) { var p = pos(e); strokes.push({ text: t.slice(0, 40), x: p[0], y: p[1], c: color }); redraw(); }
        return;
      }
      cv.setPointerCapture(e.pointerId); cur = { c: color, erase: tool === 'erase', p: [pos(e)] }; strokes.push(cur); redraw();
    });
    cv.addEventListener('pointermove', function (e) { if (!cur) return; cur.p.push(pos(e)); redraw(); });
    var end = function () { cur = null; };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    $$('.swatch', host).forEach(function (b) { b.onclick = function () { color = b.dataset.c; $$('.swatch', host).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); if (tool === 'erase') setTool('pen'); }; });
    function setTool(t) { tool = t; $$('[data-t]', host).forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.t === t); }); }
    $$('[data-t]', host).forEach(function (b) { b.onclick = function () { setTool(b.dataset.t); }; });
    var m = $('.m', host);
    $('[data-a=undo]', host).onclick = function () { strokes.pop(); redraw(); };
    $('[data-a=clear]', host).onclick = function () { if (!strokes.length || window.confirm('Erase your whole sketch?')) { strokes = []; redraw(); } };
    $('[data-a=save]', host).onclick = function () { store.set(key + ':sketch', strokes); m.textContent = 'Saved on this device.'; if (done) done(); };
    var ck = store.get(key + ':check', {});
    $$('.check-list input', host).forEach(function (c) { c.checked = !!ck[c.dataset.k]; c.onchange = function () { ck[c.dataset.k] = c.checked; store.set(key + ':check', ck); }; });
    redraw();
  };
  var SPECIMENS = {
    leaf: '<svg viewBox="0 0 200 230" width="100%" role="img" aria-label="A green maple-like leaf with a stem, a main vein and smaller veins, and a jagged edge"><g stroke="#2F5D2A" stroke-linejoin="round">' +
      '<path d="M100 20 C120 40 150 40 170 55 C160 75 175 95 185 110 C160 115 150 130 150 150 C130 145 115 160 104 180 L100 186 L96 180 C85 160 70 145 50 150 C50 130 40 115 15 110 C25 95 40 75 30 55 C50 40 80 40 100 20 Z" fill="#6BA34A" stroke-width="2.5"/>' +
      '<path d="M100 186 L100 225" stroke-width="4" fill="none"/>' +
      '<path d="M100 186 L100 30 M100 120 L160 70 M100 120 L40 70 M100 150 L150 130 M100 150 L50 130 M130 95 L150 60 M70 95 L50 60 M130 95 L170 100 M70 95 L30 100" stroke="#D9E9C8" stroke-width="2" fill="none"/>' +
      '<path d="M170 55 l6 -4 M185 110 l7 1 M15 110 l-7 1 M30 55 l-6 -4 M150 150 l5 5 M50 150 l-5 5" stroke-width="2"/></g>' +
      '<circle cx="128" cy="78" r="5" fill="#A16207" opacity=".7"/></svg>'
  };

  /* Penny lab — drops of water on a penny (fair test: plain vs soapy). */
  LABS.penny = function (host, cfg, done, key) {
    var RANGE = { plain: [30, 44], soapy: [13, 21] };
    var data = store.get(key + ':penny', { plain: [], soapy: [] });
    var liquid = 'plain', drops = 0, cap = 0, spilled = false;
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p>' +
      '<div class="row"><div class="col" style="flex:0 1 320px">' +
      '<div class="seg" role="group" aria-label="Type of water"><button type="button" data-l="plain" aria-pressed="true">Plain water</button><button type="button" data-l="soapy" aria-pressed="false">Soapy water</button></div>' +
      '<div class="pv" style="margin-top:10px;border:1px solid var(--line-2);border-radius:10px;background:#fff"></div>' +
      '<div class="btnrow"><button class="btn gold" type="button" data-a="drop">Add a drop</button><button class="btn ghost" type="button" data-a="new">Dry the penny</button></div>' +
      '<div class="status" aria-live="polite"></div></div>' +
      '<div class="col"><h3 style="margin-top:0">Data table</h3><div class="tbl"></div>' +
      '<div class="nb nb-tip" style="font-size:14.5px"><b>Fair test.</b> We only change <b>the type of water</b>. We keep the same penny, the same dropper and the same height (3 cm).</div>' +
      '<div class="avg"></div></div></div></div>';
    var pv = $('.pv', host), st = $('.status', host);
    function newTrial() { drops = 0; spilled = false; var r = RANGE[liquid]; cap = r[0] + Math.floor(Math.random() * (r[1] - r[0] + 1)); drawPenny(); st.textContent = data[liquid].length >= 5 ? 'You finished 5 trials of ' + liquid + ' water.' : 'Trial ' + (data[liquid].length + 1) + ' of 5 with ' + liquid + ' water. Count every drop.'; }
    function drawPenny() {
      var h = spilled ? 0 : Math.min(1, drops / (RANGE.plain[1])) * (liquid === 'plain' ? 46 : 30);
      var spread = spilled ? '' : '<ellipse cx="150" cy="' + (128 - h / 2) + '" rx="' + (80 + Math.min(drops, 8) * 1.5) + '" ry="' + Math.max(2, h / 2 + 2) + '" fill="#8EC5F0" opacity=".75" stroke="#3B82C4" stroke-width="1.5"/>';
      var puddle = spilled ? '<ellipse cx="150" cy="168" rx="125" ry="14" fill="#8EC5F0" opacity=".6"/><text x="150" y="40" text-anchor="middle" font-size="18" font-weight="700" fill="#B42318" font-family="Inter,sans-serif">Spill! It overflowed.</text>' : '';
      pv.innerHTML = '<svg viewBox="0 0 300 190" width="100%" role="img" aria-label="Penny with ' + drops + ' drops of water' + (spilled ? ', spilled' : '') + '">' +
        '<rect x="0" y="150" width="300" height="40" fill="#F2F3F6"/>' + puddle +
        '<ellipse cx="150" cy="140" rx="84" ry="16" fill="#9A5B2B"/><rect x="66" y="128" width="168" height="12" fill="#B87333"/><ellipse cx="150" cy="128" rx="84" ry="16" fill="#C98B4E" stroke="#8A4F22" stroke-width="2"/>' + spread +
        '<rect x="143" y="2" width="14" height="34" rx="3" fill="#E3E5EA" stroke="#5B6475"/><path d="M146 36 L150 46 L154 36 Z" fill="#5B6475"/>' +
        '<text x="290" y="24" text-anchor="end" font-size="15" font-family="JetBrains Mono,monospace" fill="#1E2D4F">drops: ' + drops + '</text></svg>';
    }
    function table() {
      var avg = function (a) { if (a.length < 5) return '—'; var s = a.reduce(function (x, y) { return x + y; }, 0); return '≈ ' + Math.round(s / 5); };
      $('.tbl', host).innerHTML = tableHTML({ caption: 'Drops before it spilled, trials 1–5', head: ['Water', '1', '2', '3', '4', '5', 'Avg.'], leftCol: true, rows: ['plain', 'soapy'].map(function (l) { var r = [l === 'plain' ? 'Plain' : 'Soapy']; for (var k = 0; k < 5; k++) r.push(data[l][k] != null ? data[l][k] : ''); r.push(avg(data[l])); return r; }) });
      var a = $('.avg', host);
      if (data.plain.length === 5 && data.soapy.length === 5 && !a.dataset.on) {
        a.dataset.on = 1;
        var sumP = data.plain.reduce(function (x, y) { return x + y; }, 0), sumS = data.soapy.reduce(function (x, y) { return x + y; }, 0);
        a.appendChild(el('<h3>Find the averages</h3>'));
        a.appendChild(el('<p style="font-size:15px">An average is a “fair share.” Add all 5 trials. Then divide the total by 5.</p>'));
        practiceSet(a, [
          { q: 'Add your 5 <b>plain water</b> trials. What is the total?', answer: sumP, hint: 'Add the numbers in the Plain row: ' + data.plain.join(' + ') + '.', why: data.plain.join(' + ') + ' = ' + sumP + '.' },
          { q: 'Add your 5 <b>soapy water</b> trials. What is the total?', answer: sumS, hint: 'Add the numbers in the Soapy row: ' + data.soapy.join(' + ') + '.', why: data.soapy.join(' + ') + ' = ' + sumS + '.' },
          { q: 'Which kind of water held <b>more</b> drops on the penny?', choices: ['Plain water', 'Soapy water', 'They held the same'], answer: sumP > sumS ? 0 : sumP < sumS ? 1 : 2, why: 'Plain water held more. Water is “sticky”: it pulls on itself and makes a dome. Soap weakens that pull, so the dome breaks sooner.' }
        ], key + ':pennyavg');
        a.appendChild(el('<div>' + figHTML({ bar: { title: 'Average drops on a penny', cats: ['Plain', 'Soapy'], vals: [Math.round(sumP / 5), Math.round(sumS / 5)], step: 5, yLabel: 'Drops' } }) + '</div>'));
        if (done) done();
      }
    }
    $$('[data-l]', host).forEach(function (b) { b.onclick = function () { liquid = b.dataset.l; $$('[data-l]', host).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); newTrial(); }; });
    $('[data-a=drop]', host).onclick = function () {
      if (data[liquid].length >= 5) { st.textContent = 'You already have 5 trials of ' + liquid + ' water. ' + (liquid === 'plain' && data.soapy.length < 5 ? 'Switch to soapy water.' : ''); return; }
      if (spilled) { st.textContent = 'Dry the penny to start the next trial.'; return; }
      drops++;
      if (drops > cap) {
        spilled = true; data[liquid].push(cap); store.set(key + ':penny', data);
        st.innerHTML = '<b>Spill!</b> The penny held <b>' + cap + '</b> drops before it overflowed. We record ' + cap + '. Tap “Dry the penny” for the next trial.';
        table();
      } else st.textContent = drops + ' drop' + (drops > 1 ? 's' : '') + ' so far. Watch the dome of water grow.';
      drawPenny();
    };
    $('[data-a=new]', host).onclick = newTrial;
    var reset = el('<button class="btn small ghost" type="button" style="margin-top:12px">Erase my data and start over</button>');
    reset.onclick = function () { if (window.confirm('Erase all your penny data?')) { data = { plain: [], soapy: [] }; store.set(key + ':penny', data); $('.avg', host).innerHTML = ''; delete $('.avg', host).dataset.on; table(); newTrial(); } };
    $('.lab', host).appendChild(reset);
    table(); newTrial();
  };

  /* Prism lab — volume with unit cubes.
     mode 'explore': change length, width, height; build it layer by layer.
     mode 'hunt':    find every rectangular prism made of exactly cfg.V cubes.
     mode 'composite': a figure made of two prisms; show the two parts. cfg.parts:[{l,w,h,x,y,z}] */
  LABS.prism = function (host, cfg, done, key) {
    var max = cfg.max || 6, l = cfg.l || 4, w = cfg.w || 3, h = cfg.h || 2;
    function stepper(name, val, set) {
      var e = el('<div class="pad" style="margin:4px 0"><span style="width:76px;font-weight:600">' + name + '</span><button class="btn small ghost" type="button" aria-label="less ' + name + '">' + M + '</button><b class="v" style="font:700 24px var(--mono);min-width:36px;text-align:center;color:var(--navy)">' + val + '</b><button class="btn small ghost" type="button" aria-label="more ' + name + '">+</button></div>');
      var bs = $$('button', e), v = $('.v', e);
      bs[0].onclick = function () { if (val > 1) { val--; v.textContent = val; set(val); } };
      bs[1].onclick = function () { if (val < max) { val++; v.textContent = val; set(val); } };
      return e;
    }
    if (cfg.mode === 'composite') {
      var parts = cfg.parts, split = false;
      host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><div class="fig pic"></div><div class="btnrow"><button class="btn gold" type="button">Show the two prisms</button></div><div class="status" aria-live="polite"></div><div class="after"></div></div>';
      var pic = $('.pic', host), st = $('.status', host), bt = $('.btn', host);
      var draw = function () {
        pic.innerHTML = FIG.iso({ boxes: parts.map(function (p, i) { return { l: p.l, w: p.w, h: p.h, x: p.x, y: p.y, z: p.z, color: split ? (i ? '#7BA7E0' : '#F2A93B') : '#F2A93B', labels: split && !cfg.cubes ? [p.l, p.w, p.h] : null }; }), cubes: !!cfg.cubes, size: cfg.size || 30, label: 'A figure made of two rectangular prisms' }).svg;
      };
      bt.onclick = function () {
        split = !split; draw(); bt.textContent = split ? 'Put them back together' : 'Show the two prisms';
        if (split) {
          var v = parts.map(function (p) { return p.l * p.w * p.h; });
          st.innerHTML = 'Orange prism: ' + parts[0].l + ' × ' + parts[0].w + ' × ' + parts[0].h + '. Blue prism: ' + parts[1].l + ' × ' + parts[1].w + ' × ' + parts[1].h + '.';
          var a = $('.after', host);
          if (!a.childElementCount) {
            practiceSet(a, [
              { q: 'What is the volume of the <b>orange</b> prism?', answer: v[0], unit: 'cubic units', hint: 'Multiply its length × width × height.', why: parts[0].l + ' × ' + parts[0].w + ' × ' + parts[0].h + ' = ' + v[0] + '.' },
              { q: 'What is the volume of the <b>blue</b> prism?', answer: v[1], unit: 'cubic units', why: parts[1].l + ' × ' + parts[1].w + ' × ' + parts[1].h + ' = ' + v[1] + '.' },
              { q: 'What is the volume of the whole figure?', answer: v[0] + v[1], unit: 'cubic units', hint: 'Add the two volumes.', why: v[0] + ' + ' + v[1] + ' = ' + (v[0] + v[1]) + ' cubic units.' }
            ], key + ':comp', done);
          }
        } else st.textContent = '';
      };
      draw(); return;
    }
    if (cfg.mode === 'hunt') {
      var V = cfg.V, all = [];
      for (var a = 1; a <= V; a++) for (var b = a; b <= V; b++) if (V % (a * b) === 0 && V / (a * b) >= b) all.push([a, b, V / (a * b)].join('×'));
      var found = store.get(key + ':hunt' + V, []); max = Math.max(max, V);
      host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + ' There are <b>' + all.length + '</b> different prisms. (Turning a prism on its side does not make a new one.)</p>' +
        '<div class="row"><div class="col" style="flex:0 1 280px"><div class="ctl0"></div><div class="read" style="margin:8px 0;font:600 18px var(--mono);color:var(--navy)"></div><button class="btn gold" type="button">Save this prism</button></div><div class="col"><div class="fig pic"></div></div></div>' +
        '<h3>Prisms you found (<span class="nf">0</span> of ' + all.length + ')</h3><div class="ls-chips found"></div><div class="status" aria-live="polite"></div></div>';
      var pic2 = $('.pic', host), read = $('.read', host), st2 = $('.status', host), c0 = $('.ctl0', host);
      l = 1; w = 1; h = 1;
      var upd = function () { var v = l * w * h; read.innerHTML = l + ' × ' + w + ' × ' + h + ' = ' + v + (v === V ? ' ✓' : ''); pic2.innerHTML = FIG.iso({ boxes: [{ l: l, w: w, h: h }], cubes: true, size: Math.max(12, 30 - Math.max(l, w, h)) }).svg; };
      var list = function () { $('.found', host).innerHTML = found.map(function (f) { return '<span class="ls-chip">' + f.replace(/×/g, ' × ') + '</span>'; }).join(''); $('.nf', host).textContent = found.length; };
      c0.append(stepper('Length', 1, function (v) { l = v; upd(); }), stepper('Width', 1, function (v) { w = v; upd(); }), stepper('Height', 1, function (v) { h = v; upd(); }));
      $('.btn.gold', host).onclick = function () {
        var v = l * w * h; if (v !== V) { st2.innerHTML = 'That prism has <b>' + v + '</b> cubes. You need exactly <b>' + V + '</b>.'; return; }
        var k = [l, w, h].sort(function (x, y) { return x - y; }).join('×');
        if (found.indexOf(k) >= 0) { st2.textContent = 'You already found that one (maybe turned a different way).'; return; }
        found.push(k); store.set(key + ':hunt' + V, found); list();
        st2.innerHTML = found.length === all.length ? '<b style="color:var(--ok)">You found all ' + all.length + ' prisms!</b> They all have the same volume: ' + V + ' cubic units.' : 'Nice! ' + (all.length - found.length) + ' to go.';
        if (found.length === all.length && done) done();
      };
      upd(); list(); return;
    }
    // explore
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><div class="row"><div class="col" style="flex:0 1 280px"><div class="ctl0"></div><div class="btnrow"><button class="btn gold" type="button">Build it layer by layer</button></div></div><div class="col"><div class="fig pic" style="min-height:200px"></div></div></div><div class="status" aria-live="polite" style="font-size:17px"></div><div class="after"></div></div>';
    var pic3 = $('.pic', host), st3 = $('.status', host), busy = false;
    var show = function (layers) { pic3.innerHTML = FIG.iso({ boxes: [{ l: l, w: w, h: h }], cubes: true, layers: layers, size: 26 }).svg; };
    var readout = function () { st3.innerHTML = 'Base layer: ' + l + ' × ' + w + ' = <b>' + (l * w) + '</b> cubes. Layers: <b>' + h + '</b>. Volume = ' + (l * w) + ' × ' + h + ' = <b>' + (l * w * h) + ' cubic units</b>.'; };
    $('.ctl0', host).append(stepper('Length', l, function (v) { l = v; show(); readout(); }), stepper('Width', w, function (v) { w = v; show(); readout(); }), stepper('Height', h, function (v) { h = v; show(); readout(); }));
    $('.btn.gold', host).onclick = function () {
      if (busy) return; busy = true; var k = 0;
      (function step() { k++; show(k); st3.innerHTML = 'Layer ' + k + ': ' + (l * w) + ' cubes. Total so far: <b>' + (l * w * k) + '</b>.'; if (k < h) setTimeout(step, 700); else { setTimeout(function () { readout(); busy = false; var a = $('.after', host); if (cfg.after && !a.childElementCount) { a.appendChild(el('<h3>Try these</h3>')); practiceSet(a, cfg.after, key + ':after', done); } }, 700); } })();
    };
    show(); readout();
  };

  /* Pulse lab — count beats (or breaths) for 15 seconds, × 4 = per minute. Resting vs. after exercise.
     cfg: {what:'heartbeats'|'breaths', intro} */
  LABS.pulse = function (host, cfg, done, key) {
    var what = cfg.what || 'heartbeats', data = store.get(key + ':pulse', { rest: null, active: null });
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p>' +
      '<div class="seg" role="group" aria-label="When"><button type="button" data-w="rest" aria-pressed="true">Resting</button><button type="button" data-w="active" aria-pressed="false">After 1 minute of jumping jacks</button></div>' +
      '<div class="row" style="margin-top:12px"><div class="col" style="flex:0 1 260px"><div class="clock" style="font:700 56px var(--mono);color:var(--navy);text-align:center;border:2px solid var(--line-2);border-radius:12px;background:#fff;padding:10px">0:15</div>' +
      '<div class="btnrow" style="justify-content:center"><button class="btn gold" type="button" data-a="go">Start 15 seconds</button></div></div>' +
      '<div class="col"><label style="font-weight:600;color:var(--navy)">How many ' + what + ' did you count in 15 seconds?</label><div class="numrow" style="display:flex;gap:8px;margin-top:6px;flex-wrap:wrap"><input class="num" inputmode="numeric" style="font:600 22px var(--mono);width:6em;padding:8px 10px;border:2px solid var(--line-2);border-radius:10px" aria-label="count in 15 seconds"><button class="btn" type="button" data-a="save">Record</button></div>' +
      '<div class="status" aria-live="polite"></div></div></div><div class="res"></div></div>';
    var when = 'rest', clock = $('.clock', host), st = $('.status', host), tm = null;
    $$('[data-w]', host).forEach(function (b) { b.onclick = function () { when = b.dataset.w; $$('[data-w]', host).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); st.textContent = ''; }; });
    $('[data-a=go]', host).onclick = function () {
      clearInterval(tm); var left = 15; clock.textContent = '0:15'; st.textContent = 'Count! ' + (what === 'heartbeats' ? 'Two fingers on your wrist or neck.' : 'Count each time you breathe in.');
      tm = setInterval(function () { left--; clock.textContent = '0:' + String(left).padStart(2, '0'); if (left <= 0) { clearInterval(tm); clock.textContent = 'Stop!'; st.textContent = 'Type how many you counted.'; } }, 1000);
    };
    function results() {
      var r = $('.res', host), rows = [['Resting', data.rest], ['After exercise', data.active]];
      r.innerHTML = tableHTML({ head: ['When', 'In 15 seconds', 'Per minute (× 4)'], leftCol: true, rows: rows.map(function (x) { return [x[0], x[1] == null ? '' : x[1], x[1] == null ? '' : '<b>' + x[1] * 4 + '</b>']; }) });
      if (data.rest != null && data.active != null) {
        r.innerHTML += figHTML({ bar: { title: (what === 'heartbeats' ? 'Heart rate' : 'Breathing rate') + ' (per minute)', cats: ['Resting', 'After exercise'], vals: [data.rest * 4, data.active * 4], step: 20, yLabel: what === 'heartbeats' ? 'Beats per minute' : 'Breaths per minute' } });
        var up = data.active > data.rest;
        r.innerHTML += '<div class="nb nb-tip">' + (up ? 'Your ' + (what === 'heartbeats' ? 'heart rate' : 'breathing rate') + ' went <b>up</b> by ' + ((data.active - data.rest) * 4) + ' per minute. Working muscles need more oxygen, so the heart and lungs speed up.' : 'Try the exercise again for a full minute, then count right away.') + '</div>';
        if (done) done();
      }
    }
    $('[data-a=save]', host).onclick = function () {
      var v = parseInt($('input', host).value, 10);
      if (!(v > 0 && v < 100)) { st.textContent = 'Type the number you counted in 15 seconds (like 22).'; return; }
      data[when] = v; store.set(key + ':pulse', data); st.innerHTML = v + ' in 15 seconds → ' + v + ' × 4 = <b>' + v * 4 + ' per minute</b>.'; $('input', host).value = ''; results();
    };
    results();
  };

  /* Reaction lab — how fast does a message travel from your eyes to your brain to your hand? */
  LABS.reaction = function (host, cfg, done, key) {
    var times = store.get(key + ':react', []), state = 'idle', t0 = 0, timer = null;
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p>' +
      '<button type="button" class="pad-r" style="width:100%;min-height:170px;border-radius:14px;border:0;font:700 24px var(--sans);color:#fff;background:#1E2D4F;cursor:pointer">Tap here to start</button>' +
      '<div class="status" aria-live="polite"></div><div class="res"></div><div class="btnrow"><button class="btn small ghost" type="button" data-a="clear">Clear my trials</button></div></div>';
    var pad = $('.pad-r', host), st = $('.status', host);
    function show() {
      var r = $('.res', host);
      if (!times.length) { r.innerHTML = ''; return; }
      var avg = Math.round(times.reduce(function (a, b) { return a + b; }, 0) / times.length);
      r.innerHTML = tableHTML({ head: ['Trial'].concat(times.map(function (_, i) { return i + 1; })).concat(['Average']), rows: [['Time (ms)'].concat(times).concat(['<b>' + avg + '</b>'])] }) +
        '<p style="font-size:14.5px;color:var(--muted)">1,000 milliseconds (ms) = 1 second. Your message traveled: <b>eyes → nerves → brain → spinal cord → nerves → hand muscles</b> in about ' + avg + ' ms!</p>';
      if (times.length >= 5 && done) done();
    }
    pad.onclick = function () {
      if (state === 'idle' || state === 'done') {
        if (times.length >= 5) { st.textContent = 'You finished 5 trials. Clear to try again.'; return; }
        state = 'wait'; pad.style.background = '#B42318'; pad.textContent = 'Wait for GREEN…';
        timer = setTimeout(function () { state = 'go'; pad.style.background = '#15803D'; pad.textContent = 'TAP!'; t0 = performance.now(); }, 1200 + Math.random() * 2500);
      } else if (state === 'wait') {
        clearTimeout(timer); state = 'idle'; pad.style.background = '#1E2D4F'; pad.textContent = 'Too soon! Tap to try again.';
      } else if (state === 'go') {
        var ms = Math.round(performance.now() - t0); times.push(ms); store.set(key + ':react', times);
        state = 'done'; pad.style.background = '#1E2D4F'; pad.textContent = ms + ' ms — tap for the next trial';
        st.textContent = 'Trial ' + times.length + ' of 5.'; show();
      }
    };
    $('[data-a=clear]', host).onclick = function () { times = []; store.set(key + ':react', times); state = 'idle'; pad.textContent = 'Tap here to start'; st.textContent = ''; show(); };
    show();
  };

  /* Sharing lab — share items equally among people (fractions as division, NC.5.NF.3).
     cfg.problems: [[items, people, 'thing'], …] */
  LABS.share = function (host, cfg, done, key) {
    var pi = 0, cut = 1;
    var COLORS = ['#F2A93B', '#7BA7E0', '#5BB381', '#E07B7B', '#B08BE0', '#E0C25B', '#5BC7C7', '#C78B5B'];
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><div class="prob" style="font-weight:600;font-size:18px;color:var(--navy)"></div><div class="fig pic"></div>' +
      '<div class="pad" style="margin-top:6px"><span style="font-weight:600">Cut each one into</span><button class="btn small ghost" type="button" data-d="-1" aria-label="fewer pieces">' + M + '</button><b class="cv" style="font:700 22px var(--mono);min-width:30px;text-align:center">1</b><button class="btn small ghost" type="button" data-d="1" aria-label="more pieces">+</button><span>pieces</span><button class="btn small gold" type="button" data-a="deal">Deal the pieces</button></div>' +
      '<div class="status" aria-live="polite"></div><div class="after"></div><div class="btnrow"><button class="btn small ghost" type="button" data-a="next">Next problem →</button></div></div>';
    var pic = $('.pic', host), st = $('.status', host);
    function draw(dealt) {
      var p = cfg.problems[pi], n = p[0], people = p[1], W = 300, H = 40, s = '';
      for (var k = 0; k < n; k++) for (var i = 0; i < cut; i++) {
        var idx = k * cut + i, who = idx % people;
        s += '<rect x="' + (2 + i * W / cut) + '" y="' + (2 + k * (H + 8)) + '" width="' + (W / cut) + '" height="' + H + '" fill="' + (dealt ? COLORS[who % COLORS.length] : '#FFF3C4') + '" stroke="#1E2D4F" stroke-width="2"/>';
        if (dealt && W / cut > 22) s += '<text x="' + (2 + (i + .5) * W / cut) + '" y="' + (2 + k * (H + 8) + 26) + '" text-anchor="middle" font-size="13" font-weight="700" font-family="Inter,sans-serif" fill="#1B2333">' + (who + 1) + '</text>';
      }
      pic.innerHTML = '<svg viewBox="0 0 304 ' + (n * (H + 8)) + '" width="304" role="img" aria-label="' + n + ' ' + p[2] + ' cut into ' + cut + ' pieces each">' + s + '</svg>';
    }
    function load() {
      var p = cfg.problems[pi]; cut = 1; $('.cv', host).textContent = 1;
      $('.prob', host).innerHTML = 'Problem ' + (pi + 1) + ' of ' + cfg.problems.length + ': Share <b>' + p[0] + ' ' + p[2] + '</b> equally among <b>' + p[1] + ' people</b>.';
      st.textContent = 'Each bar is one whole. Choose how many pieces to cut each one into.'; $('.after', host).innerHTML = ''; draw(false);
    }
    $$('[data-d]', host).forEach(function (b) { b.onclick = function () { cut = Math.max(1, Math.min(12, cut + +b.dataset.d)); $('.cv', host).textContent = cut; draw(false); st.textContent = ''; }; });
    $('[data-a=deal]', host).onclick = function () {
      var p = cfg.problems[pi], total = p[0] * cut;
      if (total % p[1]) { draw(false); st.innerHTML = 'There are ' + total + ' pieces. ' + total + ' pieces can’t be shared equally among ' + p[1] + ' people. Try a different number of pieces. <i>Hint: try cutting each into ' + p[1] + '.</i>'; return; }
      draw(true);
      var each = total / p[1];
      st.innerHTML = 'Each person gets <b>' + each + ' pieces</b>, and each piece is <b>1/' + cut + '</b> of one whole.';
      var a = $('.after', host);
      if (!a.childElementCount) practiceSet(a, [{ q: 'How much does each person get? Write it as a fraction or mixed number.', answer: [p[0], p[1]].join('/'), hint: 'Each person gets ' + each + ' pieces of size 1/' + cut + '.', why: p[0] + ' ÷ ' + p[1] + ' = ' + p[0] + '/' + p[1] + '. Sharing ' + p[0] + ' among ' + p[1] + ' gives each person ' + p[0] + '/' + p[1] + '.' }], key + ':share' + pi, pi === cfg.problems.length - 1 ? done : null);
    };
    $('[data-a=next]', host).onclick = function () { pi = (pi + 1) % cfg.problems.length; load(); };
    load();
  };

  /* Area lab — fraction × fraction with an area model (NC.5.NF.4). cfg.problems: [[a,b,c,d], …] */
  LABS.area = function (host, cfg, done, key) {
    var pi = 0, step = 0;
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><div class="prob" style="font:600 22px var(--mono);color:var(--navy)"></div>' +
      '<div class="row"><div class="col" style="flex:0 1 300px"><div class="fig pic"></div></div><div class="col"><div class="status" aria-live="polite" style="font-size:16px"></div><div class="btnrow"><button class="btn gold" type="button" data-a="step">Shade the first fraction</button><button class="btn small ghost" type="button" data-a="next">Next problem →</button></div><div class="after"></div></div></div></div>';
    var pic = $('.pic', host), st = $('.status', host), bt = $('[data-a=step]', host);
    function load() {
      var p = cfg.problems[pi]; step = 0; bt.textContent = 'Shade ' + p[0] + '/' + p[1] + ' of the width'; bt.disabled = false;
      $('.prob', host).innerHTML = p[0] + '/' + p[1] + ' × ' + p[2] + '/' + p[3] + ' = ?';
      pic.innerHTML = FIG.area({ a: 0, b: p[1], c: 0, d: p[3] }).svg; st.innerHTML = 'The square is 1 whole. It is split into ' + p[1] + ' columns and ' + p[3] + ' rows.'; $('.after', host).innerHTML = '';
    }
    bt.onclick = function () {
      var p = cfg.problems[pi]; step++;
      if (step === 1) { pic.innerHTML = FIG.area({ a: p[0], b: p[1], c: 0, d: p[3] }).svg; st.innerHTML = 'Yellow shows <b>' + p[0] + '/' + p[1] + '</b> of the whole.'; bt.textContent = 'Now shade ' + p[2] + '/' + p[3] + ' of that'; }
      else {
        pic.innerHTML = FIG.area({ a: p[0], b: p[1], c: p[2], d: p[3] }).svg; bt.disabled = true;
        st.innerHTML = 'Green is <b>' + p[2] + '/' + p[3] + ' of ' + p[0] + '/' + p[1] + '</b>. There are ' + (p[0] * p[2]) + ' green parts out of ' + (p[1] * p[3]) + ' parts in the whole.';
        practiceSet($('.after', host), [{ q: 'What is ' + p[0] + '/' + p[1] + ' × ' + p[2] + '/' + p[3] + '?', answer: (p[0] * p[2]) + '/' + (p[1] * p[3]), hint: 'Count the green parts. Count all the parts in the whole square.', why: (p[0] * p[2]) + ' green parts out of ' + (p[1] * p[3]) + ': ' + p[0] + '/' + p[1] + ' × ' + p[2] + '/' + p[3] + ' = ' + (p[0] * p[2]) + '/' + (p[1] * p[3]) + '. Multiply the tops; multiply the bottoms.' }], key + ':area' + pi, pi === cfg.problems.length - 1 ? done : null);
      }
    };
    $('[data-a=next]', host).onclick = function () { pi = (pi + 1) % cfg.problems.length; load(); };
    load();
  };

  /* Parentheses puzzle — place one pair of parentheses to hit the target (NC.5.OA.2).
     cfg.puzzles: [['3 + 4 × 5 − 2', target], …]  numbers and + − × ÷ separated by spaces */
  LABS.parens = function (host, cfg, done, key) {
    var pi = 0, sel = [];
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><div class="tg" style="font-weight:600;margin-bottom:6px"></div><div class="ex" style="display:flex;flex-wrap:wrap;gap:6px;font:700 28px var(--mono);color:var(--navy)"></div>' +
      '<div class="status" aria-live="polite"></div><div class="btnrow"><button class="btn small ghost" type="button" data-a="clear">Remove parentheses</button><button class="btn small ghost" type="button" data-a="next">Next puzzle →</button></div></div>';
    var exEl = $('.ex', host), st = $('.status', host), solved = store.get(key + ':parens', {});
    function ops(t) { return t === '×' || t === '÷' || t === '+' || t === M; }
    function calc(list) { // list of numbers/ops with optional parens, order of operations
      var a = list.slice(), i;
      var lp = a.indexOf('('); if (lp >= 0) { var rp = a.indexOf(')'); a.splice(lp, rp - lp + 1, calc(a.slice(lp + 1, rp))); }
      for (i = 1; i < a.length; i += 2) if (a[i] === '×' || a[i] === '÷') { a.splice(i - 1, 3, a[i] === '×' ? a[i - 1] * a[i + 1] : a[i - 1] / a[i + 1]); i -= 2; }
      var v = a[0]; for (i = 1; i < a.length; i += 2) v = a[i] === '+' ? v + a[i + 1] : v - a[i + 1]; return v;
    }
    function toks() { return cfg.puzzles[pi][0].split(' ').map(function (t) { return ops(t) ? t : +t; }); }
    function draw() {
      var tk = toks(), out = [];
      tk.forEach(function (t, i) {
        if (sel.length === 2 && i === sel[0]) out.push('<span style="color:var(--gold-line)">(</span>');
        out.push(typeof t === 'number' ? '<button type="button" class="nb-n" data-i="' + i + '" style="font:inherit;color:inherit;border:2px solid ' + (sel.indexOf(i) >= 0 ? 'var(--gold-line)' : 'var(--line-2)') + ';background:#fff;border-radius:8px;padding:2px 8px;cursor:pointer">' + t + '</button>' : '<span>' + t + '</span>');
        if (sel.length === 2 && i === sel[1]) out.push('<span style="color:var(--gold-line)">)</span>');
      });
      exEl.innerHTML = out.join('');
      $$('.nb-n', exEl).forEach(function (b) { b.onclick = function () { var i = +b.dataset.i; if (sel.length >= 2) sel = []; sel.push(i); sel.sort(function (x, y) { return x - y; }); if (sel.length === 2 && sel[0] === sel[1]) sel = [i]; draw(); check(); }; });
    }
    function check() {
      var tk = toks(), target = cfg.puzzles[pi][1];
      if (sel.length < 2) { st.textContent = sel.length ? 'Now tap the number where the parentheses end.' : ''; return; }
      var list = tk.slice(); list.splice(sel[1] + 1, 0, ')'); list.splice(sel[0], 0, '(');
      var v = calc(list);
      if (v === target) { st.innerHTML = '<b style="color:var(--ok)">Yes! It equals ' + target + '.</b>'; solved[pi] = 1; store.set(key + ':parens', solved); if (Object.keys(solved).length === cfg.puzzles.length && done) done(); }
      else st.innerHTML = 'With those parentheses it equals <b>' + (v % 1 ? v.toFixed(2) : v) + '</b>, not ' + target + '. Try another spot.';
    }
    function load() { sel = []; $('.tg', host).innerHTML = 'Puzzle ' + (pi + 1) + ' of ' + cfg.puzzles.length + ': Tap the first and last number to put parentheses around. Make it equal <b style="font:700 20px var(--mono)">' + cfg.puzzles[pi][1] + '</b>. Without parentheses it equals ' + calc(toks()) + '.'; st.textContent = ''; draw(); }
    $('[data-a=clear]', host).onclick = function () { sel = []; draw(); st.textContent = ''; };
    $('[data-a=next]', host).onclick = function () { pi = (pi + 1) % cfg.puzzles.length; load(); };
    load();
  };

  /* Recipe for Traits — flip a coin for each parent's gene; build a puppy (LS.5.3.2).
     Each parent has one "show" gene (capital) and one "hidden" gene for every trait. */
  LABS.recipe = function (host, cfg, done, key) {
    var TRAITS = [
      { name: 'Fur color', A: 'brown', a: 'cream' }, { name: 'Ears', A: 'floppy', a: 'pointy' },
      { name: 'Tail', A: 'long', a: 'short' }, { name: 'Spots', A: 'spots', a: 'no spots' }, { name: 'Nose', A: 'black', a: 'pink' }
    ];
    var pups = store.get(key + ':pups', []);
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><div class="row"><div class="col"><div class="tw tbl"></div><div class="btnrow"><button class="btn gold" type="button" data-a="flip">Flip the coins</button><button class="btn small ghost" type="button" data-a="clear">Start over</button></div></div><div class="col" style="flex:0 1 260px"><div class="pup fig"></div></div></div><h3>Our litter (<span class="n">0</span> puppies)</h3><div class="litter" style="display:flex;flex-wrap:wrap;gap:8px"></div><div class="status" aria-live="polite"></div></div>';
    function pupSVG(t, size) {
      var fur = t[0] === 'brown' ? '#9A6233' : '#EBD9B4', dark = '#3B2A1E';
      var ears = t[1] === 'floppy' ? '<ellipse cx="62" cy="58" rx="12" ry="24" fill="' + dark + '" opacity=".75" transform="rotate(20 62 58)"/><ellipse cx="118" cy="58" rx="12" ry="24" fill="' + dark + '" opacity=".75" transform="rotate(-20 118 58)"/>' : '<path d="M58 50 L66 18 L80 44 Z M122 50 L114 18 L100 44 Z" fill="' + fur + '" stroke="' + dark + '" stroke-width="2"/>';
      var tail = t[2] === 'long' ? '<path d="M150 120 Q185 95 178 70" stroke="' + fur + '" stroke-width="10" fill="none" stroke-linecap="round"/>' : '<path d="M150 120 Q160 112 162 104" stroke="' + fur + '" stroke-width="10" fill="none" stroke-linecap="round"/>';
      var spots = t[3] === 'spots' ? '<circle cx="120" cy="125" r="9" fill="' + dark + '" opacity=".6"/><circle cx="95" cy="140" r="7" fill="' + dark + '" opacity=".6"/><circle cx="76" cy="62" r="6" fill="' + dark + '" opacity=".6"/>' : '';
      var nose = t[4] === 'black' ? '#1B1B1B' : '#E89AA6';
      return '<svg viewBox="0 0 200 175" width="' + size + '" role="img" aria-label="Puppy with ' + t.join(', ') + '">' + tail +
        '<ellipse cx="110" cy="128" rx="48" ry="30" fill="' + fur + '" stroke="' + dark + '" stroke-width="2"/><rect x="74" y="140" width="12" height="28" rx="5" fill="' + fur + '" stroke="' + dark + '" stroke-width="2"/><rect x="128" y="140" width="12" height="28" rx="5" fill="' + fur + '" stroke="' + dark + '" stroke-width="2"/>' +
        '<circle cx="90" cy="70" r="34" fill="' + fur + '" stroke="' + dark + '" stroke-width="2"/>' + ears + spots + '<circle cx="78" cy="64" r="4" fill="' + dark + '"/><circle cx="102" cy="64" r="4" fill="' + dark + '"/><ellipse cx="90" cy="82" rx="7" ry="5" fill="' + nose + '"/></svg>';
    }
    function flip() { return Math.random() < 0.5; }
    function render(last) {
      var tb = $('.tbl', host);
      tb.innerHTML = '<table class="dt"><tr><th class="l">Trait</th><th>Mom’s gene</th><th>Dad’s gene</th><th class="l">Puppy shows</th></tr>' + TRAITS.map(function (tr, i) {
        var g = last ? last.g[i] : null;
        return '<tr><td class="l">' + tr.name + '</td><td>' + (g ? (g[0] ? 'A (' + tr.A + ')' : 'a (' + tr.a + ')') : '?') + '</td><td>' + (g ? (g[1] ? 'A (' + tr.A + ')' : 'a (' + tr.a + ')') : '?') + '</td><td class="l"><b>' + (last ? last.t[i] : '') + '</b></td></tr>';
      }).join('') + '</table><p style="font-size:13.5px;color:var(--muted)">Both parents are <b>Aa</b> for every trait: they show the capital-A trait but carry a hidden “a”. A puppy shows the “a” trait only if it gets <b>a from both</b> parents.</p>';
      $('.pup', host).innerHTML = last ? pupSVG(last.t, 240) : '';
      $('.litter', host).innerHTML = pups.map(function (p, i) { return '<div style="text-align:center;font-size:12px">' + pupSVG(p.t, 90) + '<br>Puppy ' + (i + 1) + '</div>'; }).join('');
      $('.n', host).textContent = pups.length;
      if (pups.length >= 4) { $('.status', host).innerHTML = '<b>Look at your litter.</b> Same parents, but the puppies look different! Each puppy gets a different mix of genes from mom and dad. That is called <b>variation</b>.'; if (done) done(); }
    }
    $('[data-a=flip]', host).onclick = function () {
      var g = TRAITS.map(function () { return [flip(), flip()]; });
      var t = TRAITS.map(function (tr, i) { return g[i][0] || g[i][1] ? tr.A : tr.a; });
      var p = { g: g, t: t }; pups.push(p); if (pups.length > 8) pups.shift(); store.set(key + ':pups', pups); render(p);
    };
    $('[data-a=clear]', host).onclick = function () { pups = []; store.set(key + ':pups', pups); $('.status', host).textContent = ''; render(null); };
    render(pups[pups.length - 1] || null);
  };

  /* Fraction division lab (NC.5.NF.7). cfg.problems: [['w', a, b] = a ÷ 1/b, ['u', b, n] = 1/b ÷ n] */
  LABS.fdiv = function (host, cfg, done, key) {
    var pi = 0;
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><div class="prob" style="font:600 24px var(--mono);color:var(--navy)"></div><div class="fig pic"></div><div class="status" aria-live="polite"></div><div class="btnrow"><button class="btn gold" type="button" data-a="show">Show me</button><button class="btn small ghost" type="button" data-a="next">Next problem →</button></div><div class="after"></div></div>';
    var pic = $('.pic', host), st = $('.status', host);
    function load() {
      var p = cfg.problems[pi]; $('.after', host).innerHTML = '';
      if (p[0] === 'w') { $('.prob', host).innerHTML = p[1] + ' ÷ 1/' + p[2] + ' = ?'; st.innerHTML = 'How many <b>1/' + p[2] + 's</b> fit in ' + p[1] + ' whole' + (p[1] > 1 ? 's' : '') + '?'; pic.innerHTML = FIG.strip({ parts: 1, shaded: 0, wholes: p[1] }).svg; }
      else { $('.prob', host).innerHTML = '1/' + p[1] + ' ÷ ' + p[2] + ' = ?'; st.innerHTML = 'Share <b>1/' + p[1] + '</b> of the whole equally into <b>' + p[2] + '</b> parts. How big is each part?'; pic.innerHTML = FIG.area({ a: 1, b: p[1], c: 0, d: 1, label: '1/' + p[1] + ' of a square shaded' }).svg; }
    }
    $('[data-a=show]', host).onclick = function () {
      var p = cfg.problems[pi], q;
      if (p[0] === 'w') { pic.innerHTML = FIG.strip({ parts: p[2], shaded: p[1] * p[2], wholes: p[1] }).svg; st.innerHTML = 'Each whole has <b>' + p[2] + '</b> pieces of size 1/' + p[2] + '. ' + p[1] + ' wholes have ' + p[1] + ' × ' + p[2] + ' pieces.'; q = { q: p[1] + ' ÷ 1/' + p[2] + ' = ?', answer: p[1] * p[2], why: p[1] + ' × ' + p[2] + ' = ' + (p[1] * p[2]) + '. There are ' + (p[1] * p[2]) + ' pieces of 1/' + p[2] + ' in ' + p[1] + '.' }; }
      else { pic.innerHTML = FIG.area({ a: 1, b: p[1], c: 1, d: p[2], label: '1/' + p[1] + ' split into ' + p[2] + ' parts' }).svg; st.innerHTML = 'The 1/' + p[1] + ' column is split into ' + p[2] + ' parts. One part (green) is 1 of ' + (p[1] * p[2]) + ' equal parts in the whole.'; q = { q: '1/' + p[1] + ' ÷ ' + p[2] + ' = ?', answer: '1/' + (p[1] * p[2]), why: '1/' + p[1] + ' ÷ ' + p[2] + ' = 1/' + (p[1] * p[2]) + '. Each part is smaller than 1/' + p[1] + '.' }; }
      var a = $('.after', host); if (!a.childElementCount) practiceSet(a, [q], key + ':fdiv' + pi, pi === cfg.problems.length - 1 ? done : null);
    };
    $('[data-a=next]', host).onclick = function () { pi = (pi + 1) % cfg.problems.length; load(); };
    load();
  };

  /* Embed lab — links to a bigger lab page on this site. cfg: {href, title, text} */
  LABS.link = function (host, cfg) {
    host.innerHTML = '<div class="lab"><p class="steps">' + (cfg.intro || '') + '</p><a class="btn gold" style="display:inline-block;text-decoration:none" href="' + cfg.href + '">' + (cfg.btn || 'Open the lab') + ' →</a></div>';
  };

  /* ======================================================================
     PAGE
     ====================================================================== */
  function render(root, U, L) {
    var key = U.id + '-' + L.n;
    var idx = U.lessons.indexOf(L), prev = U.lessons[idx - 1], next = U.lessons[idx + 1];
    var subj = U.subject === 'math' ? 'Math' : 'Science';
    document.title = L.title + ' — ' + subj + ' ' + U.short + ' — Mrs. Tesnar\'s 5th Grade';
    var secs = [['goals', 'Goals'], ['outline', 'Outline']];
    if (L.notes) secs.push(['notes', 'Notes']);
    if (L.practice) secs.push(['practice', 'Practice']);
    if (L.lab) secs.push(['lab', 'Lab']);
    if (L.exit) secs.push(['exit', 'Exit ticket']);
    var doneMap = store.get(key + ':done', {});
    root.innerHTML = '<div class="ls">' +
      '<nav class="ls-crumb" aria-label="Breadcrumb"><a href="' + U.home + '">← ' + subj + ' units</a><a href="' + U.unitHref + '">' + esc(U.short) + ': ' + esc(U.title) + '</a></nav>' +
      '<header class="ls-hdr"><span class="ls-eyebrow">' + subj + ' · ' + esc(U.short) + ' · ' + (U.word || 'Lesson') + ' ' + L.n + ' of ' + U.lessons.length + '</span><h1>' + L.title + '</h1><p class="ls-goal">' + (L.goal || '') + '</p>' +
      '<div class="ls-meta">' + (L.stds || []).map(function (s) { return s[0]; }).join(' · ') + (L.when ? ' &nbsp;|&nbsp; ' + L.when : '') + '</div></header>' +
      '<nav class="ls-jump" aria-label="Lesson sections">' + secs.map(function (s, k) { return '<a href="#' + s[0] + '" data-s="' + s[0] + '" class="' + (doneMap[s[0]] ? 'done' : '') + '"><span class="dot"></span>' + (k + 1) + '. ' + s[1] + '</a>'; }).join('') + '</nav><div class="body"></div>' +
      '<nav class="ls-pager" aria-label="Other lessons">' + (prev ? '<a href="' + pageHref(U, prev) + '"><small>← Previous</small><b>' + prev.title + '</b></a>' : '<span></span>') + (next ? '<a class="nx" href="' + pageHref(U, next) + '"><small>Next →</small><b>' + next.title + '</b></a>' : '<a class="nx" href="' + U.unitHref + '"><small>Done →</small><b>Back to the unit</b></a>') + '</nav></div>';
    var body = $('.body', root);
    function mark(s) { doneMap[s] = 1; store.set(key + ':done', doneMap); var a = $('.ls-jump a[data-s="' + s + '"]', root); if (a) a.classList.add('done'); }
    function sec(id, n, title, lead) { var s = el('<section class="ls-sec" id="' + id + '"><h2><span class="num">' + n + '</span>' + title + '</h2>' + (lead ? '<p class="ls-lead">' + lead + '</p>' : '') + '</section>'); body.appendChild(s); return s; }
    var n = 0;
    // 1 Goals
    var g = sec('goals', ++n, 'Today’s Goals');
    g.appendChild(el('<div class="ls-goals"><div class="ls-box"><h3>I can…</h3><ul class="ls-ican">' + (L.targets || []).map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>' +
      '<div class="ls-box"><h3>NC Standards</h3>' + (L.stds || []).map(function (s) { return '<div class="ls-std"><b>' + s[0] + '</b>' + s[1] + '</div>'; }).join('') + '</div></div>'));
    if (L.vocab && L.vocab.length) g.appendChild(el('<div><h3>Words to know</h3><div class="ls-chips">' + L.vocab.map(function (v) { return '<span class="ls-chip" title="' + esc(v[1]) + '">' + v[0] + '</span>'; }).join('') + '</div></div>'));
    if (L.phenom) g.appendChild(el('<div class="nb nb-tip" style="margin-top:16px"><b>Our puzzle:</b> ' + L.phenom + '</div>'));
    // 2 Outline + materials
    var o = sec('outline', ++n, 'Lesson Outline', 'Here is our plan for today.');
    o.appendChild(el('<ol class="ls-outline">' + (L.outline || []).map(function (p) { return '<li><div class="part">' + p[0] + (p[1] ? '<span class="min">' + p[1] + ' min</span>' : '') + '</div><div class="what">' + p[2] + '</div></li>'; }).join('') + '</ol>'));
    if (L.materials && L.materials.length) o.appendChild(el('<div><h3>Materials</h3><ul class="ls-mat">' + L.materials.map(function (m) { var t = typeof m === 'string' ? { t: m } : m; return '<li>' + (t.href ? '<a href="' + t.href + '" target="_blank" rel="noopener">' + t.t + '</a>' : t.t) + (t.note ? '<span class="note">' + t.note + '</span>' : '') + '</li>'; }).join('') + '</ul></div>'));
    // 3 Notes
    if (L.notes) {
      var nt = sec('notes', ++n, 'Interactive Notes', 'Read, tap, and fill in. Your notes save on this device.');
      L.notes.forEach(function (b, k) { nt.appendChild(notesBlock(b, key, k)); });
      nt.appendChild(el('<div class="btnrow"></div>')).appendChild(el('<button class="btn small ghost" type="button">I finished my notes ✓</button>')).onclick = function (e) { mark('notes'); e.target.textContent = 'Notes done ✓'; e.target.disabled = true; };
    }
    // 4 Practice
    if (L.practice) { var pr = sec('practice', ++n, 'Practice', 'Check each problem. If you miss one, you get a hint and another try.'); var ph = el('<div></div>'); pr.appendChild(ph); practiceSet(ph, L.practice, key + ':practice', function () { mark('practice'); }); }
    // 5 Lab
    if (L.lab) { var lb = sec('lab', ++n, L.lab.title || 'Lab', L.lab.lead || ''); var lh = el('<div></div>'); lb.appendChild(lh); L.lab.key = key + ':lab'; LABS[L.lab.type](lh, L.lab, function () { mark('lab'); }, key + ':lab'); }
    // 6 Exit ticket
    if (L.exit) { var ex = sec('exit', ++n, 'Exit Ticket', 'Show what you learned today. Answer every question, then check. Your score shows at the end.'); var eh = el('<div></div>'); ex.appendChild(eh); exitTicket(eh, L.exit, key + ':exit', function () { mark('exit'); }); var last = store.get(key + ':exit', null); if (last) ex.insertBefore(el('<p class="ls-lead" style="margin-top:-8px">Last time on this device: <b>' + last.right + ' of ' + last.of + '</b>.</p>'), eh); }
    if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(function () { t.scrollIntoView(); }, 0); }
  }
  function pageHref(U, L) { return 'lesson-' + L.n + '.html'; }

  /* Self-test: every question must have a valid answer. Problems show in the console. */
  function selfTest(U) {
    var bad = [];
    U.lessons.forEach(function (L) {
      ['practice', 'exit'].forEach(function (part) {
        (L[part] || []).forEach(function (q, i) {
          var where = U.id + ' lesson ' + L.n + ' ' + part + ' #' + (i + 1);
          if (q.choices) { var a = q.type === 'multi' ? q.answer : [q.answer]; if (!a.every(function (k) { return k >= 0 && k < q.choices.length; })) bad.push(where + ': answer index'); }
          else if (q.bins) { if (!q.items.every(function (it) { return it[1] >= 0 && it[1] < q.bins.length; })) bad.push(where + ': sort bin'); }
          else if (q.accept) { if (!q.accept.length) bad.push(where + ': no accepted words'); }
          else { var list = Array.isArray(q.answer) && Array.isArray(q.answer[0]) ? q.answer : [q.answer]; if (!list.every(function (x) { return toFr(x); })) bad.push(where + ': number answer'); }
        });
      });
      if (L.lab && L.lab.type === 'graph') { var c = L.lab, n = c.mode === 'lineplot' ? c.max - c.min + 1 : (c.cats || c.xs).length; if (c.vals.length !== n) bad.push(U.id + ' lesson ' + L.n + ' lab: vals length'); }
      if (L.lab && !LABS[L.lab.type]) bad.push(U.id + ' lesson ' + L.n + ' lab type ' + L.lab.type);
    });
    if (bad.length) console.warn('Lesson self-test found problems:\n' + bad.join('\n'));
    return bad;
  }

  /* Lesson list for a unit page: <div data-lesson-list="math-u0" data-base="unit0/"></div> */
  function lessonList(host) {
    var U = UNITS[host.dataset.lessonList]; if (!U) return;
    var base = host.dataset.base || '';
    var groups = {}; var order = [];
    U.lessons.forEach(function (L) { var gname = L.section || ''; if (!groups[gname]) { groups[gname] = []; order.push(gname); } groups[gname].push(L); });
    host.innerHTML = order.map(function (gname) {
      return (gname ? '<div class="ll-sub">' + gname + '</div>' : '') + '<div class="ll-list">' + groups[gname].map(function (L) {
        var ex = store.get(U.id + '-' + L.n + ':exit:exit', null) || store.get(U.id + '-' + L.n + ':exit', null);
        return '<a class="ll-item" href="' + base + 'lesson-' + L.n + '.html"><span class="n">' + L.n + '</span><span><span class="t">' + L.title + '</span><span class="g" style="display:block">' + (L.goal || '') + '</span></span><span class="s' + (ex ? ' done' : '') + '">' + (ex ? 'Exit ticket ' + ex.right + '/' + ex.of : (L.when || '')) + '</span></a>';
      }).join('') + '</div>';
    }).join('');
  }

  window.LessonKit = {
    unit: function (U) { UNITS[U.id] = U; selfTest(U); },
    boot: function () {
      var root = document.getElementById('lesson');
      if (root) {
        var U = UNITS[root.dataset.unit], nn = +root.dataset.n;
        var L = U && U.lessons.filter(function (x) { return x.n === nn; })[0];
        if (!L) { root.innerHTML = '<div class="ls"><p>This lesson is not ready yet.</p></div>'; return; }
        render(root, U, L);
      }
      $$('[data-lesson-list]').forEach(lessonList);
    },
    selfTest: function () { var all = []; Object.keys(UNITS).forEach(function (k) { all = all.concat(selfTest(UNITS[k])); }); return all; },
    _parse: parseNum, _fig: FIG
  };
})();
