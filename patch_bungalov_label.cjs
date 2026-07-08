const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `label={\`Bungalov & Yerleşim (\${centerBungalows.length} Oda)\`}`;
const newTargetStr = `label="Bungalov & Yerleşim"`;

content = content.replace(targetStr, newTargetStr);
fs.writeFileSync('src/App.tsx', content);
