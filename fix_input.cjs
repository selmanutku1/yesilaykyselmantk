const fs = require('fs');

let content = fs.readFileSync('src/components/Screensaver.tsx', 'utf8');

const regex = /\s*\{\/\* Passcode Indicator Bullets \*\/\}[\s\S]*?\{\/\* Error Message Container \*\/\}/;

content = content.replace(regex, `
              {/* Passcode Input Field */}
              <div className="flex justify-center w-full my-4">
                <input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  autoFocus
                  placeholder="****"
                  value={passcode}
                  onChange={(e) => {
                    setError('');
                    const val = e.target.value.replace(/\\D/g, '');
                    setPasscode(val);
                    if (val.length === 4) {
                      setTimeout(() => handleVerify(val), 150);
                    }
                  }}
                  className="w-40 bg-zinc-900/50 border border-emerald-500/30 text-emerald-400 text-center text-2xl font-black tracking-[0.5em] rounded-xl py-3 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all placeholder:text-zinc-600 placeholder:tracking-normal"
                />
              </div>

              {/* Error Message Container */}`);

fs.writeFileSync('src/components/Screensaver.tsx', content);
