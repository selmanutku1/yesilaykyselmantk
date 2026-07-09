const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const newUser = `  {
    id: 'ADMIN2',
    name: 'Mahmut Çelik',
    username: 'mahmut',
    role: 'admin',
    roleName: 'Kamp Operasyonları',
    allowedTabs: ['dashboard', 'kamp-planlama', 'bungalov', 'katilimci', 'kayit', 'revir', 'yemekhane', 'teknik', 'guvenlik', 'maliyet', 'anket-analizi', 'dokümanlar', 'ayarlar', 'sistem-loglari', 'dijital-arsiv', 'olay-kayit']
  },`;

content = content.replace("export const USERS_LIST: LoginUser[] = [", "export const USERS_LIST: LoginUser[] = [\n" + newUser);

fs.writeFileSync('src/App.tsx', content);
