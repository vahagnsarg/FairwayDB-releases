// The SQL editor demo writes a query the way the editor helps you write it:
// completion opens on a table name and after `alias.`, narrows as you type,
// and accepts; then ⌘↵ runs it into the grid. Completion lists names only,
// like the editor's (its catalog carries no types).

(() => {
  const { esc, icon, animate, sleep, whileOnScreen } = window.site;

  const sqlDemo = document.querySelector('[data-sql-demo]');

  const TABLES = [
    'customers',
    'customer_notes',
    'invoices',
    'line_items',
    'orders',
    'order_notes',
    'payments',
  ];
  const ORDER_COLS = ['id', 'customer_id', 'status', 'total', 'delivered_at'];

  /** [text to type] or [prefix, candidates, pick, kind] for a completion. */
  const SQL_STEPS = [
    ['select c.name, count(*) as orders\nfrom '],
    ['cust', TABLES, 'customers', 'table'],
    [' c\njoin '],
    ['ord', TABLES, 'orders', 'table'],
    [' o on o.'],
    ['cus', ORDER_COLS, 'customer_id', 'column'],
    [' = c.id\nwhere o.'],
    ['st', ORDER_COLS, 'status', 'column'],
    [" = 'delivered'\ngroup by c.name\norder by orders desc\nlimit 4;"],
  ];

  const SQL_KW = new Set(
    'select from join on where group by order desc asc limit as and or not is null'.split(' ')
  );

  /** Just enough highlighting to read as SQL: keywords, calls, strings, numbers. */
  function highlightSql(text) {
    return text.replace(
      /('[^'\n]*'?)|(\b\d+\b)|([a-z_]+)(?=\()|([a-z_]+)|([&<>])/gi,
      (m, str, num, fn, word, ch) => {
        if (str) return `<span class="str">${esc(str)}</span>`;
        if (num) return `<span class="num">${num}</span>`;
        if (fn) return `<span class="fn">${fn}</span>`;
        if (word) return SQL_KW.has(word.toLowerCase()) ? `<span class="kw">${word}</span>` : word;
        return esc(ch);
      }
    );
  }

  if (sqlDemo && animate) {
    const code = sqlDemo.querySelector('[data-sql-code]');
    const gutter = sqlDemo.querySelector('[data-sql-gutter]');
    const popup = sqlDemo.querySelector('[data-sql-complete]');
    const runKey = sqlDemo.querySelector('[data-sql-run]');
    const meta = sqlDemo.querySelector('[data-sql-meta]');
    const results = sqlDemo.querySelector('[data-sql-results]');
    const waitVisible = whileOnScreen(sqlDemo);

    let text = '';

    /** Redraw the buffer; `wordStart` marks where a completion's word begins. */
    const draw = (wordStart = -1) => {
      const lines = text.split('\n').length;
      gutter.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br />');
      code.innerHTML =
        wordStart < 0
          ? `${highlightSql(text)}<span class="caret"></span>`
          : `${highlightSql(text.slice(0, wordStart))}<span data-ws></span>${highlightSql(text.slice(wordStart))}<span class="caret"></span>`;
    };

    const openPopup = (prefix, candidates, pick, kind) => {
      const hits = candidates.filter((c) => c.startsWith(prefix));
      const glyph = kind === 'table' ? icon('table') : icon('columns-3');
      popup.innerHTML = hits
        .map(
          (c) =>
            `<div class="${c === pick ? 'on' : ''}">${glyph}<span><b>${esc(prefix)}</b>${esc(c.slice(prefix.length))}</span></div>`
        )
        .join('');
      // Anchor under the start of the word, as CodeMirror does.
      const ws = code.querySelector('[data-ws]');
      const box = sqlDemo.querySelector('.m-editor').getBoundingClientRect();
      const at = ws.getBoundingClientRect();
      popup.style.left = `${at.left - box.left - 6}px`;
      popup.style.top = `${at.bottom - box.top + 3}px`;
      popup.hidden = hits.length === 0;
    };

    const type = async (chunk, wordStart = -1) => {
      for (const ch of chunk) {
        text += ch;
        draw(wordStart);
        await sleep(ch === '\n' ? 260 : 40 + Math.random() * 55);
      }
    };

    const reset = () => {
      text = '';
      draw();
      popup.hidden = true;
      results.classList.add('pending');
      meta.textContent = '';
    };

    (async () => {
      // Hold the finished frame, then start writing from an empty buffer.
      await waitVisible();
      await sleep(2200);
      for (;;) {
        reset();
        await waitVisible();
        await sleep(600);
        for (const [chunk, candidates, pick, kind] of SQL_STEPS) {
          await waitVisible();
          if (!candidates) {
            await type(chunk);
            continue;
          }
          // A completion: column lists open on the dot, table lists on the first letter.
          const wordStart = text.length;
          if (kind === 'column') {
            draw(wordStart);
            openPopup('', candidates, pick, kind);
            await sleep(650);
          }
          for (let n = 1; n <= chunk.length; n++) {
            await type(chunk[n - 1], wordStart);
            openPopup(chunk.slice(0, n), candidates, pick, kind);
          }
          await sleep(700);
          text = text.slice(0, wordStart) + pick;
          popup.hidden = true;
          draw();
          await sleep(250);
        }
        // ⌘↵
        await sleep(700);
        runKey.classList.add('press');
        meta.textContent = 'Running…';
        await sleep(260);
        runKey.classList.remove('press');
        await sleep(420);
        results.classList.remove('pending');
        meta.textContent = '4 rows in 9 ms';
        await sleep(4500);
      }
    })();
  }
})();
