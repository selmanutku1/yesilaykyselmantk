const fs = require('fs');

// Patch App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  /<button\s+onClick=\{\(\) => setTheme\(theme === 'dark' \? 'light' : 'dark'\)\}\s+className="p-1.5 md:p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center cursor-pointer border border-gray-200\/50 dark:border-gray-700"\s+title=\{theme === 'dark' \? "Aydınlık Moda Geç \(Gündüz\)" : "Karanlık Moda Geç \(Gece\)"\}\s+>\s+\{theme === 'dark' \? <Sun className="w-4 h-4 text-amber-500" \/> : <Moon className="w-4 h-4 text-gray-500" \/>\}\s+<\/button>/,
  `            {/* Tekli Gece / Gündüz / Sistem Modu Butonu */}
            <button
              onClick={() => {
                if (theme === 'light') setTheme('dark');
                else if (theme === 'dark') setTheme('system');
                else setTheme('light');
              }}
              className="p-1.5 md:p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center cursor-pointer border border-gray-200/50 dark:border-gray-700"
              title={theme === 'light' ? 'Karanlık Moda Geç' : theme === 'dark' ? 'Sistem Temasına Geç' : 'Aydınlık Moda Geç'}
            >
              {theme === 'light' && <Moon className="w-4 h-4 text-gray-500" />}
              {theme === 'dark' && <Sun className="w-4 h-4 text-amber-500" />}
              {theme === 'system' && <Monitor className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
            </button>`
);

app = app.replace(
  /<button\s+type="button"\s+onClick=\{\(\) => setTheme\(theme === 'dark' \? 'light' : 'dark'\)\}\s+className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"\s+>\s+\{theme === 'dark' \? <Sun className="w-4 h-4 text-amber-500" \/> : <Moon className="w-4 h-4 text-gray-500" \/>\}\s+<span className="text-\[9px\] font-bold">Tema<\/span>\s+<\/button>/,
  `                <button
                  type="button"
                  onClick={() => {
                    if (theme === 'light') setTheme('dark');
                    else if (theme === 'dark') setTheme('system');
                    else setTheme('light');
                  }}
                  className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                >
                  {theme === 'light' && <Moon className="w-4 h-4 text-gray-500" />}
                  {theme === 'dark' && <Sun className="w-4 h-4 text-amber-500" />}
                  {theme === 'system' && <Monitor className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  <span className="text-[9px] font-bold">Tema ({theme === 'light' ? 'Açık' : theme === 'dark' ? 'Koyu' : 'Sistem'})</span>
                </button>`
);

// Add theme and setTheme to SettingsView props call in App.tsx
app = app.replace(
  /<SettingsView\s+currentUser=\{currentUser\}\s+users=\{users\}/,
  `<SettingsView\n              theme={theme}\n              setTheme={setTheme}\n              currentUser={currentUser}\n              users={users}`
);

fs.writeFileSync('src/App.tsx', app);

// Patch SettingsView.tsx
let settings = fs.readFileSync('src/components/SettingsView.tsx', 'utf8');

settings = settings.replace(
  "import { \n  Palette,\n  Sliders,\n  Users,",
  "import { \n  Palette,\n  Sliders,\n  Users,\n  Sun,\n  Moon,\n  Monitor,"
);

settings = settings.replace(
  "interface SettingsViewProps {\n  currentUser: LoginUser;\n  users: LoginUser[];",
  "interface SettingsViewProps {\n  theme: 'light' | 'dark' | 'system';\n  setTheme: (t: 'light' | 'dark' | 'system') => void;\n  currentUser: LoginUser;\n  users: LoginUser[];"
);

settings = settings.replace(
  "export default function SettingsView({ \n  currentUser,\n  users,",
  "export default function SettingsView({ \n  theme,\n  setTheme,\n  currentUser,\n  users,"
);

const themeModesPanel = `
          {/* Aydınlık/Karanlık Mod Panel */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Sun className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              Görünüm Modu
            </h3>
            <p className="text-2xs text-gray-500 dark:text-gray-400 leading-normal font-semibold">
              Sistem arayüzünü gündüz (aydınlık), gece (karanlık) veya cihazınızın sistem ayarlarına uyumlu olacak şekilde ayarlayabilirsiniz.
            </p>
            <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setTheme('light')}
                className={\`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all \${theme === 'light' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}\`}
              >
                <Sun className="w-4 h-4" />
                Aydınlık
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={\`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all \${theme === 'dark' ? 'bg-gray-700 text-emerald-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-300'}\`}
              >
                <Moon className="w-4 h-4" />
                Karanlık
              </button>
              <button
                onClick={() => setTheme('system')}
                className={\`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all \${theme === 'system' ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}\`}
              >
                <Monitor className="w-4 h-4" />
                Sistem
              </button>
            </div>
          </div>
`;

settings = settings.replace(
  "          {/* Theme Customizer Panel */}",
  themeModesPanel + "\n          {/* Theme Customizer Panel */}"
);

fs.writeFileSync('src/components/SettingsView.tsx', settings);
