// Points the download buttons at the latest GitHub release's files and
// highlights the visitor's platform. Every link already goes to the releases
// page, so if the API is unreachable or rate-limited nothing is lost.

const REPO = 'vahagnsarg/FairwayDB-releases';

/** Artefact names follow `${productName}-${version}-${os}-${arch}.${ext}` (package.json). */
const PICK = {
  mac: (names, arm) =>
    names.find((n) => n.endsWith('.dmg') && n.includes(arm ? 'arm64' : 'x64')) ??
    names.find((n) => n.endsWith('.dmg')),
  win: (names) => names.find((n) => n.endsWith('.exe')),
  linux: (names) => names.find((n) => n.endsWith('.AppImage')) ?? names.find((n) => n.endsWith('.tar.gz')),
};

const LABEL = { mac: 'Download for macOS', win: 'Download for Windows', linux: 'Download for Linux' };

function detectOs() {
  const ua = navigator.userAgent;
  const platform = navigator.userAgentData?.platform ?? navigator.platform ?? '';
  if (/Mac|iPhone|iPad/i.test(platform) || /Mac OS X/.test(ua)) return 'mac';
  if (/Win/i.test(platform) || /Windows/.test(ua)) return 'win';
  if (/Linux|X11/i.test(platform) || /Linux/.test(ua)) return 'linux';
  return null;
}

/** Apple silicon can't be read from the UA; the WebGL renderer is the usual tell. */
function isAppleSilicon() {
  try {
    const gl = document.createElement('canvas').getContext('webgl');
    const info = gl?.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : '';
    return !/Intel/i.test(renderer);
  } catch {
    return true;
  }
}

const os = detectOs();
const primary = document.querySelector('[data-primary-download]');
const primaryLabel = document.querySelector('[data-primary-label]');
const note = document.querySelector('[data-platform-note]');

if (os) {
  primaryLabel.textContent = LABEL[os];
  document.querySelector(`.platform[data-os="${os}"]`)?.classList.add('current');
  const others = Object.keys(LABEL)
    .filter((k) => k !== os)
    .map((k) => ({ mac: 'macOS', win: 'Windows', linux: 'Linux' })[k]);
  note.textContent = `Also for ${others.join(' and ')} · MIT licensed`;
}

fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
  headers: { Accept: 'application/vnd.github+json' },
})
  .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
  .then((release) => {
    const assets = release.assets ?? [];
    const names = assets.map((a) => a.name);
    const urlOf = (name) => assets.find((a) => a.name === name)?.browser_download_url;
    const version = String(release.tag_name ?? '').replace(/^v/, '');
    const arm = os === 'mac' ? isAppleSilicon() : false;

    for (const key of Object.keys(PICK)) {
      const url = urlOf(PICK[key](names, key === 'mac' ? arm : undefined));
      const card = document.querySelector(`.platform[data-os="${key}"]`);
      if (url && card) card.href = url;
      if (key === os && url) primary.href = url;
    }

    if (version) {
      document.querySelector('[data-version]').textContent = `Version ${version} is out`;
      document.querySelector('[data-version-line]').textContent =
        `Version ${version} · free, for every desktop.`;
    }
  })
  .catch(() => {
    // Offline, rate-limited or no release yet: the links still reach the releases page.
    if (os) primary.href = '#download';
  });
