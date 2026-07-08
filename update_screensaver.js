const fs = require('fs');

let content = fs.readFileSync('src/components/Screensaver.tsx', 'utf8');

const keypadRegex = /\s*\{\/\* PIN Keypad \*\/\}\s*<div className="grid grid-cols-3[\s\S]*?<\/div>\n\s*\{\/\* Actions & Hint \*\/\}/;

content = content.replace(keypadRegex, `
              {/* Invisible Input for Mobile Keyboard */}
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                autoFocus
                value={passcode}
                onChange={(e) => {
                  setError('');
                  const val = e.target.value.replace(/\\D/g, '');
                  setPasscode(val);
                  if (val.length === 4) {
                    setTimeout(() => handleVerify(val), 150);
                  }
                }}
                className="absolute opacity-0 w-0 h-0"
              />
              {/* Actions & Hint */}`);

fs.writeFileSync('src/components/Screensaver.tsx', content);
