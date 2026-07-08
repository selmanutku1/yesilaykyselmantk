const fs = require('fs');
let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

const oldFilter = `    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.identityNumber.includes(searchTerm);`;
      
const newFilter = `    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(searchLower) ||
      p.identityNumber.includes(searchTerm) ||
      (p.city && p.city.toLowerCase().includes(searchLower)) ||
      (p.district && p.district.toLowerCase().includes(searchLower)) ||
      (p.convoyName && p.convoyName.toLowerCase().includes(searchLower)) ||
      (p.duty && p.duty.toLowerCase().includes(searchLower)) ||
      (p.phone && p.phone.includes(searchTerm));`;

content = content.replace(oldFilter, newFilter);
fs.writeFileSync('src/components/ParticipantView.tsx', content);
