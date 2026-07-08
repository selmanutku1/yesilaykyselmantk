const fs = require('fs');
let content = fs.readFileSync('src/components/PeriodManagementView.tsx', 'utf8');

content = content.replace(/const confirm = window\.confirm\([^;]+;\n\s+if \(!confirm\) return;/g, '');

fs.writeFileSync('src/components/PeriodManagementView.tsx', content);
