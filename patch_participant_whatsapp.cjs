const fs = require('fs');

let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

if (!content.includes('MessageCircle')) {
  content = content.replace("import {", "import { MessageCircle,");
}

if (!content.includes('whatsappService')) {
  content = content.replace("import { Participant, CampPeriod, CampCenter, SystemLog, Bungalow } from '../types';", "import { Participant, CampPeriod, CampCenter, SystemLog, Bungalow } from '../types';\nimport { generateWhatsAppLink, sendWhatsAppNotification } from '../utils/whatsappService';");
}

const sendWhatsAppFn = `
  const handleSendWhatsApp = async (p: Participant) => {
    if (!p.phone) {
      alert('Katılımcının telefon numarası bulunmuyor.');
      return;
    }
    const message = \`Merhaba \${p.name}, Yeşilay Kampı bilgilendirme servisinden ulaşıyoruz.\`;
    
    // Açık olan modal/drawer varsa bunu kapatmıyoruz, sadece linki yeni sekmede açıyoruz.
    const waLink = generateWhatsAppLink(p.phone, message);
    window.open(waLink, '_blank');
    
    onAddLog('WhatsApp Mesajı', \`\${p.name} adlı katılımcıya (\${p.phone}) WhatsApp üzerinden manuel mesaj gönderildi.\`);
  };
`;

if (!content.includes('handleSendWhatsApp')) {
  content = content.replace("const handleGenerateCertificate", sendWhatsAppFn + "\n  const handleGenerateCertificate");
}

const phoneRegex = /<div>\s*<span className="block text-\[10px\] text-gray-400 font-semibold mb-0\.5">\s*Telefon\s*<\/span>\s*<span className="font-bold text-gray-800 font-mono">\s*\{selectedParticipant\.phone\}\s*<\/span>\s*<\/div>/;

const replacementPhone = `<div>
                    <span className="block text-[10px] text-gray-400 font-semibold mb-0.5">
                      Telefon
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800 font-mono">
                        {selectedParticipant.phone}
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
} else {
  console.log("Regex match failed, looking around 1930-1960");
}

fs.writeFileSync('src/components/ParticipantView.tsx', content);
