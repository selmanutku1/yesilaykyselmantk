const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(
  "id: 'ADMIN2',\n    name: 'Mahmut Çelik',\n    username: 'mahmut',\n    role: 'admin',\n    roleName: 'Kamp Operasyonları'",
  "id: 'ADMIN2',\n    name: 'Mahmut Çelik',\n    username: 'mahmut',\n    role: 'mudur',\n    roleName: 'Kamp Operasyonları'"
);
fs.writeFileSync('src/App.tsx', content);
