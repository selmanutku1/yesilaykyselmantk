const fs = require('fs');

let content = fs.readFileSync('src/components/Screensaver.tsx', 'utf8');

const regex = /\{\/\* Passcode Input Field \*\/\}[\s\S]*?\{\/\* Error Message Container \*\/\}/;

const replacement = `{/* Passcode Indicator Bullets */}
              <div className="flex justify-center gap-4 my-4 relative">
                {/* Hidden Input for Mobile Keyboard & Accessibility */}
                <input
                  ref={inputRef}
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
                  className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-text"
                />
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={\`w-3.5 h-3.5 rounded-full border transition-all duration-200 \${
                      index < passcode.length
                        ? 'bg-emerald-400 border-emerald-400 scale-110 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                        : 'border-white/20 bg-transparent'
                    }\`}
                  />
                ))}
              </div>

              {/* Error Message Container */}`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/components/Screensaver.tsx', content);
