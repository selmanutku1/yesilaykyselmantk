const fs = require('fs');
let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

const phoneRegex = /<div>\s*<span className="block text-\[10px\] text-gray-400 font-semibold mb-0\.5">\s*Telefon Numarası\s*<\/span>\s*<span className="font-bold text-gray-800">\s*\{selectedParticipant\.phone \|\| "Belirtilmedi"\}\s*<\/span>\s*<\/div>/;

const replacementPhone = `<div>
                    <span className="block text-[10px] text-gray-400 font-semibold mb-0.5">
                      Telefon Numarası
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">
                        {selectedParticipant.phone || "Belirtilmedi"}
                      </span>
                      {selectedParticipant.phone && (
                        <button
                          onClick={() => handleSendWhatsApp(selectedParticipant)}
                          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 p-1 rounded-md transition-colors"
                          title="WhatsApp'tan Mesaj Gönder"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>`;

if (content.match(phoneRegex)) {
  content = content.replace(phoneRegex, replacementPhone);
  fs.writeFileSync('src/components/ParticipantView.tsx', content);
  console.log("Success");
} else {
  console.log("Regex match failed");
}
