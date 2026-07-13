const fs = require('fs');
let code = fs.readFileSync('src/components/YesilAiChatbot.tsx', 'utf8');

const injection = `
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [isOpen]);
`;

code = code.replace("const [isLoading, setIsLoading] = useState(false);", "const [isLoading, setIsLoading] = useState(false);" + injection);

const buttonTarget = `<Bot className="w-7 h-7" />`;
const buttonReplacement = `
            {/* Custom Green Crescent Logo */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 -rotate-45" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>`;

code = code.replace(buttonTarget, buttonReplacement);

const buttonContainerTarget = `            className="fixed bottom-6 right-6 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl z-[999999] flex items-center justify-center print:hidden"
            title="YeşilAI Asistanı"
          >`;

const tooltipMarkup = `            className="fixed bottom-6 right-6 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl z-[999999] flex items-center justify-center print:hidden group"
            title="YeşilAI Asistanı"
          >
            <AnimatePresence>
              {showTooltip && !isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute bottom-full right-0 mb-4 w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-3 rounded-2xl rounded-br-sm shadow-xl border border-gray-100 dark:border-gray-700 pointer-events-none"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 -rotate-45" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium leading-tight">Ben YeşilAI KYS asistanınız, bir isteğiniz var mı?</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
`;

code = code.replace(buttonContainerTarget, tooltipMarkup);

const botHeaderTarget = `<Bot className="w-5 h-5" />`;
const botHeaderReplacement = `<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-45" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>`;
code = code.replace(botHeaderTarget, botHeaderReplacement);

const botMessageTarget = `<Bot className="w-4 h-4" />`;
const botMessageReplacement = `<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -rotate-45" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>`;
// Use regular expression to replace all occurrences if needed, but in our code it probably occurs once per message.
code = code.replace(new RegExp('<Bot className="w-4 h-4" />', 'g'), botMessageReplacement);

fs.writeFileSync('src/components/YesilAiChatbot.tsx', code);
