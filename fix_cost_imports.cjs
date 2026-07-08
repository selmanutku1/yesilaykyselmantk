const fs = require('fs');
let content = fs.readFileSync('src/components/CostAnalysisView.tsx', 'utf8');
content = content.replace("Edit2\n}", "Edit2,\n  FileSpreadsheet,\n  FileText\n}");
fs.writeFileSync('src/components/CostAnalysisView.tsx', content);
