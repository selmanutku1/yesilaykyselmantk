const fs = require('fs');
let content = fs.readFileSync('src/components/RegistrationView.tsx', 'utf8');

const oldFilter = `  const applications = participants.filter(
    (p) => (p.status === 'Başvuru Yapıldı' || p.status === 'Yedek Listede') && p.convoyName && p.convoyName.trim() !== ''
  ).filter(p => 
    searchTerm.trim() === '' || 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.identityNumber.includes(searchTerm) ||
    p.convoyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );`;
  
const newFilter = `  const applications = participants.filter(
    (p) => (p.status === 'Başvuru Yapıldı' || p.status === 'Yedek Listede') && p.convoyName && p.convoyName.trim() !== ''
  ).filter(p => {
    if (searchTerm.trim() === '') return true;
    const s = searchTerm.toLowerCase();
    return p.name.toLowerCase().includes(s) || 
      p.identityNumber.includes(s) ||
      p.convoyName?.toLowerCase().includes(s) ||
      p.city?.toLowerCase().includes(s) ||
      p.district?.toLowerCase().includes(s) ||
      p.duty?.toLowerCase().includes(s) ||
      p.phone?.includes(s);
  });`;

content = content.replace(oldFilter, newFilter);
fs.writeFileSync('src/components/RegistrationView.tsx', content);
