const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  `      {/* SaaS Executive Header Banner */}
      {!isFullscreen && (
      <header className="print:hidden bg-white dark:bg-gray-800 border-b border-gray-150 dark:border-gray-700 px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 z-30 shadow-xs transition-colors duration-200">`,
  `      {/* SaaS Executive Header Banner */}
      <header className="print:hidden bg-white dark:bg-gray-800 border-b border-gray-150 dark:border-gray-700 px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 z-30 shadow-xs transition-colors duration-200">`
);

content = content.replace(
  `      </header>
      )}

      {/* Floating Exit Fullscreen Button */}`,
  `      </header>

      {/* Floating Exit Fullscreen Button */}`
);

fs.writeFileSync(file, content, 'utf8');
