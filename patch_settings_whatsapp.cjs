const fs = require('fs');

let content = fs.readFileSync('src/components/SettingsView.tsx', 'utf8');

// Ensure we have a place to insert the WhatsApp panel. We'll put it right before the Redesigned User Management Panel
const splitPoint = "{/* Redesigned User Management Panel (IAM Workspace) */}";

const whatsappPanel = `
      {/* WhatsApp Integration Panel */}
      {currentUser.role === 'admin' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-6 mt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2.5">
                <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <span className="block font-black tracking-tight text-gray-900 text-sm">WhatsApp Bildirim Altyapısı</span>
                  <span className="block text-2xs font-medium text-gray-400 mt-0.5 font-sans">Katılımcılara gönderilecek otomatik WhatsApp bildirimleri ve API ayarları.</span>
                </div>
              </h3>
            </div>
            <div>
              <button
                onClick={() => {
                  onAddLog('WhatsApp Ayarları Kaydedildi', 'WhatsApp API bağlantı ayarları güncellendi.');
                  if (typeof triggerSuccess === 'function') triggerSuccess('WhatsApp ayarları başarıyla kaydedildi.');
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Save className="w-3.5 h-3.5" /> Ayarları Kaydet
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5"><Smartphone className="w-4 h-4 text-emerald-600"/> API Bağlantı Bilgileri</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">WhatsApp Business API Anahtarı</label>
                  <input type="password" defaultValue="wa_test_123456789" className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-xs font-mono" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">Gönderici Telefon Numarası (ID)</label>
                  <input type="text" defaultValue="+90 555 123 4567" className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-xs font-mono" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">Webhook URL (Mesaj Durumları İçin)</label>
                  <input type="text" defaultValue="https://yesilaykampus.api/webhook/whatsapp" className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-xs font-mono" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-600"/> Otomatik Bildirim Tetikleyicileri</h4>
              
              <div className="space-y-2 border border-gray-150 rounded-xl overflow-hidden bg-gray-50/30">
                {[
                  { id: 'app_approved', title: 'Başvuru Onaylandığında', desc: 'Katılımcının başvurusu onaylandığında gönderilecek karşılama mesajı.', active: true },
                  { id: 'bungalow_assigned', title: 'Oda Ataması Yapıldığında', desc: 'Katılımcının kalacağı oda/bungalov belli olduğunda gönderilir.', active: true },
                  { id: 'event_reminder', title: 'Etkinlik Hatırlatmaları', desc: 'Önemli kamp etkinliklerinden 15 dakika önce katılımcılara hatırlatma yapılır.', active: false },
                  { id: 'checkout_thanks', title: 'Çıkış İşlemi Sonrası', desc: 'Kamp bitiminde gönderilecek anket linki ve teşekkür mesajı.', active: true }
                ].map((trigger, i) => (
                  <label key={i} className="flex items-start gap-3 p-3 border-b border-gray-150 last:border-0 cursor-pointer hover:bg-white transition-colors">
                    <input type="checkbox" defaultChecked={trigger.active} className="mt-1 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer accent-emerald-600" />
                    <div>
                      <span className="block text-xs font-bold text-gray-900">{trigger.title}</span>
                      <span className="block text-[10px] text-gray-500 mt-0.5">{trigger.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(splitPoint, whatsappPanel + '\n      ' + splitPoint);

fs.writeFileSync('src/components/SettingsView.tsx', content);
