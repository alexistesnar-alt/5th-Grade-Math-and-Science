/* ==========================================================================
   Fluency Lab — 5th grade.  10 modules. Each module has:
     • Practice: pick a level, 10 problems, hints, feedback that names the mistake,
       worked steps after a second miss, streaks, and a summary.
     • Skill check: 10 mixed problems, one Check button, score + what to practice next.
   Every answer is computed with exact arithmetic:
     fractions are [numerator, denominator]; decimals are whole numbers × 1,000.
   Progress saves on this device only. Nothing is sent anywhere.
   ========================================================================== */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(html) { var t = document.createElement('template'); t.innerHTML = String(html).trim(); return t.content.firstElementChild; }
  var R = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var M = '−', X = '×', D = '÷';
  var N = function (n) { return Number(n).toLocaleString('en-US'); };

  /* ---------- storage ---------- */
  function get(k, d) { try { var v = localStorage.getItem('g5fl:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function put(k, v) { try { localStorage.setItem('g5fl:' + k, JSON.stringify(v)); } catch (e) { /* storage off */ } }

  /* ---------- exact fractions ---------- */
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function fr(n, d) { d = d || 1; if (d < 0) { n = -n; d = -d; } var g = gcd(n, d); return [n / g, d / g]; }
  function fadd(a, b) { return fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]); }
  function fsub(a, b) { return fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]); }
  function fmul(a, b) { return fr(a[0] * b[0], a[1] * b[1]); }
  function fdiv(a, b) { return fr(a[0] * b[1], a[1] * b[0]); }
  function feq(a, b) { return !!a && !!b && a[0] * b[1] === b[0] * a[1]; }
  function fshow(f) { var n = f[0], d = f[1]; if (d === 1) return N(n); if (Math.abs(n) > d) return Math.trunc(n / d) + ' ' + Math.abs(n % d) + '/' + d; return n + '/' + d; }
  function fhtml(f, improper) {
    var n = f[0], d = f[1]; if (d === 1) return N(n);
    var fx = function (a, b) { return '<span class="fx"><span>' + a + '</span><span>' + b + '</span></span>'; };
    if (!improper && Math.abs(n) > d) return '<span class="mx">' + Math.trunc(n / d) + fx(Math.abs(n % d), d) + '</span>';
    return fx(n, d);
  }
  /* ---------- exact decimals (× 1,000) ---------- */
  var SC = 1000;
  function dshow(v) { var neg = v < 0; v = Math.abs(v); var w = Math.floor(v / SC), f = String(v % SC).padStart(3, '0').replace(/0+$/, ''); return (neg ? M : '') + N(w) + (f ? '.' + f : ''); }
  function dfr(v) { return fr(v, SC); }
  function rdec(whole, places) { return R(whole[0], whole[1]) * SC + R(1, Math.pow(10, places) - 1) * Math.pow(10, 3 - places); }

  /* ---------- reading what a student typed ---------- */
  function raw(s) {   // → {f:[n,d] reduced, n, d (as typed), mixed}
    s = String(s).trim().replace(/,/g, '').replace(/[−–]/g, '-').replace(/\s+/g, ' ');
    var m;
    if ((m = s.match(/^(\d+) (\d+)\/(\d+)$/))) { if (!+m[3]) return null; return { f: fr(+m[1] * +m[3] + +m[2], +m[3]), n: +m[2], d: +m[3], mixed: true, w: +m[1] }; }
    if ((m = s.match(/^(-?\d+)\/(\d+)$/))) { if (!+m[2]) return null; return { f: fr(+m[1], +m[2]), n: +m[1], d: +m[2] }; }
    if ((m = s.match(/^(-?)(\d*)\.?(\d*)$/)) && (m[2] || m[3])) { var p = m[3] || '', den = Math.pow(10, p.length), v = +(m[2] || 0) * den + +(p || 0); return { f: fr(m[1] ? -v : v, den), n: v, d: den, dec: true }; }
    return null;
  }
  var simplest = function (r) { return r && (r.d === 1 || gcd(r.n, r.d) === 1) && !(r.n > r.d && !r.mixed && r.d !== 1 && !r.dec); };

  /* ---------- small drawings ---------- */
  function boxSVG(l, w, h, labels) {
    // simple oblique box with labeled edges
    var s = 18, W = l * s, H = h * s, dx = w * s * 0.5, dy = w * s * 0.4, ox = 20, oy = 14 + dy;
    var mw = Math.min(260, W + dx + 70);
    return '<svg viewBox="0 0 ' + (W + dx + 70) + ' ' + (H + dy + 50) + '" width="' + mw + '" role="img" aria-label="A box ' + l + ' by ' + w + ' by ' + h + '">' +
      '<g stroke="#1E2D4F" stroke-width="2" stroke-linejoin="round">' +
      '<path d="M' + ox + ' ' + oy + ' h' + W + ' v' + H + ' h' + (-W) + 'z" fill="#FFE08A"/>' +
      '<path d="M' + ox + ' ' + oy + ' l' + dx + ' ' + (-dy) + ' h' + W + ' l' + (-dx) + ' ' + dy + 'z" fill="#FFF3C4"/>' +
      '<path d="M' + (ox + W) + ' ' + oy + ' l' + dx + ' ' + (-dy) + ' v' + H + ' l' + (-dx) + ' ' + dy + 'z" fill="#F2C94C"/></g>' +
      '<g font-family="Inter,sans-serif" font-size="14" font-weight="700" fill="#1E2D4F" text-anchor="middle">' +
      '<text x="' + (ox + W / 2) + '" y="' + (oy + H + 20) + '">' + labels[0] + '</text>' +
      '<text x="' + (ox + W + dx / 2 + 16) + '" y="' + (oy + H - dy / 2 + 8) + '" text-anchor="start">' + labels[1] + '</text>' +
      '<text x="' + (ox - 6) + '" y="' + (oy + H / 2 + 5) + '" text-anchor="end">' + labels[2] + '</text></g></svg>';
  }

  /* ---------- fact strategies ---------- */
  function factHint(a, b) {
    var x = Math.min(a, b), y = Math.max(a, b);
    if (x === 0) return 'Any number times 0 is 0.';
    if (x === 1) return 'Any number times 1 stays the same.';
    if (x === 2) return 'Times 2 is a double: ' + y + ' + ' + y + '.';
    if (x === 10 || y === 10) return 'Times 10: write the number, then a zero.';
    if (x === 5 || y === 5) { var o = x === 5 ? y : x; return 'Times 5 is half of times 10. 10 × ' + o + ' = ' + (10 * o) + '. Half of that is…'; }
    if (x === 9 || y === 9) { o = x === 9 ? y : x; return 'Nines: 10 × ' + o + ' = ' + (10 * o) + ', then take away one ' + o + '.'; }
    if (x === 4 || y === 4) { o = x === 4 ? y : x; return 'Times 4 is double, double: ' + o + ' → ' + (2 * o) + ' → ?'; }
    if (x === 3 || y === 3) { o = x === 3 ? y : x; return 'Times 3: double ' + o + ' (' + (2 * o) + '), then add one more ' + o + '.'; }
    if (x === 6 || y === 6) { o = x === 6 ? y : x; return 'Times 6: 5 × ' + o + ' = ' + (5 * o) + ', plus one more ' + o + '.'; }
    if (x === 8 || y === 8) { o = x === 8 ? y : x; return 'Times 8: double three times: ' + o + ' → ' + (2 * o) + ' → ' + (4 * o) + ' → ?'; }
    if (x === 7 || y === 7) { o = x === 7 ? y : x; return 'Split the 7 into 5 and 2: 5 × ' + o + ' = ' + (5 * o) + ' and 2 × ' + o + ' = ' + (2 * o) + '. Add them.'; }
    if (x === 11 || y === 11) { o = x === 11 ? y : x; return '10 × ' + o + ' = ' + (10 * o) + ', plus one more ' + o + '.'; }
    if (x === 12 || y === 12) { o = x === 12 ? y : x; return 'Split 12 into 10 and 2: ' + (10 * o) + ' + ' + (2 * o) + '.'; }
    return 'Think of ' + a + ' groups of ' + b + '.';
  }

  /* ---------- partial quotients (worked steps for division) ---------- */
  function partialQuotients(n, d) {
    var left = n, steps = [], q = 0;
    [1000, 100, 10, 1].forEach(function (p) {
      var k = Math.floor(left / (d * p));
      if (k > 0) { steps.push(d + ' × ' + N(k * p) + ' = ' + N(d * k * p) + '. ' + N(left) + ' ' + M + ' ' + N(d * k * p) + ' = ' + N(left - d * k * p) + '.'); left -= d * k * p; q += k * p; }
    });
    steps.push('Add the groups: the quotient is <b>' + N(q) + '</b>. ' + (left ? 'There are <b>' + left + '</b> left over (the remainder).' : 'Nothing is left over.'));
    return steps;
  }

  /* ---------- expressions: correct value and the left-to-right mistake ---------- */
  function evalTokens(tk, ignoreOrder) {
    // tk: array of numbers and op strings, with '(' and ')'
    function solve(list) {
      var a = list.slice();
      // parentheses
      var i;
      while ((i = a.lastIndexOf('(')) >= 0) { var j = a.indexOf(')', i); a.splice(i, j - i + 1, solve(a.slice(i + 1, j))); }
      if (ignoreOrder) { var v = a[0]; for (i = 1; i < a.length; i += 2) v = op(v, a[i], a[i + 1]); return v; }
      for (i = 1; i < a.length; i += 2) if (a[i] === X || a[i] === D) { a.splice(i - 1, 3, op(a[i - 1], a[i], a[i + 1])); i -= 2; }
      var w = a[0]; for (i = 1; i < a.length; i += 2) w = op(w, a[i], a[i + 1]); return w;
    }
    function op(x, o, y) { return o === '+' ? x + y : o === M ? x - y : o === X ? x * y : x / y; }
    return solve(tk);
  }
  function tkText(tk) { return tk.join(' ').replace(/\( /g, '(').replace(/ \)/g, ')'); }

  /* =========================================================================
     MODULES.  Each level's make() returns a problem:
       { q: html, kind: 'num' | 'qr' | 'choice' | 'steps',
         ans: [n,d]  |  [q, r]  |  choice index,
         simplest: true (answer must be in simplest form), keys: 'frac'|'dec' (extra keypad keys),
         hint: text, steps: [worked steps], errs: [[wrong value [n,d], message], …],
         rows: [{label, ans:[n,d]}] for step boards, fig: html }
     ========================================================================= */
  var MODULES = {};

  MODULES.facts = {
    n: 1, tier: 'Whole Numbers', sym: X, title: 'Multiplication Facts', std: 'NC.3.OA.7 · supports NC.5.NBT.5', desc: 'Know your facts to 12 × 12 fast.',
    levels: [
      { name: 'Facts with 0, 1, 2, 5, 10', make: function () { return fact(pick([0, 1, 2, 5, 10]), R(0, 12)); } },
      { name: 'Facts with 3, 4, 6, 9', make: function () { return fact(pick([3, 4, 6, 9]), R(2, 12)); } },
      { name: 'Facts with 7, 8, 11, 12', make: function () { return fact(pick([7, 8, 11, 12]), R(2, 12)); } },
      { name: 'All facts, mixed', make: function () { return fact(R(2, 12), R(2, 12)); } }
    ]
  };
  function fact(a, b) {
    if (Math.random() < 0.5) { var t = a; a = b; b = t; }
    return { q: a + ' ' + X + ' ' + b, kind: 'num', ans: fr(a * b), hint: factHint(a, b), steps: [factHint(a, b), a + ' ' + X + ' ' + b + ' = <b>' + (a * b) + '</b>'],
      errs: [[fr(a + b), 'You added. The sign is ' + X + ' (multiply).'], [fr(a * (b - 1)), 'That is one group short: ' + a + ' ' + X + ' ' + (b - 1) + '.'], [fr(a * (b + 1)), 'That is one group too many: ' + a + ' ' + X + ' ' + (b + 1) + '.'], [fr((a - 1) * b), 'That is one group short: ' + (a - 1) + ' ' + X + ' ' + b + '.'], [fr((a + 1) * b), 'That is one group too many: ' + (a + 1) + ' ' + X + ' ' + b + '.']] };
  }

  MODULES.divfacts = {
    n: 2, tier: 'Whole Numbers', sym: D, title: 'Division Facts', std: 'NC.3.OA.7 · supports NC.5.NBT.6', desc: 'Use multiplication facts to divide.',
    levels: [
      { name: 'Divide by 2, 5, 10', make: function () { return dfact(pick([2, 5, 10]), R(1, 12)); } },
      { name: 'Divide by 3, 4, 6, 9', make: function () { return dfact(pick([3, 4, 6, 9]), R(1, 12)); } },
      { name: 'Divide by 7, 8, 11, 12', make: function () { return dfact(pick([7, 8, 11, 12]), R(1, 12)); } },
      { name: 'All division facts, mixed', make: function () { return dfact(R(2, 12), R(1, 12)); } }
    ]
  };
  function dfact(d, q) {
    var n = d * q;
    return { q: n + ' ' + D + ' ' + d, kind: 'num', ans: fr(q), hint: 'Think: ' + d + ' ' + X + ' ? = ' + n + '.', steps: ['Think of the multiplication fact: ' + d + ' ' + X + ' ? = ' + n + '.', d + ' ' + X + ' ' + q + ' = ' + n + ', so ' + n + ' ' + D + ' ' + d + ' = <b>' + q + '</b>.'],
      errs: [[fr(n - d), 'You subtracted. The sign is ' + D + ' (divide).'], [fr(n * d), 'You multiplied. Dividing makes equal groups.']] };
  }

  MODULES.multiply = {
    n: 3, tier: 'Whole Numbers', sym: '24<br>×3', title: 'Multi-Digit Multiplication', std: 'NC.5.NBT.5', desc: 'The standard algorithm, one row at a time.',
    levels: [
      { name: '2-digit × 1-digit', make: function () { return mult1(R(12, 99), R(3, 9)); } },
      { name: '3- and 4-digit × 1-digit', make: function () { return mult1(Math.random() < 0.6 ? R(102, 999) : R(1002, 4999), R(3, 9)); } },
      { name: '2-digit × 2-digit (step by step)', make: function () { return mult2(R(13, 99), R(12, 99)); } },
      { name: '3-digit × 2-digit (step by step)', make: function () { return mult2(R(102, 899), R(12, 89)); } }
    ]
  };
  function mult1(a, b) {
    var p = a * b, parts = [], s = String(a);
    for (var i = 0; i < s.length; i++) { var place = Math.pow(10, s.length - 1 - i), dgt = +s[i]; if (dgt) parts.push(N(dgt * place) + ' ' + X + ' ' + b + ' = ' + N(dgt * place * b)); }
    // no-carry mistake: multiply each digit and write all digits of each product without carrying
    var noCarry = +s.split('').map(function (d) { return String(+d * b % 10); }).join('');
    return { q: N(a) + ' ' + X + ' ' + b, kind: 'num', ans: fr(p), hint: 'Start with the ones: ' + (a % 10) + ' ' + X + ' ' + b + ' = ' + ((a % 10) * b) + '. Write ' + ((a % 10) * b % 10) + ' and carry ' + Math.floor((a % 10) * b / 10) + '.',
      steps: ['Break apart ' + N(a) + ' by place value.'].concat(parts).concat(['Add the parts: <b>' + N(p) + '</b>.']),
      errs: [[fr(noCarry), 'It looks like you forgot to add the numbers you carried.'], [fr(a + b), 'You added. The sign is ' + X + '.']] };
  }
  function mult2(a, b) {
    var o = b % 10, t = b - o, r1 = a * o, r2 = a * t, p = a * b;
    return { q: N(a) + ' ' + X + ' ' + b, kind: 'steps', ans: fr(p),
      rows: [{ label: 'Row 1: ' + N(a) + ' ' + X + ' ' + o + ' (the ones)', ans: fr(r1) }, { label: 'Row 2: ' + N(a) + ' ' + X + ' ' + t + ' (the tens — start with a 0)', ans: fr(r2) }, { label: 'Add the rows', ans: fr(p) }],
      hint: 'Row 1 multiplies by the ones digit (' + o + '). Row 2 multiplies by the tens (' + t + '), so it ends in 0.',
      steps: [N(a) + ' ' + X + ' ' + o + ' = ' + N(r1), N(a) + ' ' + X + ' ' + t + ' = ' + N(r2) + ' (put a 0 in the ones place first)', N(r1) + ' + ' + N(r2) + ' = <b>' + N(p) + '</b>'],
      errs: [[fr(r1 + a * (t / 10)), 'Row 2 is missing its zero. You are multiplying by ' + t + ', not ' + (t / 10) + '.']] };
  }

  MODULES.divide = {
    n: 4, tier: 'Whole Numbers', sym: D + 'R', title: 'Division with Remainders', std: 'NC.5.NBT.6', desc: 'Up to 4-digit ÷ 2-digit. Find the quotient and the remainder.',
    levels: [
      { name: '2-digit ÷ 1-digit', make: function () { var d = R(3, 9); return divp(d * R(3, 24) + R(0, d - 1), d); } },
      { name: '3- and 4-digit ÷ 1-digit', make: function () { var d = R(3, 9); return divp(d * R(25, 999) + R(0, d - 1), d); } },
      { name: '÷ 20, 30, 40 … 90', make: function () { var d = 10 * R(2, 9); return divp(d * R(3, 60) + R(0, d - 1), d); } },
      { name: '÷ any 2-digit number', make: function () { var d = R(11, 49); return divp(Math.min(9999, d * R(5, Math.floor(9999 / d)) + R(0, d - 1)), d); } }
    ]
  };
  function divp(n, d) {
    var q = Math.floor(n / d), r = n % d;
    return { q: N(n) + ' ' + D + ' ' + d, kind: 'qr', ans: [q, r], hint: 'Make groups of ' + d + '. Start big: how many groups of ' + N(d * (q >= 100 ? 100 : q >= 10 ? 10 : 1)) + ' fit in ' + N(n) + '?', steps: partialQuotients(n, d) };
  }

  MODULES.placevalue = {
    n: 5, tier: 'Place Value & Decimals', sym: '10×', title: 'Place Value & Powers of 10', std: 'NC.5.NBT.1 · NC.5.NBT.3', desc: 'Digit values, ×/÷ by 10, 100, 1,000, and comparing decimals.',
    levels: [
      { name: 'Value of a digit', make: digitValue },
      { name: '× and ÷ by 10, 100, 1,000', make: pow10 },
      { name: 'Compare decimals', make: cmpDec },
      { name: '10 times / one-tenth of', make: tenTimes }
    ]
  };
  function digitValue() {
    var v = rdec([0, 99], 3), s = dshow(v).replace(/,/g, ''), digits = s.replace('.', ''), pos;
    var places = []; var ip = s.indexOf('.'); for (var i = 0; i < s.length; i++) if (s[i] !== '.' && s[i] !== '0') places.push(i);
    pos = pick(places); var dgt = +s[pos], exp = pos < ip ? ip - pos - 1 : -(pos - ip);
    var val = exp >= 0 ? fr(dgt * Math.pow(10, exp)) : fr(dgt, Math.pow(10, -exp));
    var names = { 1: 'tens', 0: 'ones', '-1': 'tenths', '-2': 'hundredths', '-3': 'thousandths' };
    var shown = s.slice(0, pos) + '<u style="text-decoration-thickness:3px">' + s[pos] + '</u>' + s.slice(pos + 1);
    return { q: 'What is the value of the underlined digit?<div class="big">' + shown + '</div>', kind: 'num', keys: 'dec', ans: val, hint: 'Which place is the ' + dgt + ' in? Ones, tenths, hundredths…?',
      steps: ['The ' + dgt + ' is in the <b>' + names[exp] + '</b> place.', 'Its value is <b>' + (exp >= 0 ? N(val[0]) : dshow(dgt * Math.pow(10, 3 + exp))) + '</b>' + (exp < 0 ? ' (' + dgt + '/' + Math.pow(10, -exp) + ')' : '') + '.'],
      errs: exp === 0 ? [] : [[fr(dgt), 'That is just the digit. What is it worth in its place?']] };
  }
  function pow10() {
    var p = pick([10, 100, 1000]), k = String(p).length - 1, mul = Math.random() < 0.5;
    // keep every answer at thousandths or bigger
    var keep = 3 - k, x = mul ? rdec([0, 99], R(1, 2)) : R(1, 999) * SC + (keep > 0 && Math.random() < 0.6 ? R(1, Math.pow(10, keep) - 1) * Math.pow(10, 3 - keep) : 0);
    var v = mul ? fmul(dfr(x), fr(p)) : fdiv(dfr(x), fr(p));
    var wrongDir = mul ? fdiv(dfr(x), fr(p)) : fmul(dfr(x), fr(p));
    var show = function (f) { return f[1] === 1 ? N(f[0]) : dshow(f[0] * SC / f[1]); };
    return { q: dshow(x) + ' ' + (mul ? X : D) + ' ' + N(p), kind: 'num', keys: 'dec', ans: v,
      hint: (mul ? 'Multiplying' : 'Dividing') + ' by ' + N(p) + ' moves every digit ' + k + ' place' + (k > 1 ? 's' : '') + ' to the ' + (mul ? 'left' : 'right') + '.',
      steps: ['There ' + (k > 1 ? 'are ' + k + ' zeros' : 'is 1 zero') + ' in ' + N(p) + '.', 'Move each digit ' + k + ' place' + (k > 1 ? 's' : '') + ' to the ' + (mul ? 'left (the number gets bigger)' : 'right (the number gets smaller)') + '.', dshow(x) + ' ' + (mul ? X : D) + ' ' + N(p) + ' = <b>' + show(v) + '</b>'],
      errs: [[wrongDir, 'You moved the digits the wrong way. ' + (mul ? 'Multiplying makes the number bigger.' : 'Dividing makes the number smaller.')]] };
  }
  function cmpDec() {
    var a, b, t = R(0, 3);
    if (t === 0) { a = R(1, 9) * 100; b = R(10, 99) * 10; }
    else if (t === 1) { a = R(1, 9) * SC + R(1, 9) * 100; b = a; }
    else if (t === 2) { a = rdec([0, 9], 3); b = a + pick([1, -1, 10, -10, 100, -100]); if (b <= 0) b = a + 10; }
    else { a = rdec([0, 9], 2); b = rdec([0, 9], 3); }
    if (Math.random() < 0.5) { var tmp = a; a = b; b = tmp; }
    var sa = dshow(a), sb = dshow(b);
    if (t === 1) sb = sb + '0';
    var c = a > b ? 0 : a < b ? 1 : 2;
    return { q: 'Choose the sign.<div class="big">' + sa + ' &nbsp;?&nbsp; ' + sb + '</div>', kind: 'choice', choices: ['&gt;', '&lt;', '='], ans: c,
      hint: 'Line up the decimal points. Compare the ones, then tenths, then hundredths, then thousandths.',
      steps: ['Line up the decimal points. Add zeros so both have the same number of places.', sa + ' ' + ['&gt;', '&lt;', '='][c] + ' ' + sb + (t === 1 ? '. A zero at the end does not change the value.' : t === 0 ? '. Tenths are worth more than hundredths: ' + sa + ' vs ' + sb + '.' : '.')] };
  }
  function tenTimes() {
    var d = R(1, 9), e = R(-3, 2), bigger = Math.random() < 0.5;
    var at = function (exp) { return exp >= 0 ? N(d * Math.pow(10, exp)) : dshow(d * Math.pow(10, 3 + exp)); };
    var e2 = bigger ? e - 1 : e + 1; if (e2 < -3 || e2 > 3) { e2 = bigger ? e + 1 : e - 1; bigger = !bigger; }
    // value at e is 10× (or 1/10) the value at e2
    var tenX = e > e2;
    return { q: 'The ' + d + ' in <b>' + at(e) + '</b> is how many times the ' + d + ' in <b>' + at(e2) + '</b>?', kind: 'num', keys: 'frac', ans: tenX ? fr(10) : fr(1, 10),
      hint: 'Is ' + at(e) + ' bigger or smaller than ' + at(e2) + '? One place to the left is 10 times as much.',
      steps: [at(e) + ' is one place ' + (tenX ? 'to the left of' : 'to the right of') + ' ' + at(e2) + '.', 'So it is <b>' + (tenX ? '10' : '1/10') + '</b> times as much.'],
      errs: [[tenX ? fr(1, 10) : fr(10), 'Flip it. ' + at(e) + ' is ' + (tenX ? 'bigger' : 'smaller') + ' than ' + at(e2) + '.']] };
  }

  MODULES.decimals = {
    n: 6, tier: 'Place Value & Decimals', sym: '.5', title: 'Decimal Operations', std: 'NC.5.NBT.7', desc: '+ − × ÷ with decimals to hundredths.',
    levels: [
      { name: 'Add and subtract', make: decAddSub },
      { name: 'Decimal × whole number', make: function () { var a = rdec([0, 9], R(1, 2)), b = R(2, 9); return decMul(a, b * SC); } },
      { name: 'Decimal × decimal (tenths)', make: function () { return decMul(R(1, 9) * SC + R(1, 9) * 100, R(1, 9) * 100 + (Math.random() < 0.4 ? R(1, 5) * SC : 0)); } },
      { name: 'Divide decimals', make: decDiv }
    ]
  };
  function decAddSub() {
    var a = rdec([0, 49], R(1, 2)), b = rdec([0, 49], R(1, 2)), add = Math.random() < 0.55;
    if (!add && b > a) { var t = a; a = b; b = t; }
    var v = add ? a + b : a - b, sa = dshow(a), sb = dshow(b);
    // misalignment mistake: line up last digits instead of decimal points
    var pa = (sa.split('.')[1] || '').length, pb = (sb.split('.')[1] || '').length, errs = [];
    if (pa !== pb) {
      var ia = +sa.replace(/[.,]/g, ''), ib = +sb.replace(/[.,]/g, ''), pmax = Math.max(pa, pb);
      var bad = add ? ia + ib : ia - ib; if (bad > 0) errs.push([fr(bad, Math.pow(10, pmax)), 'Line up the <b>decimal points</b>, not the last digits. Add a zero so both numbers have ' + pmax + ' decimal places.']);
    }
    return { q: sa + (add ? ' + ' : ' ' + M + ' ') + sb, kind: 'num', keys: 'dec', ans: dfr(v), errs: errs,
      hint: 'Line up the decimal points. Write ' + (pa < pb ? sa + '0' : pb < pa ? sb + '0' : 'the numbers') + (pa !== pb ? ' so both have the same number of places.' : ' one above the other.'),
      steps: ['Line up the decimal points (add zeros if you need them).', sa + (add ? ' + ' : ' ' + M + ' ') + sb + ' = <b>' + dshow(v) + '</b>', 'Check: does your answer make sense? ' + (add ? 'It should be bigger than both numbers.' : 'It should be smaller than ' + sa + '.')] };
  }
  function decMul(a, b) {
    var v = fmul(dfr(a), dfr(b)), sa = dshow(a), sb = dshow(b);
    var pl = function (s) { return (s.split('.')[1] || '').length; }, places = pl(sa) + pl(sb);
    var whole = +sa.replace(/[.,]/g, '') * +sb.replace(/[.,]/g, '');
    var shown = v[1] === 1 ? N(v[0]) : dshow(v[0] * SC / v[1]);
    return { q: sa + ' ' + X + ' ' + sb, kind: 'num', keys: 'dec', ans: v,
      hint: 'Multiply like whole numbers: ' + sa.replace(/[.,]/g, '').replace(/^0+/, '') + ' ' + X + ' ' + sb.replace(/[.,]/g, '').replace(/^0+/, '') + '. Then count the decimal places in the problem.',
      steps: ['Multiply without the decimal points: ' + N(+sa.replace(/[.,]/g, '')) + ' ' + X + ' ' + N(+sb.replace(/[.,]/g, '')) + ' = ' + N(whole) + '.', 'The problem has ' + places + ' decimal place' + (places === 1 ? '' : 's') + ' in all, so the answer has ' + places + '.', sa + ' ' + X + ' ' + sb + ' = <b>' + shown + '</b>. Estimate to check: about ' + Math.round(a / SC) + ' ' + X + ' ' + Math.round(b / SC * 10) / 10 + '.'],
      errs: [[fr(whole), 'You forgot to put the decimal point back. Count the decimal places in the problem.'], [fr(whole, Math.pow(10, places + 1)), 'Too many decimal places. Count again: ' + places + '.'], [fr(whole, Math.pow(10, Math.max(0, places - 1))), 'Not enough decimal places. The problem has ' + places + '.']] };
  }
  function decDiv() {
    if (Math.random() < 0.6) {   // decimal ÷ whole number, exact to hundredths
      var d = R(2, 9), q = R(11, 299), n = d * q;   // n and q in hundredths
      var sn = dshow(n * 10), sq = dshow(q * 10);
      return { q: sn + ' ' + D + ' ' + d, kind: 'num', keys: 'dec', ans: fr(q, 100), hint: 'Divide like whole numbers: ' + n + ' ' + D + ' ' + d + '. Keep the decimal point in the same place.',
        steps: ['Think of ' + sn + ' as ' + n + ' hundredths.', n + ' hundredths ' + D + ' ' + d + ' = ' + q + ' hundredths.', q + ' hundredths = <b>' + sq + '</b>.'],
        errs: [[fr(q), 'You lost the decimal point. The answer is ' + q + ' <b>hundredths</b>.'], [fr(q, 10), 'Check the decimal places: the answer is in hundredths.']] };
    }
    var w = R(1, 12), t = pick([[1, 10], [1, 2], [1, 5], [1, 4]]), ds = { '1/10': '0.1', '1/2': '0.5', '1/5': '0.2', '1/4': '0.25' }[t[0] + '/' + t[1]];
    var ans = fr(w * t[1]);
    return { q: w + ' ' + D + ' ' + ds, kind: 'num', keys: 'dec', ans: ans, hint: 'How many ' + ds + 's fit in ' + w + '? There are ' + t[1] + ' of them in each 1.',
      steps: ['There are ' + t[1] + ' groups of ' + ds + ' in 1 whole.', 'In ' + w + ' wholes there are ' + w + ' ' + X + ' ' + t[1] + ' groups.', w + ' ' + D + ' ' + ds + ' = <b>' + ans[0] + '</b>. Dividing by a number less than 1 gives a bigger answer!'],
      errs: [[fr(w, t[1]), 'You multiplied by ' + ds + '. Dividing by a number less than 1 makes the answer bigger.']] };
  }

  MODULES.fracbasics = {
    n: 7, tier: 'Fractions', sym: '½', title: 'Fraction Basics', std: 'Supports NC.5.NF.1 · NC.5.NF.3', desc: 'Equivalent fractions, simplest form, mixed numbers.',
    levels: [
      { name: 'Equivalent fractions', make: function () { var d = R(2, 9), n = R(1, d - 1), k = R(2, 6); var g = gcd(n, d); n /= g; d /= g; return { q: 'Find the missing number.<div class="big">' + fhtml([n, d]) + ' = ' + '<span class="fx"><span>?</span><span>' + d * k + '</span></span></div>', kind: 'num', ans: fr(n * k), hint: 'What did you multiply ' + d + ' by to get ' + d * k + '? Do the same to the top.', steps: [d + ' ' + X + ' ' + k + ' = ' + d * k + '.', 'Multiply the numerator by ' + k + ' too: ' + n + ' ' + X + ' ' + k + ' = <b>' + n * k + '</b>.'], errs: [[fr(n + (d * k - d)), 'You added. Equivalent fractions multiply the top and bottom by the same number.']] }; } },
      { name: 'Simplest form', make: function () { var d = R(2, 9), n = R(1, d - 1), g = gcd(n, d); n /= g; d /= g; var k = R(2, 6); return { q: 'Write in simplest form.<div class="big">' + fhtml([n * k, d * k], true) + '</div>', kind: 'num', keys: 'frac', simplest: true, ans: fr(n, d), hint: 'Find a number that divides both ' + n * k + ' and ' + d * k + '. Try ' + k + '.', steps: ['The biggest number that divides both ' + n * k + ' and ' + d * k + ' is ' + gcd(n * k, d * k) + '.', (n * k) + ' ' + D + ' ' + gcd(n * k, d * k) + ' = ' + n + ' and ' + (d * k) + ' ' + D + ' ' + gcd(n * k, d * k) + ' = ' + d + '.', 'Simplest form: <b>' + n + '/' + d + '</b>.'] }; } },
      { name: 'Improper fraction → mixed number', make: function () { var d = R(2, 9), w = R(1, 6), n = R(1, d - 1), top = w * d + n; return { q: 'Write as a mixed number.<div class="big">' + fhtml([top, d], true) + '</div>', kind: 'num', keys: 'frac', mixedOnly: true, ans: fr(top, d), hint: 'How many groups of ' + d + ' are in ' + top + '? What is left over?', steps: [top + ' ' + D + ' ' + d + ' = ' + w + ' with ' + n + ' left over.', 'So ' + top + '/' + d + ' = <b>' + w + ' ' + n + '/' + d + '</b>.', 'Type it like this: ' + w + ' ' + n + '/' + d + ' (a space after the whole number).'] }; } },
      { name: 'Mixed number → improper fraction', make: function () { var d = R(2, 9), w = R(1, 6), n = R(1, d - 1), top = w * d + n; return { q: 'Write as a fraction greater than 1.<div class="big">' + fhtml([top, d]) + '</div>', kind: 'num', keys: 'frac', improperOnly: true, ans: fr(top, d), hint: w + ' wholes = ' + w + ' ' + X + ' ' + d + ' = ' + (w * d) + ' pieces. Add the ' + n + ' extra pieces.', steps: [w + ' ' + X + ' ' + d + ' = ' + (w * d) + '.', (w * d) + ' + ' + n + ' = ' + top + '.', 'So ' + w + ' ' + n + '/' + d + ' = <b>' + top + '/' + d + '</b>.'], errs: [[fr(w * n + d, d), 'Multiply the whole number by the denominator (' + w + ' ' + X + ' ' + d + '), then add the numerator.']] }; } }
    ]
  };

  MODULES.fracops = {
    n: 8, tier: 'Fractions', sym: '⅓+¼', title: 'Fraction Operations', std: 'NC.5.NF.1 · NC.5.NF.4 · NC.5.NF.7', desc: 'Add, subtract, multiply, and divide unit fractions.',
    levels: [
      { name: 'Add & subtract (one denominator is a multiple)', make: function () { var d1 = pick([2, 3, 4, 5]), d2 = d1 * pick([2, 3]); return fAddSub(fr(R(1, d1 - 1), d1), fr(R(1, d2 - 1), d2), false); } },
      { name: 'Add & subtract (any unlike denominators, mixed numbers)', make: function () { var ds = [2, 3, 4, 5, 6, 8, 10, 12], d1 = pick(ds), d2 = pick(ds); while (d2 === d1) d2 = pick(ds); var a = fr(R(1, d1 - 1), d1); if (Math.random() < 0.5) a = fadd(a, fr(R(1, 4))); return fAddSub(a, fr(R(1, d2 - 1), d2), true); } },
      { name: 'Multiply fractions', make: fMul },
      { name: 'Divide with unit fractions', make: fDiv }
    ]
  };
  function fAddSub(a, b, mixedOk) {
    if (feq(a, b)) b = fr(1, a[1] * 2);
    var add = Math.random() < 0.6; if (Math.random() < 0.5) { var t = a; a = b; b = t; }
    if (!add && a[0] * b[1] < b[0] * a[1]) { t = a; a = b; b = t; }
    var v = add ? fadd(a, b) : fsub(a, b), L = a[1] * b[1] / gcd(a[1], b[1]);
    var bad = add ? fr(a[0] + b[0], a[1] + b[1]) : null;
    return { q: fhtml(a) + (add ? ' + ' : ' ' + M + ' ') + fhtml(b), kind: 'num', keys: 'frac', ans: v,
      hint: 'Find a common denominator. ' + L + ' works for both ' + a[1] + ' and ' + b[1] + '.',
      steps: ['A common denominator is ' + L + '.', fshow(a) + ' = ' + (a[0] * L / a[1]) + '/' + L + ' and ' + fshow(b) + ' = ' + (b[0] * L / b[1]) + '/' + L + '.', (a[0] * L / a[1]) + '/' + L + (add ? ' + ' : ' ' + M + ' ') + (b[0] * L / b[1]) + '/' + L + ' = ' + ((add ? a[0] * L / a[1] + b[0] * L / b[1] : a[0] * L / a[1] - b[0] * L / b[1])) + '/' + L + ' = <b>' + fshow(v) + '</b>'],
      errs: bad ? [[bad, 'You added the tops and the bottoms. Make the denominators the same first, then add only the numerators.']] : [] };
  }
  function fMul() {
    var k = R(0, 2), a, b, q;
    if (k === 0) { var d = pick([2, 3, 4, 5, 6, 8]), w = R(2, 12); a = fr(w); b = fr(R(1, d - 1), d); q = w + ' ' + X + ' ' + fhtml(b); }
    else if (k === 1) { a = fr(R(1, 5), pick([2, 3, 4, 5, 6])); b = fr(R(1, 5), pick([2, 3, 4, 5, 6, 8])); if (a[0] >= a[1]) a = fr(1, a[1] + 1); if (b[0] >= b[1]) b = fr(1, b[1] + 1); q = fhtml(a) + ' ' + X + ' ' + fhtml(b); }
    else { a = fadd(fr(R(1, 3)), fr(1, pick([2, 3, 4]))); b = fr(R(1, 3), 4); if (b[0] >= b[1]) b = fr(1, 2); q = fhtml(a) + ' ' + X + ' ' + fhtml(b); }
    var v = fmul(a, b);
    return { q: q, kind: 'num', keys: 'frac', ans: v, hint: k === 2 ? 'Change the mixed number to a fraction greater than 1 first.' : 'Multiply the numerators. Multiply the denominators.',
      steps: (k === 2 ? [fshow(a) + ' = ' + a[0] + '/' + a[1] + '.'] : []).concat([(a[1] === 1 ? a[0] + '/1' : a[0] + '/' + a[1]) + ' ' + X + ' ' + b[0] + '/' + b[1] + ' = ' + (a[0] * b[0]) + '/' + (a[1] * b[1]) + '.', 'Simplify: <b>' + fshow(v) + '</b>.']),
      errs: [[fr(a[0] * b[0], a[1] + b[1]), 'Multiply the denominators too — don’t add them.']] };
  }
  function fDiv() {
    var d = pick([2, 3, 4, 5, 6, 8]), w = R(2, 9);
    if (Math.random() < 0.5) {
      var v = fr(1, d * w);
      return { q: fhtml([1, d]) + ' ' + D + ' ' + w, kind: 'num', keys: 'frac', ans: v, hint: 'Share 1/' + d + ' into ' + w + ' equal parts. Each part is smaller.',
        steps: ['Split 1/' + d + ' into ' + w + ' equal parts.', 'Each part is 1/' + d + ' of 1/' + w + ', which is 1/' + (d * w) + '.', '1/' + d + ' ' + D + ' ' + w + ' = <b>1/' + (d * w) + '</b>.'],
        errs: [[fr(w, d), 'You multiplied. Sharing 1/' + d + ' into ' + w + ' parts makes each part smaller.']] };
    }
    return { q: w + ' ' + D + ' ' + fhtml([1, d]), kind: 'num', keys: 'frac', ans: fr(w * d), hint: 'How many 1/' + d + 's are in one whole? How many in ' + w + ' wholes?',
      steps: ['There are ' + d + ' pieces of size 1/' + d + ' in 1 whole.', 'In ' + w + ' wholes: ' + w + ' ' + X + ' ' + d + ' = ' + (w * d) + '.', w + ' ' + D + ' 1/' + d + ' = <b>' + (w * d) + '</b>.'],
      errs: [[fr(w, d), 'Dividing by 1/' + d + ' asks “how many 1/' + d + 's fit?” The answer should be bigger than ' + w + '.']] };
  }

  MODULES.oops = {
    n: 9, tier: 'Expressions & Volume', sym: '( )', title: 'Order of Operations', std: 'NC.5.OA.2', desc: 'Parentheses first, then × and ÷, then + and −.',
    levels: [
      { name: 'Two operations (no parentheses)', make: function () { return expr(2, false); } },
      { name: 'With parentheses', make: function () { return expr(2, true); } },
      { name: 'Three operations', make: function () { return expr(3, Math.random() < 0.7); } }
    ]
  };
  function expr(nOps, paren) {
    for (var tries = 0; tries < 200; tries++) {
      var tk = [R(2, 12)], ops = [];
      for (var i = 0; i < nOps; i++) { var o = pick(['+', M, X, D]); ops.push(o); tk.push(o, o === D ? pick([2, 3, 4, 5]) : R(2, 12)); }
      // make division exact by choosing the dividend to be a multiple
      for (i = 1; i < tk.length; i += 2) if (tk[i] === D) tk[i - 1] = tk[i + 1] * R(2, 9);
      if (paren) { var at = 2 * R(0, nOps - 1); tk.splice(at + 3, 0, ')'); tk.splice(at, 0, '('); }
      var hasMD = ops.some(function (x) { return x === X || x === D; }), hasAS = ops.some(function (x) { return x === '+' || x === M; });
      if (!hasMD || !hasAS) continue;
      var v = evalTokens(tk, false), lr = evalTokens(tk.filter(function (x) { return x !== '(' && x !== ')'; }), true);
      if (v <= 0 || v % 1 || v > 200) continue;
      if (!paren && lr === v) continue;
      if (paren && evalTokens(tk.filter(function (x) { return x !== '(' && x !== ')'; }), false) === v) continue; // parentheses must matter
      var stepsTxt = oopsSteps(tk); if (/= -|\.\d/.test(stepsTxt.join(' '))) continue;  // no negatives or decimals along the way
      var text = tkText(tk);
      var errs = []; if (lr !== v && lr >= 0 && lr % 1 === 0) errs.push([fr(lr), 'You worked left to right. Do ' + X + ' and ' + D + ' before + and ' + M + '.']);
      if (paren) { var np = evalTokens(tk.filter(function (x) { return x !== '(' && x !== ')'; }), false); if (np >= 0 && np % 1 === 0 && np !== v) errs.push([fr(np), 'Do the part in parentheses first.']); }
      return { q: '<div class="big">' + text + '</div>', kind: 'num', ans: fr(v), errs: errs, hint: paren ? 'Start inside the parentheses.' : 'Find the ' + X + ' or ' + D + ' first.', steps: stepsTxt };
    }
    return expr(nOps, !paren);
  }
  function oopsSteps(tk) {
    var a = tk.slice(), out = [], i, guard = 0;
    function op(x, o, y) { return o === '+' ? x + y : o === M ? x - y : o === X ? x * y : x / y; }
    while (a.length > 1 && guard++ < 20) {
      var lo = 0, hi = a.length - 1, lp = a.indexOf('(');
      if (lp >= 0) { lo = lp + 1; hi = a.indexOf(')', lp) - 1; }
      var k = -1; for (i = lo + 1; i <= hi; i += 2) if (a[i] === X || a[i] === D) { k = i; break; }
      if (k < 0) k = lo + 1;
      var r = op(a[k - 1], a[k], a[k + 1]);
      out.push(a[k - 1] + ' ' + a[k] + ' ' + a[k + 1] + ' = ' + r + (lp >= 0 ? ' (parentheses first)' : (a[k] === X || a[k] === D) ? ' (' + X + ' and ' + D + ' before + and ' + M + ')' : ''));
      a.splice(k - 1, 3, r);
      if (lp >= 0 && a[lp + 2] === ')') a.splice(lp, 3, a[lp + 1]);
      if (a.length > 1) out[out.length - 1] += ' → ' + tkText(a);
    }
    out[out.length - 1] = out[out.length - 1].replace(/= (\d+)/, '= <b>$1</b>');
    return out;
  }

  MODULES.volume = {
    n: 10, tier: 'Expressions & Volume', sym: '▣', title: 'Volume', std: 'NC.5.MD.4 · NC.5.MD.5', desc: 'V = l × w × h, V = B × h, and two-box figures.',
    levels: [
      { name: 'V = l × w × h', make: function () { var l = R(2, 9), w = R(2, 6), h = R(2, 6); return vol(l, w, h, 'lwh'); } },
      { name: 'V = B × h', make: function () { var l = R(2, 10), w = R(2, 8), h = R(2, 9); return vol(l, w, h, 'Bh'); } },
      { name: 'Missing side', make: function () { var l = R(2, 9), w = R(2, 6), h = R(2, 8); return vol(l, w, h, 'missing'); } },
      { name: 'Two boxes together', make: function () { var a = [R(2, 8), R(2, 5), R(2, 5)], b = [R(2, 6), R(2, 5), R(2, 4)]; var va = a[0] * a[1] * a[2], vb = b[0] * b[1] * b[2]; return { q: 'A figure is made of two boxes: ' + a.join(' × ') + ' and ' + b.join(' × ') + ' (in cm). What is the total volume?', fig: boxSVG(a[0], a[1], a[2], [a[0] + ' cm', a[1] + ' cm', a[2] + ' cm']) + boxSVG(b[0], b[1], b[2], [b[0] + ' cm', b[1] + ' cm', b[2] + ' cm']), kind: 'num', unit: 'cubic cm', ans: fr(va + vb), hint: 'Find the volume of each box. Then add.', steps: ['Box 1: ' + a.join(' × ') + ' = ' + va + '.', 'Box 2: ' + b.join(' × ') + ' = ' + vb + '.', va + ' + ' + vb + ' = <b>' + (va + vb) + '</b> cubic cm.'], errs: [[fr(va), 'That is only the first box. Add the second box too.'], [fr(vb), 'That is only the second box. Add the first box too.']] }; } }
    ]
  };
  function vol(l, w, h, type) {
    var V = l * w * h, B = l * w;
    if (type === 'Bh') return { q: 'The base of a prism has an area of <b>' + B + ' square cm</b>. The height is <b>' + h + ' cm</b>. What is the volume?', kind: 'num', unit: 'cubic cm', ans: fr(V), hint: 'V = B × h. Multiply the area of the base by the height.', steps: ['V = B ' + X + ' h', 'V = ' + B + ' ' + X + ' ' + h + ' = <b>' + V + '</b> cubic cm.'], errs: [[fr(B + h), 'You added. Volume multiplies: B ' + X + ' h.']] };
    if (type === 'missing') return { q: 'A box has a volume of <b>' + V + ' cubic cm</b>. It is ' + l + ' cm long and ' + w + ' cm wide. How tall is it?', fig: boxSVG(l, w, h, [l + ' cm', w + ' cm', '? cm']), kind: 'num', unit: 'cm', ans: fr(h), hint: 'Find the area of the base first: ' + l + ' ' + X + ' ' + w + '. Then think: base ' + X + ' ? = ' + V + '.', steps: ['Base: ' + l + ' ' + X + ' ' + w + ' = ' + B + ' square cm.', B + ' ' + X + ' ? = ' + V + '.', V + ' ' + D + ' ' + B + ' = <b>' + h + '</b> cm.'] };
    return { q: 'What is the volume of the box?', fig: boxSVG(l, w, h, [l + ' cm', w + ' cm', h + ' cm']), kind: 'num', unit: 'cubic cm', ans: fr(V), hint: 'Multiply length × width × height.', steps: ['Base layer: ' + l + ' ' + X + ' ' + w + ' = ' + B + ' cubes.', h + ' layers: ' + B + ' ' + X + ' ' + h + ' = <b>' + V + '</b> cubic cm.'], errs: [[fr(l + w + h), 'You added the sides. Volume multiplies them.'], [fr(B), 'That is just one layer (the base). Multiply by the height too.']] };
  }

  var ORDER = ['facts', 'divfacts', 'multiply', 'divide', 'placevalue', 'decimals', 'fracbasics', 'fracops', 'oops', 'volume'];
  // Never let a "common mistake" match the real answer (for example 0 × 5 and 0 × 4 are both 0).
  ORDER.forEach(function (id) { MODULES[id].levels.forEach(function (L) { var mk = L.make; L.make = function () { var p = mk(); if (p.errs && p.kind !== 'qr' && p.kind !== 'choice') p.errs = p.errs.filter(function (e) { return !feq(e[0], p.ans); }); return p; }; }); });

  /* =========================================================================
     CHECKING AN ANSWER
     returns {ok, msg} — msg names the mistake when we can tell what it is
     ========================================================================= */
  function judge(p, vals) {
    if (p.kind === 'choice') return { ok: vals[0] === p.ans };
    if (p.kind === 'qr') {
      var q = raw(vals[0]), r = raw(vals[1]);
      if (!q || !r) return { ok: false, format: 'Type a whole number in both boxes.' };
      var Q = q.f[0] / q.f[1], Rr = r.f[0] / r.f[1], d = +p.q.split(D)[1].replace(/[^\d]/g, '');
      if (Q === p.ans[0] && Rr === p.ans[1]) return { ok: true };
      if (Rr >= d) return { ok: false, msg: 'Your remainder (' + Rr + ') is ' + (Rr === d ? 'equal to' : 'bigger than') + ' the divisor (' + d + '). You can make another group.' };
      if (Q === p.ans[0]) return { ok: false, msg: 'The quotient is right! Check the remainder: what is left after ' + d + ' ' + X + ' ' + N(Q) + '?' };
      if (Rr === p.ans[1]) return { ok: false, msg: 'The remainder is right. Check the quotient.' };
      return { ok: false };
    }
    var a = raw(vals[0]);
    if (!a) return { ok: false, format: 'Type a number, a fraction like 3/4, or a mixed number like 2 1/3.' };
    if (!feq(a.f, p.ans)) {
      var e = (p.errs || []).filter(function (x) { return feq(a.f, x[0]); })[0];
      return { ok: false, msg: e ? e[1] : null };
    }
    if (p.simplest && !simplest(a)) return { ok: false, msg: 'That is equal, but it is not in simplest form yet. Divide the top and bottom by the same number again.' };
    if (p.mixedOnly && !(a.mixed || a.d === 1)) return { ok: false, msg: 'That is equal, but write it as a <b>mixed number</b>, like 2 1/3.' };
    if (p.improperOnly && a.mixed) return { ok: false, msg: 'That is equal, but write it as a fraction greater than 1, like 7/3.' };
    var note = '';
    if (a.d > 1 && !a.dec && (gcd(a.n, a.d) > 1)) note = 'Equal! In simplest form it is ' + fshow(p.ans) + '.';
    else if (a.d > 1 && !a.dec && !a.mixed && a.n > a.d) note = 'Equal! As a mixed number it is ' + fshow(p.ans) + '.';
    return { ok: true, note: note };
  }
  function answerText(p) {
    if (p.kind === 'choice') return p.choices[p.ans];
    if (p.kind === 'qr') return N(p.ans[0]) + ' R ' + p.ans[1];
    var f = p.ans; return (f[1] === 1 ? N(f[0]) : (p.keys === 'dec' && [2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 500, 1000].indexOf(f[1]) >= 0 && SC % f[1] === 0 ? dshow(f[0] * SC / f[1]) : fshow(f))) + (p.unit ? ' ' + p.unit : '');
  }

  /* =========================================================================
     UI pieces
     ========================================================================= */
  function inputArea(p, onEnter) {
    var w;
    if (p.kind === 'choice') {
      w = el('<div class="fl-choices">' + p.choices.map(function (c, i) { return '<button type="button" class="fl-ch" data-i="' + i + '">' + c + '</button>'; }).join('') + '</div>');
      var sel = -1;
      $$('.fl-ch', w).forEach(function (b) { b.onclick = function () { if (w.dataset.lock) return; sel = +b.dataset.i; $$('.fl-ch', w).forEach(function (x) { x.classList.toggle('sel', x === b); }); if (onEnter) onEnter(); }; });
      w.values = function () { return [sel]; }; w.filled = function () { return sel >= 0; };
      w.lock = function () { w.dataset.lock = 1; }; w.clear = function () { sel = -1; $$('.fl-ch', w).forEach(function (x) { x.classList.remove('sel'); }); };
      return w;
    }
    if (p.kind === 'qr') {
      w = el('<div class="fl-qr"><label>Quotient <input class="fl-in" inputmode="numeric" autocomplete="off" aria-label="quotient"></label><span class="fl-r">R</span><label>Remainder <input class="fl-in sm" inputmode="numeric" autocomplete="off" aria-label="remainder"></label></div>');
    } else if (p.kind === 'steps') {
      w = el('<div class="fl-steps">' + p.rows.map(function (r, i) { return '<label class="fl-row"><span>' + r.label + '</span><input class="fl-in" inputmode="numeric" autocomplete="off" aria-label="' + r.label.replace(/<[^>]+>/g, '') + '" data-r="' + i + '"></label>'; }).join('') + '</div>');
    } else {
      w = el('<div class="fl-one"><input class="fl-in" ' + (p.keys === 'frac' ? 'inputmode="text"' : p.keys === 'dec' ? 'inputmode="decimal"' : 'inputmode="numeric"') + ' autocomplete="off" spellcheck="false" aria-label="Your answer">' + (p.unit ? '<span class="fl-unit">' + p.unit + '</span>' : '') + '</div>');
    }
    var ins = $$('input', w), focus = ins[0];
    ins.forEach(function (inp, i) { inp.addEventListener('focus', function () { focus = inp; }); inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); if (ins[i + 1] && !ins[i + 1].value) ins[i + 1].focus(); else if (onEnter) onEnter(); } }); });
    var keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if (p.keys === 'dec') keys.push('.');
    if (p.keys === 'frac') keys.push('/', '␣');
    var pad = el('<div class="fl-pad" aria-label="Number keys">' + keys.map(function (k) { return '<button type="button" data-k="' + k + '" aria-label="' + (k === '␣' ? 'space (for mixed numbers)' : k === '/' ? 'fraction bar' : k) + '">' + k + '</button>'; }).join('') + '<button type="button" data-k="del" aria-label="delete">⌫</button></div>');
    $$('button', pad).forEach(function (b) { b.onclick = function () { if (w.dataset.lock) return; var k = b.dataset.k; if (k === 'del') focus.value = focus.value.slice(0, -1); else focus.value += (k === '␣' ? ' ' : k); focus.focus({ preventScroll: true }); }; });
    w.appendChild(pad);
    w.values = function () { return ins.map(function (i) { return i.value; }); };
    w.filled = function () { return ins.every(function (i) { return i.value.trim() !== ''; }); };
    w.lock = function () { w.dataset.lock = 1; ins.forEach(function (i) { i.disabled = true; }); };
    w.clear = function () { ins.forEach(function (i) { i.value = ''; }); };
    w.focus = function () { if (window.matchMedia('(pointer:fine)').matches) ins[0].focus({ preventScroll: true }); };
    w.inputs = ins;
    return w;
  }

  // Bare math problems (like 47 × 8) show big; word problems use normal text.
  function qcls(p) { return /[a-z]{3,}/i.test(p.q.replace(/<[^>]+>/g, '')) ? '' : ' expr'; }

  /* ---------- PRACTICE ---------- */
  function practice(root, key, mod) {
    var lvKey = key + ':lv', level = Math.min(get(lvKey, 0), mod.levels.length - 1);
    root.innerHTML = '<div class="fl-levels" role="group" aria-label="Level">' + mod.levels.map(function (L, i) {
      var best = get(key + ':best' + i, null);
      return '<button type="button" class="fl-lv" data-i="' + i + '" aria-pressed="' + (i === level) + '"><b>Level ' + (i + 1) + '</b><span>' + L.name + '</span><i>' + (best ? '★ best ' + best + '/10' : '') + '</i></button>';
    }).join('') + '</div><div class="fl-stage"></div>';
    $$('.fl-lv', root).forEach(function (b) { b.onclick = function () { level = +b.dataset.i; put(lvKey, level); $$('.fl-lv', root).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); start(); }; });
    var stage = $('.fl-stage', root);
    var SET = 10, idx, first, streak, bestStreak, results;
    function start() { idx = 0; first = 0; streak = 0; bestStreak = 0; results = []; next(); }
    function hud() {
      return '<div class="fl-hud"><div class="fl-dots" aria-label="Problem ' + (idx + 1) + ' of ' + SET + '">' + Array.apply(null, Array(SET)).map(function (_, i) { return '<i class="' + (results[i] === 1 ? 'ok' : results[i] === 0 ? 'no' : i === idx ? 'now' : '') + '"></i>'; }).join('') + '</div><div class="fl-streak" title="Right on the first try in a row">🔥 ' + streak + '</div></div>';
    }
    function next() {
      if (idx >= SET) return finish();
      var p = mod.levels[level].make(), tries = 0, hinted = false;
      stage.innerHTML = hud() + '<div class="fl-card"><div class="fl-qn">Level ' + (level + 1) + ' · Problem ' + (idx + 1) + ' of ' + SET + '</div><div class="fl-q' + qcls(p) + '">' + p.q + '</div>' + (p.fig ? '<div class="fl-fig">' + p.fig + '</div>' : '') + '<div class="fl-in-wrap"></div>' +
        '<div class="fl-btns"><button class="fl-btn go" type="button">Check</button><button class="fl-btn ghost hint" type="button">Hint</button></div><div class="fl-fb" aria-live="polite"></div></div>';
      var area = inputArea(p, function () { if (p.kind !== 'choice') check(); });
      $('.fl-in-wrap', stage).appendChild(area); if (area.focus) area.focus();
      var fb = $('.fl-fb', stage), go = $('.go', stage), hb = $('.hint', stage);
      hb.onclick = function () { hinted = true; fb.className = 'fl-fb hint show'; fb.innerHTML = '<b>Hint:</b> ' + p.hint; };
      function check() {
        if (go.dataset.next) { idx++; next(); return; }
        if (!area.filled()) { fb.className = 'fl-fb hint show'; fb.textContent = p.kind === 'qr' ? 'Fill in the quotient and the remainder.' : p.kind === 'steps' ? 'Fill in every row.' : 'Type your answer first.'; return; }
        var res;
        if (p.kind === 'steps') {
          var vals = area.values(), rowsOk = p.rows.map(function (r, i) { var a = raw(vals[i]); return !!a && feq(a.f, r.ans); });
          area.inputs.forEach(function (inp, i) { inp.classList.toggle('ok', rowsOk[i]); inp.classList.toggle('no', !rowsOk[i]); });
          var lastV = raw(vals[vals.length - 1]);
          var e = lastV && (p.errs || []).filter(function (x) { return feq(lastV.f, x[0]); })[0];
          res = { ok: rowsOk.every(Boolean), msg: !rowsOk[0] ? 'Row 1 is not right yet: ' + p.rows[0].label.split(':')[1] + '.' : !rowsOk[1] ? (e ? e[1] : 'Row 2 is not right yet. Remember the zero in the ones place.') : !rowsOk[2] ? 'Your rows are right! Check your adding.' : null };
        } else res = judge(p, area.values());
        if (res.format) { fb.className = 'fl-fb hint show'; fb.textContent = res.format; return; }
        tries++;
        if (res.ok) {
          if (tries === 1 && !hinted) { first++; streak++; bestStreak = Math.max(bestStreak, streak); results[idx] = 1; } else { streak = 0; results[idx] = 0; }
          fb.className = 'fl-fb ok show'; fb.innerHTML = '<b>' + pick(['Yes!', 'Correct!', 'Nice work!', 'You got it!']) + '</b> ' + (res.note || '') + (tries > 1 || hinted ? ' Next time, try it without help.' : streak >= 3 ? ' 🔥 ' + streak + ' in a row!' : '');
          done();
        } else if (tries === 1) {
          streak = 0;
          fb.className = 'fl-fb no show'; fb.innerHTML = '<b>Not yet.</b> ' + (res.msg || 'Try again.') + (res.msg ? '' : ' <span class="fl-sub">Hint: ' + p.hint + '</span>');
          if (p.kind === 'choice') area.clear();
        } else {
          results[idx] = 0; streak = 0;
          fb.className = 'fl-fb no show'; fb.innerHTML = '<b>Here’s how.</b> The answer is <b>' + answerText(p) + '</b>.<ol class="fl-worked">' + p.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';
          done();
        }
        $('.fl-hud', stage).outerHTML = hud();
      }
      function done() { area.lock(); hb.remove(); go.textContent = idx + 1 < SET ? 'Next problem →' : 'See my results'; go.dataset.next = 1; go.focus({ preventScroll: true }); }
      go.onclick = check;
    }
    function finish() {
      var bk = key + ':best' + level, best = get(bk, 0); if (first > best) put(bk, first);
      var msg = first >= 9 ? (level + 1 < mod.levels.length ? 'You’re ready for <b>Level ' + (level + 2) + '</b>!' : 'You’ve mastered every level. Take the Skill Check!') : first >= 7 ? 'Almost there. Do one more set at this level.' : 'Keep practicing this level. Use the hints and read the steps.';
      stage.innerHTML = '<div class="fl-card fl-done"><div class="fl-big">' + first + ' / ' + SET + '</div><p>right on the first try</p><p>Best streak: 🔥 ' + bestStreak + '</p><p>' + msg + '</p>' +
        '<div class="fl-btns" style="justify-content:center"><button class="fl-btn go" type="button" data-a="again">Go again</button>' + (first >= 9 && level + 1 < mod.levels.length ? '<button class="fl-btn ghost" type="button" data-a="up">Level ' + (level + 2) + ' →</button>' : '') + '<a class="fl-btn ghost" href="?check">Take the Skill Check</a></div></div>';
      $('[data-a=again]', stage).onclick = start;
      var up = $('[data-a=up]', stage); if (up) up.onclick = function () { $$('.fl-lv', root)[level + 1].click(); };
      $$('.fl-lv i', root)[level].textContent = '★ best ' + Math.max(first, best) + '/10';
    }
    start();
  }

  /* ---------- SKILL CHECK ---------- */
  function skillCheck(root, key, mod) {
    var probs = [], per = Math.ceil(10 / mod.levels.length);
    for (var i = 0; i < 10; i++) { var lv = Math.min(mod.levels.length - 1, Math.floor(i / per)); var p = mod.levels[lv].make(); if (p.kind === 'steps') { p = Object.assign({}, p, { kind: 'num' }); } p.lv = lv; probs.push(p); }
    root.innerHTML = '<p class="fl-lead">10 problems. Answer them all, then press <b>Check my answers</b>. No hints on the Skill Check — show what you know!</p><div class="fl-list"></div><div class="fl-btns"><button class="fl-btn go" type="button">Check my answers</button><span class="fl-m"></span></div><div class="fl-result" aria-live="polite"></div>';
    var list = $('.fl-list', root), areas = probs.map(function (p, i) {
      var c = el('<div class="fl-card"><div class="fl-qn">' + (i + 1) + ' of 10 · ' + mod.levels[p.lv].name + '</div><div class="fl-q' + qcls(p) + '">' + p.q + '</div>' + (p.fig ? '<div class="fl-fig">' + p.fig + '</div>' : '') + '<div class="fl-in-wrap"></div><div class="fl-fb"></div></div>');
      var a = inputArea(p); $('.fl-in-wrap', c).appendChild(a); list.appendChild(c); a.card = c; return a;
    });
    var go = $('.go', root), m = $('.fl-m', root);
    go.onclick = function () {
      if (go.dataset.again) { skillCheck(root, key, mod); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      var left = areas.filter(function (a) { return !a.filled(); }).length;
      if (left) { m.textContent = 'Answer every problem first (' + left + ' left).'; return; }
      m.textContent = '';
      var right = 0, byLv = mod.levels.map(function () { return [0, 0]; });
      probs.forEach(function (p, i) {
        var r = judge(p, areas[i].values()), fb = $('.fl-fb', areas[i].card); areas[i].lock();
        byLv[p.lv][1]++; if (r.ok) { right++; byLv[p.lv][0]++; }
        fb.className = 'fl-fb show ' + (r.ok ? 'ok' : 'no');
        fb.innerHTML = r.ok ? '<b>Correct.</b>' : '<b>Not quite.</b> ' + (r.msg ? r.msg + ' ' : '') + 'The answer is <b>' + answerText(p) + '</b>.<ol class="fl-worked">' + p.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';
      });
      put(key + ':check', { right: right, when: Date.now() });
      var res = $('.fl-result', root);
      res.innerHTML = '<div class="fl-card fl-done"><div class="fl-big">' + right + ' / 10</div><p>' + (right >= 9 ? 'Excellent! You are fluent with this module.' : right >= 7 ? 'Good work. Practice the levels below to get even stronger.' : 'Practice the levels below, then try the Skill Check again.') + '</p>' +
        '<table class="fl-tbl"><tr><th>Level</th><th>Score</th><th></th></tr>' + byLv.map(function (s, k) { var ok = s[0] === s[1]; return '<tr><td>' + (k + 1) + '. ' + mod.levels[k].name + '</td><td>' + s[0] + ' / ' + s[1] + '</td><td>' + (ok ? '<span class="fl-ok">Ready ✓</span>' : '<a href="?practice&level=' + (k + 1) + '">Practice →</a>') + '</td></tr>'; }).join('') + '</table></div>';
      go.textContent = 'Try a new Skill Check'; go.dataset.again = 1;
      res.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }

  /* ---------- PAGES ---------- */
  function modulePage(root, id) {
    var mod = MODULES[id]; if (!mod) { root.innerHTML = '<p>Module not found.</p>'; return; }
    var key = 'm:' + id, qs = location.search;
    var mode = /check/.test(qs) ? 'check' : 'practice';
    var lvq = qs.match(/level=(\d)/); if (lvq) put(key + ':lv', +lvq[1] - 1);
    document.title = mod.title + ' — Fluency Lab — Mrs. Tesnar\'s 5th Grade';
    root.innerHTML = '<div class="fl-wrap"><a class="fl-back" href="index.html">← All Fluency Lab modules</a>' +
      '<header class="fl-head"><div class="fl-sym">' + mod.sym + '</div><div><span class="fl-eyebrow">Fluency Lab · Module ' + mod.n + '</span><h1>' + mod.title + '</h1><p class="fl-std">' + mod.std + '</p></div></header>' +
      '<nav class="fl-tabs"><a href="?practice" aria-current="' + (mode === 'practice' ? 'page' : 'false') + '">Practice</a><a href="?check" aria-current="' + (mode === 'check' ? 'page' : 'false') + '">Skill Check</a></nav><div class="fl-body"></div></div>';
    var body = $('.fl-body', root);
    if (mode === 'check') skillCheck(body, key, mod); else practice(body, key, mod);
  }
  function hubPage(root) {
    var tiers = [];
    ORDER.forEach(function (id) { var m = MODULES[id]; if (tiers.indexOf(m.tier) < 0) tiers.push(m.tier); });
    root.innerHTML = tiers.map(function (t) {
      return '<div class="fl-tier"><h2>' + t + '</h2><span></span></div><div class="fl-grid">' + ORDER.filter(function (id) { return MODULES[id].tier === t; }).map(function (id) {
        var m = MODULES[id], k = 'm:' + id, stars = m.levels.map(function (_, i) { var b = get(k + ':best' + i, 0); return '<i class="' + (b >= 9 ? 'on' : b > 0 ? 'half' : '') + '" title="Level ' + (i + 1) + ': best ' + b + '/10"></i>'; }).join(''), ch = get(k + ':check', null);
        return '<div class="fl-mod"><div class="fl-mnum">Module ' + m.n + '</div><div class="fl-sym sm">' + m.sym + '</div><h3>' + m.title + '</h3><p>' + m.desc + '</p><p class="fl-std">' + m.std + '</p>' +
          '<div class="fl-stars" aria-label="Levels mastered">' + stars + (ch ? '<span>Skill Check ' + ch.right + '/10</span>' : '') + '</div>' +
          '<div class="fl-acts"><a class="fl-btn go" href="' + id + '.html">Practice</a><a class="fl-btn ghost" href="' + id + '.html?check">Skill Check</a></div></div>';
      }).join('') + '</div>';
    }).join('');
  }

  /* ---------- self-test: make many problems; every answer must check as right ---------- */
  function selfTest() {
    var bad = [];
    ORDER.forEach(function (id) {
      MODULES[id].levels.forEach(function (L, li) {
        for (var i = 0; i < 60; i++) {
          var p = L.make(), vals;
          if (p.kind === 'choice') vals = [p.ans];
          else if (p.kind === 'qr') vals = [String(p.ans[0]), String(p.ans[1])];
          else vals = [p.mixedOnly || (!p.improperOnly && p.ans[1] !== 1 && p.ans[0] > p.ans[1]) ? fshow(p.ans) : p.ans[1] === 1 ? String(p.ans[0]) : p.ans[0] + '/' + p.ans[1]];
          if (p.kind === 'qr' && (p.ans[1] < 0 || p.ans[1] >= +p.q.split(D)[1].replace(/[^\d]/g, ''))) bad.push(id + ' L' + (li + 1) + ' remainder too big');
          if (!judge(p, vals).ok) { bad.push(id + ' L' + (li + 1) + ': ' + p.q.replace(/<[^>]+>/g, '') + ' → ' + vals); break; }
          if (p.kind === 'steps') { var s = p.rows[0].ans[0] + p.rows[1].ans[0]; if (s !== p.ans[0]) bad.push(id + ' rows'); }
          (p.errs || []).forEach(function (e) { if (feq(e[0], p.ans)) bad.push(id + ' L' + (li + 1) + ': a mistake equals the answer for ' + p.q.replace(/<[^>]+>/g, '')); });
        }
      });
    });
    // exact helpers
    if (!feq(raw('2 1/3').f, [7, 3]) || !feq(raw('0.75').f, [3, 4]) || !feq(raw('1,250').f, [1250, 1])) bad.push('parse');
    if (evalTokens([3, '+', 4, X, 2]) !== 11 || evalTokens(['(', 3, '+', 4, ')', X, 2]) !== 14) bad.push('order of operations');
    if (bad.length) console.warn('Fluency Lab self-test:\n' + bad.slice(0, 20).join('\n'));
    return bad;
  }

  window.FluencyLab = {
    boot: function () {
      var root = document.getElementById('fl');
      if (!root) return;
      if (root.dataset.module) modulePage(root, root.dataset.module); else hubPage(root);
      selfTest();
    },
    selfTest: selfTest, modules: MODULES, order: ORDER, _judge: judge, _raw: raw
  };
})();
