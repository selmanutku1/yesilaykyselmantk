const fs = require('fs');
const content = fs.readFileSync('src/components/KampSonuDegerlendirmeRaporu.tsx', 'utf-8');
console.log(content.split('\n').length);
