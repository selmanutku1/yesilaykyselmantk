const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  "      {isIdle && (\n        <Screensaver currentUser={currentUser} onDismiss={() => setIsIdle(false)} />\n      )}\n    </div>\n  );\n}",
  "      {isIdle && (\n        <Screensaver currentUser={currentUser} onDismiss={() => setIsIdle(false)} />\n      )}\n      </motion.div>\n    </AnimatePresence>\n  );\n}"
);

fs.writeFileSync('src/App.tsx', app);
