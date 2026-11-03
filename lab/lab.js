/* ==========================================================================
   Virtual Science Lab — shared helpers (lab.js)
   Lab.el      make an element          Lab.seg     row of choice buttons
   Lab.table   data table that fills    Lab.check   "What did you find?" questions
   Lab.sorter  tap (or drag) cards into boxes
   No network calls. Works on Chromebooks and phones.
   ========================================================================== */
(function () {
  'use strict';
  var Lab = window.Lab = {};

  Lab.$ = function (s, r) { return (r || document).querySelector(s); };
  Lab.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  Lab.el = function (tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    });
    [].concat(kids == null ? [] : kids).forEach(function (c) {
      if (c == null || c === false) return;
      e.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
    });
    return e;
  };

  Lab.svg = function (tag, attrs, parent) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(e);
    return e;
  };

  Lab.shuffle = function (a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  Lab.r1 = function (n) { return (Math.round(n * 10) / 10).toFixed(1); };
  Lab.rand = function (lo, hi) { return lo + Math.random() * (hi - lo); };

  /* requestAnimationFrame loop. fn(dt seconds, elapsed seconds) returns false to stop. */
  Lab.loop = function (fn) {
    var id, last = null, t0 = null, on = true;
    function f(t) {
      if (!on) return;
      if (t0 == null) t0 = t;
      var dt = last == null ? 0 : Math.min(0.05, (t - last) / 1000);
      last = t;
      if (fn(dt, (t - t0) / 1000) === false) { on = false; return; }
      id = requestAnimationFrame(f);
    }
    id = requestAnimationFrame(f);
    return { stop: function () { on = false; cancelAnimationFrame(id); } };
  };

  /* A row of buttons where one is chosen. options: [{v, label}] */
  Lab.seg = function (root, options, value, onChange) {
    root.classList.add('seg');
    root.setAttribute('role', 'group');
    var api;
    var btns = options.map(function (o) {
      var b = Lab.el('button', { type: 'button', 'aria-pressed': String(o.v === value), 'data-v': String(o.v) }, o.label);
      b.addEventListener('click', function () { api.set(o.v, true); });
      root.appendChild(b);
      return b;
    });
    api = {
      get: function () { return value; },
      set: function (v, fire) {
        value = v;
        btns.forEach(function (b, i) { b.setAttribute('aria-pressed', String(options[i].v === v)); });
        if (fire && onChange) onChange(v);
      },
      disable: function (d) { btns.forEach(function (b) { b.disabled = !!d; }); },
      buttons: btns
    };
    return api;
  };

  /* Data table body that fills one row per trial. */
  Lab.table = function (tbody, ncols, emptyText) {
    var empty = Lab.el('tr', { class: 'empty-row' }, Lab.el('td', { colspan: ncols }, emptyText || 'Run a trial to fill in the table.'));
    tbody.appendChild(empty);
    var n = 0;
    return {
      add: function (cells) {
        if (empty.parentNode) empty.parentNode.removeChild(empty);
        var tr = Lab.el('tr', { class: 'new' });
        cells.forEach(function (c) {
          var td;
          if (c && c.nodeType) td = Lab.el('td', null, c);
          else if (c && typeof c === 'object') td = Lab.el('td', { class: c.cls || null }, c.node || (c.text == null ? '' : String(c.text)));
          else td = Lab.el('td', null, c == null ? '' : String(c));
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
        n++;
        return tr;
      },
      clear: function () { tbody.innerHTML = ''; tbody.appendChild(empty); n = 0; },
      count: function () { return n; }
    };
  };

  /* "What did you find?" questions with instant feedback.
     q = {q, opts:[...], a: index, why: 'shown when right', miss: {index: 'shown when that wrong answer is picked'}}
     For select-all: {multi: true, a: [indexes], ...} */
  Lab.check = function (root, qs) {
    var firstTry = 0, done = 0;
    var score = Lab.el('p', { class: 'check-score', 'aria-live': 'polite' });
    qs.forEach(function (q, qi) {
      var box = Lab.el('div', { class: 'cq', 'data-q': qi });
      box.appendChild(Lab.el('p', { class: 'cq-text' }, [Lab.el('span', { class: 'cq-n' }, (qi + 1) + '. '), q.q]));
      if (q.multi) box.appendChild(Lab.el('p', { class: 'how', style: 'margin-top:-4px' }, 'Pick all that are true. Then tap Check.'));
      var list = Lab.el('div', { class: 'choices' + (q.two ? ' two' : '') });
      var fb = Lab.el('div', { class: 'fb', 'aria-live': 'polite', hidden: true });
      var tries = 0, solved = false;
      function say(ok, msg) { fb.hidden = false; fb.className = 'fb ' + (ok ? 'ok' : 'no'); fb.textContent = msg; }
      function solve() {
        solved = true;
        if (tries === 1) firstTry++;
        done++;
        Lab.$$('button', box).forEach(function (b) { b.disabled = true; });
        if (done === qs.length) score.textContent = 'All done! You got ' + firstTry + ' of ' + qs.length + ' right on the first try.';
      }
      var btns = q.opts.map(function (o, i) {
        var b = Lab.el('button', { type: 'button', class: 'choice', 'data-i': i }, o);
        if (q.multi) b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () {
          if (solved) return;
          if (q.multi) { b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); b.classList.remove('wrong'); return; }
          tries++;
          if (i === q.a) { b.classList.add('right'); say(true, 'Yes! ' + q.why); solve(); }
          else {
            b.classList.add('wrong'); b.disabled = true;
            say(false, (q.miss && q.miss[i]) || ('Not quite. ' + (q.hint || 'Look back at your data and try again.')));
          }
        });
        list.appendChild(b);
        return b;
      });
      box.appendChild(list);
      if (q.multi) {
        var go = Lab.el('button', { type: 'button', class: 'btn navy small', style: 'margin-top:10px' }, 'Check');
        go.addEventListener('click', function () {
          if (solved) return;
          tries++;
          var picked = btns.map(function (b, i) { return b.getAttribute('aria-pressed') === 'true' ? i : -1; }).filter(function (i) { return i >= 0; });
          var extra = picked.filter(function (i) { return q.a.indexOf(i) < 0; });
          var missing = q.a.filter(function (i) { return picked.indexOf(i) < 0; });
          if (!extra.length && !missing.length) {
            picked.forEach(function (i) { btns[i].classList.add('right'); });
            say(true, 'Yes! ' + q.why); solve();
          } else if (extra.length) {
            extra.forEach(function (i) { btns[i].classList.add('wrong'); });
            say(false, (q.miss && q.miss[extra[0]]) || 'Not quite. One of your picks does not fit. Try again.');
          } else {
            say(false, 'Almost! You found ' + (q.a.length - missing.length) + ' of ' + q.a.length + '. ' + (q.hint || 'Look for one more.'));
          }
        });
        box.appendChild(go);
      }
      box.appendChild(fb);
      root.appendChild(box);
    });
    root.appendChild(score);
  };

  /* Tap a card, then tap a box. With a mouse you can also drag.
     o = {bank, binsRoot, fb, items:[{id,label,sub,bin,ok,no}], bins:[{id,label,hint}], onPlace(item, right, binId), onDone(firstTry,total)}
     item.no can be a string or {binId: 'message', _: 'default'} */
  Lab.sorter = function (o) {
    var sel = null, placed = 0, firstTry = 0, binEls = {};
    function say(kind, msg) { if (!o.fb) return; o.fb.hidden = false; o.fb.className = 'fb ' + kind; o.fb.textContent = msg; }
    function mark() {
      o.items.forEach(function (it) { if (!it._done) it._el.setAttribute('aria-pressed', String(it === sel)); });
      Object.keys(binEls).forEach(function (k) { binEls[k].el.classList.toggle('ready', !!sel); });
    }
    o.bins.forEach(function (b) {
      var head = Lab.el('button', { type: 'button', class: 'bin-head' }, [Lab.el('span', { class: 'bin-title' }, b.label), b.hint ? Lab.el('span', { class: 'bin-hint' }, b.hint) : null]);
      var list = Lab.el('div', { class: 'bin-list' });
      var el = Lab.el('div', { class: 'bin', 'data-bin': b.id }, [head, list]);
      el.addEventListener('click', function (e) {
        if (e.target.closest('.sort-card')) return;
        if (sel) drop(sel, b.id); else say('info', 'First tap a card. Then tap the box it belongs in.');
      });
      binEls[b.id] = { el: el, list: list };
      o.binsRoot.appendChild(el);
    });
    function drop(it, binId) {
      var c = it._el;
      if (binId === it.bin) {
        it._done = true; placed++;
        if (!it._miss) firstTry++;
        c.classList.add('placed'); c.removeAttribute('aria-pressed'); c.disabled = true;
        binEls[binId].list.appendChild(c);
        say('ok', 'Yes! ' + it.ok);
        if (o.onPlace) o.onPlace(it, true, binId);
        sel = null; mark();
        if (placed === o.items.length && o.onDone) o.onDone(firstTry, o.items.length);
      } else {
        it._miss = true;
        c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
        var msg = typeof it.no === 'object' ? (it.no[binId] || it.no._) : it.no;
        say('no', 'Not quite. ' + msg);
        if (o.onPlace) o.onPlace(it, false, binId);
        sel = it; mark();
      }
    }
    var items = o.keepOrder ? o.items : Lab.shuffle(o.items);
    items.forEach(function (it) {
      var c = Lab.el('button', { type: 'button', class: 'sort-card', 'aria-pressed': 'false', 'data-id': it.id },
        [Lab.el('span', { class: 'sc-label' }, it.label), it.sub ? Lab.el('span', { class: 'sc-sub' }, it.sub) : null]);
      it._el = c;
      c.addEventListener('click', function () {
        if (c._dragged) { c._dragged = false; return; }
        if (it._done) return;
        sel = (sel === it) ? null : it; mark();
        if (sel) say('info', 'Now tap the box where "' + it.label + '" belongs.');
      });
      c.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'touch' || it._done || e.button !== 0) return;
        var sx = e.clientX, sy = e.clientY, ghost = null, over = null;
        function move(ev) {
          if (!ghost && Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) > 8) {
            ghost = c.cloneNode(true); ghost.classList.add('sort-ghost'); ghost.style.width = c.offsetWidth + 'px';
            document.body.appendChild(ghost);
          }
          if (!ghost) return;
          ghost.style.left = (ev.clientX - 20) + 'px'; ghost.style.top = (ev.clientY - 20) + 'px';
          var t = document.elementFromPoint(ev.clientX, ev.clientY);
          var bin = t && t.closest ? t.closest('.bin') : null;
          if (over && over !== bin) over.classList.remove('over');
          if (bin) bin.classList.add('over');
          over = bin;
        }
        function up(ev) {
          window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
          if (!ghost) return;
          ghost.remove(); if (over) over.classList.remove('over');
          c._dragged = true; setTimeout(function () { c._dragged = false; }, 0);
          var t = document.elementFromPoint(ev.clientX, ev.clientY);
          var bin = t && t.closest ? t.closest('.bin') : null;
          if (bin) drop(it, bin.getAttribute('data-bin'));
        }
        window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
      });
      o.bank.appendChild(c);
    });
    return { placed: function () { return placed; } };
  };
})();
