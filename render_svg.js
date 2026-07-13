const fs = require('fs');

const svg1 = `<svg viewBox="0 0 24 24" fill="currentColor" width="100" height="100" transform="scale(-1, 1)">
<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
</svg>`;

const svg2 = `<svg viewBox="0 0 24 24" fill="currentColor" width="100" height="100" transform="rotate(-45) scale(-1, 1)">
<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
</svg>`;

fs.writeFileSync('public/test-svg.html', `<html><body>${svg1}<br/>${svg2}</body></html>`);
