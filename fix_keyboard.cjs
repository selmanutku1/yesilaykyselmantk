const fs = require('fs');

let content = fs.readFileSync('src/components/Screensaver.tsx', 'utf8');

const regex = /  \/\/ Handle physical keyboard passcode typing when unlock overlay is active[\s\S]*?\}, \[isUnlocking, passcode\]\);\n\n/;

content = content.replace(regex, '');

fs.writeFileSync('src/components/Screensaver.tsx', content);
