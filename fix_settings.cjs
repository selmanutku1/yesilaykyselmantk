const fs = require('fs');
let settings = fs.readFileSync('src/components/SettingsView.tsx', 'utf8');

settings = settings.replace(
  /export default function SettingsView\(\{\s*currentUser,/,
  "export default function SettingsView({\n  theme,\n  setTheme,\n  currentUser,"
);

fs.writeFileSync('src/components/SettingsView.tsx', settings);
