const fs = require('fs');
const content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const start = content.indexOf('const handleCreatePeriod');
const end = content.indexOf('const handleQuickRegistration');

if(start !== -1 && end !== -1) {
    console.log(content.substring(start, end));
} else {
    console.log("Not found");
}
