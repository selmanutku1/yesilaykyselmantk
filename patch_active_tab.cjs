const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetState = `  const [activeTab, setActiveTab] = useState<'dashboard' | 'bungalov' | 'katilimci' | 'kayit' | 'revir' | 'yemekhane' | 'teknik' | 'guvenlik' | 'dokümanlar' | 'ayarlar' | 'maliyet' | 'anket-analizi' | 'sistem-loglari' | 'dijital-arsiv' | 'olay-kayit'>('dashboard');`;
const newTargetState = `  const [activeTab, setActiveTab] = useState<'dashboard' | 'kamp-planlama' | 'bungalov' | 'katilimci' | 'kayit' | 'revir' | 'yemekhane' | 'teknik' | 'guvenlik' | 'dokümanlar' | 'ayarlar' | 'maliyet' | 'anket-analizi' | 'sistem-loglari' | 'dijital-arsiv' | 'olay-kayit'>('dashboard');`;

content = content.replace(targetState, newTargetState);
fs.writeFileSync('src/App.tsx', content);
