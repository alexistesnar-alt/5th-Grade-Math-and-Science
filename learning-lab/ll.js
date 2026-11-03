/* Learning Lab — 5th grade fluency practice. Every answer is computed with exact
   arithmetic (fractions as [n, d]; decimals as integers scaled by 1,000,000). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var R = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var M = '−';

  // ── exact helpers ──
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } var g = gcd(n, d); return [n / g, d / g]; }
  function fadd(a, b) { return fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]); }
  function fsub(a, b) { return fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]); }
  function fmul(a, b) { return fr(a[0] * b[0], a[1] * b[1]); }
  function feq(a, b) { return a[0] * b[1] === b[0] * a[1]; }
  function fshow(f) {
    var n = f[0], d = f[1];
    if (d === 1) return String(n);
    if (Math.abs(n) > d) { var w = Math.trunc(n / d), r = Math.abs(n % d); return w + ' ' + r + '/' + d; }
    return n + '/' + d;
  }
  var SC = 1000000;   // decimals stored as integers × 1,000,000
  function dec(str) { var neg = str[0] === '-'; if (neg) str = str.slice(1); var p = str.split('.'); var f = (p[1] || '').padEnd(6, '0').slice(0, 6); var v = parseInt(p[0] || '0', 10) * SC + parseInt(f, 10); return neg ? -v : v; }
  function dshow(v) { var neg = v < 0; v = Math.abs(v); var w = Math.floor(v / SC), f = String(v % SC).padStart(6, '0').replace(/0+$/, ''); return (neg ? M : '') + w.toLocaleString('en-US') + (f ? '.' + f : ''); }
  function rdec(places) { var w = R(0, 99), f = R(1, Math.pow(10, places) - 1); return dec(w + '.' + String(f).padStart(places, '0')); }

  // Parse what a student typed: whole number, decimal, fraction, or mixed number ("2 1/3").
  function parse(s) {
    s = String(s).trim().replace(/,/g, '').replace(/−/g, '-').replace(/\s+/g, ' ');
    var m;
    if ((m = s.match(/^(-?\d+) (\d+)\/(\d+)$/))) { var w = parseInt(m[1], 10), n = parseInt(m[2], 10), d = parseInt(m[3], 10); if (!d) return null; return fr((Math.abs(w) * d + n) * (w < 0 ? -1 : 1), d); }
    if ((m = s.match(/^(-?\d+)\/(\d+)$/))) { var dd = parseInt(m[2], 10); return dd ? fr(parseInt(m[1], 10), dd) : null; }
    if ((m = s.match(/^-?\d*\.?\d+$/)) || (m = s.match(/^-?\d+\.$/))) { return fr(dec(s.replace(/\.$/, '')), SC); }
    return null;
  }

  // ── skills ── each make(level) returns {q (html), ans: [n,d] | string, kind: 'num'|'choice'|'rem', choices?, why}
  var SKILLS = {
    mult: { name: 'Multiplication facts', std: 'NC.3.OA.7 · supports NC.5.NBT.5', blurb: 'Products of 0–12. The base for multi-digit multiplication.', facts: true,
      make: function (lv, focus) { var a = focus || R(2, lv === 1 ? 9 : 12), b = R(lv === 1 ? 1 : 2, 12); if (Math.random() < .5) { var t = a; a = b; b = t; }
        return { q: a + ' × ' + b, ans: fr(a * b, 1), why: a + ' × ' + b + ' = ' + (a * b) }; } },
    div: { name: 'Division facts', std: 'NC.3.OA.7 · supports NC.5.NBT.6', blurb: 'Use multiplication facts to divide.', facts: true,
      make: function (lv, focus) { var a = focus || R(2, lv === 1 ? 9 : 12), b = R(1, 12); return { q: (a * b) + ' ÷ ' + a, ans: fr(b, 1), why: a + ' × ' + b + ' = ' + (a * b) + ', so ' + (a * b) + ' ÷ ' + a + ' = ' + b }; } },
    multidigit: { name: 'Multi-digit multiplication', std: 'NC.5.NBT.5', blurb: 'Multiply with the standard algorithm.',
      make: function (lv) { var a = lv === 1 ? R(12, 99) : lv === 2 ? R(102, 999) : R(1002, 4999), b = lv === 1 ? R(3, 9) : R(12, 89);
        var parts = []; String(b).split('').reverse().forEach(function (d, i) { if (+d) parts.push(a + ' × ' + (+d * Math.pow(10, i)) + ' = ' + (a * d * Math.pow(10, i)).toLocaleString('en-US')); });
        return { q: a.toLocaleString('en-US') + ' × ' + b, ans: fr(a * b, 1), why: parts.join('; ') + '. Add: ' + (a * b).toLocaleString('en-US') }; } },
    divrem: { name: 'Division with remainders', std: 'NC.5.NBT.6', blurb: 'Up to four-digit dividends and two-digit divisors. Type the quotient and the remainder.', kind: 'rem',
      make: function (lv) { var d = lv === 1 ? R(3, 9) : R(11, lv === 2 ? 25 : 60), q = lv === 1 ? R(12, 199) : R(21, Math.floor(9999 / d)), r = R(0, d - 1), n = d * q + r;
        return { q: n.toLocaleString('en-US') + ' ÷ ' + d, ans: [q, r], why: d + ' × ' + q + ' = ' + (d * q).toLocaleString('en-US') + ', and ' + n.toLocaleString('en-US') + ' ' + M + ' ' + (d * q).toLocaleString('en-US') + ' = ' + r + ' left over' }; } },
    pow10: { name: 'Powers of 10', std: 'NC.5.NBT.1', blurb: 'Multiply and divide by 10, 100 and 1,000.',
      make: function (lv) { var p = pick([10, 100, 1000].slice(0, lv === 1 ? 2 : 3)), x = lv === 1 ? dec(String(R(1, 99) / 10)) : rdec(lv === 2 ? 2 : 3);
        var mul = Math.random() < .5, v = mul ? x * p : x / p; if (!mul && v % 1) return SKILLS.pow10.make(lv);
        var k = String(p).length - 1;
        return { q: dshow(x) + (mul ? ' × ' : ' ÷ ') + p.toLocaleString('en-US'), ans: fr(v, SC), why: (mul ? 'Multiplying' : 'Dividing') + ' by ' + p.toLocaleString('en-US') + ' moves each digit ' + k + ' place' + (k > 1 ? 's' : '') + (mul ? ' to the left' : ' to the right') + ': ' + dshow(v) }; } },
    cmpdec: { name: 'Compare decimals', std: 'NC.5.NBT.3', blurb: 'Choose >, < or = for decimals to the thousandths.', kind: 'choice',
      make: function (lv) {
        var a, b, t = R(0, 3);
        if (t === 0) { a = dec('0.' + R(1, 9)); b = dec('0.' + R(10, 99)); }                     // 0.5 vs 0.45 type
        else if (t === 1) { var s = R(1, 9) + '.' + R(1, 9); a = dec(s); b = dec(s + '0'); }       // equal: 3.4 vs 3.40
        else if (t === 2) { a = rdec(3); b = a + pick([1, -1, 10, -10, 100, -100]) * 1000; if (b < 0) b = a + 1000; }
        else { a = rdec(2); b = rdec(3); }
        if (Math.random() < .5) { var tmp = a; a = b; b = tmp; }
        var c = a > b ? '>' : a < b ? '<' : '=';
        return { q: dshow(a) + ' ___ ' + dshow(b), ans: c, choices: ['>', '<', '='], why: 'Line up the decimal points and compare place by place: ' + dshow(a) + ' ' + c + ' ' + dshow(b) + (t === 1 ? '. Extra zeros at the end do not change the value.' : '.') }; } },
    decops: { name: 'Add and subtract decimals', std: 'NC.5.NBT.7', blurb: 'Line up the decimal points.',
      make: function (lv) { var a = rdec(lv === 1 ? 1 : 2), b = rdec(lv === 3 ? 3 : 2), add = Math.random() < .5;
        if (!add && b > a) { var t = a; a = b; b = t; } var v = add ? a + b : a - b;
        return { q: dshow(a) + (add ? ' + ' : ' ' + M + ' ') + dshow(b), ans: fr(v, SC), why: 'Line up the decimal points (add zeros if you need them): ' + dshow(a) + (add ? ' + ' : ' ' + M + ' ') + dshow(b) + ' = ' + dshow(v) }; } },
    addfrac: { name: 'Add and subtract fractions', std: 'NC.5.NF.1', blurb: 'Unlike denominators. Type a fraction like 5/6 or a mixed number like 1 1/4.',
      make: function (lv) { var ds = lv === 1 ? [2, 3, 4, 5, 6, 8] : [2, 3, 4, 5, 6, 8, 9, 10, 12], d1 = pick(ds), d2 = pick(ds); if (d1 === d2) return SKILLS.addfrac.make(lv);
        var a = fr(R(1, d1 - 1), d1), b = fr(R(1, d2 - 1), d2); if (lv === 3) a = fadd(a, fr(R(1, 3), 1));
        var add = Math.random() < .6; if (!add && a[0] * b[1] < b[0] * a[1]) { var t = a; a = b; b = t; }
        var v = add ? fadd(a, b) : fsub(a, b), L = a[1] * b[1] / gcd(a[1], b[1]);
        return { q: fshow(a) + (add ? ' + ' : ' ' + M + ' ') + fshow(b), ans: v, why: 'Use the common denominator ' + L + ': ' + (a[0] * L / a[1]) + '/' + L + (add ? ' + ' : ' ' + M + ' ') + (b[0] * L / b[1]) + '/' + L + ' = ' + fshow(v) }; } },
    fracof: { name: 'Multiply fractions', std: 'NC.5.NF.4', blurb: 'A fraction of a whole number, or a fraction times a fraction.',
      make: function (lv) { var d = pick([2, 3, 4, 5, 6, 8, 10]), n = R(1, d - 1), f = fr(n, d);
        if (lv === 1) { var w = d * R(1, 9); return { q: fshow(f) + ' of ' + w, ans: fr(n * w / d, 1), why: w + ' ÷ ' + d + ' = ' + (w / d) + ', then × ' + n + ' = ' + (n * w / d) }; }
        if (lv === 2) { var k = R(2, 9), v = fmul(f, [k, 1]); return { q: k + ' × ' + fshow(f), ans: v, why: k + ' × ' + n + '/' + d + ' = ' + (k * n) + '/' + d + ' = ' + fshow(v) }; }
        var d2 = pick([2, 3, 4, 5, 6]), g = fr(R(1, d2 - 1), d2), p = fmul(f, g);
        return { q: fshow(f) + ' × ' + fshow(g), ans: p, why: 'Multiply the numerators and the denominators: ' + (f[0] * g[0]) + '/' + (f[1] * g[1]) + ' = ' + fshow(p) }; } },
    oops: { name: 'Order of operations', std: 'NC.5.OA.2', blurb: 'Parentheses first, then × and ÷, then + and ' + M + '.',
      make: function (lv) { var a = R(2, 12), b = R(2, 12), c = R(2, 9), forms = [
          [ '(' + a + ' + ' + b + ') × ' + c, (a + b) * c, 'Parentheses first: ' + a + ' + ' + b + ' = ' + (a + b) + ', then × ' + c ],
          [ a + ' + ' + b + ' × ' + c, a + b * c, 'Multiply first: ' + b + ' × ' + c + ' = ' + (b * c) + ', then + ' + a ],
          [ c + ' × (' + (a + b) + ' ' + M + ' ' + b + ')', c * a, 'Parentheses first: ' + (a + b) + ' ' + M + ' ' + b + ' = ' + a + ', then × ' + c ],
          [ (a * c) + ' ÷ ' + c + ' + ' + b, a + b, 'Divide first: ' + (a * c) + ' ÷ ' + c + ' = ' + a + ', then + ' + b ] ];
        if (lv === 3) forms.push([ '(' + a + ' + ' + b + ') × (' + (c + 2) + ' ' + M + ' 2)', (a + b) * c, 'Both parentheses first: ' + (a + b) + ' and ' + c + ', then multiply' ]);
        var f = pick(forms.slice(0, lv === 1 ? 2 : forms.length)); return { q: f[0], ans: fr(f[1], 1), why: f[2] + ' = ' + f[1] }; } },
    volume: { name: 'Volume of prisms', std: 'NC.5.MD.5', blurb: 'V = l × w × h or V = B × h. Answers are in cubic units.',
      make: function (lv) { var l = R(2, lv === 1 ? 6 : 12), w = R(2, lv === 1 ? 5 : 10), h = R(2, lv === 1 ? 5 : 9);
        if (lv === 2 && Math.random() < .5) return { q: 'A prism has a base area of ' + (l * w) + ' square units and a height of ' + h + ' units. What is its volume?', ans: fr(l * w * h, 1), why: 'V = B × h = ' + (l * w) + ' × ' + h + ' = ' + (l * w * h) + ' cubic units' };
        if (lv === 3) { var l2 = R(2, 6), w2 = R(2, 6), h2 = R(2, 6); return { q: 'Two boxes are stacked: ' + l + ' × ' + w + ' × ' + h + ' and ' + l2 + ' × ' + w2 + ' × ' + h2 + '. What is the total volume?', ans: fr(l * w * h + l2 * w2 * h2, 1), why: (l * w * h) + ' + ' + (l2 * w2 * h2) + ' = ' + (l * w * h + l2 * w2 * h2) + ' cubic units' }; }
        return { q: 'A box is ' + l + ' units long, ' + w + ' units wide and ' + h + ' units tall. What is its volume?', ans: fr(l * w * h, 1), why: 'V = l × w × h = ' + l + ' × ' + w + ' × ' + h + ' = ' + (l * w * h) + ' cubic units' }; } }
  };
  var ORDER = ['mult', 'div', 'multidigit', 'divrem', 'pow10', 'cmpdec', 'decops', 'addfrac', 'fracof', 'oops', 'volume'];

  // ── self-test: every generator's answer agrees with an independent check ──
  (function selfTest() {
    try {
      for (var i = 0; i < 200; i++) ORDER.forEach(function (k) { [1, 2, 3].forEach(function (lv) { var p = SKILLS[k].make(lv); if (!p || p.ans === undefined) throw new Error(k); }); });
      if (!feq(parse('2 1/3'), [7, 3]) || !feq(parse('0.75'), [3, 4]) || !feq(parse('6/8'), [3, 4]) || !feq(parse('1,250'), [1250, 1])) throw new Error('parse');
      if (dshow(dec('4.5') / 1000) !== '0.0045' || dshow(dec('3.25') * 100) !== '325') throw new Error('dec');
    } catch (e) { console.error('Learning Lab self-test failed:', e.message); }
  })();

  // ── storage ──
  function get(k) { try { return JSON.parse(localStorage.getItem('ll_' + k) || 'null'); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem('ll_' + k, JSON.stringify(v)); } catch (e) {} }

  // ── UI ──
  var hub = $('#hub'), play = $('#play'), st = null;
  function drawHub() {
    hub.innerHTML = ORDER.map(function (k) {
      var s = SKILLS[k], b = get('best_' + k);
      return '<a class="unit-card" href="#' + k + '"><div class="unit-num">' + s.std + '</div><span class="unit-card-title">' + s.name + '</span><div class="unit-desc">' + s.blurb + '</div><span class="unit-std">' + (b ? 'Best: ' + b.score + '/10 on level ' + b.lv : 'Not tried yet') + '</span></a>';
    }).join('');
  }
  function start(k) {
    var s = SKILLS[k]; if (!s) { show(false); return; }
    show(true);
    var fopts = s.facts ? '<label>Focus on: <select id="focus"><option value="">mixed</option>' + [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (n) { return '<option>' + n + '</option>'; }).join('') + '</select></label>' : '';
    play.innerHTML = '<a href="#" class="back-link">← All skills</a><div class="page-hdr" style="margin-bottom:18px;padding-bottom:16px"><span class="eyebrow">' + s.std + '</span><h1>' + s.name + '</h1><p>' + s.blurb + '</p></div>' +
      '<div class="ll-setup section"><div class="lvls">Level: ' + [1, 2, 3].map(function (l) { return '<button class="lv' + (l === 1 ? ' on' : '') + '" data-lv="' + l + '">' + l + '</button>'; }).join('') + '</div>' + fopts +
      '<label class="tm"><input type="checkbox" id="timed"> Beat the clock (90 seconds)</label><button class="go" id="go">Start 10 questions</button></div><div id="game"></div>';
    var lv = 1;
    play.querySelectorAll('.lv').forEach(function (b) { b.onclick = function () { play.querySelectorAll('.lv').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); lv = +b.dataset.lv; }; });
    $('#go').onclick = function () { round(k, lv, s.facts ? +($('#focus').value || 0) : 0, $('#timed').checked); };
    window.scrollTo(0, 0);
  }
  function round(k, lv, focus, timed) {
    st = { k: k, lv: lv, focus: focus, n: 0, right: 0, misses: [], t0: Date.now(), timed: timed, timer: null };
    $('.ll-setup').style.display = 'none';
    if (timed) st.timer = setInterval(function () { var left = 90 - Math.floor((Date.now() - st.t0) / 1000); var el = $('#clock'); if (el) el.textContent = left + 's'; if (left <= 0) finish(); }, 250);
    next();
  }
  function next() {
    if (st.n >= 10) return finish();
    var s = SKILLS[st.k], p = s.make(st.lv, st.focus); st.p = p; window.__LLcur = p;
    var kind = s.kind || 'num', inp;
    if (kind === 'choice') inp = '<div class="chs">' + p.choices.map(function (c) { return '<button class="ch" data-c="' + c + '">' + c + '</button>'; }).join('') + '</div>';
    else if (kind === 'rem') inp = '<div class="row"><input id="a1" inputmode="numeric" autocomplete="off" aria-label="Quotient" placeholder="quotient"> <b>R</b> <input id="a2" inputmode="numeric" autocomplete="off" aria-label="Remainder" placeholder="rem." style="width:90px"><button class="chk" id="chk">Check</button></div>';
    else inp = '<div class="row"><input id="a1" inputmode="decimal" autocomplete="off" aria-label="Your answer" placeholder="your answer"><button class="chk" id="chk">Check</button></div>';
    $('#game').innerHTML = '<div class="section card"><div class="bar"><span>Question ' + (st.n + 1) + ' of 10</span><span>' + st.right + ' right</span>' + (st.timed ? '<span id="clock">90s</span>' : '') + '</div><div class="prog"><i style="width:' + (st.n * 10) + '%"></i></div><div class="qq">' + p.q + (kind === 'num' && /×|÷|\+|−|of/.test(p.q) && p.q.length < 30 ? ' = ?' : '') + '</div>' + inp + '<div id="fb" aria-live="polite"></div></div>';
    if (kind === 'choice') $('#game').querySelectorAll('.ch').forEach(function (b) { b.onclick = function () { judge(b.dataset.c); }; });
    else { $('#chk').onclick = function () { judge(); }; $('#game').querySelectorAll('input').forEach(function (i) { i.addEventListener('keydown', function (e) { if (e.key === 'Enter') judge(); }); }); $('#a1').focus(); }
  }
  function judge(choice) {
    var p = st.p, s = SKILLS[st.k], kind = s.kind || 'num', ok, said;
    if (kind === 'choice') { ok = choice === p.ans; said = choice; }
    else if (kind === 'rem') { var q = $('#a1').value.replace(/,/g, '').trim(), r = $('#a2').value.trim() || '0'; if (!/^\d+$/.test(q) || !/^\d+$/.test(r)) return hint('Type the quotient in the first box and the remainder in the second box.'); ok = +q === p.ans[0] && +r === p.ans[1]; said = q + ' R ' + r; }
    else { var v = parse($('#a1').value); if (!v) return hint('Type a number, a fraction like 3/4, or a mixed number like 2 1/3.'); ok = feq(v, p.ans); said = $('#a1').value; }
    var right = kind === 'choice' ? p.ans : kind === 'rem' ? p.ans[0] + ' R ' + p.ans[1] : (st.k === 'pow10' || st.k === 'decops' ? dshowF(p.ans) : fshow(p.ans));
    st.n++; if (ok) st.right++; else st.misses.push({ q: p.q, said: said, right: right, why: p.why });
    var fb = $('#fb');
    fb.className = ok ? 'ok' : 'no';
    fb.innerHTML = ok ? '<b>Correct!</b> ' + p.why : '<b>Not quite.</b> You said ' + esc(said) + '. The answer is <b>' + right + '</b>. ' + p.why;
    $('#game').querySelectorAll('input,button.ch,#chk').forEach(function (e) { e.disabled = true; });
    var nb = document.createElement('button'); nb.className = 'go'; nb.textContent = st.n >= 10 ? 'See my results' : 'Next →'; nb.onclick = next; fb.appendChild(document.createElement('br')); fb.appendChild(nb); nb.focus();
  }
  function dshowF(f) { return f[1] === 1 ? f[0].toLocaleString('en-US') : (SC % f[1] === 0 ? dshow(f[0] * (SC / f[1])) : fshow(f)); }
  function hint(t) { var fb = $('#fb'); fb.className = 'no'; fb.textContent = t; }
  function finish() {
    if (!st || st.done) return; st.done = true; if (st.timer) clearInterval(st.timer);
    var secs = Math.round((Date.now() - st.t0) / 1000), b = get('best_' + st.k);
    if (!b || st.right > b.score || (st.right === b.score && st.lv > b.lv)) put('best_' + st.k, { score: st.right, lv: st.lv });
    var msg = st.right === 10 ? 'Perfect! Try the next level.' : st.right >= 8 ? 'Great work! Look over the ones you missed.' : st.right >= 5 ? 'Good effort. Practice the ones below, then try again.' : 'Keep practicing. Try level 1 or look at the examples below.';
    $('#game').innerHTML = '<div class="section card"><div class="qq" style="margin-bottom:6px">' + st.right + ' out of ' + st.n + '</div><p>' + msg + ' Time: ' + secs + ' seconds.</p>' +
      (st.misses.length ? '<div class="section-title" style="font-size:18px;margin-top:14px">Look again</div><ul class="miss">' + st.misses.map(function (m) { return '<li><b>' + m.q + '</b> = ' + m.right + '<br><span>' + m.why + '</span></li>'; }).join('') + '</ul>' : '') +
      '<button class="go" id="again">Play again</button> <a href="#" class="plink">All skills</a></div>';
    $('#again').onclick = function () { st.done = false; round(st.k, st.lv, st.focus, st.timed); };
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function show(p) { hub.parentNode.style.display = p ? 'none' : ''; play.style.display = p ? '' : 'none'; if (!p) { drawHub(); if (st && st.timer) clearInterval(st.timer); } }
  function route() { var k = location.hash.slice(1); if (SKILLS[k]) start(k); else show(false); }
  window.addEventListener('hashchange', route);
  route();
  window.__LL = { SKILLS: SKILLS, parse: parse, feq: feq };
})();
