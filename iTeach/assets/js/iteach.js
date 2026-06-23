/* ============================================================================
   iTeach Project Page — Interactive Behaviours
   https://irvlutd.github.io/iTeach/

   All modules are wrapped in IIFEs to avoid polluting the global scope and
   to isolate failures — any one module can throw without breaking the others.

   Modules
   -------
   01  NavbarBurger   — Bulma mobile-nav toggle (Bulma ships no JS for this)
   02  LastUpdated    — fallback date stamp (shared IRVL script overwrites
                        with the real GitHub commit date when available)
   03  YouTubeFacade  — click-to-play embed; avoids loading ~500kB on first
                        paint and stays privacy-friendly (youtube-nocookie)
   04  FigureLightbox — Enter / Space / click to enlarge any .paper-fig img,
                        Esc to close; focus returns to the close button
   05  BibTeXCopy     — clipboard copy with visible label swap and
                        off-screen aria-live announcement for screen readers
   06  Scrollspy      — document-relative offsets; updates the fixed sidebar
                        (active/passed dot states) and the pill nav together,
                        with a continuous gold fill that tracks scroll
   ============================================================================ */


/* ── 01  NavbarBurger ───────────────────────────────────────────────────── */
(function initNavbarBurger() {
  var burgers = document.querySelectorAll('.navbar-burger');
  burgers.forEach(function (b) {
    b.addEventListener('click', function () {
      var nav = b.closest('.navbar');
      var menu = b.dataset.target
        ? document.getElementById(b.dataset.target)
        : nav && nav.querySelector('.navbar-menu');
      b.classList.toggle('is-active');
      if (menu) menu.classList.toggle('is-active');
    });
  });
})();


/* ── 02  LastUpdated (fallback) ─────────────────────────────────────────── */
(function initLastUpdated() {
  var el = document.getElementById('last-updated');
  if (el && !el.textContent.trim()) {
    el.textContent = new Date().toDateString();
  }
})();


/* ── 03  YouTubeFacade ──────────────────────────────────────────────────── */
(function initYouTubeFacade() {
  var facades = document.querySelectorAll('.yt-facade');
  if (!facades.length) return;

  facades.forEach(function (facade) {
    function activate(opts) {
      if (facade.classList.contains('is-playing')) return;
      var id = facade.dataset.videoId;
      if (!id) return;
      var muted = !!(opts && opts.muted);
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id +
                   '?autoplay=1&rel=0&modestbranding=1&playsinline=1' +
                   (muted ? '&mute=1' : '');
      iframe.title = facade.getAttribute('aria-label') || 'iTeach overview video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; ' +
                     'gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';
      facade.innerHTML = '';
      facade.appendChild(iframe);
      facade.classList.add('is-playing');
      facade.removeAttribute('role');
      facade.removeAttribute('tabindex');
    }

    facade.addEventListener('click', function () { activate(); });
    facade.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });

    // Auto-activate on load when the facade opts in via `data-autoplay`.
    // Browsers only allow unprompted autoplay when muted, so force mute=1.
    if (facade.dataset.autoplay !== undefined) {
      activate({ muted: true });
    }
  });
})();


/* ── 04  FigureLightbox ─────────────────────────────────────────────────── */
(function initFigureLightbox() {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  var lbImg = lightbox.querySelector('img');
  var closeBtn = lightbox.querySelector('.lightbox-close');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    lightbox.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.paper-fig img').forEach(function (img) {
    img.addEventListener('click', function () { open(img.src, img.alt); });
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge figure: ' + (img.alt || 'figure'));
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(img.src, img.alt);
      }
    });
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
})();


/* ── 05  BibTeXCopy ─────────────────────────────────────────────────────── */
(function initBibTeXCopy() {
  var btn = document.getElementById('copy-btn');
  if (!btn) return;
  var label = btn.querySelector('.copy-label');

  // aria-live region — announces success to screen readers
  var live = document.createElement('span');
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  live.style.cssText = 'position:absolute;left:-9999px;';
  document.body.appendChild(live);

  btn.addEventListener('click', function () {
    if (label) {
      label.textContent = 'Copied';
      setTimeout(function () { label.textContent = 'Copy'; }, 1500);
    }
    live.textContent = 'BibTeX copied to clipboard';
  });
})();


/* ── 06  Scrollspy ──────────────────────────────────────────────────────── */
(function initScrollspy() {
  var pillLinks = document.querySelectorAll('.page-nav a');
  var items = Array.from(document.querySelectorAll('.progress-sidebar .progress-item'));
  var sections = items
    .map(function (it) { return document.getElementById(it.dataset.section); })
    .filter(Boolean);
  var fill = document.getElementById('progress-fill');
  var track = document.querySelector('.progress-track');

  /** Document-relative top, robust to positioned / transformed ancestors. */
  function docTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  var tops = [];
  function recompute() { tops = sections.map(docTop); }

  function onScroll() {
    if (!tops.length) return;

    // Trigger line ≈ 30% down the viewport.
    var triggerY = window.scrollY + window.innerHeight * 0.3;

    var active = 0;
    for (var i = 0; i < tops.length; i++) {
      if (tops[i] <= triggerY) active = i;
    }
    var atBottom = (window.innerHeight + window.scrollY)
                   >= document.documentElement.scrollHeight - 2;
    if (atBottom) active = sections.length - 1;

    pillLinks.forEach(function (a) { a.classList.remove('active'); });
    if (pillLinks[active]) pillLinks[active].classList.add('active');

    items.forEach(function (it, i) {
      it.classList.toggle('active', i === active);
      it.classList.toggle('passed', i < active);
    });

    // Continuous fill between the first and last dot centers.
    if (fill && track && items.length >= 2) {
      var firstCenter = items[0].offsetTop + items[0].offsetHeight / 2;
      var lastCenter  = items[items.length - 1].offsetTop + items[items.length - 1].offsetHeight / 2;
      var fillMax = Math.max(0, lastCenter - firstCenter);

      var startY = tops[0];
      var lastSection = sections[sections.length - 1];
      var endY = tops[tops.length - 1] + lastSection.offsetHeight;
      var span = Math.max(1, endY - startY);

      var frac = (window.scrollY + window.innerHeight * 0.3 - startY) / span;
      if (atBottom) frac = 1;
      frac = Math.min(1, Math.max(0, frac));

      fill.style.height = (frac * fillMax) + 'px';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { recompute(); onScroll(); });
  window.addEventListener('load',   function () { recompute(); onScroll(); });
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('load', function () { recompute(); onScroll(); }, { once: true });
  });

  recompute();
  onScroll();
})();
