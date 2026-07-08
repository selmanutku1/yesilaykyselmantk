const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const targetStr = `        return window.confirm(\`ÖNEMLİ UYARI: Bu dönemin tarihleri başka dönemlerle (\${overlappingPeriods.map(p => p.name).join(', ')}) çakışmaktadır.\\n\\nToplam planlanan kontenjan (\${proposedTotal}), kamp merkezinin kapasitesini (\${totalCapacity}) aşmaktadır!\\n\\nBuna rağmen kaydetmek/planlamak istiyor musunuz?\`);`;
const newTargetStr = `        return true; // confirm removed for iframe`;

content = content.replace(targetStr, newTargetStr);
fs.writeFileSync('src/components/DashboardView.tsx', content);
