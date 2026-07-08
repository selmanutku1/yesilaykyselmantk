const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `  const hasAccess = (tab: 'dashboard' | 'kamp-planlama' | 'bungalov' | 'katilimci' | 'kayit' | 'revir' | 'yemekhane' | 'teknik' | 'guvenlik' | 'dokümanlar' | 'ayarlar' | 'maliyet' | 'anket-analizi' | 'sistem-loglari' | 'dijital-arsiv' | 'olay-kayit') => {
    if (!currentUser) return false;
    return currentUser.allowedTabs.includes(tab);
  };`;

const newTargetStr = `  const hasAccess = (tab: 'dashboard' | 'kamp-planlama' | 'bungalov' | 'katilimci' | 'kayit' | 'revir' | 'yemekhane' | 'teknik' | 'guvenlik' | 'dokümanlar' | 'ayarlar' | 'maliyet' | 'anket-analizi' | 'sistem-loglari' | 'dijital-arsiv' | 'olay-kayit') => {
    if (!currentUser) return false;
    if (tab === 'kamp-planlama' && (currentUser.role === 'admin' || currentUser.role === 'mudur')) return true;
    if (currentUser.role === 'admin') return true;
    return currentUser.allowedTabs.includes(tab);
  };`;

content = content.replace(targetStr, newTargetStr);
fs.writeFileSync('src/App.tsx', content);
