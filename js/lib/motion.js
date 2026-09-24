// The demos animate only while on screen, and not at all for visitors who
// prefer reduced motion: their static markup is already a finished frame.

(() => {
  const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /** A function that resolves at once while `el` is on screen, or when it next scrolls into view. */
  function whileOnScreen(el) {
    let visible = false;
    let wake = null;
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && wake) {
        wake();
        wake = null;
      }
    }).observe(el);
    return () => (visible ? Promise.resolve() : new Promise((r) => (wake = r)));
  }

  Object.assign((window.site ??= {}), { animate, sleep, whileOnScreen });
})();
