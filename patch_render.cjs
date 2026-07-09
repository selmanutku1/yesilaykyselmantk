const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `          {activeTab === 'dijital-arsiv' && (
            <DijitalArsivView onAddLog={addSystemLog} />
          )}`;

const replStr = `          {activeTab === 'dijital-arsiv' && (
            <DijitalArsivView onAddLog={addSystemLog} />
          )}
          {activeTab === 'sistem-guncellemeleri' && (
            <SystemUpdatesView />
          )}`;

content = content.replace(targetStr, replStr);
fs.writeFileSync('src/App.tsx', content);
