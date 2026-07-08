const fs = require('fs');

let content = fs.readFileSync('src/components/Screensaver.tsx', 'utf8');

content = content.replace(
  'className="opacity-0 w-full h-12 absolute z-[-1]"',
  'className="opacity-0 absolute inset-0 z-10 w-full h-full cursor-pointer"'
);

fs.writeFileSync('src/components/Screensaver.tsx', content);
