const fs = require('fs');
let code = fs.readFileSync('src/components/YesilAiChatbot.tsx', 'utf8');

const target = `else if (type === 'DATA_ACTION' && onDataAction) onDataAction(payload.actionName, payload.data);`;
const replacement = `else if (type === 'DATA_ACTION' && onDataAction) {
            try {
              const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
              onDataAction(parsed.actionName, parsed.data);
            } catch (e) {
              console.error("Failed to parse DATA_ACTION payload", payload);
            }
          }`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/YesilAiChatbot.tsx', code);
