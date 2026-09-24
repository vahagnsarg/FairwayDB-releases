// The features page's contents rail: highlights the section in view and
// filters the list (plain text, or /regex/ like the app's own filter boxes).

(() => {
  const { matcher } = window.site;

  const toc = document.querySelector('[data-toc]');
  const nav = document.querySelector('[data-toc-nav]');
  const filter = document.querySelector('[data-toc-filter]');
  const empty = document.querySelector('[data-toc-empty]');
  const links = [...nav.querySelectorAll('a')];
  const narrow = window.matchMedia('(max-width: 960px)');

  // On a phone the contents start folded above the article, and fold again after a jump.
  const syncOpen = () => (toc.open = !narrow.matches);
  syncOpen();
  narrow.addEventListener('change', syncOpen);
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && narrow.matches) toc.open = false;
  });

  filter.addEventListener('input', () => {
    const q = filter.value.trim();
    const test = matcher(q);
    let shown = 0;
    let group = null;
    let groupHits = 0;
    const closeGroup = () => group && (group.hidden = q !== '' && groupHits === 0);
    for (const el of nav.children) {
      if (el.classList.contains('toc-group')) {
        closeGroup();
        group = el;
        groupHits = 0;
      } else if (el.tagName === 'A') {
        const hit = !q || test(el.textContent) || test(el.getAttribute('href').slice(1));
        el.hidden = !hit;
        if (hit) {
          groupHits++;
          shown++;
        }
      }
    }
    closeGroup();
    empty.hidden = shown > 0;
  });

  // Scroll spy: the current section is the last one whose top has passed the nav bar.
  const sections = links.map((a) => document.getElementById(a.getAttribute('href').slice(1)));

  function spy() {
    const line = 120;
    let current = 0;
    sections.forEach((s, i) => {
      if (s && s.getBoundingClientRect().top <= line) current = i;
    });
    links.forEach((a, i) => a.classList.toggle('on', i === current));
  }

  let queued = false;
  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        spy();
      });
    },
    { passive: true }
  );
  spy();

  // Opened on a link to a section (features.html#erd): the browser's own jump
  // is smooth — `scroll-behavior` covers it too — so it glides the whole page
  // and lands wherever that section was before the web font and the demos
  // reflowed the text above it. Jump at once instead, and again as the layout
  // settles, until the visitor starts scrolling on their own.
  const target = sections.find((s) => s && location.hash === `#${s.id}`);
  if (target) {
    let moved = false;
    const stop = () => (moved = true);
    for (const e of ['wheel', 'touchmove', 'keydown', 'mousedown']) {
      window.addEventListener(e, stop, { once: true, passive: true });
    }
    const settle = () => {
      if (moved) return;
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      spy();
    };
    settle();
    window.addEventListener('load', settle, { once: true });
    document.fonts?.ready.then(settle);
  }
})();
