/* ==========================================================================
   Math Arcade — shared game shell (arcade/arcade.js)
   Every game page calls Arcade.init({...}). This file draws the parts that
   are the same in every game: start screen with levels, score, hearts or
   timer, feedback box, end screen, best score (saved in this browser),
   sound (off until a student turns it on) and confetti.
   Each game draws its own problems inside <div id="play">.
   ========================================================================== */
(function () {
  "use strict";
  var PREFIX = "math5-arcade:";

  /* ---------- saved data (wrapped: private windows may block storage) ---------- */
  function load(k) { try { return window.localStorage.getItem(PREFIX + k); } catch (e) { return null; } }
  function save(k, v) { try { window.localStorage.setItem(PREFIX + k, String(v)); } catch (e) { /* ignore */ } }
  function getBest(id, lvl) { var v = parseInt(load(id + ":best:" + lvl), 10); return isNaN(v) ? 0 : v; }

  /* ---------- small math helpers (integers only) ---------- */
  function rand(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- sound (off by default) ---------- */
  var soundOn = load("sound") === "on", actx = null;
  function tone(f, t0, dur, type) {
    var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + t0;
    o.type = type || "sine"; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  function beep(kind) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (kind === "right") { tone(660, 0, 0.12); tone(880, 0.09, 0.16); }
      else if (kind === "wrong") { tone(260, 0, 0.22, "triangle"); }
      else if (kind === "end") { tone(523, 0, 0.14); tone(659, 0.12, 0.14); tone(784, 0.24, 0.22); }
    } catch (e) { /* no audio: fine */ }
  }

  /* ---------- confetti ---------- */
  var reduced = false;
  try { reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { }
  function confetti(host) {
    if (reduced || !host) return;
    var box = document.createElement("div"), colors = ["#FFC107", "#FFFFFF", "#60A5FA", "#4ADE80", "#F472B6"];
    box.className = "a-confetti"; box.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 70; i++) {
      var p = document.createElement("i");
      p.style.left = Math.random() * 100 + "%";
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = (Math.random() * 0.6).toFixed(2) + "s";
      p.style.animationDuration = (1.6 + Math.random()).toFixed(2) + "s";
      p.style.transform = "rotate(" + rand(0, 360) + "deg)";
      box.appendChild(p);
    }
    host.appendChild(box);
    setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 3400);
  }

  /* ---------- shell styles ---------- */
  var CSS = [
    ".a-wrap{max-width:880px;margin:0 auto;padding:20px 16px 56px}",
    ".a-back{display:inline-flex;align-items:center;gap:6px;min-height:44px;color:var(--navy,#1E2D4F);font:600 15px/1 var(--sans);text-decoration:none;margin:0 0 8px}",
    ".a-back:hover{text-decoration:underline;text-decoration-color:var(--gold-line,#E0A800);text-underline-offset:4px}",
    ".a-card{position:relative;overflow:hidden;background:linear-gradient(160deg,#24365F 0%,#1E2D4F 45%,#16213B 100%);color:#fff;border-radius:18px;",
    " padding:14px 16px 18px;box-shadow:0 14px 34px rgba(22,33,59,.22);min-height:460px}",
    ".a-card [hidden]{display:none!important}",
    ".a-top{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:40px}",
    ".a-name{font:600 12.5px/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:#FFC107}",
    ".a-sound{background:rgba(255,255,255,.08);color:#D9DEE8;border:1px solid rgba(255,255,255,.22);border-radius:999px;min-height:36px;padding:0 14px;font:500 13.5px/1 var(--sans);cursor:pointer}",
    ".a-sound[aria-pressed=true]{color:#16213B;background:#FFC107;border-color:#FFC107}",
    ".a-hud{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 14px}",
    ".a-stat{display:flex;align-items:baseline;gap:8px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:7px 12px}",
    ".a-lbl{font:600 11.5px/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:#AEB7C8}",
    ".a-val{font:600 19px/1 var(--mono);color:#fff}",
    ".a-hearts{display:flex;gap:3px;align-items:center;align-self:center}",
    ".a-hearts svg{width:20px;height:20px;display:block}",
    ".a-time{position:relative;flex:1 1 140px;min-width:120px}",
    ".a-timebar{position:absolute;left:0;right:0;bottom:0;height:3px;border-radius:0 0 10px 10px;overflow:hidden}",
    ".a-timebar i{display:block;height:100%;background:#FFC107;transform-origin:left;transition:transform .2s linear}",
    ".a-time.low .a-val{color:#FDBA74}",
    ".a-screen{text-align:center;padding:18px 4px 8px;max-width:640px;margin:0 auto}",
    ".a-screen h1,.a-screen h2{font:600 clamp(28px,6vw,40px)/1.15 var(--serif);margin:6px 0 10px;color:#fff;letter-spacing:-.01em}",
    ".a-how{font-size:18px;line-height:1.45;color:#D9DEE8;margin:0 auto 20px;max-width:34ch}",
    ".a-levels{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;text-align:left}",
    ".a-level{display:flex;flex-direction:column;gap:4px;min-height:84px;padding:14px 16px;border-radius:14px;cursor:pointer;color:#fff;",
    " background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.16);font:inherit;text-align:left;transition:border-color .12s,background .12s,transform .12s}",
    ".a-level:hover,.a-level:focus-visible{border-color:#FFC107;background:rgba(255,193,7,.1);transform:translateY(-1px)}",
    ".a-level .k{font:600 12.5px/1 var(--mono);color:#FFC107;letter-spacing:.06em;text-transform:uppercase}",
    ".a-level .n{font:600 17px/1.25 var(--sans)}",
    ".a-level .d{font-size:14px;color:#AEB7C8;line-height:1.35}",
    ".a-level .b{font:500 12.5px/1 var(--mono);color:#AEB7C8;margin-top:auto;padding-top:6px}",
    ".a-tip{font-size:14px;color:#AEB7C8;margin:16px 0 0}",
    ".a-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:52px;min-width:52px;padding:0 22px;border-radius:12px;",
    " border:2px solid #FFC107;background:#FFC107;color:#16213B;font:700 17px/1 var(--sans);cursor:pointer;text-decoration:none;touch-action:manipulation}",
    ".a-btn:hover{background:#FFD24D}",
    ".a-btn.ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.35)}",
    ".a-btn.ghost:hover{border-color:#FFC107;background:rgba(255,193,7,.1)}",
    ".a-btn:disabled{opacity:.45;cursor:default}",
    ".a-card :focus-visible{outline:3px solid #FFC107;outline-offset:3px}",
    ".a-fb{display:none;align-items:center;gap:12px;flex-wrap:wrap;margin:14px 0 0;padding:12px 14px;border-radius:12px;border-left:5px solid;font-size:17px;line-height:1.45}",
    ".a-fb.show{display:flex}",
    ".a-fb.ok{background:rgba(74,222,128,.14);border-color:#4ADE80}",
    ".a-fb.no{background:rgba(253,186,116,.14);border-color:#FDBA74}",
    ".a-fb .msg{flex:1 1 240px;min-width:0}",
    ".a-fb .msg b{color:#fff}",
    ".a-fb .steps{display:block;margin-top:4px;font:500 15px/1.5 var(--mono);color:#E6E9F0;overflow-wrap:anywhere}",
    ".a-fb .a-btn{min-height:46px;padding:0 18px;font-size:16px}",
    ".a-plus{position:absolute;right:18px;top:62px;font:700 22px/1 var(--mono);color:#4ADE80;pointer-events:none;animation:aPlus .9s ease-out forwards}",
    "@keyframes aPlus{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-26px)}}",
    ".a-score{font:700 64px/1 var(--mono);color:#FFC107;margin:8px 0 6px}",
    ".a-sub{color:#D9DEE8;font-size:17px;margin:0 0 4px}",
    ".a-new{display:inline-block;background:#FFC107;color:#16213B;font:700 14px/1 var(--sans);letter-spacing:.06em;text-transform:uppercase;padding:7px 12px;border-radius:999px;margin:6px 0}",
    ".a-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:22px 0 4px}",
    ".a-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:5}",
    ".a-confetti i{position:absolute;top:-14px;width:9px;height:14px;border-radius:2px;animation-name:aFall;animation-timing-function:cubic-bezier(.3,.6,.6,1);animation-fill-mode:forwards}",
    "@keyframes aFall{to{top:105%;transform:rotate(540deg) translateX(30px)}}",
    ".a-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}",
    ".a-stds{font:500 12.5px/1.4 var(--mono);color:var(--faint,#687082);margin:14px 2px 0}",
    "@media (max-width:640px){.a-card{padding:12px 12px 16px;border-radius:14px}.a-score{font-size:54px}.a-stat{padding:7px 9px;gap:6px}.a-hud{gap:6px;flex-wrap:nowrap}.a-time{flex:1 1 auto;min-width:0}}",
    "@media (max-width:480px){.a-stat.streak{display:none}.a-lbl{font-size:10.5px;letter-spacing:.06em}}",
    "@media (prefers-reduced-motion:reduce){.a-plus{animation:none;opacity:0}}"
  ].join("\n");
  function injectCSS() {
    if (document.getElementById("a-shell-css")) return;
    var st = document.createElement("style"); st.id = "a-shell-css"; st.textContent = CSS;
    document.head.appendChild(st);
  }

  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.8 4.5c2.1 0 3.6 1.2 5.2 3 1.6-1.8 3.1-3 5.2-3 3.8 0 5.9 3.8 4.4 7.3C19.5 16.4 12 21 12 21z" fill="FILL" stroke="#FFC107" stroke-width="1.6"/></svg>';

  /* ======================================================================
     Arcade.init(cfg)
       cfg.id, cfg.title, cfg.howTo (one sentence), cfg.levels [{name, desc}]
       cfg.mode "lives" (cfg.lives, default 3) or "timer" (cfg.seconds, default 60)
       cfg.onStart(level)  draw the first problem
       cfg.onStop()        stop animations / timers of the game
       cfg.ends            optional end titles {time, lives, finish}
     The returned object lets the game report answers:
       g.right(html, next, {points, lock})   g.wrong(html, next)
       g.locked()  g.level  g.addScore(n)  g.end(reason)  g.say(html)
     ====================================================================== */
  function init(cfg) {
    injectCSS();
    var card = document.getElementById("game"), play = document.getElementById("play");
    var mode = cfg.mode || "lives", maxLives = cfg.lives || 3, seconds = cfg.seconds || 60;
    var ends = cfg.ends || {};
    var st = { level: 1, score: 0, lives: maxLives, left: seconds * 1000, right: 0, tries: 0, streak: 0, running: false, waiting: false, gen: 0, nextFn: null, shownAt: 0 };

    // ---- build the shell ----
    var top = document.createElement("div");
    top.className = "a-top";
    top.innerHTML = '<span class="a-name">' + esc(cfg.title) + '</span>' +
      '<button type="button" class="a-sound" aria-pressed="' + soundOn + '">' + (soundOn ? "Sound: on" : "Sound: off") + "</button>";
    var hud = document.createElement("div");
    hud.className = "a-hud"; hud.hidden = true;
    hud.innerHTML =
      '<div class="a-stat"><span class="a-lbl">Level</span><span class="a-val" data-k="level">1</span></div>' +
      '<div class="a-stat"><span class="a-lbl">Score</span><span class="a-val" data-k="score">0</span></div>' +
      (mode === "lives"
        ? '<div class="a-stat"><span class="a-lbl">Hearts</span><span class="a-hearts" data-k="hearts" role="img" aria-label="3 hearts"></span></div>'
        : '<div class="a-stat a-time"><span class="a-lbl">Time</span><span class="a-val" data-k="time">' + seconds + '</span><span class="a-timebar"><i data-k="bar"></i></span></div>') +
      '<div class="a-stat streak"><span class="a-lbl">Streak</span><span class="a-val" data-k="streak">0</span></div>';

    var start = document.createElement("section");
    start.className = "a-screen a-start";
    var lv = cfg.levels.map(function (l, i) {
      return '<button type="button" class="a-level" data-level="' + (i + 1) + '"><span class="k">Level ' + (i + 1) + '</span>' +
        '<span class="n">' + esc(l.name) + '</span><span class="d">' + esc(l.desc) + '</span><span class="b" data-best="' + (i + 1) + '"></span></button>';
    }).join("");
    start.innerHTML = '<h1>' + esc(cfg.title) + '</h1><p class="a-how">' + esc(cfg.howTo) + '</p>' +
      '<div class="a-levels">' + lv + '</div>' +
      '<p class="a-tip">' + (mode === "lives" ? "You have 3 hearts." : "You have " + seconds + " seconds.") + " Pick a level to start.</p>";

    var fb = document.createElement("div");
    fb.className = "a-fb"; fb.setAttribute("aria-live", "polite");
    fb.innerHTML = '<div class="msg"></div><button type="button" class="a-btn a-next" hidden>Next</button>';

    var endS = document.createElement("section");
    endS.className = "a-screen a-end"; endS.hidden = true;

    card.insertBefore(top, card.firstChild);
    card.insertBefore(hud, play);
    card.insertBefore(start, play);
    play.hidden = true;
    play.parentNode.insertBefore(fb, play.nextSibling);
    card.appendChild(endS);

    var $ = function (k) { return hud.querySelector('[data-k="' + k + '"]'); };
    var soundBtn = top.querySelector(".a-sound"), nextBtn = fb.querySelector(".a-next"), msg = fb.querySelector(".msg");

    soundBtn.addEventListener("click", function () {
      soundOn = !soundOn; save("sound", soundOn ? "on" : "off");
      soundBtn.setAttribute("aria-pressed", String(soundOn));
      soundBtn.textContent = soundOn ? "Sound: on" : "Sound: off";
      beep("right");
    });

    function showBests() {
      start.querySelectorAll("[data-best]").forEach(function (el) {
        var b = getBest(cfg.id, el.getAttribute("data-best"));
        el.textContent = b ? "Best: " + b : "Best: —";
      });
    }
    showBests();
    start.querySelectorAll(".a-level").forEach(function (b) {
      b.addEventListener("click", function () { begin(+b.getAttribute("data-level")); });
    });

    function drawHud() {
      $("level").textContent = st.level;
      $("score").textContent = st.score;
      $("streak").textContent = st.streak;
      if (mode === "lives") {
        var h = "";
        for (var i = 0; i < maxLives; i++) h += HEART.replace("FILL", i < st.lives ? "#FFC107" : "none");
        $("hearts").innerHTML = h;
        $("hearts").setAttribute("aria-label", st.lives + (st.lives === 1 ? " heart" : " hearts") + " left");
      } else {
        var s = Math.ceil(st.left / 1000);
        $("time").textContent = s;
        $("time").parentNode.classList.toggle("low", s <= 10);
        $("bar").style.transform = "scaleX(" + Math.max(0, st.left / (seconds * 1000)) + ")";
      }
    }

    // ---- timer (paused while a wrong-answer note is showing) ----
    var tickId = null, lastT = 0;
    function tick() {
      var now = performance.now(), dt = now - lastT; lastT = now;
      if (!st.running) return;
      if (!st.waiting || st.noPause) st.left -= dt;
      if (st.left <= 0) { st.left = 0; drawHud(); end("time"); return; }
      drawHud();
    }

    function hideFb() { fb.className = "a-fb"; nextBtn.hidden = true; msg.innerHTML = ""; }

    function begin(level) {
      st.gen++;
      st.level = level; st.score = 0; st.lives = maxLives; st.left = seconds * 1000;
      st.right = 0; st.tries = 0; st.streak = 0; st.running = true; st.waiting = false; st.noPause = false;
      start.hidden = true; endS.hidden = true; hud.hidden = false; play.hidden = false;
      hideFb(); drawHud();
      api.level = level;
      if (mode === "timer") { clearInterval(tickId); lastT = performance.now(); tickId = setInterval(tick, 100); }
      cfg.onStart(level);
    }

    function later(fn, ms) { var g = st.gen; return setTimeout(function () { if (g === st.gen && st.running) fn(); }, ms); }

    function flashPlus(n) {
      if (!n) return;
      var p = document.createElement("span"); p.className = "a-plus"; p.textContent = "+" + n;
      card.appendChild(p); setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 950);
    }

    var api = {
      level: 1,
      locked: function () { return !st.running || st.waiting; },
      running: function () { return st.running; },
      addScore: function (n) { st.score += n; drawHud(); },
      lives: function () { return st.lives; },
      say: function (html, kind) {           // a note that does not end the turn
        msg.innerHTML = html; fb.className = "a-fb show " + (kind || "no"); nextBtn.hidden = true;
      },
      clear: hideFb,
      right: function (html, next, opt) {
        if (api.locked()) return;
        opt = opt || {};
        var pts = opt.points == null ? 10 : opt.points;
        st.score += pts; st.right++; st.tries++; st.streak++;
        drawHud(); flashPlus(pts); beep("right");
        msg.innerHTML = html; fb.className = "a-fb show ok"; nextBtn.hidden = true;
        if (opt.lock === false) {          // game keeps going (Fraction Pop)
          clearTimeout(st.okTimer);
          st.okTimer = later(function () { if (!st.waiting) hideFb(); }, 1300);
          if (next) next();
          return;
        }
        st.waiting = true; st.noPause = true;
        later(function () { st.waiting = false; st.noPause = false; hideFb(); if (next) next(); }, opt.delay || 1100);
      },
      wrong: function (html, next) {
        if (api.locked()) return;
        st.tries++; st.streak = 0;
        if (mode === "lives") st.lives--;
        drawHud(); beep("wrong");
        clearTimeout(st.okTimer);
        msg.innerHTML = html; fb.className = "a-fb show no";
        st.waiting = true; st.noPause = false; st.nextFn = next || null; st.shownAt = performance.now();
        nextBtn.hidden = false;
        nextBtn.textContent = mode === "lives" && st.lives <= 0 ? "See my score" : "Next";
        try { nextBtn.focus({ preventScroll: true }); } catch (e) { nextBtn.focus(); }
        try { fb.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" }); } catch (e) { }
      },
      end: function (reason) { end(reason); }
    };

    function goNext() {
      if (!st.running || !st.waiting) return;
      if (performance.now() - st.shownAt < 350) return;   // the Enter key that answered must not skip the note
      if (mode === "lives" && st.lives <= 0) { end("lives"); return; }
      st.waiting = false; hideFb();
      var f = st.nextFn; st.nextFn = null;
      if (f) f();
    }
    nextBtn.addEventListener("click", goNext);

    function end(reason) {
      if (!st.running) return;
      st.running = false; st.waiting = false; st.gen++;
      clearInterval(tickId);
      try { if (cfg.onStop) cfg.onStop(); } catch (e) { if (window.console) console.error(e); }
      var old = getBest(cfg.id, st.level), isNew = st.score > old && st.score > 0;
      if (isNew) save(cfg.id + ":best:" + st.level, st.score);
      var title = reason === "time" ? (ends.time || "Time's up!") : reason === "finish" ? (ends.finish || "You did it!") : (ends.lives || "Out of hearts");
      var lvls = cfg.levels.length;
      endS.innerHTML =
        "<h2>" + esc(title) + "</h2>" +
        '<p class="a-sub">Level ' + st.level + " score</p>" +
        '<div class="a-score">' + st.score + "</div>" +
        (isNew ? '<span class="a-new">New best score</span>' : '<p class="a-sub">Best score: <b>' + Math.max(old, st.score) + "</b></p>") +
        '<p class="a-sub">You got ' + st.right + " of " + st.tries + " right." + (st.right && st.right === st.tries ? " Perfect!" : "") + "</p>" +
        (st.right === 0 ? '<p class="a-sub">Every try helps you learn. Read the tips and try again!</p>' : "") +
        '<div class="a-row">' +
        '<button type="button" class="a-btn" data-act="again">Play again</button>' +
        (st.level < lvls ? '<button type="button" class="a-btn ghost" data-act="up">Try level ' + (st.level + 1) + "</button>" : "") +
        '<button type="button" class="a-btn ghost" data-act="levels">Pick a level</button>' +
        '<a class="a-btn ghost" href="index.html">&larr; Arcade</a></div>';
      hud.hidden = true; play.hidden = true; hideFb(); endS.hidden = false;
      endS.querySelector('[data-act="again"]').addEventListener("click", function () { begin(st.level); });
      var up = endS.querySelector('[data-act="up"]');
      if (up) up.addEventListener("click", function () { begin(st.level + 1); });
      endS.querySelector('[data-act="levels"]').addEventListener("click", function () {
        endS.hidden = true; showBests(); start.hidden = false;
        var b = start.querySelector(".a-level"); if (b) b.focus();
      });
      beep("end");
      if (isNew) confetti(card);
      try { card.scrollIntoView({ block: "nearest" }); } catch (e) { }
      setTimeout(function () { var b = endS.querySelector('[data-act="again"]'); if (b) b.focus({ preventScroll: true }); }, 200);
    }

    // keys 1–3 pick a level on the start screen
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (!start.hidden && /^[1-9]$/.test(e.key) && +e.key <= cfg.levels.length) { e.preventDefault(); begin(+e.key); }
    });

    return api;
  }

  window.Arcade = { init: init, rand: rand, pick: pick, shuffle: shuffle, gcd: gcd, esc: esc, beep: beep, confetti: confetti, best: getBest };
})();
