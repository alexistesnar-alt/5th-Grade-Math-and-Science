/* ==========================================================================
   practice.js — engine for the 5th grade extra-practice pages.
   A page loads this file, then calls Practice.init({...}) with its content.

   Item types
     num    : one or more answer boxes (accepts 3/4 = 0.75 = 6/8, "2 1/3")
     mc     : choose one          multi : select all that apply
     error  : tap the step with the mistake, then type the correct answer
     open   : explain your thinking (model answer shown after)
     plot   : tap to plot points on a coordinate grid
   Every answer is exact (fractions with gcd; decimals as whole thousandths).
   A hidden self-test runs on load: window.PracticeSelfTest = {ok, fails}.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* exact arithmetic                                                     */
  /* ------------------------------------------------------------------ */
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function Fr(n, d) {
    if (d === undefined) d = 1;
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d) || d === 0) throw new Error('Bad fraction ' + n + '/' + d);
    if (d < 0) { n = -n; d = -d; }
    var g = gcd(n, d); this.n = n / g; this.d = d / g;
  }
  function F(n, d) {
    if (n instanceof Fr) return n;
    if (typeof n === 'string') { var p = parseNum(n); if (!p) throw new Error('Cannot read number "' + n + '"'); return p; }
    return new Fr(n, d);
  }
  Fr.prototype = {
    add: function (o) { o = F(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); },
    sub: function (o) { o = F(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); },
    mul: function (o) { o = F(o); return new Fr(this.n * o.n, this.d * o.d); },
    div: function (o) { o = F(o); if (o.n === 0) throw new Error('Divide by 0'); return new Fr(this.n * o.d, this.d * o.n); },
    eq: function (o) { o = F(o); return this.n === o.n && this.d === o.d; },
    cmp: function (o) { o = F(o); return Math.sign(this.n * o.d - o.n * this.d); },
    isInt: function () { return this.d === 1; },
    floor: function () { return Math.floor(this.n / this.d); },
    toString: function () { return this.d === 1 ? String(this.n) : this.n + '/' + this.d; },
    mixed: function () {
      if (this.d === 1 || Math.abs(this.n) < this.d) return this.toString();
      var w = Math.trunc(this.n / this.d), r = Math.abs(this.n % this.d);
      return w + ' ' + r + '/' + this.d;
    },
    dec: function () {                       // exact decimal string, or null if it does not end
      for (var k = 0, p = 1; k <= 9; k++, p *= 10) {
        if (p % this.d === 0) {
          var v = Math.abs(this.n * (p / this.d)), s = String(v);
          if (k) { while (s.length <= k) s = '0' + s; s = s.slice(0, s.length - k) + '.' + s.slice(s.length - k); }
          return (this.n < 0 ? '-' : '') + s;
        }
      }
      return null;
    },
    num: function () { return this.n / this.d; },   // drawing only, never for checking
    html: function () { return frHtml(this); }
  };

  /* decimals as whole numbers of thousandths */
  var Dec = {
    of: function (s) {
      var m = String(s).match(/^(\d*)\.?(\d*)$/);
      if (!m || m[2].length > 3 || (m[1] + m[2]) === '') throw new Error('Bad decimal ' + s);
      return parseInt(m[1] || '0', 10) * 1000 + parseInt((m[2] + '000').slice(0, 3), 10);
    },
    add: function (a, b) { return a + b; },
    sub: function (a, b) { return a - b; },
    mul: function (a, b) { var p = a * b; if (p % 1000) throw new Error('Product is not in thousandths'); return p / 1000; },
    mulInt: function (a, k) { return a * k; },
    div: function (a, b) { var p = a * 1000; if (p % b) throw new Error('Quotient is not in thousandths'); return p / b; },
    F: function (t) { return new Fr(t, 1000); },
    str: function (t) { return new Fr(t, 1000).dec(); }
  };

  /* reading what a student typed */
  function parseNum(raw) {
    var s = String(raw == null ? '' : raw).toLowerCase().replace(/[−–]/g, '-').replace(/,/g, '').trim();
    s = s.replace(/^[^\d.]+/, '');                    // "$4", "x = 5", "about 12"
    s = s.replace(/[^\d]+$/, '');                     // "12 cubic cm", "3 ft.", "5 in³"
    s = s.replace(/\s*\/\s*/g, '/').replace(/\s+/g, ' ').trim();
    if (!s) return null;
    var m = s.match(/^(\d+) (\d+)\/(\d+)$/);         // mixed number "2 1/3"
    if (m) { var d = +m[3]; if (!d) return null; return new Fr(+m[1] * d + +m[2], d); }
    var t = s.replace(/ /g, '');                       // "1 250" -> 1250
    m = t.match(/^(\d+)\/(\d+)$/);
    if (m) { if (!+m[2]) return null; return new Fr(+m[1], +m[2]); }
    m = t.match(/^(\d*)\.?(\d*)$/);
    if (m && (m[1] + m[2]) !== '' && m[2].length <= 9) {
      return new Fr(parseInt((m[1] || '0') + m[2], 10), Math.pow(10, m[2].length));
    }
    return null;
  }

  /* evaluate "3 × (4 + 2)" exactly (for self-tests and computed options) */
  function evalExpr(src) {
    var s = String(src).replace(/[×·*]/g, '*').replace(/÷/g, '/').replace(/[−–]/g, '-').replace(/\s+/g, ''), i = 0;
    function num() { var m = s.slice(i).match(/^\d+(\.\d+)?/); if (!m) throw new Error('Bad expression: ' + src); i += m[0].length; return parseNum(m[0]); }
    function atom() { if (s[i] === '(') { i++; var v = expr(); if (s[i] !== ')') throw new Error('Missing ) in ' + src); i++; return v; } return num(); }
    function term() { var v = atom(); while (s[i] === '*' || s[i] === '/') { var op = s[i++], r = atom(); v = op === '*' ? v.mul(r) : v.div(r); } return v; }
    function expr() { var v = term(); while (s[i] === '+' || s[i] === '-') { var op = s[i++], r = term(); v = op === '+' ? v.add(r) : v.sub(r); } return v; }
    var v = expr(); if (i !== s.length) throw new Error('Bad expression: ' + src); return v;
  }

  /* ------------------------------------------------------------------ */
  /* small HTML helpers for content                                     */
  /* ------------------------------------------------------------------ */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fr(n, d) { return '<span class="fr" aria-label="' + n + ' over ' + d + '"><span>' + n + '</span><span>' + d + '</span></span>'; }
  function mx(w, n, d) { return '<span class="mx">' + w + '&#8239;' + fr(n, d) + '</span>'; }
  function frHtml(x) {
    x = F(x);
    if (x.d === 1) return '<span class="m">' + x.n + '</span>';
    if (x.n > x.d) return mx(Math.floor(x.n / x.d), x.n % x.d, x.d);
    return fr(x.n, x.d);
  }
  function m(s) { return '<span class="m">' + s + '</span>'; }

  /* ------------------------------------------------------------------ */
  /* SVG pictures                                                         */
  /* ------------------------------------------------------------------ */
  var INK = '#1E2D4F', TXT = '#1B2333', FONT = "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      MONO = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";
  var COL = {
    blue: { f: '#C9D6EC', t: '#E4EBF6', r: '#A9BBDD' },
    gold: { f: '#FFE082', t: '#FFF0B8', r: '#F2C94C' },
    green: { f: '#BFE3CB', t: '#DDF1E3', r: '#97CDA9' }
  };
  function n2(v) { return Math.round(v * 10) / 10; }
  function wrap(w, h, body, label, maxw, minx, miny) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + n2(minx || 0) + ' ' + n2(miny || 0) + ' ' + n2(w) + ' ' + n2(h) +
      '" role="img" aria-label="' + esc(label || 'diagram') + '" style="max-width:' + Math.round(maxw || w) + 'px">' + body + '</svg>';
  }
  function txt(x, y, t, o) {
    o = o || {};
    return '<text x="' + n2(x) + '" y="' + n2(y) + '" text-anchor="' + (o.a || 'middle') + '" font-size="' + (o.size || 15) +
      '" font-weight="' + (o.w || 500) + '" font-family="' + (o.mono ? MONO : FONT) + '" fill="' + (o.fill || TXT) + '"' +
      (o.base ? ' dominant-baseline="' + o.base + '"' : '') + '>' + esc(t) + '</text>';
  }
  function poly(pts, fill, stroke, sw) {
    return '<polygon points="' + pts.map(function (p) { return n2(p[0]) + ',' + n2(p[1]); }).join(' ') + '" fill="' + fill +
      '" stroke="' + (stroke || INK) + '" stroke-width="' + (sw || 1.4) + '" stroke-linejoin="round"/>';
  }
  function line(a, b, stroke, sw, extra) {
    return '<line x1="' + n2(a[0]) + '" y1="' + n2(a[1]) + '" x2="' + n2(b[0]) + '" y2="' + n2(b[1]) + '" stroke="' + (stroke || INK) +
      '" stroke-width="' + (sw || 1) + '"' + (extra || '') + '/>';
  }
  function rect(x, y, w, h, fill, stroke, sw) {
    return '<rect x="' + n2(x) + '" y="' + n2(y) + '" width="' + n2(w) + '" height="' + n2(h) + '" fill="' + fill + '" stroke="' + (stroke || INK) + '" stroke-width="' + (sw || 1.4) + '"/>';
  }

  /* 3-D boxes made of unit cubes. boxes: [{x,y,z,l,w,h,color,grid}] (y goes back, z goes up) */
  function solid(boxes, o) {
    o = o || {};
    var s = o.s || 30, kx = 0.5, ky = 0.33, out = [], xs = [], ys = [];
    function P(x, y, z) { var p = [x * s + y * s * kx, -z * s - y * s * ky]; xs.push(p[0]); ys.push(p[1]); return p; }
    boxes.slice().sort(function (a, b) { return (b.y - a.y) || (a.z - b.z) || (a.x - b.x); }).forEach(function (b) {
      var c = COL[b.color || 'blue'], x0 = b.x, y0 = b.y, z0 = b.z, x1 = x0 + b.l, y1 = y0 + b.w, z1 = z0 + b.h, gs = '#1E2D4F', i;
      out.push(poly([P(x0, y0, z0), P(x1, y0, z0), P(x1, y0, z1), P(x0, y0, z1)], c.f));
      out.push(poly([P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)], c.t));
      out.push(poly([P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)], c.r));
      if (b.grid !== false) {
        var g = [];
        for (i = 1; i < b.l; i++) { g.push(line(P(x0 + i, y0, z0), P(x0 + i, y0, z1), gs, 0.8)); g.push(line(P(x0 + i, y0, z1), P(x0 + i, y1, z1), gs, 0.8)); }
        for (i = 1; i < b.h; i++) { g.push(line(P(x0, y0, z0 + i), P(x1, y0, z0 + i), gs, 0.8)); g.push(line(P(x1, y0, z0 + i), P(x1, y1, z0 + i), gs, 0.8)); }
        for (i = 1; i < b.w; i++) { g.push(line(P(x0, y0 + i, z1), P(x1, y0 + i, z1), gs, 0.8)); g.push(line(P(x1, y0 + i, z0), P(x1, y0 + i, z1), gs, 0.8)); }
        out.push(g.join(''));
      }
    });
    (o.labels || []).forEach(function (L) {
      var p = P(L.p[0], L.p[1], L.p[2]), x = p[0] + (L.dx || 0), y = p[1] + (L.dy || 0), w = String(L.t).length * 8.4;
      xs.push(L.a === 'end' ? x - w : L.a === 'start' ? x + w : x - w / 2, L.a === 'end' ? x : L.a === 'start' ? x : x + w / 2); ys.push(y - 18, y + 6);
      out.push(txt(x, y, L.t, { a: L.a, w: 600 }));
    });
    var minx = Math.min.apply(null, xs) - 8, maxx = Math.max.apply(null, xs) + 8, miny = Math.min.apply(null, ys) - 8, maxy = Math.max.apply(null, ys) + 8;
    return wrap(maxx - minx, maxy - miny, out.join(''), o.label || 'solid figure made of cubes', o.maxw || (maxx - minx) * 1.25, minx, miny);
  }
  function cubes(list, color) { return list.map(function (c) { return { x: c[0], y: c[1], z: c[2], l: 1, w: 1, h: 1, color: color || 'blue', grid: false }; }); }
  function dims(b, l, w, h) {
    var a = [];
    if (l) a.push({ p: [b.x + b.l / 2, b.y, b.z], t: l, dy: 20 });
    if (h) a.push({ p: [b.x, b.y, b.z + b.h / 2], t: h, dx: -8, dy: 5, a: 'end' });
    if (w) a.push({ p: [b.x + b.l, b.y + b.w / 2, b.z], t: w, dx: 10, dy: 12, a: 'start' });
    return a;
  }

  /* tape diagram. rows: [{label, parts:[{t, w, fill}], brace:{from,to,t}}] (w in units) */
  function tape(rows, o) {
    o = o || {};
    var W = o.width || 560, lab = o.labelW === undefined ? (rows.some(function (r) { return r.label; }) ? 90 : 0) : o.labelW, maxU = 0, out = [], y = 10, rh = 44;
    rows.forEach(function (r) { var u = 0; r.parts.forEach(function (p) { u += p.w || 1; }); maxU = Math.max(maxU, u); });
    var sc = (W - lab - 10) / maxU;
    rows.forEach(function (r) {
      var x = lab;
      if (r.label) out.push(txt(lab - 10, y + rh / 2 + 5, r.label, { a: 'end', w: 600 }));
      r.parts.forEach(function (p) {
        var w = (p.w || 1) * sc;
        out.push(rect(x, y, w, rh, p.fill || '#FFFFFF'));
        if (p.t !== undefined && p.t !== '') out.push(txt(x + w / 2, y + rh / 2 + 5, p.t, { mono: true, w: 600, size: p.size || 15 }));
        x += w;
      });
      y += rh;
      if (r.brace) {
        var bx0 = lab + r.brace.from * sc, bx1 = lab + r.brace.to * sc, by = y + 8;
        out.push('<path d="M' + n2(bx0) + ' ' + n2(by - 4) + ' L' + n2(bx0) + ' ' + n2(by + 4) + ' L' + n2(bx1) + ' ' + n2(by + 4) + ' L' + n2(bx1) + ' ' + n2(by - 4) + ' M' + n2((bx0 + bx1) / 2) + ' ' + n2(by + 4) + ' L' + n2((bx0 + bx1) / 2) + ' ' + n2(by + 10) + '" fill="none" stroke="' + INK + '" stroke-width="1.5"/>');
        out.push(txt((bx0 + bx1) / 2, by + 28, r.brace.t, { mono: true, w: 600 }));
        y += 40;
      }
      y += 14;
    });
    return wrap(W, y, out.join(''), o.label || 'tape diagram', o.maxw || W);
  }

  /* fraction area diagram on a 1 by 1 square: cols x rows, shade sc columns (blue) and sr rows (gold) */
  function areaFrac(cols, rows, sc, sr, o) {
    o = o || {};
    var S = 240, L = 44, T = 34, out = [], i, j;
    for (i = 0; i < cols; i++) for (j = 0; j < rows; j++) {
      var inC = i < sc, inR = j < sr, fill = inC && inR ? '#7F9FD6' : inC ? '#D8E2F3' : inR ? '#FFE9A6' : '#FFFFFF';
      out.push(rect(L + i * S / cols, T + j * S / rows, S / cols, S / rows, fill, INK, 1));
    }
    out.push(rect(L, T, S, S, 'none', INK, 2.4));
    if (o.top) out.push(txt(L + (S * sc / cols) / 2, T - 10, o.top, { mono: true, w: 600 }));
    if (o.left) out.push(txt(L - 8, T + (S * sr / rows) / 2 + 5, o.left, { mono: true, w: 600, a: 'end' }));
    out.push(txt(L + S / 2, T + S + 22, o.bottom || '1', { mono: true, w: 600 }));
    return wrap(L + S + 16, T + S + 32, out.join(''), o.label || 'area diagram', o.maxw || 300);
  }

  /* rectangle split into partial products. cols/rows: [{w|h, t}], cells[r][c] text */
  function areaRect(cols, rows, cells, o) {
    o = o || {};
    var L = o.left === undefined ? 56 : o.left, T = 30, out = [], x, y = T, W = 0, H = 0;
    cols.forEach(function (c) { W += c.w; }); rows.forEach(function (r) { H += r.h; });
    rows.forEach(function (r, ri) {
      x = L;
      out.push(txt(L - 8, y + r.h / 2 + 5, r.t, { mono: true, w: 600, a: 'end' }));
      cols.forEach(function (c, ci) {
        var cell = cells[ri][ci], hi = cell === '?';
        out.push(rect(x, y, c.w, r.h, hi ? '#FFE9A6' : (o.fills ? o.fills[ri][ci] : '#F2F5FB'), INK, 1.4));
        out.push(txt(x + c.w / 2, y + r.h / 2 + 5, cell, { mono: true, w: 600, size: o.size || 15 }));
        if (ri === 0) out.push(txt(x + c.w / 2, T - 10, c.t, { mono: true, w: 600 }));
        x += c.w;
      });
      y += r.h;
    });
    return wrap(L + W + 12, T + H + 10, out.join(''), o.label || 'area diagram', o.maxw || (L + W + 12));
  }

  /* number line from a to b (Fr), ticks every 1/den; points [{v,t}], jumps {from,size,count} */
  function numberLine(o) {
    var a = F(o.min), b = F(o.max), den = o.den || 1, W = o.width || 560, pad = 30, Lw = W - 2 * pad, y = o.jumps ? 70 : 40, out = [];
    function X(v) { return pad + F(v).sub(a).div(b.sub(a)).num() * Lw; }
    out.push(line([pad - 10, y], [W - pad + 10, y], INK, 2));
    var steps = b.sub(a).mul(den);
    for (var k = 0; k <= steps.n; k++) {
      var v = a.add(new Fr(k, den)), whole = v.isInt();
      out.push(line([X(v), y - (whole ? 11 : 7)], [X(v), y + (whole ? 11 : 7)], INK, whole ? 2 : 1.3));
      if (whole) out.push(txt(X(v), y + 30, String(v.n), { mono: true, w: 600 }));
      else if (o.labelAll) out.push(txt(X(v), y + 28, (o.labelFn ? o.labelFn(v) : (v.mul(den).n + '/' + den)), { mono: true, size: 12 }));
    }
    if (o.jumps) {
      var j = o.jumps, start = F(j.from);
      for (var q = 0; q < j.count; q++) {
        var x0 = X(start.add(F(j.size).mul(q))), x1 = X(start.add(F(j.size).mul(q + 1)));
        out.push('<path d="M' + n2(x0) + ' ' + (y - 4) + ' Q ' + n2((x0 + x1) / 2) + ' ' + (y - 46) + ' ' + n2(x1) + ' ' + (y - 4) + '" fill="none" stroke="#B88A00" stroke-width="2"/>');
      }
    }
    (o.points || []).forEach(function (p) {
      out.push('<circle cx="' + n2(X(p.v)) + '" cy="' + y + '" r="6" fill="#E0A800" stroke="' + INK + '" stroke-width="1.5"/>');
      if (p.t) out.push(txt(X(p.v), y - 16, p.t, { w: 700 }));
    });
    return wrap(W, y + 44, out.join(''), o.label || 'number line', o.maxw || W);
  }

  /* 10 by 10 grid. shade: first `cols` columns blue, first `rows` rows gold (overlap dark), or `count` cells */
  function hundredGrid(o) {
    o = o || {};
    var S = 220, c = S / 10, out = [], k = 0;
    for (var i = 0; i < 10; i++) for (var j = 0; j < 10; j++) {
      var inC = o.cols && i < o.cols, inR = o.rows && j < o.rows, inN = o.count && (i * 10 + j) < o.count;
      var fill = (inC && inR) ? '#7F9FD6' : inC ? '#D8E2F3' : inR ? '#FFE9A6' : inN ? '#C9D6EC' : '#FFFFFF';
      out.push(rect(6 + i * c, 6 + j * c, c, c, fill, '#8A94A6', 0.7)); k++;
    }
    out.push(rect(6, 6, S, S, 'none', INK, 2.2));
    return wrap(S + 12, S + 12, out.join(''), o.label || 'hundredths grid', o.maxw || 240);
  }

  /* base-ten diagram: ones (big squares), tenths (rods), hundredths (small squares) */
  function baseTen(ones, tenths, hundredths, o) {
    o = o || {};
    var u = 7, out = [], x = 6, i, j;
    for (i = 0; i < ones; i++) {
      out.push(rect(x, 6, 10 * u, 10 * u, '#C9D6EC', INK, 1.6));
      for (j = 1; j < 10; j++) { out.push(line([x + j * u, 6], [x + j * u, 6 + 10 * u], '#8A94A6', 0.6)); out.push(line([x, 6 + j * u], [x + 10 * u, 6 + j * u], '#8A94A6', 0.6)); }
      x += 10 * u + 10;
    }
    for (i = 0; i < tenths; i++) {
      out.push(rect(x, 6, u, 10 * u, '#FFE082', INK, 1.4));
      for (j = 1; j < 10; j++) out.push(line([x, 6 + j * u], [x + u, 6 + j * u], '#8A6100', 0.6));
      x += u + 6;
    }
    x += 6;
    for (i = 0; i < hundredths; i++) {
      var col = Math.floor(i / 5), row = i % 5;
      out.push(rect(x + col * (u + 5), 6 + 10 * u - (row + 1) * (u + 5) + 5, u, u, '#BFE3CB', INK, 1.2));
    }
    x += Math.ceil(hundredths / 5) * (u + 5);
    return wrap(x + 6, 10 * u + 12, out.join(''), o.label || 'base-ten diagram', o.maxw || (x + 6) * 1.3);
  }

  /* coordinate grid (first quadrant) */
  function gridGeom(max, size) { var m = 36, T = 28, S = size || 340; return { m: m, T: T, S: S, max: max, X: function (x) { return m + x * S / max; }, Y: function (y) { return T + (max - y) * S / max; } }; }
  function coordGrid(o) {
    var g = gridGeom(o.max || 10, o.size), out = [], i, every = o.every || 1;
    for (i = 0; i <= g.max; i++) {
      out.push(line([g.X(i), g.Y(0)], [g.X(i), g.Y(g.max)], '#C9CED8', 1));
      out.push(line([g.X(0), g.Y(i)], [g.X(g.max), g.Y(i)], '#C9CED8', 1));
      if (i % every === 0) {
        out.push(txt(g.X(i), g.Y(0) + 20, String(i), { mono: true, size: 13 }));
        if (i) out.push(txt(g.X(0) - 8, g.Y(i) + 4, String(i), { mono: true, size: 13, a: 'end' }));
      }
    }
    out.push(line([g.X(0), g.Y(0)], [g.X(g.max) + 8, g.Y(0)], INK, 2));
    out.push(line([g.X(0), g.Y(0)], [g.X(0), g.Y(g.max) - 8], INK, 2));
    out.push(txt(g.X(g.max) + 12, g.Y(0) + 5, o.xLabel || 'x', { a: 'start', w: 700 }));
    out.push(txt(g.X(0), g.Y(g.max) - 12, o.yLabel || 'y', { w: 700 }));
    (o.segments || []).forEach(function (sgm) { out.push(line([g.X(sgm[0][0]), g.Y(sgm[0][1])], [g.X(sgm[1][0]), g.Y(sgm[1][1])], '#B88A00', 2.5)); });
    (o.points || []).forEach(function (p) {
      out.push('<circle cx="' + n2(g.X(p.x)) + '" cy="' + n2(g.Y(p.y)) + '" r="6.5" fill="' + (p.fill || '#E0A800') + '" stroke="' + INK + '" stroke-width="1.6"/>');
      if (p.t) out.push(txt(g.X(p.x) + 10, g.Y(p.y) - 9, p.t, { a: 'start', w: 700 }));
    });
    var W = g.m + g.S + 30, H = g.T + g.S + 34;
    return wrap(W, H, '<g class="grid-base">' + out.join('') + '</g><g class="grid-pts"></g>', o.label || 'coordinate grid', o.maxw || 420);
  }

  /* line plot with fractions: data is a list of Fr; ticks every 1/den from min to max */
  function linePlot(o) {
    var a = F(o.min), b = F(o.max), den = o.den, W = o.width || 560, pad = 36, Lw = W - 2 * pad, out = [], counts = {}, top = 0;
    o.data.forEach(function (v) { var k = F(v).toString(); counts[k] = (counts[k] || 0) + 1; top = Math.max(top, counts[k]); });
    var y = 30 + top * 20;
    function X(v) { return pad + F(v).sub(a).div(b.sub(a)).num() * Lw; }
    out.push(line([pad - 12, y], [W - pad + 12, y], INK, 2));
    var steps = b.sub(a).mul(den).n;
    for (var k = 0; k <= steps; k++) {
      var v = a.add(new Fr(k, den));
      out.push(line([X(v), y - 7], [X(v), y + 7], INK, 1.5));
      out.push(txt(X(v), y + 26, v.isInt() ? String(v.n) : (v.n > v.d ? Math.floor(v.n / v.d) + ' ' + (v.n % v.d) + '/' + v.d : v.n + '/' + v.d), { mono: true, size: 12.5 }));
      var c = counts[v.toString()] || 0;
      for (var q = 0; q < c; q++) out.push(txt(X(v), y - 12 - q * 20, 'X', { w: 700, size: 17, fill: '#1E2D4F' }));
    }
    if (o.title) out.push(txt(W / 2, y + 50, o.title, { w: 600, size: 14 }));
    return wrap(W, y + (o.title ? 60 : 36), out.join(''), o.label || 'line plot', o.maxw || W);
  }

  /* row of shapes: [{pts:[[x,y]...], name}] each in a 100 by 100 box */
  function shapes(list, o) {
    o = o || {};
    var out = [], cw = 130;
    list.forEach(function (s, i) {
      var ox = 10 + i * cw;
      out.push(poly(s.pts.map(function (p) { return [ox + p[0], 10 + p[1]]; }), s.fill || '#E4EBF6', INK, 2));
      (s.ticks || []).forEach(function (t) { out.push(line([ox + t[0], 10 + t[1]], [ox + t[2], 10 + t[3]], INK, 2)); });
      (s.right || []).forEach(function (r) { out.push('<path d="M' + n2(ox + r[0]) + ' ' + n2(10 + r[1]) + ' l' + r[2] + ' 0 l0 ' + r[3] + '" fill="none" stroke="' + INK + '" stroke-width="1.4"/>'); });
      if (s.name) out.push(txt(ox + 50, 132, s.name, { w: 600, size: 14 }));
    });
    return wrap(10 + list.length * cw, 142, out.join(''), o.label || 'shapes', o.maxw || (10 + list.length * cw));
  }

  /* fraction bars: [{parts, fills:{index:color}, label}] */
  function bars(list, o) {
    o = o || {};
    var W = o.width || 420, lab = o.labelW || 0, h = 40, out = [], y = 6;
    list.forEach(function (b) {
      var w = (W - lab - 8) / b.parts;
      if (b.label) out.push(txt(lab - 8, y + h / 2 + 5, b.label, { a: 'end', w: 600 }));
      for (var i = 0; i < b.parts; i++) {
        out.push(rect(lab + i * w, y, w, h, (b.fills && b.fills[i]) || '#FFFFFF', INK, 1.4));
        if (b.texts && b.texts[i]) out.push(txt(lab + i * w + w / 2, y + h / 2 + 5, b.texts[i], { w: 700, size: 14 }));
      }
      y += h + 12;
    });
    return wrap(W, y, out.join(''), o.label || 'fraction bars', o.maxw || W);
  }

  /* ------------------------------------------------------------------ */
  /* storage                                                              */
  /* ------------------------------------------------------------------ */
  var KEY, state;
  function load() { try { var s = localStorage.getItem(KEY); if (s) { var o = JSON.parse(s); if (o && o.items) return o; } } catch (e) { /* private mode */ } return null; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage blocked */ } }

  /* ------------------------------------------------------------------ */
  /* checking                                                             */
  /* ------------------------------------------------------------------ */
  var TYPE_LABEL = { num: 'Type your answer', mc: 'Choose one', multi: 'Select all that apply', error: 'Find the error', open: 'Explain your thinking', plot: 'Plot points' };
  var PRAISE = ['Yes!', 'That\'s right!', 'Nice work!', 'You got it!', 'Correct!'];

  function blanksOf(p) {
    if (p.type === 'num') return p.blanks || [{ label: p.label || '', ans: p.ans, expect: p.expect, wrong: p.wrong, unit: p.unit }];
    if (p.type === 'error') return [{ label: p.fixLabel || 'Correct answer', ans: p.ans, expect: p.expect, wrong: p.wrong, unit: p.unit }];
    return [];
  }
  /* returns {ok, msg} for one answer box */
  function checkBlank(b, raw) {
    if (String(raw || '').trim() === '') return { ok: false, empty: true, msg: 'Type an answer in the box' + (b.label ? ' for <b>' + esc(b.label) + '</b>' : '') + '.' };
    var v = parseNum(raw);
    if (!v) return { ok: false, msg: 'I could not read that number. Try a form like <span class="m">12</span>, <span class="m">0.75</span>, <span class="m">3/4</span>, or <span class="m">2 1/3</span>.' };
    var ans = F(b.ans);
    if (v.eq(ans)) return { ok: true };
    var list = b.wrong || [];
    for (var i = 0; i < list.length; i++) if (v.eq(F(list[i][0]))) return { ok: false, msg: list[i][1], known: true };
    if (!ans.isInt() || !v.isInt()) {
      var shifts = [10, 100, 1000];
      for (var k = 0; k < shifts.length; k++) if (v.eq(ans.mul(shifts[k])) || v.eq(ans.div(shifts[k])))
        return { ok: false, msg: 'Your digits look right, but the place value is off. Check where the decimal point goes.' };
    }
    if (v.cmp(ans) > 0 && b.hiMsg) return { ok: false, msg: b.hiMsg };
    if (v.cmp(ans) < 0 && b.loMsg) return { ok: false, msg: b.loMsg };
    return { ok: false, msg: b.other || 'Not yet. Check each step of your work, or tap <b>Hint</b>.' };
  }

  function mcAnswer(p) {
    if (p.answer !== undefined) return p.answer;
    var hits = []; p.options.forEach(function (o, i) { if (o.v !== undefined && F(o.v).eq(F(p.ans))) hits.push(i); });
    return hits.length === 1 ? hits[0] : -1;
  }
  function isOk(o) { return typeof o.ok === 'function' ? !!o.ok() : !!o.ok; }

  function evaluate(p, v) {
    var i, r;
    switch (p.type) {
      case 'num': {
        var bl = blanksOf(p), bad = [], first = null;
        for (i = 0; i < bl.length; i++) {
          r = checkBlank(bl[i], (v || [])[i]);
          if (!r.ok) { bad.push(i); if (!first) first = (bl.length > 1 && bl[i].label ? '<b>' + esc(bl[i].label) + ':</b> ' : '') + r.msg; }
        }
        return { ok: !bad.length, bad: bad, msg: first };
      }
      case 'mc': {
        if (v === undefined || v === null) return { ok: false, empty: true, msg: 'Tap an answer first.' };
        var a = mcAnswer(p);
        if (v === a) return { ok: true };
        return { ok: false, badOpt: [v], msg: p.options[v].why || 'Not quite. Read each choice again.' };
      }
      case 'multi': {
        v = v || [];
        if (!v.length) return { ok: false, empty: true, msg: 'Tap every answer that works. There may be more than one.' };
        var extra = v.filter(function (k) { return !isOk(p.options[k]); });
        var missed = p.options.map(function (o, k) { return k; }).filter(function (k) { return isOk(p.options[k]) && v.indexOf(k) < 0; });
        if (extra.length) {
          var o = p.options[extra[0]];
          return { ok: false, badOpt: extra, msg: 'Choice <b>' + 'ABCDEFGH'[extra[0]] + '</b> does not work. ' + (o.why || 'Check it again.') };
        }
        if (missed.length) return { ok: false, msg: 'Everything you picked works, but you missed ' + (missed.length === 1 ? 'one more answer' : missed.length + ' more answers') + '. Look again.' };
        return { ok: true };
      }
      case 'error': {
        v = v || {};
        if (v.step === undefined || v.step === null) return { ok: false, empty: true, msg: 'Tap the step that has the mistake.' };
        if (v.step !== p.bad) return { ok: false, badStep: v.step, msg: (p.stepNotes && p.stepNotes[v.step]) || ('Step ' + (v.step + 1) + ' is correct. Look for a different step.') };
        r = checkBlank(blanksOf(p)[0], v.fix);
        if (!r.ok) return { ok: false, stepOk: true, bad: [0], msg: 'Good eye! You found the mistake. ' + (r.empty ? 'Now type the correct answer.' : 'Now fix it: ' + r.msg) };
        return { ok: true };
      }
      case 'open': {
        var t = String(v || '').trim(), words = t.split(/\s+/).filter(Boolean).length;
        if (words < 5) return { ok: false, empty: true, msg: 'Write at least one full sentence. Tell <b>what</b> you think and <b>why</b>.' };
        return { ok: true, open: true };
      }
      case 'plot': {
        v = v || [];
        var want = p.points;
        if (v.length < want.length) return { ok: false, empty: !v.length, msg: 'Plot ' + want.length + (want.length === 1 ? ' point' : ' points') + '. You have ' + v.length + ' so far.' };
        for (i = 0; i < want.length; i++) {
          var got = v[i], w = want[i], name = p.names ? 'Point ' + p.names[i] : 'Point ' + (i + 1);
          if (p.anyOrder) { if (v.some(function (g) { return g[0] === w[0] && g[1] === w[1]; })) continue; got = null; }
          if (got && got[0] === w[0] && got[1] === w[1]) continue;
          if (got && got[0] === w[1] && got[1] === w[0]) return { ok: false, msg: name + ': you switched the two numbers. The first number tells how far to go <b>across</b>. The second tells how far to go <b>up</b>.' };
          return { ok: false, msg: (p.anyOrder ? 'One of the points is missing or in the wrong place.' : name + ' is not in the right place.') + ' Start at (0, 0). Go across first, then up.' };
        }
        return { ok: true };
      }
    }
    return { ok: false, msg: 'Unknown item.' };
  }

  /* the inputs that make an item correct (used by the self-test and by page tests) */
  function keyFor(p) {
    switch (p.type) {
      case 'num': return { blanks: blanksOf(p).map(function (b) { return F(b.ans).mixed(); }) };
      case 'mc': return { opt: mcAnswer(p) };
      case 'multi': return { opts: p.options.map(function (o, i) { return i; }).filter(function (i) { return isOk(p.options[i]); }) };
      case 'error': return { step: p.bad, fix: F(p.ans).mixed() };
      case 'open': return { text: 'I think this because the model shows it and I checked my work.' };
      case 'plot': return { points: p.points.slice() };
    }
  }
  function valueFromKey(p, k) {
    if (p.type === 'num') return k.blanks;
    if (p.type === 'mc') return k.opt;
    if (p.type === 'multi') return k.opts;
    if (p.type === 'error') return { step: k.step, fix: k.fix };
    if (p.type === 'open') return k.text;
    if (p.type === 'plot') return k.points;
  }

  /* ------------------------------------------------------------------ */
  /* rendering                                                            */
  /* ------------------------------------------------------------------ */
  var CFG, ITEMS = [], app;
  function h(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }

  var ROUTINE_HOW = {
    'Notice and Wonder': 'Look closely. What do you notice? What do you wonder? Think on your own first.',
    'Which One Doesn\'t Belong?': 'Look at all four. Pick one that doesn\'t belong. Be ready to say why. There is more than one good answer!',
    'Estimation': 'Before you work it out, make an estimate. Think of a guess that is too low, one that is too high, and one that is about right.',
    'Number Talk': 'Find the value of each one in your head. No paper! Look for ways the problems help each other.',
    'True or False?': 'Decide if each one is true or false. Try to explain without finding every answer.'
  };

  function renderWarmup(w) {
    var c = h('section', 'pr-card wu'); c.id = 'warmup';
    c.innerHTML = '<div class="pr-kicker">Warm-up · ' + esc(w.routine) + '</div><h2>' + (w.title || 'Warm-up') + '</h2>' +
      '<p class="pr-how">' + (w.how || ROUTINE_HOW[w.routine] || '') + '</p>' + (w.prompt ? '<div class="wu-q">' + w.prompt + '</div>' : '');
    if (w.cells) {
      var g = h('div', 'wu-grid');
      w.cells.forEach(function (cell, i) { g.appendChild(h('div', 'wu-cell', '<b>' + 'ABCD'[i] + '</b>' + cell)); });
      c.appendChild(g);
    }
    if (w.list) { var ol = h('ol', 'wu-list'); w.list.forEach(function (t) { ol.appendChild(h('li', '', t)); }); c.appendChild(ol); }
    if (w.figure) c.appendChild(h('div', 'fig', w.figure));
    var ta = h('textarea', 'wu-note'); ta.placeholder = 'Write your ideas here (optional).'; ta.setAttribute('aria-label', 'Your warm-up ideas');
    ta.value = (state.wu && state.wu.note) || '';
    ta.addEventListener('input', function () { state.wu = state.wu || {}; state.wu.note = ta.value; save(); });
    c.appendChild(ta);
    var btn = h('button', 'btn gold', 'I thought about it. Show possible responses'); btn.type = 'button';
    var resp = h('div', 'wu-resp', '<h3>Possible responses</h3><ul>' + w.responses.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul>' + (w.after ? '<p style="margin:8px 0 0">' + w.after + '</p>' : ''));
    resp.hidden = true;
    function show() { resp.hidden = false; btn.hidden = true; }
    btn.addEventListener('click', function () { show(); state.wu = state.wu || {}; state.wu.shown = true; save(); });
    if (state.wu && state.wu.shown) show();
    c.appendChild(btn); c.appendChild(resp);
    return c;
  }

  function renderItem(p, label) {
    var st = state.items[p.id] || (state.items[p.id] = { st: 'new', tries: 0, hints: 0 });
    var c = h('section', 'pr-card prob'); c.id = p.id; c.setAttribute('data-type', p.type);
    var hd = h('div', 'prob-hd', '<span class="pnum">' + esc(label) + '</span><span class="ptype">' + TYPE_LABEL[p.type] + '</span><span class="pstat" aria-live="polite"></span>');
    c.appendChild(hd);
    c.appendChild(h('div', 'q', p.q));
    if (p.fig) c.appendChild(h('div', 'fig' + (p.figLeft ? ' left' : ''), p.fig));
    var area = h('div', 'ans-area'); c.appendChild(area);
    var ui = { el: c, p: p, st: st, inputs: [], optBtns: [], stepBtns: [], fb: null, val: st.val };

    if (p.type === 'num' || p.type === 'error') {
      if (p.type === 'error') {
        var ol = h('ol', 'steps');
        p.steps.forEach(function (s, i) {
          var li = h('li'), b = h('button', 'opt', '<span class="lt">Step ' + (i + 1) + '</span><span>' + s + '</span>');
          b.type = 'button'; b.setAttribute('aria-pressed', 'false');
          b.addEventListener('click', function () { if (ui.locked) return; ui.val = ui.val || {}; ui.val.step = i; syncSteps(ui); persist(ui); });
          li.appendChild(b); ol.appendChild(li); ui.stepBtns.push(b);
        });
        area.appendChild(h('p', 'fmt', 'First tap the step with the mistake. Then type the correct answer.'));
        area.appendChild(ol);
      }
      var bl = blanksOf(p), wrapB = h('div', 'blanks'), textKb = false;
      bl.forEach(function (b) { if (/\//.test(String(b.expect || ''))) textKb = true; });
      bl.forEach(function (b, i) {
        var d = h('div', 'blank'), id = p.id + '-b' + i;
        d.innerHTML = '<label for="' + id + '">' + (b.label || 'Answer') + '</label>';
        var inp = h('input'); inp.id = id; inp.type = 'text'; inp.autocomplete = 'off'; inp.spellcheck = false;
        inp.setAttribute('inputmode', textKb || p.kb === 'text' ? 'text' : 'decimal');
        inp.setAttribute('autocapitalize', 'off');
        var saved = p.type === 'error' ? (ui.val && ui.val.fix) : (ui.val && ui.val[i]);
        if (saved) inp.value = saved;
        inp.addEventListener('input', function () {
          if (p.type === 'error') { ui.val = ui.val || {}; ui.val.fix = inp.value; } else { ui.val = ui.val || []; ui.val[i] = inp.value; }
          d.classList.remove('bad'); persist(ui);
        });
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); doCheck(ui); } });
        d.appendChild(inp);
        if (b.unit) d.appendChild(h('span', 'unit', b.unit));
        wrapB.appendChild(d); ui.inputs.push(inp);
      });
      area.appendChild(wrapB);
      area.appendChild(h('p', 'fmt', textKb ? 'You can type a fraction like 3/4 or a mixed number like 2 1/3 (with a space).' : 'Type a number. Fractions like 3/4 also work.'));
    }
    if (p.type === 'mc' || p.type === 'multi') {
      var multi = p.type === 'multi', box = h('div', 'opts' + (multi ? ' multi' : '') + (p.two ? ' two' : ''));
      box.setAttribute('role', multi ? 'group' : 'radiogroup');
      p.options.forEach(function (o, i) {
        var b = h('button', 'opt', '<span class="lt">' + 'ABCDEFGH'[i] + '</span><span>' + o.t + '</span>');
        b.type = 'button';
        if (multi) { b.setAttribute('role', 'checkbox'); b.setAttribute('aria-checked', 'false'); }
        else { b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false'); }
        b.addEventListener('click', function () {
          if (ui.locked) return;
          if (multi) { ui.val = ui.val || []; var k = ui.val.indexOf(i); if (k < 0) ui.val.push(i); else ui.val.splice(k, 1); ui.val.sort(); }
          else ui.val = i;
          syncOpts(ui); persist(ui);
        });
        box.appendChild(b); ui.optBtns.push(b);
      });
      area.appendChild(box);
    }
    if (p.type === 'open') {
      var ta = h('textarea', 'open'); ta.id = p.id + '-text'; ta.setAttribute('aria-label', 'Your explanation');
      ta.placeholder = 'I think ... because ...'; if (typeof ui.val === 'string') ta.value = ui.val;
      ta.addEventListener('input', function () { ui.val = ta.value; persist(ui); });
      area.appendChild(ta); ui.inputs.push(ta);
    }
    if (p.type === 'plot') buildPlot(ui, area);

    var acts = h('div', 'actions');
    var chk = h('button', 'btn check', p.type === 'open' ? 'Submit my thinking' : 'Check'); chk.type = 'button';
    chk.addEventListener('click', function () { doCheck(ui); });
    acts.appendChild(chk);
    var nh = (p.hints || []).length, hb = null;
    if (nh) {
      hb = h('button', 'btn ghost hint-btn', ''); hb.type = 'button';
      hb.addEventListener('click', function () { if (st.hints < nh) { st.hints++; renderHints(ui); save(); } });
      acts.appendChild(hb);
    }
    var show = h('button', 'btn ghost show-btn', 'Show me how'); show.type = 'button'; show.hidden = true;
    show.addEventListener('click', function () { st.st = 'shown'; finish(ui, null); save(); updateProgress(); });
    if (p.type !== 'open') acts.appendChild(show);
    c.appendChild(acts);
    ui.hintBtn = hb; ui.showBtn = show; ui.chk = chk;
    ui.hints = h('div', 'hints'); c.appendChild(ui.hints);
    ui.fb = h('div', 'fb'); ui.fb.setAttribute('role', 'status'); ui.fb.setAttribute('aria-live', 'polite'); c.appendChild(ui.fb);

    syncOpts(ui); syncSteps(ui); renderHints(ui);
    if (st.st === 'correct' || st.st === 'shown' || st.st === 'explained') finish(ui, null, true);
    else if (st.tries >= 2) show.hidden = false;
    setStat(ui);
    ITEMS.push(ui);
    return c;
  }

  function persist(ui) { ui.st.val = ui.val; save(); }
  function syncOpts(ui) {
    ui.optBtns.forEach(function (b, i) {
      var on = ui.p.type === 'multi' ? (ui.val || []).indexOf(i) >= 0 : ui.val === i;
      b.setAttribute('aria-checked', on ? 'true' : 'false'); b.classList.remove('bad');
    });
  }
  function syncSteps(ui) {
    ui.stepBtns.forEach(function (b, i) { b.setAttribute('aria-pressed', ui.val && ui.val.step === i ? 'true' : 'false'); b.classList.remove('bad'); });
  }
  function renderHints(ui) {
    var hs = ui.p.hints || [], n = ui.st.hints || 0;
    ui.hints.innerHTML = hs.slice(0, n).map(function (t, i) { return '<div class="hint"><b>Hint ' + (i + 1) + ':</b> ' + t + '</div>'; }).join('');
    if (ui.hintBtn) {
      ui.hintBtn.textContent = n === 0 ? 'Hint' : n < hs.length ? 'Another hint (' + (n + 1) + ' of ' + hs.length + ')' : 'No more hints';
      ui.hintBtn.disabled = n >= hs.length || ui.locked;
    }
  }
  function setStat(ui) {
    var el = ui.el.querySelector('.pstat'), s = ui.st.st;
    el.className = 'pstat';
    if (s === 'correct') { el.classList.add('ok'); el.textContent = ui.st.tries === 1 ? 'Correct on first try' : 'Correct'; }
    else if (s === 'explained') { el.classList.add('ok'); el.textContent = 'Explained'; }
    else if (s === 'shown') { el.classList.add('shown'); el.textContent = 'Answer shown'; }
    else if (s === 'wrong') { el.classList.add('try'); el.textContent = 'Keep trying'; }
    else el.textContent = '';
  }

  function doCheck(ui) {
    if (ui.locked) return;
    var p = ui.p, r = evaluate(p, ui.val);
    ui.el.querySelectorAll('.blank').forEach(function (d) { d.classList.remove('bad', 'good'); });
    syncOpts(ui); syncSteps(ui);
    if (r.empty) { ui.fb.className = 'fb info'; ui.fb.innerHTML = r.msg; return; }
    ui.st.tries++;
    if (r.ok) {
      ui.st.st = p.type === 'open' ? 'explained' : 'correct';
      finish(ui, r);
    } else {
      ui.st.st = 'wrong';
      ui.fb.className = 'fb no';
      ui.fb.innerHTML = r.msg + (ui.st.tries >= 2 && (p.hints || []).length > ui.st.hints ? ' <span class="why">Stuck? Tap <b>' + (ui.st.hints ? 'Another hint' : 'Hint') + '</b>.</span>' : '');
      var blanks = ui.el.querySelectorAll('.blank');
      (r.bad || []).forEach(function (k) { if (blanks[k]) blanks[k].classList.add('bad'); });
      (r.badOpt || []).forEach(function (k) { ui.optBtns[k].classList.add('bad'); });
      if (r.badStep !== undefined) ui.stepBtns[r.badStep].classList.add('bad');
      if (ui.st.tries >= 2 && p.type !== 'open') ui.showBtn.hidden = false;
    }
    setStat(ui); save(); updateProgress();
  }

  function finish(ui, r, restoring) {
    var p = ui.p, s = ui.st.st;
    ui.locked = true;
    ui.inputs.forEach(function (i) { i.readOnly = true; });
    ui.optBtns.concat(ui.stepBtns).forEach(function (b) { b.disabled = true; });
    if (ui.plotLock) ui.plotLock();
    ui.chk.disabled = true; ui.showBtn.hidden = true; if (ui.hintBtn) ui.hintBtn.disabled = true;
    var praise = PRAISE[(ITEMS.indexOf(ui) + 5) % PRAISE.length];
    if (s === 'explained') {
      ui.fb.className = 'fb info';
      ui.fb.innerHTML = '<b>Thanks for explaining!</b> Compare your thinking with this model answer.' +
        '<div class="model"><b>Model answer:</b> ' + p.model + (p.look ? '<br><b>Did you…</b><ul>' + p.look.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' : '') + '</div>';
    } else if (s === 'correct') {
      ui.fb.className = 'fb ok';
      ui.fb.innerHTML = '<b>' + praise + '</b>' + (p.explain ? '<span class="why">' + p.explain + '</span>' : '');
      markGood(ui);
    } else if (s === 'shown') {
      ui.fb.className = 'fb info';
      ui.fb.innerHTML = '<b>Here is how.</b> <span class="why">' + (p.explain || '') + '</span><span class="why"><b>Answer:</b> ' + answerText(p) + '</span><span class="why">Try a problem like this again later!</span>';
      markGood(ui);
    }
    renderHints(ui); setStat(ui);
  }
  function markGood(ui) {
    var k = keyFor(ui.p);
    if (k.opt !== undefined) ui.optBtns[k.opt].classList.add('good');
    if (k.opts) k.opts.forEach(function (i) { ui.optBtns[i].classList.add('good'); });
    if (k.step !== undefined) ui.stepBtns[k.step].classList.add('good');
    if (ui.p.type === 'num' || ui.p.type === 'error') ui.el.querySelectorAll('.blank').forEach(function (d) { d.classList.add('good'); });
    if (ui.p.type === 'plot' && ui.st.st === 'shown') { ui.val = ui.p.points.slice(); ui.drawPts(); }
  }
  function answerText(p) {
    var k = keyFor(p);
    if (p.type === 'num') return blanksOf(p).map(function (b, i) { return (b.label ? esc(b.label) + ' ' : '') + frHtml(F(b.ans)) + (b.unit ? ' ' + esc(b.unit) : ''); }).join('; ');
    if (p.type === 'mc') return 'Choice ' + 'ABCDEFGH'[k.opt];
    if (p.type === 'multi') return 'Choices ' + k.opts.map(function (i) { return 'ABCDEFGH'[i]; }).join(', ');
    if (p.type === 'error') return 'The mistake is in Step ' + (p.bad + 1) + '. The correct answer is ' + frHtml(F(p.ans)) + (p.unit ? ' ' + esc(p.unit) : '') + '.';
    if (p.type === 'plot') return p.points.map(function (q, i) { return (p.names ? p.names[i] + ' ' : '') + '(' + q[0] + ', ' + q[1] + ')'; }).join(', ');
    return '';
  }

  /* tap-to-plot grid */
  function buildPlot(ui, area) {
    var p = ui.p, max = p.max || 10, g = gridGeom(max, 340);
    var next = h('p', 'plot-next'); area.appendChild(next);
    var wrapEl = h('div', 'plot-wrap', coordGrid({ max: max, every: p.every || 1, label: 'Coordinate grid. Tap to plot points.', xLabel: p.xLabel, yLabel: p.yLabel }));
    area.appendChild(wrapEl);
    var svg = wrapEl.querySelector('svg'), ptsG = svg.querySelector('.grid-pts');
    svg.setAttribute('data-plot', p.id);
    ui.val = Array.isArray(ui.val) ? ui.val : [];
    function nm(i) { return p.names ? p.names[i] : String(i + 1); }
    ui.drawPts = function () {
      ptsG.innerHTML = ui.val.map(function (q, i) {
        return '<circle cx="' + n2(g.X(q[0])) + '" cy="' + n2(g.Y(q[1])) + '" r="8" fill="#E0A800" stroke="#1E2D4F" stroke-width="2"/>' +
          txt(g.X(q[0]) + 11, g.Y(q[1]) - 10, nm(i) + ' (' + q[0] + ', ' + q[1] + ')', { a: 'start', w: 700, size: 13 });
      }).join('');
      next.textContent = ui.locked ? '' : ui.val.length < p.points.length ? 'Tap the grid to plot point ' + nm(ui.val.length) + '. Tap a point again to remove it.' : 'All points plotted. Tap Check. (Tap a point to remove it.)';
    };
    svg.addEventListener('click', function (e) {
      if (ui.locked) return;
      var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      var loc = pt.matrixTransform(svg.getScreenCTM().inverse());
      var x = Math.round((loc.x - g.m) * max / g.S), y = Math.round(max - (loc.y - g.T) * max / g.S);
      if (x < 0 || y < 0 || x > max || y > max) return;
      var k = -1; ui.val.forEach(function (q, i) { if (q[0] === x && q[1] === y) k = i; });
      if (k >= 0) ui.val.splice(k, 1);
      else if (ui.val.length < p.points.length) ui.val.push([x, y]);
      ui.fb.innerHTML = ''; ui.drawPts(); persist(ui);
    });
    var clr = h('button', 'btn ghost', 'Clear points'); clr.type = 'button';
    clr.addEventListener('click', function () { if (ui.locked) return; ui.val = []; ui.drawPts(); persist(ui); });
    area.appendChild(h('div', 'actions')).appendChild(clr);
    ui.plotLock = function () { clr.disabled = true; svg.style.cursor = 'default'; ui.drawPts(); };
    ui.drawPts();
  }

  /* progress + results */
  var progEl, resEl;
  function done(s) { return s === 'correct' || s === 'shown' || s === 'explained'; }
  function updateProgress() {
    var n = ITEMS.length, d = ITEMS.filter(function (u) { return done(u.st.st); }).length;
    progEl.querySelector('.bar>i').style.width = Math.round(100 * d / n) + '%';
    progEl.querySelector('.cnt').textContent = d + ' of ' + n + ' done';
    progEl.querySelector('.bar').setAttribute('aria-valuenow', d);
    renderResults();
  }
  function renderResults() {
    var n = ITEMS.length, d = ITEMS.filter(function (u) { return done(u.st.st); }).length;
    var first = ITEMS.filter(function (u) { return u.st.st === 'correct' && u.st.tries === 1; }).length;
    var later = ITEMS.filter(function (u) { return u.st.st === 'correct' && u.st.tries > 1; }).length;
    var shown = ITEMS.filter(function (u) { return u.st.st === 'shown'; }).length;
    var expl = ITEMS.filter(function (u) { return u.st.st === 'explained'; }).length;
    var scored = n - expl, all = d === n;
    var html = '<div class="pr-kicker">Results</div><h2>' + (all ? 'You finished!' : 'Your progress') + '</h2>';
    if (all) {
      var msg = first === scored ? 'Amazing! You got every problem right on the first try.' :
        first + later >= scored * 0.7 ? 'Great work! You stuck with it. Look back at any problem you want to practice again.' :
        'Good effort! Every mistake helps your brain grow. Look back at the problems marked below, then try this page again later.';
      html += '<p class="res-sum"><span class="res-big" id="res-score">' + (first + later) + ' / ' + scored + '</span> correct</p><p class="res-sum">' + msg + '</p>';
    } else {
      html += '<p class="res-sum">You have finished <b>' + d + ' of ' + n + '</b>. Keep going! Your results will show here when you finish.</p>';
    }
    html += '<p class="res-sum" style="font-size:15px;color:var(--muted)">Correct on first try: <b>' + first + '</b> · Correct after more tries: <b>' + later + '</b> · Answer shown: <b>' + shown + '</b> · Explained: <b>' + expl + '</b></p>';
    html += '<ul class="res-list">' + ITEMS.map(function (u) {
      var s = u.st.st, chip = s === 'correct' ? (u.st.tries === 1 ? '<span class="chip ok">First try</span>' : '<span class="chip ok">Correct</span>') :
        s === 'explained' ? '<span class="chip ok">Explained</span>' : s === 'shown' ? '<span class="chip shown">Practice again</span>' :
        s === 'wrong' ? '<span class="chip try">Keep trying</span>' : '<span class="chip todo">Not started</span>';
      return '<li><a href="#' + u.p.id + '">' + esc(u.label) + '</a>' + chip + '</li>';
    }).join('') + '</ul><button type="button" class="btn ghost" id="pr-reset">Start this page over</button>';
    resEl.innerHTML = html;
    resEl.classList.toggle('all-done', all);
    resEl.querySelector('#pr-reset').addEventListener('click', function () {
      if (!window.confirm('Clear all your answers on this page and start over?')) return;
      try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
      location.reload();
    });
  }

  /* ------------------------------------------------------------------ */
  /* self-test                                                            */
  /* ------------------------------------------------------------------ */
  function selfTest(cfg) {
    var fails = [];
    function ok(c, msg) { if (!c) fails.push(msg); }
    function tryIt(fn, msg) { try { fn(); } catch (e) { fails.push(msg + ': ' + e.message); } }
    // reader
    [['2 1/3', '7/3'], ['0.75', '3/4'], ['6/8', '3/4'], ['1,250', '1250'], ['1 250', '1250'], [' 3 / 4 ', '3/4'], ['.5', '1/2'], ['12 cubic cm', '12'],
     ['$4.50', '9/2'], ['2.50', '5/2'], ['10 2/4', '21/2']].forEach(function (t) {
      var v = parseNum(t[0]); ok(v && v.eq(new Fr(+t[1].split('/')[0], +(t[1].split('/')[1] || 1))), 'reader: "' + t[0] + '" should be ' + t[1]);
    });
    ['abc', '1/0', '1.2.3', ''].forEach(function (t) { ok(parseNum(t) === null, 'reader should reject "' + t + '"'); });
    ok(evalExpr('3 × (4 + 2)').eq(18) && evalExpr('40 − 12 ÷ 4').eq(37) && evalExpr('3/4 × 8').eq(6), 'expression evaluator');
    ok(Dec.mul(Dec.of('0.4'), Dec.of('0.3')) === 120 && Dec.str(Dec.of('2.50')) === '2.5', 'decimal helpers');
    // page asserts
    (cfg.asserts || []).forEach(function (a, i) { tryIt(function () { ok(a[1] === true, 'assert ' + (i + 1) + ' failed: ' + a[0]); }, 'assert ' + (i + 1)); });
    // every item
    var ids = {};
    cfg.problems.concat(cfg.cooldown).forEach(function (p) {
      tryIt(function () {
        ok(!ids[p.id], p.id + ': duplicate id'); ids[p.id] = 1;
        ok(TYPE_LABEL[p.type], p.id + ': unknown type');
        if (p.type !== 'open') ok((p.hints || []).length >= 1, p.id + ': needs a hint');
        if (p.type !== 'open') ok(!!p.explain, p.id + ': needs an explanation');
        blanksOf(p).forEach(function (b, bi) {
          var ans = F(b.ans), tag = p.id + ' blank ' + (bi + 1);
          ok(b.expect !== undefined, tag + ': missing expected value');
          if (b.expect !== undefined) ok(F(String(b.expect)).eq(ans), tag + ': computed ' + ans + ' but expected ' + b.expect);
          var forms = [ans.toString(), ans.mixed(), ' ' + ans.toString().replace('/', ' / ') + ' '];
          if (!ans.isInt()) forms.push(ans.n * 2 + '/' + ans.d * 2);
          if (ans.dec() !== null) forms.push(ans.dec());
          forms.forEach(function (f) { ok(checkBlank(b, f).ok, tag + ': form "' + f + '" should be accepted'); });
          (b.wrong || []).forEach(function (w) {
            var wv = F(w[0]); ok(!wv.eq(ans), tag + ': wrong answer ' + wv + ' equals the answer');
            var r = checkBlank(b, wv.mixed()); ok(!r.ok && r.msg === w[1], tag + ': wrong answer ' + wv + ' should give its own feedback');
          });
          ok(!checkBlank(b, ans.add(1).mixed()).ok, tag + ': answer + 1 should be wrong');
        });
        if (p.type === 'mc') {
          var a = mcAnswer(p); ok(a >= 0 && a < p.options.length, p.id + ': no single correct choice');
          if (p.ans !== undefined && p.answer !== undefined) ok(p.options[p.answer].v !== undefined && F(p.options[p.answer].v).eq(F(p.ans)), p.id + ': answer index does not match computed value');
          p.options.forEach(function (o, i) { if (i !== a) ok(!!o.why, p.id + ': choice ' + 'ABCDEFGH'[i] + ' needs feedback'); });
        }
        if (p.type === 'multi') {
          var good = p.options.filter(isOk).length; ok(good >= 1 && good < p.options.length, p.id + ': select-all needs right and wrong choices');
          p.options.forEach(function (o, i) { if (!isOk(o)) ok(!!o.why, p.id + ': choice ' + 'ABCDEFGH'[i] + ' needs feedback'); });
        }
        if (p.type === 'error') ok(p.bad >= 0 && p.bad < p.steps.length, p.id + ': bad step index');
        if (p.type === 'plot') p.points.forEach(function (q) { ok(q[0] >= 0 && q[1] >= 0 && q[0] <= (p.max || 10) && q[1] <= (p.max || 10), p.id + ': point off grid'); });
        if (p.type === 'open') ok(!!p.model, p.id + ': needs a model answer');
        ok(evaluate(p, valueFromKey(p, keyFor(p))).ok, p.id + ': the key does not check as correct');
        if (p.type === 'mc') p.options.forEach(function (o, i) { if (i !== mcAnswer(p)) ok(!evaluate(p, i).ok, p.id + ': wrong choice checks as right'); });
      }, p.id);
    });
    ok(cfg.cooldown.length === 2, 'cool-down should have 2 questions');
    ok(cfg.problems.length >= 8 && cfg.problems.length <= 10, 'should have 8-10 practice problems');
    var types = {}; cfg.problems.forEach(function (p) { types[p.type] = 1; });
    ['num', 'mc', 'multi', 'error', 'open'].forEach(function (t) { ok(types[t], 'page needs a ' + t + ' problem'); });
    fails.forEach(function (f) { console.error('[practice self-test] ' + f); });
    var res = { ok: !fails.length, fails: fails, items: cfg.problems.length + cfg.cooldown.length };
    window.PracticeSelfTest = res;
    var tag = document.getElementById('pr-selftest'); if (tag) { tag.setAttribute('data-ok', String(res.ok)); tag.textContent = res.ok ? 'pass' : fails.join('\n'); }
    return res;
  }

  /* ------------------------------------------------------------------ */
  /* init                                                                 */
  /* ------------------------------------------------------------------ */
  function init(cfg) {
    CFG = cfg; KEY = 'g5-practice-v1:' + cfg.id;
    state = load() || { items: {}, wu: {} };
    app = document.getElementById('app');
    var test;
    try { test = selfTest(cfg); } catch (e) { console.error('[practice self-test] crashed: ' + e.message); test = { ok: false }; }

    app.appendChild(h('p', 'pr-intro', 'Try each problem on your own first. Tap <b>Check</b> to see how you did. Need help? Tap <b>Hint</b>. Your answers save on this device.'));
    app.appendChild(renderWarmup(cfg.warmup));
    var g = h('section', 'pr-card');
    g.innerHTML = '<div class="pr-kicker">Today\'s goals</div><h2>Let\'s get started</h2><ul class="goals">' + cfg.goals.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>';
    app.appendChild(g);

    progEl = h('div', 'pr-progress', '<div class="row"><span>Your progress</span><span class="cnt"></span></div><div class="bar" role="progressbar" aria-label="Problems done" aria-valuemin="0" aria-valuemax="' + (cfg.problems.length + cfg.cooldown.length) + '"><i></i></div>');
    app.appendChild(progEl);
    app.appendChild(h('div', 'section-label', 'Practice Problems <span>' + cfg.problems.length + ' problems</span>'));
    cfg.problems.forEach(function (p, i) { var c = renderItem(p, 'Problem ' + (i + 1)); ITEMS[ITEMS.length - 1].label = 'Problem ' + (i + 1); app.appendChild(c); });
    var syn = h('section', 'pr-card synth'); syn.id = 'synthesis';
    syn.innerHTML = '<div class="pr-kicker">Lesson Synthesis</div><h2>' + (cfg.synthesisTitle || 'What we learned') + '</h2>' + cfg.synthesis;
    app.appendChild(h('div', 'section-label', 'Lesson Synthesis'));
    app.appendChild(syn);
    app.appendChild(h('div', 'section-label', 'Cool-down <span>2 questions — show what you know</span>'));
    cfg.cooldown.forEach(function (p, i) { var c = renderItem(p, 'Cool-down ' + (i + 1)); ITEMS[ITEMS.length - 1].label = 'Cool-down ' + (i + 1); app.appendChild(c); });
    resEl = h('section', 'pr-card'); resEl.id = 'results';
    app.appendChild(h('div', 'section-label', 'Results'));
    app.appendChild(resEl);
    var stEl = h('div'); stEl.id = 'pr-selftest'; stEl.hidden = true; app.appendChild(stEl);
    stEl.setAttribute('data-ok', String(test.ok)); stEl.textContent = test.ok ? 'pass' : (test.fails || []).join('\n');
    updateProgress();
    save();
  }

  window.Practice = {
    init: init, F: F, Fr: Fr, Dec: Dec, parseNum: parseNum, evalExpr: evalExpr,
    fr: fr, mx: mx, fh: frHtml, m: m, esc: esc,
    svg: { solid: solid, cubes: cubes, dims: dims, tape: tape, areaFrac: areaFrac, areaRect: areaRect, numberLine: numberLine,
      hundredGrid: hundredGrid, baseTen: baseTen, coordGrid: coordGrid, linePlot: linePlot, shapes: shapes, bars: bars },
    /* for automated page tests */
    key: function () { var o = {}; CFG.problems.concat(CFG.cooldown).forEach(function (p) { o[p.id] = { type: p.type, key: keyFor(p) }; }); return o; },
    wrongs: function () {
      var o = {};
      CFG.problems.concat(CFG.cooldown).forEach(function (p) {
        var b = blanksOf(p)[0];
        if (b && b.wrong && b.wrong.length) o[p.id] = { value: F(b.wrong[0][0]).mixed(), msg: b.wrong[0][1] };
      });
      return o;
    },
    plotXY: function (id, x, y) {   // screen position of grid point (x, y) on a plot item
      var svg = document.querySelector('svg[data-plot="' + id + '"]'), p = null;
      CFG.problems.concat(CFG.cooldown).forEach(function (q) { if (q.id === id) p = q; });
      var g = gridGeom(p.max || 10, 340), pt = svg.createSVGPoint(); pt.x = g.X(x); pt.y = g.Y(y);
      var s = pt.matrixTransform(svg.getScreenCTM()); return { x: s.x, y: s.y };
    }
  };
})();
