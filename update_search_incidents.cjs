const fs = require('fs');
let content = fs.readFileSync('src/components/IncidentLogsView.tsx', 'utf8');

const oldFilter = `  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inc.description.toLowerCase().includes(searchTerm.toLowerCase());`;

const newFilter = `  const filteredIncidents = incidents.filter(inc => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = inc.title.toLowerCase().includes(searchLower) || 
                          inc.description.toLowerCase().includes(searchLower) ||
                          inc.reportedBy.toLowerCase().includes(searchLower) ||
                          inc.actionTaken?.toLowerCase().includes(searchLower) ||
                          inc.id.toLowerCase().includes(searchLower) ||
                          inc.type.toLowerCase().includes(searchLower);`;

content = content.replace(oldFilter, newFilter);
fs.writeFileSync('src/components/IncidentLogsView.tsx', content);
