const fs = require('fs');
let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

// Fix department selection ('Satın Alma' -> 'Diğer' or 'Teknik')
content = content.replace(/'Satın Alma'/g, "'Diğer'");

// Fix priority selection ('Acil' -> 'Yüksek')
content = content.replace(/'Acil'/g, "'Yüksek'");
content = content.replace(/"Acil"/g, '"Yüksek"');

// Fix status
content = content.replace(/'Açık'/g, "'Bekliyor'");

fs.writeFileSync('src/components/TechnicalOperationsView.tsx', content);
