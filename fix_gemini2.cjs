const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const oldEndpointStart = "// Gemini Chatbot Endpoint";
const apiEndpointsIndex = server.indexOf("app.get('/api/state'");

if (apiEndpointsIndex === -1) {
  console.log("Could not find /api/state");
  process.exit(1);
}

// Find where to replace
const startIndex = server.indexOf(oldEndpointStart);
let endIndex = -1;
if (startIndex !== -1) {
  // Find the next route
  endIndex = server.indexOf("app.get('/api/state'", startIndex);
}

if (startIndex !== -1 && endIndex !== -1) {
  server = server.substring(0, startIndex) + server.substring(endIndex);
}

const geminiEndpoint = `// Gemini Chatbot Endpoint
app.post('/api/gemini/chat', express.json(), async (req, res) => {
  try {
    const { prompt, history } = req.body;
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

    const state = readState();
    const systemInstruction = \`Sen YeşilAI adında, Türkiye Yeşilay Cemiyeti'nin Kamp Yönetim Sistemi (KYS) için tasarlanmış özel, yetenekli ve akıllı bir asistansın.
Kullanıcıların sistem içinde gezinmesine, ayarları değiştirmesine ve bilgi almasına yardımcı olursun.
Daima nazik, profesyonel ve yardımsever bir dil kullan.

Mevcut Eylemler (Kullanıcının isteği yönlendirme veya işlem gerektiriyorsa "action" objesi ile belirtin):
- NAVIGATE: Kullanıcıyı belirli bir sayfaya yönlendirir. Geçerli sekmeler (Payload olarak kullanılacaklar):
  * dashboard (Ana Sayfa)
  * kamp-planlama (Kamp Dönemleri Planlama)
  * bungalov (Bungalov ve Konaklama Yönetimi)
  * katilimci (Katılımcı ve Öğrenci Listesi)
  * kayit (Yeni Kayıt İşlemleri)
  * revir (Sağlık ve Revir Modülü)
  * yemekhane (Yemek Planı ve Stok)
  * teknik (Teknik Operasyonlar ve Arıza)
  * guvenlik (Güvenlik Yönetimi)
  * dokümanlar (Belgeler ve Evraklar)
  * ayarlar (Sistem Ayarları)
  * maliyet (Maliyet ve Bütçe Analizi)
  * anket-analizi (Değerlendirme Anketleri)
  * sistem-loglari (Loglar)
  * dijital-arsiv (Arşiv ve Eski Kayıtlar)
  * olay-kayit (Vaka/Olay Bildirimi)
  * raporlar (Genel Raporlama)
- FULLSCREEN: Tam ekran modunu açar (true) veya kapatır (false).
- THEME: Temayı değiştirir. Değerler: light, dark, system.
- LOCK_SCREEN: Güvenli moda (ekran koruyucu / kilit ekranı) geçer.

Örnek Yanıtlar:
Kullanıcı: "Karanlık moda geç" -> text: "Karanlık moda geçiliyor...", action: { type: "THEME", payload: "dark" }
Kullanıcı: "Tam ekrana geç" -> text: "Tam ekran modu açılıyor.", action: { type: "FULLSCREEN", payload: "true" }
Kullanıcı: "Güvenli mod" -> text: "Sistem güvenli kilit ekranına alınıyor.", action: { type: "LOCK_SCREEN", payload: "" }
Kullanıcı: "Öğrencileri nerede görebilirim?" -> text: "Katılımcılar sayfasından tüm öğrencileri görebilirsiniz, sizi oraya yönlendiriyorum.", action: { type: "NAVIGATE", payload: "katilimci" }

Sistem Verisi (Proje İçi Besleme - Sorulara Buradan Yanıt Ver):
- Toplam Kamp Merkezi: \${state.campCenters?.length || 0} (\${state.campCenters?.map(c=>c.name).join(', ')})
- Toplam Kamp Dönemi: \${state.periods?.length || 0}
- Toplam Kayıtlı Katılımcı: \${state.participants?.length || 0}
- Bungalov Sayısı: \${state.bungalows?.length || 0}
- Revirdeki Olay Sayısı: \${state.healthIncidents?.length || 0}
\`;

    const contents = history && history.length > 0 ? [...history, { role: 'user', parts: [{ text: prompt }] }] : prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "Kullanıcıya gösterilecek dostane ve yardımsever mesaj" },
            action: {
              type: Type.OBJECT,
              description: "Eğer kullanıcının isteği bir eylem gerektiriyorsa doldurulacak alan. Yoksa boş bırakın.",
              properties: {
                type: { type: Type.STRING, description: "Eylem tipi: 'NAVIGATE', 'FULLSCREEN', 'THEME', 'LOCK_SCREEN'" },
                payload: { type: Type.STRING, description: "Eylem parametresi. Örnekler: 'ayarlar', 'dark', 'true'" }
              }
            }
          },
          required: ["text"]
        }
      }
    });

    res.json(JSON.parse(response.text));
  } catch (err) {
    console.error('Gemini API Error:', err);
    res.status(500).json({ error: 'Chatbot şu anda yanıt veremiyor.' });
  }
});

`;

server = server.replace("  // API endpoints", "  // API endpoints\n" + geminiEndpoint);
fs.writeFileSync('server.ts', server);
console.log("Updated endpoint");
