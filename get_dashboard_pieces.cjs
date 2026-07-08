const fs = require('fs');
const content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const getBlock = (startString, endString) => {
    const start = content.indexOf(startString);
    if(start === -1) return '';
    const end = content.indexOf(endString, start);
    return content.substring(start, end);
};

fs.writeFileSync('dashboard_states.txt', getBlock('// New Period Form states', 'const [selectedPeriodDetail'));
fs.writeFileSync('dashboard_fns.txt', getBlock('const checkQuotaWarning', 'const [showPeriodParticipants'));
fs.writeFileSync('dashboard_ui.txt', getBlock('{/* Active Camp Period Hub */}', '{/* Active Period Participants & Stats Section */}'));
