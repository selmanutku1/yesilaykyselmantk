const fs = require('fs');
let content = fs.readFileSync('src/components/YesilAiChatbot.tsx', 'utf8');

// Replace the moon icon with the Yesilay logo
content = content.replace(
  /<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 rotate-45" xmlns="http:\/\/www\.w3\.org\/2000\/svg">\s*<path d="M21 12\.79A9 9 0 1 1 11\.21 3 7 7 0 0 0 21 12\.79z" \/>\s*<\/svg>/g,
  `<svg viewBox="0 0 100 100" className="w-4 h-4 fill-emerald-600 dark:fill-emerald-400">
    <path d="M52,15 A35,35 0 1,0 85,68 A28,28 0 1,1 85,32 A35,35 0 0,0 52,15 Z" />
  </svg>`
);

content = content.replace(
  /<svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 rotate-45" xmlns="http:\/\/www\.w3\.org\/2000\/svg">\s*<path d="M21 12\.79A9 9 0 1 1 11\.21 3 7 7 0 0 0 21 12\.79z" \/>\s*<\/svg>/g,
  `<svg viewBox="0 0 100 100" className="w-7 h-7 fill-emerald-600 dark:fill-emerald-400">
    <path d="M52,15 A35,35 0 1,0 85,68 A28,28 0 1,1 85,32 A35,35 0 0,0 52,15 Z" />
  </svg>`
);

content = content.replace(
  /<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-45" xmlns="http:\/\/www\.w3\.org\/2000\/svg"><path d="M21 12\.79A9 9 0 1 1 11\.21 3 7 7 0 0 0 21 12\.79z" \/><\/svg>/g,
  `<svg viewBox="0 0 100 100" className="w-5 h-5 fill-white">
    <path d="M52,15 A35,35 0 1,0 85,68 A28,28 0 1,1 85,32 A35,35 0 0,0 52,15 Z" />
  </svg>`
);

fs.writeFileSync('src/components/YesilAiChatbot.tsx', content, 'utf8');
