const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  `      {/* Floating Exit Fullscreen Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed bottom-6 right-6 z-[100000] p-4 bg-gray-900/80 dark:bg-gray-100/80 hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full shadow-2xl backdrop-blur-sm transition-all transform hover:scale-105 flex items-center justify-center group"
          title="Tam Ekrandan Çık"
        >
          <Minimize2 className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium pointer-events-none shadow-xl">
            Tam Ekrandan Çık (ESC)
          </span>
        </button>
      )}`,
  ``
);

fs.writeFileSync('src/App.tsx', app, 'utf8');

let cal = fs.readFileSync('src/components/PublicCalendarView.tsx', 'utf8');
cal = cal.replace(
  `      {/* Floating Exit Fullscreen Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed bottom-6 right-6 z-[100000] p-4 bg-gray-900/80 dark:bg-gray-100/80 hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full shadow-2xl backdrop-blur-sm transition-all transform hover:scale-105 flex items-center justify-center group"
          title="Tam Ekrandan Çık"
        >
          <Minimize className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium pointer-events-none shadow-xl">
            Tam Ekrandan Çık (ESC)
          </span>
        </button>
      )}`,
  ``
);
fs.writeFileSync('src/components/PublicCalendarView.tsx', cal, 'utf8');

