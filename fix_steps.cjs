const fs = require('fs');
let code = fs.readFileSync('src/components/YesilAiChatbot.tsx', 'utf8');

const interfaceTarget = `interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  action?: { type: string; payload: string };
}`;

const interfaceReplacement = `interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  action?: { type: string; payload: string };
  steps?: { id: number; text: string; status: 'running' | 'success' | 'error' }[];
}`;

code = code.replace(interfaceTarget, interfaceReplacement);
fs.writeFileSync('src/components/YesilAiChatbot.tsx', code);
