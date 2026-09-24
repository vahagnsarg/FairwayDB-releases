// Markup helpers for the demos that draw rows at runtime.

(() => {
  const esc = (t) =>
    t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  /** A glyph from the shared sprite, sized by its class like the static markup. */
  const icon = (id, cls = 'ic') => `<svg class="${cls}"><use href="#i-${id}" /></svg>`;

  Object.assign((window.site ??= {}), { esc, icon });
})();
