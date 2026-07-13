const fs = require('fs');
let code = fs.readFileSync('src/components/YesilAiChatbot.tsx', 'utf8');

const targetStr = `                    {msg.text}
                    {msg.action && (`;

const newStr = `                    {msg.text && <div className="mt-1 leading-relaxed">{msg.text}</div>}
                    {msg.steps && msg.steps.length > 0 && (
                      <div className="mt-2 space-y-1.5 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                        {msg.steps.map(step => (
                          <div key={step.id} className="flex items-center gap-2 text-[11px] font-medium">
                            {step.status === 'running' && <Loader2 className="w-3.5 h-3.5 text-emerald-600 animate-spin shrink-0" />}
                            {step.status === 'success' && (
                              <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            )}
                            {step.status === 'error' && (
                              <X className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            )}
                            <span className={step.status === 'success' ? 'text-emerald-700 dark:text-emerald-400 opacity-90' : 'text-gray-700 dark:text-gray-300'}>{step.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {msg.action && (`;

code = code.replace(targetStr, newStr);

fs.writeFileSync('src/components/YesilAiChatbot.tsx', code);
