const fs = require('fs');
let code = fs.readFileSync('src/components/YesilAiChatbot.tsx', 'utf8');

// Change the FAB button to have a white background and green text so the logo is "Green Crescent"
const buttonOld = `className="fixed bottom-6 right-6 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl z-[999999] flex items-center justify-center print:hidden group"`;
const buttonNew = `className="fixed bottom-6 right-6 p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-emerald-600 dark:text-emerald-400 rounded-full shadow-2xl z-[999999] flex items-center justify-center border border-gray-100 dark:border-gray-700 print:hidden group"`;

code = code.replace(buttonOld, buttonNew);

fs.writeFileSync('src/components/YesilAiChatbot.tsx', code);
