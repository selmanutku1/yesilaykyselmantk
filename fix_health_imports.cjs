const fs = require('fs');
let content = fs.readFileSync('src/components/HealthView.tsx', 'utf8');

if (!content.includes('FileSpreadsheet')) {
  content = content.replace("FileDown", "FileDown, FileSpreadsheet, FileText");
  fs.writeFileSync('src/components/HealthView.tsx', content);
}
