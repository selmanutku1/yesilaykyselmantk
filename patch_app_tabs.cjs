const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "| 'sistem-guncellemeleri')[];",
  "| 'sistem-guncellemeleri' | 'raporlar')[];"
);

content = content.replace(
  /'sistem-guncellemeleri']/g,
  "'sistem-guncellemeleri', 'raporlar']"
);

fs.writeFileSync('src/App.tsx', content);
