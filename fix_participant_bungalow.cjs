const fs = require('fs');
let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

content = content.replace("const bungalowName = bungalows.find((b) => b.id === p.bungalowId)?.name || 'Atanmadı';", "const bungalowName = p.bungalowId ? p.bungalowId : 'Atanmadı';");

fs.writeFileSync('src/components/ParticipantView.tsx', content);
