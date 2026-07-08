import fs from 'fs';
let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

content = content.replace(
  'const [notifyMethod, setNotifyMethod] = useState<"both" | "sms" | "email">(',
  'const [notifyMethod, setNotifyMethod] = useState<"all" | "whatsapp" | "sms" | "email">('
);
content = content.replace(
  '"both",',
  '"whatsapp",'
);

content = content.replace(
  'if (notifyMethod === "both" || notifyMethod === "sms") {',
  'if (notifyMethod === "all" || notifyMethod === "sms") {'
);
content = content.replace(
  'if (notifyMethod === "both" || notifyMethod === "email") {',
  'if (notifyMethod === "all" || notifyMethod === "whatsapp") {\n      destinations.push(`WhatsApp (${selectedParticipant.phone || "Gsm Yok"})`);\n    }\n    if (notifyMethod === "all" || notifyMethod === "email") {'
);

const buttonsOld = `                    <button
                      type="button"
                      onClick={() => setNotifyMethod("both")}
                      className={\`py-1.5 text-[10px] rounded-lg border font-black transition cursor-pointer text-center \${notifyMethod === "both" ? "border-blue-500 bg-blue-50 text-blue-900 shadow-3xs" : "border-gray-200 hover:border-gray-300 text-gray-500 bg-white"}\`}
                    >
                      Her İkisi
                    </button>
                    <button
                      type="button"
                      onClick={() => setNotifyMethod("sms")}
                      className={\`py-1.5 text-[10px] rounded-lg border font-black transition cursor-pointer text-center \${notifyMethod === "sms" ? "border-blue-500 bg-blue-50 text-blue-900 shadow-3xs" : "border-gray-200 hover:border-gray-300 text-gray-500 bg-white"}\`}
                    >
                      Sadece SMS
                    </button>
                    <button
                      type="button"
                      onClick={() => setNotifyMethod("email")}
                      className={\`py-1.5 text-[10px] rounded-lg border font-black transition cursor-pointer text-center \${notifyMethod === "email" ? "border-blue-500 bg-blue-50 text-blue-900 shadow-3xs" : "border-gray-200 hover:border-gray-300 text-gray-500 bg-white"}\`}
                    >
                      Sadece Mail
                    </button>`;

const buttonsNew = `                    <button
                      type="button"
                      onClick={() => setNotifyMethod("all")}
                      className={\`py-1.5 px-1 text-[10px] rounded-lg border font-black transition cursor-pointer text-center \${notifyMethod === "all" ? "border-blue-500 bg-blue-50 text-blue-900 shadow-3xs" : "border-gray-200 hover:border-gray-300 text-gray-500 bg-white"}\`}
                    >
                      Tümü
                    </button>
                    <button
                      type="button"
                      onClick={() => setNotifyMethod("whatsapp")}
                      className={\`py-1.5 px-1 text-[10px] rounded-lg border font-black transition cursor-pointer text-center \${notifyMethod === "whatsapp" ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-3xs" : "border-gray-200 hover:border-gray-300 text-gray-500 bg-white"}\`}
                    >
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setNotifyMethod("sms")}
                      className={\`py-1.5 px-1 text-[10px] rounded-lg border font-black transition cursor-pointer text-center \${notifyMethod === "sms" ? "border-blue-500 bg-blue-50 text-blue-900 shadow-3xs" : "border-gray-200 hover:border-gray-300 text-gray-500 bg-white"}\`}
                    >
                      SMS
                    </button>
                    <button
                      type="button"
                      onClick={() => setNotifyMethod("email")}
                      className={\`py-1.5 px-1 text-[10px] rounded-lg border font-black transition cursor-pointer text-center \${notifyMethod === "email" ? "border-blue-500 bg-blue-50 text-blue-900 shadow-3xs" : "border-gray-200 hover:border-gray-300 text-gray-500 bg-white"}\`}
                    >
                      E-Posta
                    </button>`;

content = content.replace(buttonsOld, buttonsNew);
fs.writeFileSync('src/components/ParticipantView.tsx', content);
