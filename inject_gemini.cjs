const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf8');

if (!server.includes('GoogleGenAI')) {
  server = server.replace(
    "import { createServer as createViteServer } from 'vite';",
    "import { createServer as createViteServer } from 'vite';\nimport { GoogleGenAI, Type } from '@google/genai';"
  );
  
  const geminiEndpoint = `
// Gemini Chatbot Endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { prompt, history } = req.body;
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

    const systemInstruction = \`Sen YeşilAI adında, Türkiye Yeşilay Cemiyeti'nin Kamp Yönetim Sistemi (KYS) için tasarlanmış özel bir akıllı asistansın.
Kullanıcıların sistem içinde gezinmesine, ayarları değiştirmesine ve bilgi almasına yardımcı olursun.
Daima nazik, profesyonel ve yardımsever bir dil kullan.

Mevcut eylemler:
- NAVIGATE: Kullanıcıyı belirli bir sayfaya yönlendirir. Geçerli sekmeler: dashboard, kamp-planlama, bungalov, katilimci, kayit, revir, yemekhane, teknik, guvenlik, dokümanlar, ayarlar, maliyet, anket-analizi, sistem-loglari, dijital-arsiv, olay-kayit, raporlar, sistem-guncellemeleri.
- FULLSCREEN: Tam ekran modunu açar (true) veya kapatır (false).
- THEME: Temayı değiştirir. Değerler: light, dark, system.
- LOCK_SCREEN: Güvenli moda (ekran koruyucu / kilit ekranı) geçer.\`;

    const contents = history ? [...history, { role: 'user', parts: [{ text: prompt }] }] : prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
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
              description: "Eğer kullanıcının isteği bir eylem gerektiriyorsa doldurulacak alan.",
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

  server = server.replace(
    "// API routes",
    "// API routes\n" + geminiEndpoint
  );

  fs.writeFileSync('server.ts', server);
  console.log("Gemini API endpoint injected.");
} else {
  console.log("GoogleGenAI already imported.");
}
