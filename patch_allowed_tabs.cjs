const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "allowedTabs: ('dashboard' | 'bungalov' | 'katilimci' | 'kayit' | 'revir' | 'yemekhane' | 'teknik' | 'guvenlik' | 'dokümanlar' | 'ayarlar' | 'maliyet' | 'anket-analizi' | 'sistem-loglari' | 'dijital-arsiv' | 'olay-kayit')[];",
  "allowedTabs: ('dashboard' | 'kamp-planlama' | 'bungalov' | 'katilimci' | 'kayit' | 'revir' | 'yemekhane' | 'teknik' | 'guvenlik' | 'dokümanlar' | 'ayarlar' | 'maliyet' | 'anket-analizi' | 'sistem-loglari' | 'dijital-arsiv' | 'olay-kayit')[];"
);

content = content.replace(
  "allowedTabs: ['dashboard', 'bungalov', 'katilimci', 'kayit', 'revir', 'yemekhane', 'teknik', 'guvenlik', 'maliyet', 'anket-analizi', 'dokümanlar', 'ayarlar', 'sistem-loglari', 'dijital-arsiv', 'olay-kayit']",
  "allowedTabs: ['dashboard', 'kamp-planlama', 'bungalov', 'katilimci', 'kayit', 'revir', 'yemekhane', 'teknik', 'guvenlik', 'maliyet', 'anket-analizi', 'dokümanlar', 'ayarlar', 'sistem-loglari', 'dijital-arsiv', 'olay-kayit']"
);

content = content.replace(
  "allowedTabs: ['dashboard', 'bungalov', 'katilimci', 'revir', 'yemekhane', 'teknik', 'guvenlik', 'maliyet', 'anket-analizi', 'dokümanlar', 'ayarlar', 'dijital-arsiv', 'olay-kayit']",
  "allowedTabs: ['dashboard', 'kamp-planlama', 'bungalov', 'katilimci', 'revir', 'yemekhane', 'teknik', 'guvenlik', 'maliyet', 'anket-analizi', 'dokümanlar', 'ayarlar', 'dijital-arsiv', 'olay-kayit']"
);

fs.writeFileSync('src/App.tsx', content);
