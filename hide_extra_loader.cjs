const fs = require('fs');
let code = fs.readFileSync('src/components/YesilAiChatbot.tsx', 'utf8');

const target = `              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3">
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                  </div>
                </motion.div>
              )}`;

const replacement = `              {/* Extra loader removed because steps cover the loading state */}`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/YesilAiChatbot.tsx', code);
