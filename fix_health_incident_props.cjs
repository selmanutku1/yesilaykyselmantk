const fs = require('fs');
let content = fs.readFileSync('src/components/HealthView.tsx', 'utf8');

content = content.replace("new Date(hi.timestamp).toLocaleString()", "new Date(hi.dateTime).toLocaleString()");
content = content.replace("hi.medicationsGiven || 'Yok'", "hi.prescription || 'Yok'");
content = content.replace("hi.notes || ''", "''");

fs.writeFileSync('src/components/HealthView.tsx', content);
