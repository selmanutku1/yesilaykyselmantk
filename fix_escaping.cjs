const fs = require('fs');
let content = fs.readFileSync('src/components/ReportsView.tsx', 'utf8');

content = content.replace(/\\\`/g, '\`');
content = content.replace(/\\\$/g, '$');

fs.writeFileSync('src/components/ReportsView.tsx', content);
