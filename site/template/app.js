/* Digital Literacy course — client behaviour.
   No external libraries. Stores a language preference, the current learner
   nickname, and per-learner "done" flags and review scores in localStorage.
   No personal information beyond a chosen nickname is ever stored, and it
   never leaves the device. */

(function () {
  'use strict';

  var LANG_KEY = 'dl.lang';
  var USER_KEY = 'dl.user';
  var PASS = 70; // percent needed to earn a chapter star

  /* ---------- Current learner (local profile) ---------- */
  function getUser() {
    try { return localStorage.getItem(USER_KEY) || ''; } catch (e) { return ''; }
  }
  function setUser(name) {
    try { localStorage.setItem(USER_KEY, name); } catch (e) {}
  }
  function ns() { return 'dl.u.' + (getUser() || 'guest') + '.'; }

  /* ---------- Language toggle (single globe button) ---------- */
  function applyLang(lang) {
    var root = document.documentElement;
    root.classList.remove('lang-show-en', 'lang-show-ne');
    root.classList.add(lang === 'en' ? 'lang-show-en' : 'lang-show-ne');
    root.setAttribute('lang', lang);
    var label = document.getElementById('langLabel');
    if (label) label.textContent = (lang === 'en' ? 'EN' : 'ने');
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
    applyLang(saved === 'ne' ? 'ne' : 'en'); // default English
    var btn = document.getElementById('langBtn');
    if (btn) btn.addEventListener('click', function () {
      var now = document.documentElement.classList.contains('lang-show-en') ? 'en' : 'ne';
      var next = now === 'en' ? 'ne' : 'en';
      try { localStorage.setItem(LANG_KEY, next); } catch (e) {}
      applyLang(next);
    });
  }

  /* ---------- Profile chip + nickname modal ---------- */
  function getUsers() {
    try { var a = JSON.parse(localStorage.getItem('dl.users') || '[]'); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function addUser(name) {
    if (!name || name === 'guest') return;
    try {
      var a = getUsers();
      if (a.indexOf(name) === -1) { a.push(name); localStorage.setItem('dl.users', JSON.stringify(a)); }
    } catch (e) {}
  }

  function initUser() {
    var acctUser = document.getElementById('acctUser');
    var avatar = document.getElementById('avatar');
    var nameEl = document.getElementById('uaName');
    var inBtn = document.getElementById('signInBtn');
    var outBtn = document.getElementById('signOutBtn');
    var u = getUser();
    var real = !!u;
    if (inBtn) {
      inBtn.hidden = real;
      inBtn.addEventListener('click', function () { openUserModal(false); });
    }
    if (acctUser) acctUser.hidden = !real;
    if (real) {
      if (nameEl) nameEl.textContent = u;
      if (avatar) avatar.textContent = u.charAt(0);
    }
    if (outBtn) outBtn.addEventListener('click', function () {
      try { localStorage.removeItem(USER_KEY); } catch (e) {}
      location.href = 'index.html'; // sign out → home, no form
    });
    var isCatalog = document.body.classList.contains('page-catalog');
    if (!real && !isCatalog) openUserModal(true); // must choose a learner to use a course
  }

  function applyUser(name) { // register + set + reload (stay on page, now signed in)
    if (!name) return;
    addUser(name);
    setUser(name);
    location.reload();
  }

  function openUserModal(required) {
    if (document.querySelector('.user-modal-overlay')) return;
    var cur = getUser();
    var users = getUsers();

    var listHtml = '';
    if (users.length) {
      listHtml += '<div class="um-label"><span class="lang-en">Choose a learner</span><span class="lang-ne">सिकारु छान्नुहोस्</span></div>';
      if (users.length > 8) listHtml += '<input id="umFilter" class="um-filter" type="text" autocomplete="off" placeholder="Search / खोज्नुहोस्">';
      listHtml += '<div class="um-list">';
      for (var i = 0; i < users.length; i++) {
        var n = users[i];
        listHtml += '<button type="button" class="um-user' + (n === cur ? ' is-current' : '') + '" data-name="' + escapeAttr(n) + '">' +
          '<span class="um-ava">' + escapeHtml(n.charAt(0)) + '</span>' +
          '<span class="um-uname">' + escapeHtml(n) + '</span>' +
          (n === cur ? '<span class="um-cur">\u2713</span>' : '') + '</button>';
      }
      listHtml += '</div>';
    }

    var overlay = document.createElement('div');
    overlay.className = 'user-modal-overlay';
    overlay.innerHTML =
      '<div class="user-modal" role="dialog" aria-modal="true" aria-labelledby="umTitle">' +
        '<button type="button" class="um-close" aria-label="Close">×</button>' +
        '<h2 id="umTitle"><span class="lang-en">Who is learning?</span><span class="lang-ne">को सिक्दै हुनुहुन्छ?</span></h2>' +
        '<p><span class="lang-en">Choose your name or add a new one. Your progress and stars are saved on this computer.</span><span class="lang-ne">आफ्नो नाम छान्नुहोस् वा नयाँ थप्नुहोस्। प्रगति र तारा यही कम्प्युटरमा सुरक्षित रहन्छ।</span></p>' +
        listHtml +
        '<div class="um-label"><span class="lang-en">New learner</span><span class="lang-ne">नयाँ सिकारु</span></div>' +
        '<input id="userInput" type="text" maxlength="40" autocomplete="off" placeholder="Full name / पूरा नाम">' +
        '<div class="um-actions">' +
          '<button type="button" class="um-save"><span class="lang-en">Save</span><span class="lang-ne">सुरु गर्नुहोस्</span></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector('#userInput');
    if (input) input.focus();

    var userBtns = overlay.querySelectorAll('.um-user');
    for (var j = 0; j < userBtns.length; j++) {
      userBtns[j].addEventListener('click', function () { applyUser(this.getAttribute('data-name')); });
    }
    var filter = overlay.querySelector('#umFilter');
    if (filter) filter.addEventListener('input', function () {
      var q = this.value.toLowerCase();
      for (var k = 0; k < userBtns.length; k++) {
        var nm = (userBtns[k].getAttribute('data-name') || '').toLowerCase();
        userBtns[k].style.display = nm.indexOf(q) >= 0 ? '' : 'none';
      }
    });
    overlay.querySelector('.um-save').addEventListener('click', function () {
      var v = (input.value || '').trim();
      if (!v) { input.focus(); return; }
      applyUser(v);
    });
    if (input) input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var v = (input.value || '').trim(); if (v) applyUser(v); }
    });

    function closeModal() {
      if (required) { location.href = 'index.html'; return; } // no course access without a learner
      overlay.remove();
      document.removeEventListener('keydown', onEsc);
    }
    function onEsc(e) { if (e.key === 'Escape') closeModal(); }
    var closeBtn = overlay.querySelector('.um-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', onEsc);
  }

  function escapeAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------- Local progress (per learner) ---------- */
  function isDone(id) {
    try { return localStorage.getItem(ns() + 'done.' + id) === '1'; } catch (e) { return false; }
  }
  function setDone(id, done) {
    try {
      if (done) localStorage.setItem(ns() + 'done.' + id, '1');
      else localStorage.removeItem(ns() + 'done.' + id);
    } catch (e) {}
  }
  function getScore(id) {
    try { var v = localStorage.getItem(ns() + 'score.' + id); return v == null ? null : parseInt(v, 10); }
    catch (e) { return null; }
  }
  function setBestScore(id, pct) {
    try {
      var prev = getScore(id);
      if (prev == null || pct > prev) localStorage.setItem(ns() + 'score.' + id, String(pct));
    } catch (e) {}
  }

  function initProgress() {
    var rows = document.querySelectorAll('.lesson-row[data-lesson], .outline-lesson[data-lesson], .toc-lesson[data-lesson]');
    for (var i = 0; i < rows.length; i++) {
      if (isDone(rows[i].getAttribute('data-lesson'))) rows[i].classList.add('is-done');
    }

    var article = document.querySelector('.lesson[data-lesson]');
    var btn = document.querySelector('.done-btn[data-lesson]');
    if (article && btn) {
      var id = article.getAttribute('data-lesson');
      var state = article.querySelector('.done-state');
      function render() {
        var done = isDone(id);
        article.classList.toggle('is-done', done);
        if (state) state.hidden = !done;
        var side = document.querySelector('.outline-lesson[data-lesson="' + id + '"]');
        if (side) side.classList.toggle('is-done', done);
        updateSidebarProgress();
      }
      btn.addEventListener('click', function () { setDone(id, !isDone(id)); render(); });
      if (state) state.addEventListener('click', function () { setDone(id, false); render(); });
      render();
    }

    updateSidebarProgress();
    updateStars();
  }

  function updateSidebarProgress() {
    var items = document.querySelectorAll('.outline-lesson[data-lesson], .toc-lesson[data-lesson]');
    if (!items.length) return;
    var total = items.length, done = 0;
    for (var i = 0; i < items.length; i++) {
      if (isDone(items[i].getAttribute('data-lesson'))) done++;
    }
    var pct = Math.round((done / total) * 100);
    var fill = document.getElementById('cpFill');
    var label = document.getElementById('cpLabel');
    if (fill) fill.style.width = pct + '%';
    if (label) {
      var en = label.querySelector('.lang-en');
      var ne = label.querySelector('.lang-ne');
      if (en) en.textContent = pct + '% complete';
      if (ne) ne.textContent = pct + '% पूरा';
    }
  }

  // Light up review stars on the course outline based on saved scores.
  function updateStars() {
    var reviews = document.querySelectorAll('.toc-lesson.is-review[data-lesson]');
    for (var i = 0; i < reviews.length; i++) {
      var sc = getScore(reviews[i].getAttribute('data-lesson'));
      reviews[i].classList.toggle('is-passed', sc != null && sc >= PASS);
      var pts = reviews[i].querySelector('.toc-points');
      if (pts) pts.textContent = (sc != null) ? (sc + '/100') : '';
    }
  }

  /* ---------- Copyable AI prompts ---------- */
  function initCopy() {
    var btns = document.querySelectorAll('.copy-btn[data-copy]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var text = this.getAttribute('data-copy');
        var btn = this;
        var done = function () {
          btn.classList.add('copied');
          setTimeout(function () { btn.classList.remove('copied'); }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
        } else {
          fallbackCopy(text, done);
        }
      });
    }
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    if (done) done();
  }

  /* ---------- Service worker (offline) ---------- */
  function initSW() {
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').catch(function () {});
      });
    }
  }

  /* ---- Interactive hotspots ---- */
  function closeAllPops(except) {
    var pops = document.querySelectorAll('.hotspot-pop');
    for (var i = 0; i < pops.length; i++) {
      if (pops[i] !== except) pops[i].hidden = true;
    }
    var btns = document.querySelectorAll('.hotspot');
    for (var j = 0; j < btns.length; j++) {
      var pid = btns[j].getAttribute('data-pop');
      var p = document.getElementById(pid);
      btns[j].classList.toggle('active', !!p && !p.hidden);
    }
  }

  function initHotspots() {
    var btns = document.querySelectorAll('.hotspot[data-pop]');
    if (!btns.length) return;
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
        e.stopPropagation();
        var pop = document.getElementById(this.getAttribute('data-pop'));
        if (!pop) return;
        var willShow = pop.hidden;
        closeAllPops(willShow ? pop : null);
        pop.hidden = !willShow;
        this.classList.toggle('active', willShow);
      });
    }
    document.addEventListener('click', function () { closeAllPops(null); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAllPops(null); });
  }

  /* ---- Sidebar drawer (mobile) ---- */
  function initSidebar() {
    var btn = document.getElementById('menuBtn');
    var overlay = document.getElementById('sidebarOverlay');
    if (!btn) return;
    function setOpen(open) {
      document.body.classList.toggle('sidebar-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (overlay) overlay.hidden = !open;
    }
    btn.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('sidebar-open'));
    });
    if (overlay) overlay.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    var links = document.querySelectorAll('.sidebar .outline-lesson');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () { setOpen(false); });
    }
  }

  /* ---- Offline self-check quiz (chapter reviews are scored) ---- */
  function initQuiz() {
    var reviewArticle = document.querySelector('.lesson[data-review-id]');
    var reviewId = reviewArticle ? reviewArticle.getAttribute('data-review-id') : null;
    var quizzes = document.querySelectorAll('.quiz');

    for (var qi = 0; qi < quizzes.length; qi++) {
      (function (quiz) {
        var scored = !!reviewArticle && reviewArticle.contains(quiz);
        var questions = quiz.querySelectorAll('.quiz-q');
        var total = questions.length;
        var decided = 0, firstCorrect = 0;
        var resultEl = null;
        if (scored) {
          resultEl = document.createElement('div');
          resultEl.className = 'quiz-result';
          resultEl.hidden = true;
          quiz.appendChild(resultEl);
        }
        function finalize() {
          var pct = total ? Math.round((firstCorrect / total) * 100) : 0;
          setBestScore(reviewId, pct);
          showResult(resultEl, pct);
        }
        for (var k = 0; k < questions.length; k++) {
          (function (q) {
            var answer = parseInt(q.getAttribute('data-answer'), 10);
            var opts = q.querySelectorAll('.quiz-opt');
            var fb = q.querySelector('.quiz-feedback');
            var explain = fb ? fb.querySelector('.qf-explain') : null;
            var attempts = 0, solved = false, firstAnswered = false, firstTryCorrect = false;
            function setFb(kind) {
              if (!fb) return;
              fb.hidden = false;
              var parts = fb.querySelectorAll('.qf');
              for (var i = 0; i < parts.length; i++) parts[i].style.display = 'none';
              var el = fb.querySelector('.qf-' + kind);
              if (el) el.style.display = 'inline';
              if (explain) explain.style.display = (kind === 'retry') ? 'none' : 'block';
            }
            function decide() {
              decided++;
              if (firstTryCorrect) firstCorrect++;
              if (scored && decided === total) finalize();
            }
            for (var i = 0; i < opts.length; i++) {
              opts[i].addEventListener('click', function () {
                if (solved) return;
                var idx = parseInt(this.getAttribute('data-i'), 10);
                if (!firstAnswered) { firstAnswered = true; firstTryCorrect = (idx === answer); }
                if (idx === answer) {
                  this.classList.add('correct');
                  solved = true; q.classList.add('solved');
                  setFb('correct'); decide();
                } else {
                  this.classList.add('wrong');
                  this.disabled = true;
                  attempts++;
                  if (attempts >= 2) {
                    if (opts[answer]) opts[answer].classList.add('correct');
                    solved = true; setFb('reveal'); decide();
                  } else {
                    setFb('retry');
                  }
                }
              });
            }
          })(questions[k]);
        }
      })(quizzes[qi]);
    }
  }

  function showResult(el, pct) {
    if (!el) return;
    var pass = pct >= PASS;
    var stars = pct >= 90 ? 3 : pct >= 80 ? 2 : pct >= PASS ? 1 : 0;
    var starHtml = '';
    for (var i = 0; i < 3; i++) starHtml += '<span class="qr-star' + (i < stars ? ' on' : '') + '">★</span>';
    el.hidden = false;
    el.className = 'quiz-result ' + (pass ? 'is-pass' : 'is-tryagain');
    var msgEn = pass ? 'Congratulations! You passed this chapter.' : 'Almost there. Review and try again.';
    var msgNe = pass ? 'बधाई छ! तपाईं यो अध्याय उत्तीर्ण हुनुभयो।' : 'लगभग पुग्नुभयो। हेरेर फेरि प्रयास गर्नुहोस्।';
    el.innerHTML =
      '<div class="qr-stars" aria-hidden="true">' + starHtml + '</div>' +
      '<div class="qr-label"><span class="lang-en">Your score</span><span class="lang-ne">तपाईंको अंक</span></div>' +
      '<div class="qr-score">' + pct + '<span class="qr-out"> / 100</span></div>' +
      '<div class="qr-msg"><span class="lang-en">' + msgEn + '</span><span class="lang-ne">' + msgNe + '</span></div>' +
      '<button type="button" class="qr-retry"><span class="lang-en">Try again</span><span class="lang-ne">फेरि प्रयास</span></button>';
    el.querySelector('.qr-retry').addEventListener('click', function () { location.reload(); });
    if (el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---- Reveal the active lesson inside the sidebar (without moving the page) ---- */
  function initSidebarScroll() {
    var side = document.getElementById('sidebar');
    if (!side) return;
    var active = side.querySelector('.outline-lesson.active');
    if (!active) return;
    var target = active.offsetTop - (side.clientHeight / 2) + (active.offsetHeight / 2);
    side.scrollTop = target > 0 ? target : 0;
  }

  /* ---- Completion certificate ---- */
  function initCertificate() {
    var page = document.querySelector('.cert-page');
    if (!page) return;
    var cert = document.getElementById('cert');
    var pending = document.getElementById('certPending');
    var dlBtn = document.getElementById('certDownload');
    var items = document.querySelectorAll('#certChapters li[data-review]');
    var user = getUser();
    var real = user && user !== 'guest';

    if (!real) {
      pending.hidden = false;
      pending.innerHTML = '<h2><span class="lang-en">Sign in first</span><span class="lang-ne">पहिले साइन इन गर्नुहोस्</span></h2>' +
        '<p><span class="lang-en">Sign in with your name to earn your certificate.</span>' +
        '<span class="lang-ne">प्रमाणपत्र पाउन आफ्नो नामले साइन इन गर्नुहोस्।</span></p>';
      return;
    }

    var total = items.length, passed = 0;
    for (var i = 0; i < items.length; i++) {
      var sc = getScore(items[i].getAttribute('data-review'));
      if (sc != null && sc >= PASS) passed++;
    }

    var d = new Date();
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var dateStr = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();

    if (total > 0 && passed === total) {
      document.getElementById('certName').textContent = user;
      document.getElementById('certDate').textContent = dateStr;
      cert.hidden = false;
      if (dlBtn) {
        dlBtn.hidden = false;
        dlBtn.addEventListener('click', function () {
          downloadCertificate(user, dateStr, {
            platform: cert.getAttribute('data-platform') || 'Paila',
            org: cert.getAttribute('data-org') || 'One More Light',
            orgAbbr: cert.getAttribute('data-orgabbr') || 'OML',
            course: cert.getAttribute('data-course') || 'Digital Literacy'
          });
        });
      }
    } else {
      pending.hidden = false;
      pending.innerHTML = '<h2><span class="lang-en">Almost there!</span><span class="lang-ne">लगभग पुग्नुभयो!</span></h2>' +
        '<p><span class="lang-en">You have passed ' + passed + ' of ' + total + ' chapters. Pass every chapter review (' + PASS + '%+) to earn your certificate.</span>' +
        '<span class="lang-ne">तपाईंले ' + total + ' मध्ये ' + passed + ' अध्याय पास गर्नुभयो। प्रमाणपत्र पाउन हरेक अध्याय समीक्षा (' + PASS + '%+) पास गर्नुहोस्।</span></p>';
    }
  }

  // Render just the certificate onto a canvas and download a clean PNG
  // (no browser print headers, URL, timestamp, or on-screen widgets).
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function loadImg(src) {
    return new Promise(function (res) {
      var im = new Image();
      im.onload = function () { res(im); };
      im.onerror = function () { res(null); };
      im.src = src;
    });
  }
  // Draw the Paila footprint mark + wordmark directly (no SVG image → no canvas taint).
  function drawPaila(ctx, x, y, h) {
    var s = h / 64;
    ctx.save();
    ctx.translate(x, y); ctx.scale(s, s);
    function poly(p, fill) {
      ctx.beginPath(); ctx.moveTo(p[0], p[1]);
      for (var i = 2; i < p.length; i += 2) ctx.lineTo(p[i], p[i + 1]);
      ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
    }
    poly([13,14,18,11,19,16,14,18], '#4338ca');
    poly([22,9,27,8,27,14,22,15], '#4f46e5');
    poly([30,9,35,10,34,16,29,15], '#6d28d9');
    poly([38,12,42,15,40,20,35,18], '#7c3aed');
    poly([12,22,26,18,39,24,34,38,16,39,9,30], '#4338ca');
    poly([26,18,39,24,34,38,27,29], '#6d28d9');
    poly([18,44,31,43,28,58,21,58], '#4338ca');
    poly([31,43,28,58,26,50], '#6d28d9');
    ctx.fillStyle = '#312e81'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.font = '800 32px system-ui, sans-serif'; ctx.fillText('Paila', 72, 44);
    ctx.restore();
  }
  function downloadCertificate(name, dateStr, meta) {
    loadImg('assets/figures/logo-oml.png').then(function (oml) {
      try {
        var s = 2, W = 1200, H = 820, cx = W / 2;
        var cv = document.createElement('canvas');
        cv.width = W * s; cv.height = H * s;
        var ctx = cv.getContext('2d');
        ctx.scale(s, s);
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
        roundRect(ctx, 40, 40, W - 80, H - 80, 18);
        ctx.lineWidth = 3; ctx.strokeStyle = '#3730a3'; ctx.stroke();

        drawPaila(ctx, 88, 82, 58);

        var lh = 58;
        if (oml && oml.width) {
          var ow = lh * (oml.width / oml.height);
          ctx.drawImage(oml, W - 90 - ow, 84, ow, lh);
        } else {
          ctx.textAlign = 'right';
          ctx.fillStyle = '#1f2238'; ctx.font = '800 26px system-ui, sans-serif'; ctx.fillText(meta.org, W - 90, 116);
          ctx.fillStyle = '#6b7280'; ctx.font = '700 14px system-ui, sans-serif'; ctx.fillText(meta.orgAbbr, W - 90, 140);
        }

        ctx.textAlign = 'center';
        ctx.fillStyle = '#ea8a0b'; ctx.font = '700 21px system-ui, sans-serif'; ctx.fillText('CERTIFICATE OF COMPLETION', cx, 248);
        ctx.fillStyle = '#6b7280'; ctx.font = '400 20px system-ui, sans-serif'; ctx.fillText('This certifies that', cx, 312);

        var fs = 46; ctx.fillStyle = '#1f2238'; ctx.font = '800 ' + fs + 'px system-ui, sans-serif';
        while (ctx.measureText(name).width > (W - 260) && fs > 26) { fs -= 2; ctx.font = '800 ' + fs + 'px system-ui, sans-serif'; }
        ctx.fillText(name, cx, 378);
        var nw = ctx.measureText(name).width;
        ctx.strokeStyle = '#d7dceb'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx - nw / 2 - 20, 396); ctx.lineTo(cx + nw / 2 + 20, 396); ctx.stroke();

        var pre = 'has completed the ', post = ' course.', cn = meta.course;
        ctx.fillStyle = '#1f2238';
        ctx.font = '400 22px system-ui, sans-serif'; var wPre = ctx.measureText(pre).width, wPost = ctx.measureText(post).width;
        ctx.font = '700 22px system-ui, sans-serif'; var wCn = ctx.measureText(cn).width;
        var startX = cx - (wPre + wCn + wPost) / 2;
        ctx.textAlign = 'left';
        ctx.font = '400 22px system-ui, sans-serif'; ctx.fillText(pre, startX, 448);
        ctx.font = '700 22px system-ui, sans-serif'; ctx.fillText(cn, startX + wPre, 448);
        ctx.font = '400 22px system-ui, sans-serif'; ctx.fillText(post, startX + wPre + wCn, 448);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#6b7280'; ctx.font = '600 15px system-ui, sans-serif'; ctx.fillText(dateStr, cx, 488);

        ctx.strokeStyle = '#1f2238'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx - 130, 648); ctx.lineTo(cx + 130, 648); ctx.stroke();
        ctx.fillStyle = '#1f2238'; ctx.font = '700 16px system-ui, sans-serif'; ctx.fillText(meta.org + ' (' + meta.orgAbbr + ')', cx, 674);
        ctx.fillStyle = '#6b7280'; ctx.font = '400 13px system-ui, sans-serif'; ctx.fillText('Authorised signature', cx, 696);
        ctx.textAlign = 'left';

        var safe = String(name).replace(/[^\w\u0900-\u097F -]/g, '').trim().replace(/\s+/g, '-') || 'learner';
        var save = function (url) {
          var a = document.createElement('a');
          a.href = url; a.download = 'Paila-Certificate-' + safe + '.png';
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
        };
        if (cv.toBlob) {
          cv.toBlob(function (blob) {
            if (!blob) { save(cv.toDataURL('image/png')); return; }
            var url = URL.createObjectURL(blob);
            save(url);
            setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
          }, 'image/png');
        } else {
          save(cv.toDataURL('image/png'));
        }
      } catch (e) {
        try { console.error('Certificate error:', e); } catch (x) {}
        alert('Certificate error: ' + (e && e.message ? e.message : e));
      }
    });
  }

  // Catalog card: show "Resume" if the signed-in learner already has progress.
  function initCourseCta() {
    var cta = document.querySelector('[data-course-cta]');
    if (!cta) return;
    var u = getUser();
    if (!u || u === 'guest') return; // stays "Start course"
    var resume = false;
    try {
      var pfx = ns();
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && (k.indexOf(pfx + 'done.') === 0 || k.indexOf(pfx + 'score.') === 0)) { resume = true; break; }
      }
    } catch (e) {}
    if (resume) {
      var st = cta.querySelector('.cta-start'), rs = cta.querySelector('.cta-resume');
      if (st) st.hidden = true;
      if (rs) rs.hidden = false;
    }
  }

  /* ---------- Reviewer / QA feedback tool (soft-gated, local only) ---------- */
  var FB_KEY = 'dl.feedback';
  var REV_KEY = 'dl.reviewer';
  var REVNAME_KEY = 'dl.reviewer.name';

  function reviewerOn() {
    try { return localStorage.getItem(REV_KEY) === '1'; } catch (e) { return false; }
  }
  function loadFeedback() {
    try { return JSON.parse(localStorage.getItem(FB_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveFeedback(list) {
    try { localStorage.setItem(FB_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function updateFbCount() {
    var el = document.getElementById('fbCount');
    if (el) el.textContent = String(loadFeedback().length);
  }

  function applyReviewer(on) {
    document.body.classList.toggle('reviewer-on', !!on);
    var fab = document.getElementById('fbFab');
    if (fab) fab.hidden = !on;
    updateFbCount();
  }

  function initReviewer() {
    var link = document.getElementById('reviewerLink');
    if (link) link.addEventListener('click', function () {
      if (reviewerOn()) { applyReviewer(true); return; }
      var meta = document.querySelector('meta[name="reviewer-pass"]');
      var pass = meta ? meta.getAttribute('content') : '';
      var entry = window.prompt('Reviewer passphrase / समीक्षक पासफ्रेज:');
      if (entry === null) return;
      if (entry === pass) {
        try { localStorage.setItem(REV_KEY, '1'); } catch (e) {}
        applyReviewer(true);
      } else {
        alert('Wrong passphrase.');
      }
    });
    applyReviewer(reviewerOn());
  }

  function currentContext() {
    var art = document.querySelector('.lesson[data-lesson]');
    var lang = document.documentElement.classList.contains('lang-show-en') ? 'en' : 'ne';
    var ctx = { lesson_id: '', lesson_title: '', chapter: '', lang: lang, url: (location.pathname.split('/').pop() || 'index.html') };
    if (art) {
      ctx.lesson_id = art.getAttribute('data-lesson') || '';
      ctx.chapter = art.getAttribute(lang === 'en' ? 'data-chapter-en' : 'data-chapter-ne') || art.getAttribute('data-chapter-en') || '';
      var h1 = art.querySelector('.lesson-head h1 .lang-' + lang) || art.querySelector('.lesson-head h1');
      if (h1) ctx.lesson_title = (h1.textContent || '').trim();
    } else {
      var t = document.querySelector('h1');
      if (t) ctx.lesson_title = (t.textContent || '').trim();
    }
    return ctx;
  }

  function toCsv(list) {
    var cols = ['time','name','role','category','chapter','lesson_id','lesson_title','lang','page','note'];
    var esc = function (v) { v = (v == null ? '' : String(v)); return '"' + v.replace(/"/g, '""') + '"'; };
    var lines = [cols.join(',')];
    for (var i = 0; i < list.length; i++) {
      lines.push(cols.map(function (c) { return esc(list[i][c]); }).join(','));
    }
    return '\ufeff' + lines.join('\r\n');
  }

  function downloadBlob(filename, type, data) {
    try {
      var blob = new Blob([data], { type: type });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    } catch (e) { alert('Could not download file.'); }
  }

  function initFeedback() {
    var fab = document.getElementById('fbFab');
    var modal = document.getElementById('fbModal');
    if (!fab || !modal) return;
    var ctxEl = document.getElementById('fbContext');
    var nameEl = document.getElementById('fbName');
    var roleEl = document.getElementById('fbRole');
    var catEl = document.getElementById('fbCat');
    var textEl = document.getElementById('fbText');
    var savedEl = document.getElementById('fbSaved');

    function open() {
      var ctx = currentContext();
      ctxEl.textContent = ctx.chapter ? (ctx.chapter + ' — ' + ctx.lesson_title) : (ctx.lesson_title || ctx.url);
      try { nameEl.value = localStorage.getItem(REVNAME_KEY) || ''; } catch (e) {}
      savedEl.hidden = true;
      modal.hidden = false;
      modal._ctx = ctx;
      setTimeout(function () { textEl.focus(); }, 30);
    }
    function close() { modal.hidden = true; }

    fab.addEventListener('click', open);
    document.getElementById('fbClose').addEventListener('click', close);
    document.getElementById('fbCancel').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });

    document.getElementById('fbSave').addEventListener('click', function () {
      var note = (textEl.value || '').trim();
      if (!note) { textEl.focus(); return; }
      try { localStorage.setItem(REVNAME_KEY, (nameEl.value || '').trim()); } catch (e) {}
      var ctx = modal._ctx || currentContext();
      var list = loadFeedback();
      list.push({
        time: new Date().toISOString(),
        name: (nameEl.value || '').trim(),
        role: roleEl.value,
        category: catEl.value,
        chapter: ctx.chapter,
        lesson_id: ctx.lesson_id,
        lesson_title: ctx.lesson_title,
        lang: ctx.lang,
        page: ctx.url,
        note: note
      });
      saveFeedback(list);
      updateFbCount();
      textEl.value = '';
      savedEl.hidden = false;
      setTimeout(close, 800);
    });

    document.getElementById('fbDownload').addEventListener('click', function () {
      var list = loadFeedback();
      if (!list.length) { alert('No feedback saved on this device yet.'); return; }
      var stamp = new Date().toISOString().slice(0, 10);
      downloadBlob('paila-feedback-' + stamp + '.json', 'application/json', JSON.stringify(list, null, 2));
      downloadBlob('paila-feedback-' + stamp + '.csv', 'text/csv', toCsv(list));
    });

    document.getElementById('fbClear').addEventListener('click', function () {
      if (!loadFeedback().length) return;
      if (confirm('Delete all saved feedback on this device? Download first if you need it.')) {
        saveFeedback([]); updateFbCount();
      }
    });

    document.getElementById('fbExit').addEventListener('click', function () {
      try { localStorage.removeItem(REV_KEY); } catch (e) {}
      close(); applyReviewer(false);
    });
  }

  initLang();
  initUser();
  initProgress();
  initCopy();
  initHotspots();
  initQuiz();
  initSidebar();
  initSidebarScroll();
  initCertificate();
  initCourseCta();
  initReviewer();
  initFeedback();
  initSW();
})();
