const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace("handleActiveTabChange = (tab: 'dashboard' | 'kamp-planlama' | 'bungalov' | 'katilimci' | 'kayit' | 'revir' | 'yemekhane' | 'teknik' | 'guvenlik' | 'dokümanlar' | 'ayarlar' | 'maliyet' | 'anket-analizi' | 'sistem-loglari' | 'dijital-arsiv' | 'olay-kayit')", "handleActiveTabChange = (tab: 'dashboard' | 'kamp-planlama' | 'bungalov' | 'katilimci' | 'kayit' | 'revir' | 'yemekhane' | 'teknik' | 'guvenlik' | 'dokümanlar' | 'ayarlar' | 'maliyet' | 'anket-analizi' | 'sistem-loglari' | 'dijital-arsiv' | 'olay-kayit' | 'raporlar' | 'sistem-guncellemeleri')");
fs.writeFileSync('src/App.tsx', content);
