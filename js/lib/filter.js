// The filter rule the app's list boxes use, shared by the contents rail and
// the palette demo.

(() => {
  /** `/re/` is a case-insensitive regex; anything else is a substring. A regex that doesn't compile yet hides nothing. */
  function matcher(q) {
    const re = /^\/(.+)\/$/.exec(q);
    if (re) {
      try {
        const rx = new RegExp(re[1], 'i');
        return (s) => rx.test(s);
      } catch {
        return () => true;
      }
    }
    const needle = q.toLowerCase();
    return (s) => s.toLowerCase().includes(needle);
  }

  Object.assign((window.site ??= {}), { matcher });
})();
