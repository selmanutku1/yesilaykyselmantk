const fs = require('fs');
let code = fs.readFileSync('src/components/YesilAiChatbot.tsx', 'utf8');

const target = `const { type, payload } = data.action;`;
const replacement = `const { type, payload, dataObj } = data.action;`;

code = code.replace(target, replacement);

const target2 = `else if (type === 'DATA_ACTION' && onDataAction) {
            try {
              const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
              onDataAction(parsed.actionName, parsed.data);
            } catch (e) {
              console.error("Failed to parse DATA_ACTION payload", payload);
            }
          }`;

const replacement2 = `else if (type === 'DATA_ACTION' && onDataAction) {
            if (dataObj) {
              onDataAction(dataObj.actionName, dataObj.data);
            } else {
              try {
                const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
                onDataAction(parsed.actionName, parsed.data);
              } catch (e) {
                console.error("Failed to parse DATA_ACTION payload", payload);
              }
            }
          }`;

code = code.replace(target2, replacement2);
fs.writeFileSync('src/components/YesilAiChatbot.tsx', code);
