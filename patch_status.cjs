const fs = require('fs');
let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

content = content.replace("handleUpdateStatus(task.id, 'Onaylandı')", "handleUpdateStatus(task.id, 'Devam Ediyor')");

fs.writeFileSync('src/components/TechnicalOperationsView.tsx', content);
