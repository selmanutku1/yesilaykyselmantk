const fs = require('fs');
let content = fs.readFileSync('src/components/PublicCalendarView.tsx', 'utf8');

const search = `          {/* Theme Selector */}
          <button`;

const replace = `          {/* Full Screen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:flex p-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
            title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran"}
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>

          {/* Theme Selector */}
          <button`;

content = content.replace(search, replace);

fs.writeFileSync('src/components/PublicCalendarView.tsx', content);
