const fs = require('fs');
let content = fs.readFileSync('src/components/ReportsView.tsx', 'utf8');

content = content.replace('p.registrationDate', "(p.checkInTime || new Date().toISOString())");
content = content.replace('p.registrationDate', "(p.checkInTime || new Date().toISOString())");
content = content.replace('p.campCenterId', 'p.campPeriodId');
content = content.replace('p.tcNo', 'p.identityNumber');
content = content.replace("user: l.user", "user: l.userName");

fs.writeFileSync('src/components/ReportsView.tsx', content);
