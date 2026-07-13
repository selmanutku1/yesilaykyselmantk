const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const oldStr = `              properties: {
                type: { type: Type.STRING, description: "Eylem tipi: 'NAVIGATE', 'FULLSCREEN', 'THEME', 'LOCK_SCREEN', 'DATA_ACTION'" },
                payload: { type: Type.STRING, description: "Eylem parametresi. Eğer DATA_ACTION ise string formatında JSON olmalıdır." }
              }
            }`;

const newStr = `              properties: {
                type: { type: Type.STRING, description: "Eylem tipi: 'NAVIGATE', 'FULLSCREEN', 'THEME', 'LOCK_SCREEN', 'DATA_ACTION'" },
                payload: { type: Type.STRING, description: "Eylem parametresi. Eğer DATA_ACTION ise string formatında JSON olmalıdır." }
              },
              required: ["type", "payload"]
            }`;

server = server.replace(oldStr, newStr);
fs.writeFileSync('server.ts', server);
