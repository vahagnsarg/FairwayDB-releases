// The icon sprite (Lucide glyphs), written into the page where this script
// sits — first thing in <body>, so every <use href="#i-…"> below it resolves.
// A script rather than an external icons.svg because browsers refuse external
// sprites on file://, and the pages must work opened straight from disk.

document.currentScript.insertAdjacentHTML(
  'afterend',
  `<svg class="sprite" aria-hidden="true">
  <symbol id="i-bookmark" viewBox="0 0 24 24"> <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" /> </symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></symbol>
  <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></symbol>
  <symbol id="i-chevron-first" viewBox="0 0 24 24"> <path d="m17 18-6-6 6-6" /> <path d="M7 6v12" /> </symbol>
  <symbol id="i-chevron-last" viewBox="0 0 24 24"> <path d="m7 18 6-6-6-6" /> <path d="M17 6v12" /> </symbol>
  <symbol id="i-chevron-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></symbol>
  <symbol id="i-chevron-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></symbol>
  <symbol id="i-circle-help" viewBox="0 0 24 24"> <circle cx="12" cy="12" r="10" /> <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /> <path d="M12 17h.01" /> </symbol>
  <symbol id="i-code" viewBox="0 0 24 24"> <path d="m16 18 6-6-6-6" /> <path d="m8 6-6 6 6 6" /> </symbol>
  <symbol id="i-columns-3" viewBox="0 0 24 24"> <rect width="18" height="18" x="3" y="3" rx="2" /> <path d="M9 3v18" /> <path d="M15 3v18" /> </symbol>
  <symbol id="i-copy" viewBox="0 0 24 24"> <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /> </symbol>
  <symbol id="i-database" viewBox="0 0 24 24"> <ellipse cx="12" cy="5" rx="9" ry="3" /> <path d="M3 5V19A9 3 0 0 0 21 19V5" /> <path d="M3 12A9 3 0 0 0 21 12" /> </symbol>
  <symbol id="i-download" viewBox="0 0 24 24"> <path d="M12 15V3" /> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /> <path d="m7 10 5 5 5-5" /> </symbol>
  <symbol id="i-ellipsis" viewBox="0 0 24 24"> <circle cx="12" cy="12" r="1" /> <circle cx="19" cy="12" r="1" /> <circle cx="5" cy="12" r="1" /> </symbol>
  <symbol id="i-external-link" viewBox="0 0 24 24"> <path d="M15 3h6v6" /> <path d="M10 14 21 3" /> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /> </symbol>
  <symbol id="i-funnel" viewBox="0 0 24 24"> <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" /> </symbol>
  <symbol id="i-house" viewBox="0 0 24 24"> <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> </symbol>
  <symbol id="i-keyboard" viewBox="0 0 24 24"> <path d="M10 8h.01" /> <path d="M12 12h.01" /> <path d="M14 8h.01" /> <path d="M16 12h.01" /> <path d="M18 8h.01" /> <path d="M6 8h.01" /> <path d="M7 16h10" /> <path d="M8 12h.01" /> <rect width="20" height="16" x="2" y="4" rx="2" /> </symbol>
  <symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14" /></symbol>
  <symbol id="i-network" viewBox="0 0 24 24"> <rect x="16" y="16" width="6" height="6" rx="1" /> <rect x="2" y="16" width="6" height="6" rx="1" /> <rect x="9" y="2" width="6" height="6" rx="1" /> <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /> <path d="M12 12V8" /> </symbol>
  <symbol id="i-package" viewBox="0 0 24 24"> <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /> <path d="M12 22V12" /> <polyline points="3.29 7 12 12 20.71 7" /> <path d="m7.5 4.27 9 5.15" /> </symbol>
  <symbol id="i-pencil" viewBox="0 0 24 24"> <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /> <path d="m15 5 4 4" /> </symbol>
  <symbol id="i-play" viewBox="0 0 24 24"> <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /> </symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"> <path d="M5 12h14" /> <path d="M12 5v14" /> </symbol>
  <symbol id="i-refresh-cw" viewBox="0 0 24 24"> <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /> <path d="M21 3v5h-5" /> <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /> <path d="M8 16H3v5" /> </symbol>
  <symbol id="i-search" viewBox="0 0 24 24"> <path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" /> </symbol>
  <symbol id="i-send-horizontal" viewBox="0 0 24 24"> <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /> <path d="M6 12h16" /> </symbol>
  <symbol id="i-sparkles" viewBox="0 0 24 24"> <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /> <path d="M20 2v4" /> <path d="M22 4h-4" /> <circle cx="4" cy="20" r="2" /> </symbol>
  <symbol id="i-sun" viewBox="0 0 24 24"> <circle cx="12" cy="12" r="4" /> <path d="M12 2v2" /> <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" /> <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" /> <path d="m19.07 4.93-1.41 1.41" /> </symbol>
  <symbol id="i-table" viewBox="0 0 24 24"> <path d="M12 3v18" /> <rect width="18" height="18" x="3" y="3" rx="2" /> <path d="M3 9h18" /> <path d="M3 15h18" /> </symbol>
  <symbol id="i-trash" viewBox="0 0 24 24"> <path d="M10 11v6" /> <path d="M14 11v6" /> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /> <path d="M3 6h18" /> <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /> </symbol>
  <symbol id="i-unplug" viewBox="0 0 24 24"> <path d="m19 5 3-3" /> <path d="m2 22 3-3" /> <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" /> <path d="M7.5 13.5 10 11" /> <path d="M10.5 16.5 13 14" /> <path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" /> </symbol>
  <symbol id="i-wrench" viewBox="0 0 24 24"> <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" /> </symbol>
  <symbol id="i-x" viewBox="0 0 24 24"> <path d="M18 6 6 18" /> <path d="m6 6 12 12" /> </symbol>
</svg>`
);
