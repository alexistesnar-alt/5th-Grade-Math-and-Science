/* ==========================================================================
   Science notebooks — notes.js
   Draws a unit notebook from the NOTEBOOK data written in each page and makes
   every part work: notice/wonder boxes, tap-to-reveal, multiple choice,
   select all, sorting (tap or drag), putting steps in order, fill in the
   blank with a word bank, labeling a diagram, number answers, data tables
   and simple charts. Answers save on this device (localStorage).
   No outside libraries. To change a lesson, edit the data in the unit page.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- saving (this device only) ---------- */
  var KEY = '', DATA = {};
  function loadAll() { try { var s = localStorage.getItem(KEY); DATA = s ? (JSON.parse(s) || {}) : {}; } catch (e) { DATA = {}; } }
  function saveAll() { try { localStorage.setItem(KEY, JSON.stringify(DATA)); return true; } catch (e) { return false; } }
  function get(id) { return DATA[id]; }
  function put(id, v) {
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) delete DATA[id]; else DATA[id] = v;
    return saveAll();
  }

  /* ---------- small helpers ---------- */
  function h(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function btn(cls, html, label) {
    var b = h('button', cls, html); b.type = 'button';
    if (label) b.setAttribute('aria-label', label);
    return b;
  }
  function strip(s) { var d = document.createElement('div'); d.innerHTML = s; return d.textContent; }
  function hash(s) { var x = 2166136261; for (var i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
  function shuffled(n, seed) {            // same order every visit (seeded), never already in answer order
    var a = []; for (var i = 0; i < n; i++) a.push(i);
    var r = hash(seed) || 1;
    function rnd() { r ^= r << 13; r >>>= 0; r ^= r >>> 17; r ^= r << 5; r >>>= 0; return r / 4294967296; }
    for (var k = 0; k < 4; k++) {
      for (var j = n - 1; j > 0; j--) { var q = Math.floor(rnd() * (j + 1)); var t = a[j]; a[j] = a[q]; a[q] = t; }
      if (n < 2 || a.some(function (v, i) { return v !== i; })) break;
    }
    return a;
  }
  function feedback(box, good, head, body) {
    box.className = 'fb show ' + (good ? 'good' : 'bad');
    box.innerHTML = '<span class="fb-head">' + head + '</span>' + (body || '');
  }
  function fbBox() { var f = h('div', 'fb'); f.setAttribute('role', 'status'); f.setAttribute('aria-live', 'polite'); return f; }
  function qline(b, num) {
    if (!b.q) return null;
    return h('p', 'q', (num ? '<span class="qnum">' + num + '</span>' : '') + b.q);
  }
  var RIGHT = ['Yes!', 'Nice work!', 'You got it!', 'That’s right!', 'Great thinking!'];
  var NOTYET = ['Not quite yet.', 'Almost. Look again.', 'Good try. Let’s fix it.'];
  function pick(list, id) { return list[hash(id) % list.length]; }

  /* ---------- text boxes ---------- */
  function textBox(id, ph, rows, labelText) {
    var wrap = h('div', 'tbox');
    var ta = h('textarea', 'ans'); ta.id = 'ta-' + id; ta.rows = rows || 3; ta.placeholder = ph || 'Type here…';
    if (labelText) ta.setAttribute('aria-label', strip(labelText));
    var pv = h('div', 'print-val'); var st = h('div', 'saved');
    var v = get(id); if (typeof v === 'string') { ta.value = v; pv.textContent = v; }
    var t;
    ta.addEventListener('input', function () {
      pv.textContent = ta.value;
      var ok = put(id, ta.value);
      clearTimeout(t);
      st.textContent = ok ? 'Saved on this device' : 'Could not save on this device. Print or copy your notes.';
      t = setTimeout(function () { st.textContent = ''; }, 2000);
    });
    wrap.appendChild(ta); wrap.appendChild(pv); wrap.appendChild(st);
    wrap.ta = ta;
    return wrap;
  }

  /* ---------- block renderers ---------- */
  var R = {}, BLOCKS = {};

  R.p = function (b) { return h('p', '', b.html); };

  R.scene = function (b) {
    return h('div', 'scene', '<span class="scene-tag">' + (b.tag || 'Picture this') + '</span>' + b.html);
  };

  R.nw = function (b, id) {
    var w = h('div', '');
    if (b.scene) w.appendChild(R.scene({ html: b.scene, tag: b.tag }));
    var g = h('div', 'nw');
    [['n', 'I notice…', 'What do you see? What is happening?'], ['w', 'I wonder…', 'What questions do you have?']].forEach(function (x) {
      var c = h('div', ''); var lab = h('label', '', x[1]); lab.htmlFor = 'ta-' + id + x[0];
      c.appendChild(lab); c.appendChild(textBox(id + x[0], x[2], 3, x[1])); g.appendChild(c);
    });
    w.appendChild(g);
    return w;
  };

  R.text = function (b, id, num) {
    var w = h('div', '');
    var q = qline(b, num); if (q) w.appendChild(q);
    if (b.hint) w.appendChild(h('p', 'hint-line', b.hint));
    var tb = textBox(id, b.ph, b.rows, b.q); w.appendChild(tb);
    if (b.model) {
      var bt = btn('btn small reveal-btn', b.modelBtn || 'Compare with a model answer');
      var body = h('div', 'reveal-body', '<p><b>A strong answer:</b> ' + b.model + '</p>' +
        (b.check ? '<p><b>Check yours:</b> ' + b.check + '</p>' : ''));
      var nudge = h('p', 'hint-line'); nudge.style.marginTop = '8px';
      bt.addEventListener('click', function () {
        if (!tb.ta.value.trim()) { nudge.textContent = 'Write your own idea first. Then you can compare.'; tb.ta.focus(); return; }
        nudge.textContent = '';
        var open = body.classList.toggle('open');
        bt.setAttribute('aria-expanded', open ? 'true' : 'false');
        put(id + ':open', open ? 1 : null);
      });
      if (get(id + ':open') && tb.ta.value.trim()) { body.classList.add('open'); bt.setAttribute('aria-expanded', 'true'); }
      w.appendChild(bt); w.appendChild(nudge); w.appendChild(body);
    }
    return w;
  };

  R.reveal = function (b, id, num) {
    var w = h('div', '');
    var q = qline(b, num); if (q) w.appendChild(q);
    var bt = btn('btn small reveal-btn', b.btn || 'Tap to see'); bt.setAttribute('aria-expanded', 'false');
    var body = h('div', 'reveal-body', b.a);
    bt.addEventListener('click', function () {
      var open = body.classList.toggle('open');
      bt.setAttribute('aria-expanded', open ? 'true' : 'false');
      put(id, open ? 1 : null);
    });
    if (get(id)) { body.classList.add('open'); bt.setAttribute('aria-expanded', 'true'); }
    w.appendChild(bt); w.appendChild(body);
    return w;
  };

  R.mc = function (b, id, num) {
    var w = h('div', '');
    var q = qline(b, num); if (q) w.appendChild(q);
    var list = h('div', 'choices'); list.setAttribute('role', 'group');
    var fb = fbBox(); var buttons = [];
    b.opts.forEach(function (o, i) {
      var c = btn('choice', '<span class="mark" aria-hidden="true">' + 'ABCDEFG'[i] + '</span><span>' + o + '</span>');
      c.setAttribute('aria-pressed', 'false');
      c.addEventListener('click', function () { choose(i, true); });
      buttons.push(c); list.appendChild(c);
    });
    function choose(i, saveIt) {
      buttons.forEach(function (c, k) { c.setAttribute('aria-pressed', k === i ? 'true' : 'false'); c.classList.remove('right', 'wrong'); });
      var ok = i === b.ans;
      buttons[i].classList.add(ok ? 'right' : 'wrong');
      var why = (b.fb && b.fb[i]) || '';
      feedback(fb, ok, ok ? pick(RIGHT, id) : pick(NOTYET, id), why ? '<p style="margin:0">' + why + '</p>' : '');
      if (!ok) fb.innerHTML += '<p style="margin:6px 0 0">Try another answer.</p>';
      if (saveIt) put(id, i);
    }
    w.appendChild(list); w.appendChild(fb);
    var v = get(id); if (typeof v === 'number' && b.opts[v] != null) choose(v, false);
    return w;
  };

  R.multi = function (b, id, num) {
    var w = h('div', '');
    var q = qline(b, num); if (q) w.appendChild(q);
    w.appendChild(h('p', 'hint-line', 'Select <b>all</b> that are correct. Then tap Check.'));
    var list = h('div', 'choices multi'); var fb = fbBox(); var buttons = [];
    var sel = (get(id) && get(id).v) || [];
    b.opts.forEach(function (o, i) {
      var c = btn('choice', '<span class="mark" aria-hidden="true">✓</span><span>' + o + '</span>');
      c.setAttribute('aria-pressed', sel.indexOf(i) >= 0 ? 'true' : 'false');
      c.addEventListener('click', function () {
        var on = c.getAttribute('aria-pressed') !== 'true';
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
        buttons.forEach(function (x) { x.classList.remove('right', 'wrong'); });
        fb.className = 'fb';
        put(id, { v: current() });
      });
      buttons.push(c); list.appendChild(c);
    });
    function current() { var a = []; buttons.forEach(function (c, i) { if (c.getAttribute('aria-pressed') === 'true') a.push(i); }); return a; }
    function check(saveIt) {
      var s = current();
      if (!s.length) { feedback(fb, false, 'Pick at least one answer first.'); return; }
      var notes = [], allOk = true;
      b.opts.forEach(function (o, i) {
        var should = b.ans.indexOf(i) >= 0, did = s.indexOf(i) >= 0;
        buttons[i].classList.remove('right', 'wrong');
        if (did && should) buttons[i].classList.add('right');
        if (did && !should) { buttons[i].classList.add('wrong'); allOk = false; notes.push('You picked <b>' + strip(o) + '</b>, but it does not belong. ' + (b.why[i] || '')); }
        if (!did && should) { allOk = false; notes.push('You missed one. Look again at <b>' + strip(o) + '</b>.'); }
      });
      if (allOk) {
        feedback(fb, true, pick(RIGHT, id) + ' You found all ' + b.ans.length + '.', b.done ? '<p style="margin:0">' + b.done + '</p>' : '');
      } else {
        feedback(fb, false, pick(NOTYET, id), '<ul><li>' + notes.join('</li><li>') + '</li></ul><p style="margin:6px 0 0">Change your picks and check again.</p>');
      }
      if (saveIt) put(id, { v: s, c: 1 });
    }
    var rb = h('div', 'row-btns'); var cb = btn('btn primary small', 'Check'); cb.addEventListener('click', function () { check(true); });
    rb.appendChild(cb);
    w.appendChild(list); w.appendChild(rb); w.appendChild(fb);
    if (get(id) && get(id).c) check(false);
    return w;
  };

  /* sorting: tap a card, then tap a box (or drag it with a mouse) */
  R.sort = function (b, id, num) {
    var w = h('div', '');
    var q = qline(b, num); if (q) w.appendChild(q);
    w.appendChild(h('p', 'tap-tip', 'Tap a card, then tap the box where it belongs. (With a mouse, you can also drag.) Tap a sorted card to move it again.'));
    var st = get(id) || {}; var place = st.v || {};        // item index -> bin index
    var armed = null, chips = [], fb = fbBox();
    var poolWrap = h('div', ''); poolWrap.appendChild(h('div', 'pool-label', 'Cards to sort'));
    var pool = h('div', 'chips'); poolWrap.appendChild(pool);
    var binsEl = h('div', 'bins'); var binBoxes = [];
    b.bins.forEach(function (name, bi) {
      var bx = h('div', 'bin'); bx.setAttribute('role', 'group'); bx.setAttribute('aria-label', strip(name));
      var tb = btn('btn small bin-title', name); tb.style.cssText = 'border:0;padding:0;min-height:32px;background:none;font-size:16px';
      tb.setAttribute('aria-label', 'Put the chosen card in ' + strip(name));
      var inner = h('div', 'chips');
      bx.appendChild(tb); bx.appendChild(inner); bx.inner = inner;
      bx.addEventListener('click', function (e) { if (e.target.closest('.chip')) return; drop(bi); });
      bx.addEventListener('dragover', function (e) { e.preventDefault(); bx.classList.add('over'); });
      bx.addEventListener('dragleave', function () { bx.classList.remove('over'); });
      bx.addEventListener('drop', function (e) { e.preventDefault(); bx.classList.remove('over'); var k = +e.dataTransfer.getData('text/plain'); if (!isNaN(k)) { armed = k; drop(bi); } });
      binBoxes.push(bx); binsEl.appendChild(bx);
    });
    pool.addEventListener('click', function (e) { if (e.target.closest('.chip')) return; drop(-1); });
    poolWrap.addEventListener('dragover', function (e) { e.preventDefault(); });
    poolWrap.addEventListener('drop', function (e) { e.preventDefault(); var k = +e.dataTransfer.getData('text/plain'); if (!isNaN(k)) { armed = k; drop(-1); } });
    var order = shuffled(b.items.length, id);
    order.forEach(function (ii) {
      var c = btn('chip', b.items[ii][0]); c.setAttribute('aria-pressed', 'false'); c.draggable = true; c.idx = ii;
      c.addEventListener('click', function () {
        armed = (armed === ii) ? null : ii; paint();
      });
      c.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', String(ii)); armed = ii; });
      chips[ii] = c;
    });
    function drop(bi) {
      if (armed == null) {
        if (bi >= 0) feedback(fb, false, 'Tap a card first.', '<p style="margin:0">Then tap this box to put the card in it.</p>');
        return;
      }
      if (bi < 0) delete place[armed]; else place[armed] = bi;
      armed = null; clearMarks(); put(id, { v: place }); paint();
    }
    function clearMarks() { chips.forEach(function (c) { c.classList.remove('right', 'wrong'); }); fb.className = 'fb'; }
    function paint() {
      order.forEach(function (ii) {
        var c = chips[ii]; c.setAttribute('aria-pressed', armed === ii ? 'true' : 'false');
        var tgt = place[ii] != null && binBoxes[place[ii]] ? binBoxes[place[ii]].inner : pool;
        if (c.parentNode !== tgt) tgt.appendChild(c);
      });
      binBoxes.forEach(function (bx) { bx.classList.toggle('armed', armed != null); });
      pool.style.minHeight = Object.keys(place).length === b.items.length ? '0' : '';
    }
    function check(saveIt) {
      var left = b.items.length - Object.keys(place).length;
      if (left) { feedback(fb, false, 'Sort every card first.', '<p style="margin:0">' + left + ' card' + (left > 1 ? 's are' : ' is') + ' still not in a box.</p>'); return; }
      var wrong = [];
      b.items.forEach(function (it, i) {
        var ok = place[i] === it[1];
        chips[i].classList.add(ok ? 'right' : 'wrong');
        if (!ok) wrong.push('You put <b>' + strip(it[0]) + '</b> in <b>' + strip(b.bins[place[i]]) + '</b>. ' + (it[2] || ('It belongs in ' + strip(b.bins[it[1]]) + '.')));
      });
      if (!wrong.length) feedback(fb, true, pick(RIGHT, id) + ' All ' + b.items.length + ' cards are sorted correctly.', b.done ? '<p style="margin:0">' + b.done + '</p>' : '');
      else feedback(fb, false, (b.items.length - wrong.length) + ' of ' + b.items.length + ' are right. Let’s fix the rest.',
        '<ul><li>' + wrong.join('</li><li>') + '</li></ul><p style="margin:6px 0 0">Tap a red card to move it, then check again.</p>');
      if (saveIt) put(id, { v: place, c: 1 });
    }
    var rb = h('div', 'row-btns');
    var cb = btn('btn primary small', 'Check my sort'); cb.addEventListener('click', function () { clearMarks(); check(true); });
    var xb = btn('btn small', 'Start over'); xb.addEventListener('click', function () { place = {}; armed = null; clearMarks(); put(id, null); paint(); });
    rb.appendChild(cb); rb.appendChild(xb);
    w.appendChild(poolWrap); w.appendChild(binsEl); w.appendChild(rb); w.appendChild(fb);
    paint();
    if (st.c) check(false);
    return w;
  };

  /* put steps in order: tap cards in order */
  R.order = function (b, id, num) {
    var w = h('div', '');
    var q = qline(b, num); if (q) w.appendChild(q);
    w.appendChild(h('p', 'tap-tip', 'Tap the cards in order. Tap a step in the list to take it back out.'));
    var st = get(id) || {}; var seq = (st.v || []).slice();
    var fb = fbBox(); var pool = h('div', 'chips'); var list = h('ol', 'order-list'); var chips = [];
    var order = shuffled(b.items.length, id);
    order.forEach(function (ii) {
      var c = btn('chip', b.items[ii]);
      c.addEventListener('click', function () { if (seq.indexOf(ii) < 0) { seq.push(ii); changed(); } });
      chips[ii] = c;
    });
    function changed() { fb.className = 'fb'; put(id, { v: seq }); paint(); }
    function paint(marks) {
      pool.innerHTML = ''; order.forEach(function (ii) { if (seq.indexOf(ii) < 0) pool.appendChild(chips[ii]); });
      if (!pool.children.length) pool.style.minHeight = '0'; else pool.style.minHeight = '';
      list.innerHTML = '';
      for (var p = 0; p < b.items.length; p++) {
        var li = h('li', ''); li.appendChild(h('span', 'n', String(p + 1)));
        if (seq[p] != null) {
          var it = seq[p]; li.classList.add('filled');
          if (marks) li.classList.add(it === p ? 'right' : 'wrong');
          var x = btn('chip', b.items[it], 'Step ' + (p + 1) + ': ' + strip(b.items[it]) + '. Tap to take it out.');
          x.style.background = 'transparent'; x.style.border = '0'; x.style.textAlign = 'left';
          (function (pos) { x.addEventListener('click', function () { seq.splice(pos, 1); changed(); }); })(p);
          li.appendChild(x);
        } else li.appendChild(h('span', 'order-arrow', '…'));
        list.appendChild(li);
      }
    }
    function check(saveIt) {
      if (seq.length < b.items.length) { feedback(fb, false, 'Put every card in the list first.', ''); return; }
      var firstBad = -1; seq.forEach(function (v, p) { if (v !== p && firstBad < 0) firstBad = p; });
      paint(true);
      if (firstBad < 0) feedback(fb, true, pick(RIGHT, id) + ' The order is correct.', b.done ? '<p style="margin:0">' + b.done + '</p>' : '');
      else feedback(fb, false, pick(NOTYET, id), '<p style="margin:0">Step ' + (firstBad + 1) + ' is not right. You put <b>' + strip(b.items[seq[firstBad]]) +
        '</b> there. ' + (b.hint || '') + '</p><p style="margin:6px 0 0">Tap the red steps to take them out, then try again.</p>');
      if (saveIt) put(id, { v: seq, c: 1 });
    }
    var rb = h('div', 'row-btns');
    var cb = btn('btn primary small', 'Check the order'); cb.addEventListener('click', function () { check(true); });
    var xb = btn('btn small', 'Start over'); xb.addEventListener('click', function () { seq = []; changed(); });
    rb.appendChild(cb); rb.appendChild(xb);
    w.appendChild(pool); w.appendChild(list); w.appendChild(rb); w.appendChild(fb);
    paint();
    if (st.c) check(false);
    return w;
  };

  /* shared word-bank logic for fill-in-the-blank and labeling */
  function wordBank(b, id, blanks, answers, hints, onArm) {
    var st = get(id) || {}; var vals = (st.v || []).slice();
    var words = []; answers.concat(b.extra || []).forEach(function (x) { if (words.indexOf(x) < 0) words.push(x); });
    var bankWrap = h('div', ''); bankWrap.appendChild(h('div', 'pool-label', 'Word bank'));
    var bank = h('div', 'chips'); bankWrap.appendChild(bank);
    var armedWord = null, armedBlank = null, wchips = [], fb = fbBox();
    shuffled(words.length, id + 'w').forEach(function (wi) {
      var c = btn('chip', words[wi]); c.setAttribute('aria-pressed', 'false');
      c.addEventListener('click', function () {
        if (armedBlank != null) { fill(armedBlank, words[wi]); return; }
        armedWord = armedWord === wi ? null : wi; paint();
      });
      wchips[wi] = c; bank.appendChild(c);
    });
    blanks.forEach(function (bl, k) {
      bl.addEventListener('click', function () { tapBlank(k); });
    });
    function tapBlank(k) {
      if (armedWord != null) { fill(k, words[armedWord]); return; }
      if (vals[k]) { vals[k] = ''; armedBlank = null; changed(); return; }
      armedBlank = armedBlank === k ? null : k; paint();
    }
    function fill(k, word) { vals[k] = word; armedWord = null; armedBlank = null; changed(); }
    function changed() { blanks.forEach(function (bl) { bl.classList.remove('right', 'wrong'); }); fb.className = 'fb'; put(id, { v: vals }); paint(); }
    function paint() {
      wchips.forEach(function (c, i) { c.setAttribute('aria-pressed', armedWord === i ? 'true' : 'false'); });
      blanks.forEach(function (bl, k) {
        bl.textContent = vals[k] || '';
        bl.setAttribute('aria-pressed', armedBlank === k ? 'true' : 'false');
        bl.setAttribute('aria-label', (bl.dataset.name || ('Blank ' + (k + 1))) + ': ' + (vals[k] || 'empty'));
      });
      if (onArm) onArm(armedBlank);
    }
    function check(saveIt) {
      var empty = 0; blanks.forEach(function (bl, k) { if (!vals[k]) empty++; });
      if (empty) { feedback(fb, false, 'Fill every blank first.', '<p style="margin:0">' + empty + ' blank' + (empty > 1 ? 's are' : ' is') + ' still empty.</p>'); return; }
      var bad = [];
      blanks.forEach(function (bl, k) {
        var ok = vals[k].toLowerCase() === answers[k].toLowerCase();
        bl.classList.add(ok ? 'right' : 'wrong');
        if (!ok) bad.push('<b>' + (bl.dataset.name || ('Blank ' + (k + 1))) + '</b>: you chose <b>' + vals[k] + '</b>. ' + (hints[k] || 'Read the sentence again.'));
      });
      if (!bad.length) feedback(fb, true, pick(RIGHT, id) + ' Every word is in the right place.', b.done ? '<p style="margin:0">' + b.done + '</p>' : '');
      else feedback(fb, false, (blanks.length - bad.length) + ' of ' + blanks.length + ' are right.', '<ul><li>' + bad.join('</li><li>') + '</li></ul><p style="margin:6px 0 0">Tap a red word to clear it, then try again.</p>');
      if (saveIt) put(id, { v: vals, c: 1 });
    }
    var rb = h('div', 'row-btns'); var cb = btn('btn primary small', 'Check'); cb.addEventListener('click', function () { check(true); });
    rb.appendChild(cb);
    paint();
    return { bank: bankWrap, rb: rb, fb: fb, after: function () { if (st.c) check(false); }, tapBlank: tapBlank };
  }

  R.blanks = function (b, id, num) {
    var w = h('div', '');
    var q = qline(b, num); if (q) w.appendChild(q);
    w.appendChild(h('p', 'tap-tip', 'Tap a word, then tap the blank where it fits. Tap a filled blank to clear it.'));
    var answers = [], hints = [], blanks = [];
    var html = b.text.replace(/\{([^}|]+)(?:\|([^}]*))?\}/g, function (m, a, hint) { answers.push(a); hints.push(hint || ''); return '<button type="button" class="blank" data-k="' + (answers.length - 1) + '"></button>'; });
    var p = h('p', 'blank-text', html);
    blanks = Array.prototype.slice.call(p.querySelectorAll('.blank'));
    var wb = wordBank(b, id, blanks, answers, hints);
    w.appendChild(wb.bank); w.appendChild(p); w.appendChild(wb.rb); w.appendChild(wb.fb);
    wb.after();
    return w;
  };

  R.label = function (b, id, num) {
    var w = h('div', '');
    var q = qline(b, num); if (q) w.appendChild(q);
    w.appendChild(h('p', 'tap-tip', 'Tap a word, then tap a number (on the picture or in the list). Tap a filled label to clear it.'));
    var grid = h('div', 'label-wrap');
    var fig = h('figure', 'fig', b.svg + (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : ''));
    var svg = fig.querySelector('svg'); var NS = 'http://www.w3.org/2000/svg'; var dots = [];
    var side = h('div', ''); var ul = h('ul', 'spot-list'); var blanks = [];
    b.spots.forEach(function (s, k) {
      var li = h('li', ''); li.appendChild(h('span', 'spot-num', String(k + 1)));
      var bl = btn('blank'); bl.dataset.name = 'Label ' + (k + 1); li.appendChild(bl); ul.appendChild(li); blanks.push(bl);
      var g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'spot-dot'); g.setAttribute('role', 'button');
      g.setAttribute('aria-label', 'Label ' + (k + 1)); g.setAttribute('tabindex', '0');
      var c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', s.x); c.setAttribute('cy', s.y); c.setAttribute('r', b.r || 13);
      var t = document.createElementNS(NS, 'text'); t.setAttribute('x', s.x); t.setAttribute('y', s.y); t.textContent = String(k + 1);
      g.appendChild(c); g.appendChild(t); svg.appendChild(g); dots.push(g);
    });
    var wb = wordBank(b, id, blanks, b.spots.map(function (s) { return s.ans; }), b.spots.map(function (s) { return s.hint; }),
      function (armed) { dots.forEach(function (d, k) { d.setAttribute('class', 'spot-dot' + (armed === k ? ' armed' : '')); }); });
    dots.forEach(function (d, k) {
      d.addEventListener('click', function () { wb.tapBlank(k); });
      d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); wb.tapBlank(k); } });
    });
    side.appendChild(wb.bank); side.appendChild(ul); side.appendChild(wb.rb); side.appendChild(wb.fb);
    grid.appendChild(fig); grid.appendChild(side); w.appendChild(grid);
    wb.after();
    return w;
  };

  R.num = function (b, id, num) {
    var w = h('div', '');
    var q = qline(b, num); if (q) w.appendChild(q);
    if (b.hint) w.appendChild(h('p', 'hint-line', b.hint));
    var row = h('div', 'num-row'); var inp = h('input', ''); inp.type = 'text'; inp.inputMode = 'decimal'; inp.autocomplete = 'off';
    inp.setAttribute('aria-label', 'Your answer' + (b.unit ? ' in ' + b.unit : ''));
    var fb = fbBox(); var st = get(id) || {};
    if (st.v) inp.value = st.v;
    var cb = btn('btn primary small', 'Check');
    row.appendChild(inp); if (b.unit) row.appendChild(h('span', 'unit', b.unit)); row.appendChild(cb);
    function check(saveIt) {
      var raw = inp.value.trim().replace(/,/g, '');
      var v = parseFloat(raw);
      if (raw === '' || isNaN(v) || !/^-?\d*\.?\d+$/.test(raw)) { feedback(fb, false, 'Type a number first.', '<p style="margin:0">Use digits like 12 or 2.5.</p>'); return; }
      var tol = b.tol || 0.0001;
      if (Math.abs(v - b.ans) <= tol) feedback(fb, true, pick(RIGHT, id), b.why ? '<p style="margin:0">' + b.why + '</p>' : '');
      else {
        var msg = '';
        (b.wrong || []).forEach(function (x) { if (!msg && Math.abs(v - x[0]) <= tol) msg = x[1]; });
        feedback(fb, false, pick(NOTYET, id), '<p style="margin:0">' + (msg || b.miss || 'Check your work and try again.') + '</p>');
      }
      if (saveIt) put(id, { v: inp.value, c: 1 });
    }
    cb.addEventListener('click', function () { check(true); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(true); });
    inp.addEventListener('input', function () { fb.className = 'fb'; put(id, { v: inp.value }); });
    w.appendChild(row); w.appendChild(fb);
    if (st.c) check(false);
    return w;
  };

  R.table = function (b) {
    var w = h('div', 'data');
    var t = '<table>' + (b.caption ? '<caption>' + b.caption + '</caption>' : '') + '<thead><tr>' +
      b.head.map(function (x) { return '<th scope="col">' + x + '</th>'; }).join('') + '</tr></thead><tbody>' +
      b.rows.map(function (r) {
        return '<tr>' + r.map(function (c, i) { var n = typeof c === 'number'; return (i === 0 ? '<th scope="row" style="background:#F4F6FA;color:#1B2333">' : '<td' + (n ? ' class="n"' : '') + '>') + c + (i === 0 ? '</th>' : '</td>'); }).join('') + '</tr>';
      }).join('') + '</tbody></table>';
    w.innerHTML = t;
    return w;
  };

  /* simple bar or line chart (one series; values are also listed in a table on the page) */
  R.chart = function (b) {
    var w = h('figure', 'chart'); w.style.margin = '0 0 12px';
    var W = 440, H = 270, L = 48, Rr = 14, T = 18, B = 52;
    var max = b.max || Math.max.apply(null, b.values);
    var min = b.min || 0, step = b.step || (max - min) / 4;
    var pw = W - L - Rr, ph = H - T - B, n = b.values.length, band = pw / n;
    function y(v) { return T + ph - (v - min) / (max - min) * ph; }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + strip(b.title) + '">';
    for (var g = min; g <= max + 1e-9; g += step) {
      s += '<line class="grid" x1="' + L + '" x2="' + (W - Rr) + '" y1="' + y(g) + '" y2="' + y(g) + '"/>' +
        '<text x="' + (L - 8) + '" y="' + (y(g) + 4) + '" text-anchor="end">' + (+g.toFixed(2)) + '</text>';
    }
    s += '<line class="axis" x1="' + L + '" x2="' + (W - Rr) + '" y1="' + y(min) + '" y2="' + y(min) + '"/>';
    var pts = [];
    b.values.forEach(function (v, i) {
      var cx = L + band * i + band / 2;
      s += '<text x="' + cx + '" y="' + (T + ph + 20) + '" text-anchor="middle">' + b.labels[i] + '</text>';
      if (b.type === 'line') pts.push([cx, y(v), v, b.labels[i]]);
      else {
        var bw = Math.min(46, band * 0.58), x0 = cx - bw / 2, top = y(v), base = y(min), r = Math.min(4, (base - top) / 2);
        s += '<path class="bar" d="M' + x0 + ',' + base + 'V' + (top + r) + 'Q' + x0 + ',' + top + ' ' + (x0 + r) + ',' + top + 'H' + (x0 + bw - r) +
          'Q' + (x0 + bw) + ',' + top + ' ' + (x0 + bw) + ',' + (top + r) + 'V' + base + 'Z"><title>' + strip(b.labels[i]) + ': ' + v + ' ' + (b.unit || '') + '</title></path>' +
          '<text class="val" x="' + cx + '" y="' + (top - 6) + '" text-anchor="middle">' + v + '</text>';
      }
    });
    if (pts.length) {
      s += '<polyline class="line" points="' + pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ') + '"/>';
      pts.forEach(function (p) {
        s += '<circle class="pt" cx="' + p[0] + '" cy="' + p[1] + '" r="5.5"><title>' + strip(p[3]) + ': ' + p[2] + ' ' + (b.unit || '') + '</title></circle>' +
          '<text class="val" x="' + p[0] + '" y="' + (p[1] - 11) + '" text-anchor="middle">' + p[2] + '</text>';
      });
    }
    if (b.xlabel) s += '<text x="' + (L + pw / 2) + '" y="' + (H - 8) + '" text-anchor="middle" style="font-weight:600">' + b.xlabel + '</text>';
    if (b.ylabel) s += '<text transform="translate(13 ' + (T + ph / 2) + ') rotate(-90)" text-anchor="middle" style="font-weight:600">' + b.ylabel + '</text>';
    s += '</svg>';
    w.innerHTML = '<figcaption class="chart-title">' + b.title + '</figcaption>' + s;
    return w;
  };

  R.fig = function (b) { return h('figure', 'fig', b.svg + (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : '')); };

  /* ---------- build a list of blocks ---------- */
  function blocks(list, parent, prefix, numbered) {
    var n = 0, k = 0;
    (list || []).forEach(function (b) {
      k++;
      var asks = ['text', 'reveal', 'mc', 'multi', 'sort', 'order', 'blanks', 'label', 'num'].indexOf(b.t) >= 0;
      var num = numbered && asks && b.q ? String(++n) : '';
      var id = b.id || (prefix + '.' + k);
      var wrap = h('div', 'block'); wrap.dataset.id = id; wrap.dataset.t = b.t; BLOCKS[id] = b;
      if (!R[b.t]) { wrap.textContent = 'Missing part: ' + b.t; parent.appendChild(wrap); return; }
      wrap.appendChild(R[b.t](b, id, num));
      parent.appendChild(wrap);
    });
  }

  function part(cls, tag, title) {
    var p = h('section', 'part ' + (cls || ''));
    if (tag) p.appendChild(h('div', 'part-tag', tag));
    if (title) p.appendChild(h('h3', '', title));
    return p;
  }

  function vocab(list, parent, id) {
    var row = h('div', 'vocab'); var def = h('div', 'vdef'); def.setAttribute('aria-live', 'polite');
    var printList = h('dl', 'vocab-print');
    var chips = [];
    list.forEach(function (v, i) {
      var c = btn('vchip', v[0]); c.setAttribute('aria-expanded', 'false'); c.setAttribute('aria-controls', id + '-def');
      c.addEventListener('click', function () {
        var open = c.getAttribute('aria-expanded') !== 'true';
        chips.forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
        if (open) { c.setAttribute('aria-expanded', 'true'); def.innerHTML = '<b>' + v[0] + ':</b> ' + v[1]; def.classList.add('show'); }
        else def.classList.remove('show');
      });
      chips.push(c); row.appendChild(c);
      var d = h('div', ''); d.innerHTML = '<dt>' + v[0] + ':</dt> <dd>' + v[1] + '</dd>'; printList.appendChild(d);
    });
    def.id = id + '-def';
    parent.appendChild(h('p', 'hint-line', 'Tap a word to see what it means.'));
    parent.appendChild(row); parent.appendChild(def); parent.appendChild(printList);
  }

  /* ---------- the whole notebook ---------- */
  function render(nb) {
    KEY = 'sci5-notes-' + nb.key;
    loadAll();
    var root = document.getElementById('nb');
    root.innerHTML = '';
    root.classList.add('nb');

    root.appendChild(h('a', 'back-link', '← Science notebooks')).href = 'index.html';
    var hdr = h('div', 'page-hdr');
    hdr.innerHTML = '<span class="eyebrow">Science · Unit ' + nb.unit + ' · Notebook</span><h1>' + nb.title + '</h1>' +
      '<p class="lead">' + nb.lead + '</p><p class="stds">' + nb.stds.map(function (s) { return s[0]; }).join(' · ') + '</p>';
    var tools = h('div', 'nb-tools');
    var pb = btn('btn primary', 'Print my notes'); pb.addEventListener('click', function () { window.print(); });
    tools.appendChild(pb);
    var v = h('a', 'btn', 'Vocabulary →'); v.href = '../vocabulary.html'; tools.appendChild(v);
    var lab = h('a', 'btn gold', 'Try it in the Virtual Science Lab →'); lab.href = '../lab/index.html'; tools.appendChild(lab);
    hdr.appendChild(tools);
    root.appendChild(hdr);
    root.appendChild(h('div', 'print-name', 'Name: ________________________________ &nbsp; Date: ______________'));

    // lesson switcher
    var nav = h('nav', 'topic-nav'); nav.setAttribute('aria-label', 'Lessons in this notebook');
    nb.lessons.forEach(function (L, i) {
      var a = h('a', '', '<span class="ln-long">Lesson </span><span class="ln-short">L</span>' + (i + 1)); a.href = '#lesson-' + (i + 1); nav.appendChild(a);
    });
    var pa = h('a', '', 'Practice'); pa.href = '#practice'; nav.appendChild(pa);
    root.appendChild(nav);

    // standards and the unit's big question
    var sb = h('div', 'std-box', '<p style="margin-top:0"><b>WHAT WE ARE LEARNING</b></p>' +
      nb.stds.map(function (s) { return '<p><b>' + s[0] + '</b>' + s[1] + '</p>'; }).join(''));
    root.appendChild(sb);
    if (nb.anchor) root.appendChild(h('div', 'scene', '<span class="scene-tag">Our unit puzzle</span>' + nb.anchor));

    nb.lessons.forEach(function (L, i) {
      var n = i + 1, pre = 'L' + n;
      var sec = h('section', 'lesson'); sec.id = 'lesson-' + n;
      sec.appendChild(h('div', 'lesson-hdr', '<div class="lesson-num">Lesson ' + n + '</div><h2>' + L.title + '</h2>'));

      var wu = part('warm', 'Warm-up', 'Notice and Wonder');
      blocks([{ t: 'nw', scene: L.warm, tag: L.warmTag || 'Our phenomenon' }].concat(L.warmMore || []), wu, pre + '.w', false);
      sec.appendChild(wu);

      sec.appendChild(h('div', 'goal', '<b>Let’s</b> ' + L.goal.replace(/^Let['’]s\s+/i, '')));

      L.acts.forEach(function (A, j) {
        var p = part('', 'Activity ' + (j + 1), A.title);
        blocks(A.blocks, p, pre + '.a' + (j + 1), false);
        sec.appendChild(p);
      });

      var sy = part('synth', 'Lesson Synthesis', 'What we figured out');
      sy.appendChild(h('div', 'key-idea', L.synth.idea));
      if (L.synth.vocab) vocab(L.synth.vocab, sy, pre + 'v');
      sec.appendChild(sy);

      var cd = part('cool', 'Cool-down', 'Check yourself');
      blocks(L.cool, cd, pre + '.c', true);
      sec.appendChild(cd);
      root.appendChild(sec);
    });

    var ps = h('section', 'lesson'); ps.id = 'practice';
    ps.appendChild(h('div', 'lesson-hdr', '<div class="lesson-num">Homework</div><h2>Practice</h2>'));
    ps.appendChild(h('p', 'hint-line', 'These questions look like the ones on the 5th grade Science EOG. Do your best, then read the feedback.'));
    var pp = part('', '', '');
    blocks(nb.practice, pp, 'P', true);
    ps.appendChild(pp);
    root.appendChild(ps);

    var nx = h('div', 'nb-next');
    var pb2 = btn('btn primary', 'Print my notes'); pb2.addEventListener('click', function () { window.print(); }); nx.appendChild(pb2);
    var v2 = h('a', 'btn', 'Vocabulary →'); v2.href = '../vocabulary.html'; nx.appendChild(v2);
    var l2 = h('a', 'btn gold', 'Try it in the Virtual Science Lab →'); l2.href = '../lab/index.html'; nx.appendChild(l2);
    var clr = btn('btn', 'Clear my answers');
    clr.addEventListener('click', function () {
      if (!window.confirm('Erase all of your answers in this notebook on this device?')) return;
      DATA = {}; try { localStorage.removeItem(KEY); } catch (e) {}
      render(nb);
    });
    nx.appendChild(clr);
    root.appendChild(nx);
    root.appendChild(h('p', 'nb-note', 'Your answers save on this device and in this browser only. To keep them, tap “Print my notes.” Use a different device? Your answers will not be there.'));

    // keep the lesson switcher honest about where you are
    var links = nav.querySelectorAll('a');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      root.querySelectorAll('.lesson').forEach(function (s) { io.observe(s); });
    }
  }

  window.NB = { render: render, blocks: BLOCKS };
})();
