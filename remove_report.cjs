const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const reportWidgetStart = content.indexOf('{/* KAMP FAALİYET RAPORU WIDGET */}');
const miniStatsGridStart = content.indexOf('{/* Mini Stats Grid */}');

if (reportWidgetStart !== -1 && miniStatsGridStart !== -1) {
  content = content.substring(0, reportWidgetStart) + content.substring(miniStatsGridStart);
  fs.writeFileSync('src/components/DashboardView.tsx', content);
  console.log("Successfully removed report widget");
} else {
  console.log("Could not find boundaries");
}
