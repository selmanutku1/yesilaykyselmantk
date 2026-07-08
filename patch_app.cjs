const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// fix handleActiveTabChange signature
content = content.replace(
  "const handleActiveTabChange = (tab: 'dashboard' | 'bungalov' | 'katilimci' | 'kayit' | 'revir' | 'yemekhane' | 'teknik' | 'guvenlik' | 'dokümanlar' | 'ayarlar' | 'maliyet' | 'anket-analizi' | 'sistem-loglari' | 'dijital-arsiv' | 'olay-kayit') => {",
  "const handleActiveTabChange = (tab: 'dashboard' | 'kamp-planlama' | 'bungalov' | 'katilimci' | 'kayit' | 'revir' | 'yemekhane' | 'teknik' | 'guvenlik' | 'dokümanlar' | 'ayarlar' | 'maliyet' | 'anket-analizi' | 'sistem-loglari' | 'dijital-arsiv' | 'olay-kayit') => {"
);

// fix PeriodManagement props
content = content.replace(
  "campCenters={CAMP_CENTERS}",
  "campCenters={campCenters}"
);
content = content.replace(
  "selectedCampCenterId={selectedCampCenterId}",
  "selectedCampCenterId={selectedCenterId}"
);
content = content.replace(
  "onAddPeriod={(p) => setPeriods([...periods, p])}",
  "onAddPeriod={handleAddPeriod}"
);
content = content.replace(
  "onUpdatePeriods={setPeriods}",
  "onUpdatePeriods={updatePeriods}"
);

fs.writeFileSync('src/App.tsx', content);
