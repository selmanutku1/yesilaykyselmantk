const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const oldSchema = `                type: { type: Type.STRING, description: "Eylem tipi: 'NAVIGATE', 'FULLSCREEN', 'THEME', 'LOCK_SCREEN'" },
                payload: { type: Type.STRING, description: "Eylem parametresi. Örnekler: 'ayarlar', 'dark', 'true'" }`;

const newSchema = `                type: { type: Type.STRING, description: "Eylem tipi: 'NAVIGATE', 'FULLSCREEN', 'THEME', 'LOCK_SCREEN', 'DATA_ACTION'" },
                payload: { type: Type.STRING, description: "Eylem parametresi. Eğer DATA_ACTION ise JSON formatında string döner." }`;

server = server.replace(oldSchema, newSchema);
fs.writeFileSync('server.ts', server);
