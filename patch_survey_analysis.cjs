const fs = require('fs');
let code = fs.readFileSync('src/components/SurveyAnalysisView.tsx', 'utf-8');

// 1. Rename the button
code = code.replace(
  'Yeni Anket Gönder',
  'Anket Gönder & Soru Yönetimi'
);

// 2. Add sub-metrics to categoryDetailsMap
const targetCategories = `const categoryDetailsMap: { [key: string]: { label: string; key: string; description: string; icon: any; color: string } } = {`;
const replacementCategories = `const categoryDetailsMap: { [key: string]: { label: string; key: string; description: string; icon: any; color: string; subMetrics: {name: string, score: number}[] } } = {
  'Tesis': { label: 'Tesis & Konaklama', key: 'tesis', description: 'Bungalovlar, yatak konforu, oda düzeni ve kampın fiziki altyapısı.', icon: Home, color: 'text-blue-500 bg-blue-50', subMetrics: [{name: 'Bungalov Temizliği', score: 4.2}, {name: 'Yatak Konforu', score: 4.5}, {name: 'Oda Düzeni', score: 4.1}] },
  'Yemek': { label: 'Yemekhane & Beslenme', key: 'yemek', description: 'Yemeklerin porsiyon miktarı, besleyicilik, sıcaklık, lezzet ve servis hijyeni.', icon: Utensils, color: 'text-orange-500 bg-orange-50', subMetrics: [{name: 'Lezzet', score: 4.3}, {name: 'Porsiyon', score: 4.0}, {name: 'Çeşitlilik', score: 3.8}] },
  'Eğitim': { label: 'Eğitim Faaliyetleri', key: 'egitim', description: 'Kişisel gelişim seminerleri, teknoloji atölyeleri ve farkındalık çalışmaları.', icon: BookOpen, color: 'text-indigo-500 bg-indigo-50', subMetrics: [{name: 'İçerik Kalitesi', score: 4.6}, {name: 'Eğitmen İletişimi', score: 4.8}, {name: 'Süre Yeterliliği', score: 4.2}] },
  'Etkinlik': { label: 'Sosyal Etkinlikler', key: 'etkinlik', description: 'Doğa yürüyüşleri, spor turnuvaları, istasyon oyunları ve akşam eğlenceleri.', icon: Compass, color: 'text-pink-500 bg-pink-50', subMetrics: [{name: 'Eğlence Düzeyi', score: 4.7}, {name: 'Çeşitlilik', score: 4.5}, {name: 'Katılım Oranı', score: 4.4}] },
  'Güvenlik': { label: 'Güvenlik Hizmetleri', key: 'guvenlik', description: 'Nöbetçi liderler, giriş-çıkış kontrolleri ve acil durumlara müdahale hazırlığı.', icon: ShieldCheck, color: 'text-red-500 bg-red-50', subMetrics: [{name: 'Nöbetçi Liderler', score: 4.9}, {name: 'Acil Durum Hazırlığı', score: 4.8}, {name: 'Giriş-Çıkış Kontrolü', score: 4.6}] },
  'Temizlik': { label: 'Temizlik & Hijyen', key: 'temizlik', description: 'Ortak kullanım alanları, tuvalet/duş temizliği ve genel hijyen koşulları.', icon: Sparkles, color: 'text-teal-500 bg-teal-50', subMetrics: [{name: 'Tuvalet/Duş', score: 3.9}, {name: 'Ortak Alanlar', score: 4.2}, {name: 'Genel Hijyen', score: 4.0}] },
  'Liderler': { label: 'Lider İletişimi', key: 'liderler', description: 'Grup liderlerinin güler yüzlülüğü, desteği, empati seviyesi ve rehberliği.', icon: Users, color: 'text-emerald-500 bg-emerald-50', subMetrics: [{name: 'İletişim & Empati', score: 4.9}, {name: 'Rehberlik', score: 4.8}, {name: 'Problem Çözme', score: 4.7}] }
};`;

if(code.includes(targetCategories)){
    code = code.replace(
      /const categoryDetailsMap: \{ \[key: string\]: \{ label: string; key: string; description: string; icon: any; color: string \} \} = \{[\s\S]*?\};\n/,
      replacementCategories + '\n'
    );
    fs.writeFileSync('src/components/SurveyAnalysisView.tsx', code);
    console.log("Patched Categories!");
} else {
    console.log("Categories target not found!");
}
