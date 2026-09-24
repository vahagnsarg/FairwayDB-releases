// The command palette demo types a few searches and filters as it goes, using
// the app's rules (CommandPalette.tsx): groups in a fixed order, a label that
// starts with the query ranks above one that merely contains it, and `/regex/`
// switches to a pattern.

(() => {
  const { matcher, esc, icon, animate, sleep, whileOnScreen } = window.site;

  const DOT = (c) => `<i class="cdot" style="background: ${c}"></i>`;

  const ITEMS = [
    ['Actions', 'New SQL query', icon('code'), '', '⌘T', 'tab editor'],
    ['Actions', 'New window', icon('external-link'), '', '⇧⌘N', 'open another window split'],
    ['Actions', 'Keyboard shortcuts', icon('keyboard'), '', '⌘/', 'help cheat sheet'],
    ['Actions', 'Refresh', icon('refresh-cw'), '', '⌘R', 'reload rows'],
    ['Actions', 'Open ERD for public', icon('network'), '', '', 'diagram relationships'],
    ['Actions', 'Export or import workspace settings', icon('bookmark'), '', '', 'profile pins filters'],
    ['Actions', 'Assistant settings', icon('sparkles'), '', '', 'api key model'],
    ['Tables', 'customers', icon('table', 'ic tbl'), 'public · 9 cols'],
    ['Tables', 'customer_notes', icon('table', 'ic tbl'), 'public · 4 cols'],
    ['Tables', 'orders', icon('table', 'ic tbl'), 'public · 7 cols'],
    ['Tables', 'line_items', icon('table', 'ic tbl'), 'public · 5 cols'],
    ['Tables', 'line_item_notes', icon('table', 'ic tbl'), 'public · 3 cols'],
    ['Tables', 'invoices', icon('table', 'ic tbl'), 'billing · 8 cols'],
    ['Tables', 'invoice_lines', icon('table', 'ic tbl'), 'billing · 6 cols'],
    ['Columns', 'orders.customer_id', icon('columns-3'), 'public · column'],
    ['Columns', 'invoices.customer_id', icon('columns-3'), 'billing · column'],
    ['Columns', 'line_items.order_id', icon('columns-3'), 'public · column'],
    ['Columns', 'line_items.qty', icon('columns-3'), 'public · column'],
    ['Columns', 'line_items.product_id', icon('columns-3'), 'public · column'],
    ['Columns', 'invoices.line_count', icon('columns-3'), 'billing · column'],
    ['Columns', 'orders.delivered_at', icon('columns-3'), 'public · column'],
    ['Saved queries', 'Top customers this quarter', icon('code'), 'select c.name, sum(o.total) as revenue'],
    ['Saved queries', 'Line items by week', icon('code'), "select date_trunc('week', o.created_at)"],
    ['Saved queries', 'Late deliveries', icon('code'), 'select count(*) from orders'],
    ['Connections', 'shop_prod', DOT('var(--conn)'), 'app@db.internal/shop_prod · connected'],
    ['Connections', 'analytics', DOT('var(--cyan)'), 'reader@warehouse/analytics'],
    ['Schemas', 'public', icon('database'), 'browse in sidebar'],
    ['Schemas', 'billing', icon('database'), 'browse in sidebar'],
  ].map(([group, label, glyph, hint, keys = '', words = '']) => ({
    group,
    label,
    icon: glyph,
    hint,
    keys,
    text: `${label} ${words}`,
  }));

  const GROUPS = ['Actions', 'Tables', 'Columns', 'Saved queries', 'Connections', 'Schemas'];
  const SCENES = ['cust', '/^line_/', 'new w', 'erd', 'line', 'ana', 'late'];
  const MAX_ROWS = 6;

  /** The first hit of the query in the label, wrapped in <mark>. */
  function highlight(label, q) {
    const re = /^\/(.+)\/$/.exec(q);
    let at = -1;
    let len = 0;
    if (re) {
      try {
        const m = new RegExp(re[1], 'i').exec(label);
        if (m) [at, len] = [m.index, m[0].length];
      } catch {
        /* half-typed pattern */
      }
    } else if (q) {
      at = label.toLowerCase().indexOf(q.toLowerCase());
      len = q.length;
    }
    if (at < 0 || !len) return esc(label);
    return `${esc(label.slice(0, at))}<mark>${esc(label.slice(at, at + len))}</mark>${esc(label.slice(at + len))}`;
  }

  function rank(label, q) {
    if (!q || q.startsWith('/')) return 0;
    const l = label.toLowerCase();
    const at = l.indexOf(q.toLowerCase());
    if (at === 0) return 0;
    if (at > 0 && /[._\s-]/.test(l[at - 1])) return 1;
    return 2;
  }

  function results(q) {
    const test = q ? matcher(q) : () => true;
    const rows = [];
    for (const group of GROUPS) {
      const hits = ITEMS.filter((it) => it.group === group && test(it.text)).sort(
        (a, b) => rank(a.label, q) - rank(b.label, q)
      );
      rows.push(...hits);
    }
    return rows.slice(0, MAX_ROWS);
  }

  function render(list, q, cursor) {
    const rows = results(q);
    if (!rows.length) {
      list.innerHTML = '<div class="pempty">No matches</div>';
      return 0;
    }
    let html = '';
    rows.forEach((it, i) => {
      if (i === 0 || rows[i - 1].group !== it.group) html += `<div class="pgroup">${it.group}</div>`;
      const tail = it.keys ? `<small class="pkeys">${it.keys}</small>` : `<small>${esc(it.hint)}</small>`;
      html += `<div class="prow${i === cursor ? ' on' : ''}">${it.icon}<span>${highlight(it.label, q)}</span>${tail}</div>`;
    });
    list.innerHTML = html;
    return rows.length;
  }

  /** Each palette on the page (the landing page and the features page have one) runs its own loop. */
  function play(demo) {
    const qEl = demo.querySelector('[data-palette-q]');
    const list = demo.querySelector('[data-palette-list]');
    const waitVisible = whileOnScreen(demo);

    const show = (q, cursor = 0) => {
      qEl.textContent = q;
      return render(list, q, cursor);
    };

    (async () => {
      // Hold the static first frame a moment, then clear it and start typing,
      // picking up the scene list after the search the markup shows.
      const first = qEl.textContent;
      await waitVisible();
      await sleep(1400);
      for (let n = first.length - 1; n >= 0; n--) {
        show(first.slice(0, n));
        await sleep(40);
      }
      for (let i = SCENES.indexOf(first) + 1; ; i++) {
        const q = SCENES[i % SCENES.length];
        await waitVisible();
        await sleep(350);
        for (let n = 1; n <= q.length; n++) {
          show(q.slice(0, n));
          await sleep(90 + Math.random() * 70);
        }
        // Arrow down once, as someone scanning the list would.
        const count = show(q, 0);
        await sleep(900);
        if (count > 1) {
          show(q, 1);
          await sleep(700);
          show(q, 0);
        }
        await sleep(1300);
        for (let n = q.length - 1; n >= 0; n--) {
          show(q.slice(0, n));
          await sleep(35);
        }
      }
    })();
  }

  if (animate) document.querySelectorAll('[data-palette-demo]').forEach(play);
})();
