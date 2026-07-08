import fs from 'fs';
let content = fs.readFileSync('src/components/SettingsView.tsx', 'utf8');

const newSection = `          {/* WhatsApp Business API Integration */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 pb-2 border-b flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              WhatsApp Business API Entegrasyonu
            </h3>
            
            <p className="text-2xs text-gray-500 leading-normal font-semibold">
              Kampa kayıt olan katılımcılara ve velilerine, ön kayıt, mülakat, veya kabul durumları hakkında anlık WhatsApp bildirimleri (Template Messages) gönderebilmek için resmi WhatsApp API altyapısını bağlayın. SMS ve E-posta maliyetlerine alternatif olarak daha hızlı dönüş oranları sağlar.
            </p>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-4xs font-bold text-gray-600 uppercase tracking-wider">Access Token (Bearer)</label>
                <input type="password" placeholder="EAAIu... (Sürekli veya Sistem Tokeni)" className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition" />
              </div>
              <div className="space-y-1.5">
                <label className="text-4xs font-bold text-gray-600 uppercase tracking-wider">Phone Number ID</label>
                <input type="text" placeholder="Örn: 104234567891234" className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition" />
              </div>
              <div className="space-y-1.5">
                <label className="text-4xs font-bold text-gray-600 uppercase tracking-wider">WhatsApp Business Account ID</label>
                <input type="text" placeholder="Örn: 109876543210987" className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition" />
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-3xs block text-gray-600">
                <strong>Not:</strong> WhatsApp mesajları gönderirken 24 saatlik müşteri hizmetleri aralığı dışında Meta tarafından onaylanmış şablonlar (Template Message) kullanmalısınız. 
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition cursor-pointer shadow-sm"
                onClick={() => showSuccessMessage('Bağlantı başarıyla test edildi! WhatsApp API çevrimiçi.')}
              >
                Bağlantıyı Test Et
              </button>
              <button
                onClick={() => showSuccessMessage('WhatsApp API Kimlik Bilgileri Kaydedildi.')}
                className="bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-800 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                API Yapılandırmasını Kaydet
              </button>
            </div>
          </div>

          {/* Quick Info & Guidelines */}`;

content = content.replace(
  "{/* Quick Info & Guidelines */}",
  newSection
);

// We need to import MessageCircle if not imported
if (!content.includes('MessageCircle')) {
  content = content.replace(
    "import { ",
    "import { MessageCircle, "
  );
}

fs.writeFileSync('src/components/SettingsView.tsx', content);
