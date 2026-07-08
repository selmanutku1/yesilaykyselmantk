const fs = require('fs');

let content = fs.readFileSync('SUNUM_REHBERI.md', 'utf8');

const registrationText = `## Slayt 5: Kayıt ve Katılımcı Yönetimi
**Görsel:** \`RegistrationView\` veya \`ParticipantView\` ekranının görüntüsü.
**Başlık:** Kayıt, Muvafakatname ve Katılımcı Operasyonları
**Metinler:**
- Kampa gelen misafirlerin hızlı kayıt ve kabul süreçleri.
- **Dijital Muvafakatname (Canvas İmza):** Taahhütnamelerin dijital ekranda imza atılarak alınması (Kağıtsız kampüs).
- Katılımcı listeleri, demografik dağılımlar ve iletişim bilgileri.
- Bungalov/Oda atamalarının hızlıca yapılması (\`BungalowView\` entegrasyonu).`;

content = content.replace(/## Slayt 5: Kayıt ve Katılımcı Yönetimi[\s\S]*?\(\`BungalowView\` entegrasyonu\)\./, registrationText);


const whatsappText = `## Slayt 12: İletişim ve Otomatik Bildirim Altyapısı (WhatsApp)
**Görsel:** \`SettingsView\` içindeki WhatsApp panelinin veya katılımcı profilindeki WhatsApp gönderme butonunun görüntüsü.
**Başlık:** WhatsApp Bildirim Altyapısı
**Metinler:**
- Katılımcılara ve kafile sorumlularına otomatik WhatsApp mesajları.
- Etkinlik bildirimleri, başvuru onayları ve oda ataması hatırlatmaları.
- Katılımcı profilinden tek tıkla doğrudan WhatsApp Web başlatma yeteneği.

---

## Slayt 13: Teşekkür ve Kapanış`;

content = content.replace("## Slayt 12: Teşekkür ve Kapanış", whatsappText);

fs.writeFileSync('SUNUM_REHBERI.md', content);
