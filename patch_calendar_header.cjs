const fs = require('fs');
const file = 'src/components/PublicCalendarView.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  `      {!isFullscreen && (
      <header className="bg-white dark:bg-gray-800 border-b border-gray-150 dark:border-gray-750 px-4 md:px-6 py-2.5 flex justify-between items-center sticky top-0 z-30 shadow-xs">`,
  `      <header className="bg-white dark:bg-gray-800 border-b border-gray-150 dark:border-gray-750 px-4 md:px-6 py-2.5 flex justify-between items-center sticky top-0 z-30 shadow-xs">`
);

content = content.replace(
  `      </header>
      )}

      {/* Floating Exit Fullscreen Button */}`,
  `      </header>

      {/* Floating Exit Fullscreen Button */}`
);

fs.writeFileSync(file, content, 'utf8');
