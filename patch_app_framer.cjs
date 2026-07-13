const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  "import { motion } from 'motion/react';",
  "import { motion, AnimatePresence } from 'motion/react';"
);

app = app.replace(
  "  return (\n    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col font-sans ${isFullscreen ? 'fixed inset-0 z-[99999] w-screen h-screen overflow-hidden' : ''}`} id=\"yesilay-kys-master-parent\">",
  "  return (\n    <AnimatePresence mode=\"wait\">\n      <motion.div \n        key={theme} \n        initial={{ opacity: 0 }}\n        animate={{ opacity: 1 }}\n        exit={{ opacity: 0 }}\n        transition={{ duration: 0.3, ease: 'easeInOut' }}\n        className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col font-sans ${isFullscreen ? 'fixed inset-0 z-[99999] w-screen h-screen overflow-hidden' : ''}`} id=\"yesilay-kys-master-parent\"\n      >"
);

app = app.replace(
  "      {showScreensaver && (\n        <Screensaver \n          onExit={() => setIsIdle(false)} \n        />\n      )}\n    </div>\n  );\n}",
  "      {showScreensaver && (\n        <Screensaver \n          onExit={() => setIsIdle(false)} \n        />\n      )}\n      </motion.div>\n    </AnimatePresence>\n  );\n}"
);

fs.writeFileSync('src/App.tsx', app);
