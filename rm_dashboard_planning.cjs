const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const startTarget = '{/* Active Camp Period Hub */}';
const endTarget = `<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Actions & Overview */}`;

const startIndex = content.indexOf(startTarget);
const endIndex = content.indexOf(endTarget);

if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + content.substring(endIndex);
    fs.writeFileSync('src/components/DashboardView.tsx', content);
    console.log("Removed section from DashboardView");
} else {
    console.log("Could not find section");
}
