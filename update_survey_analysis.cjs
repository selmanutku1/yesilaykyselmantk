const fs = require('fs');

const content = `import React, { useState } from 'react';
import { 
  BarChart3, PieChart as PieChartIcon, Download, Users, Star, Trees, Droplets, CheckCircle, Search, FileText, X, MessageSquare
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend
} from 'recharts';
import KampSonuDegerlendirmeRaporu from './KampSonuDegerlendirmeRaporu';

interface SurveyAnalysisViewProps {
  participants: any[];
  periods: any[];
  onNavigateToParticipant?: (participantId: string) => void;
  onAddLog?: (action: string, details: string) => void;
}

const mockResponses = [
  {
    id: 1, name: "Ahmet Yılmaz", date: "2026-08-15",
    q1: "Gençlik Kampı", q2: "İlk ziyaretim", q3: "3-5 gün", q4: 5,
    q5: { "Konaklama alanları": 4, "Yemekhane ve beslenme": 5, "Temizlik ve hijyen": 4, "Kamp çalışanlarının ilgisi": 5, "Güvenlik önlemleri": 5, "Etkinlik çeşitliliği": 4, "Spor imkanları": 4, "Doğal alanların kullanımı": 5 },
    q6: "Çok iyi",
    q7: { "Göl manzarası ve atmosfer": 5, "Göl çevresi yürüyüş alanları": 4, "Dinlenme noktaları": 4, "Fotoğraf alanları": 5, "Doğa ile etkileşim": 5 },
    q8: "Çok iyi",
    comment: "Göl manzarası harikaydı, yemekler çok lezzetliydi."
  },
  {
    id: 2, name: "Zeynep Kaya", date: "2026-08-16",
    q1: "Çocuk Kampı", q2: "2-3 kez", q3: "1 hafta ve üzeri", q4: 4,
    q5: { "Konaklama alanları": 5, "Yemekhane ve beslenme": 3, "Temizlik ve hijyen": 5, "Kamp çalışanlarının ilgisi": 4, "Güvenlik önlemleri": 5, "Etkinlik çeşitliliği": 5, "Spor imkanları": 4, "Doğal alanların kullanımı": 4 },
    q6: "İyi",
    q7: { "Göl manzarası ve atmosfer": 4, "Göl çevresi yürüyüş alanları": 5, "Dinlenme noktaları": 3, "Fotoğraf alanları": 4, "Doğa ile etkileşim": 4 },
    q8: "İyi",
    comment: "Çocuklar için etkinlikler çok çeşitliydi, ancak yemek porsiyonları biraz daha büyük olabilirdi."
  },
  {
    id: 3, name: "Mehmet Demir", date: "2026-08-17",
    q1: "Gençlik Kampı", q2: "İlk ziyaretim", q3: "3-5 gün", q4: 5,
    q5: { "Konaklama alanları": 4, "Yemekhane ve beslenme": 5, "Temizlik ve hijyen": 5, "Kamp çalışanlarının ilgisi": 5, "Güvenlik önlemleri": 4, "Etkinlik çeşitliliği": 5, "Spor imkanları": 5, "Doğal alanların kullanımı": 5 },
    q6: "Çok iyi",
    q7: { "Göl manzarası ve atmosfer": 5, "Göl çevresi yürüyüş alanları": 5, "Dinlenme noktaları": 4, "Fotoğraf alanları": 5, "Doğa ile etkileşim": 5 },
    q8: "Çok iyi",
    comment: "Kamp çalışanları çok ilgiliydi, orman yürüyüşleri unutulmazdı."
  },
  {
    id: 4, name: "Ayşe Çelik", date: "2026-08-18",
    q1: "Aile Kampı", q2: "4 ve üzeri", q3: "1-2 gün", q4: 3,
    q5: { "Konaklama alanları": 3, "Yemekhane ve beslenme": 4, "Temizlik ve hijyen": 3, "Kamp çalışanlarının ilgisi": 4, "Güvenlik önlemleri": 4, "Etkinlik çeşitliliği": 3, "Spor imkanları": 3, "Doğal alanların kullanımı": 4 },
    q6: "Orta",
    q7: { "Göl manzarası ve atmosfer": 4, "Göl çevresi yürüyüş alanları": 3, "Dinlenme noktaları": 3, "Fotoğraf alanları": 3, "Doğa ile etkileşim": 3 },
    q8: "Orta",
    comment: "Kısa bir kamp oldu, bungalov temizliği biraz daha iyi olabilirdi."
  },
  {
    id: 5, name: "Ali Can", date: "2026-08-19",
    q1: "Gençlik Kampı", q2: "2-3 kez", q3: "3-5 gün", q4: 4,
    q5: { "Konaklama alanları": 5, "Yemekhane ve beslenme": 4, "Temizlik ve hijyen": 5, "Kamp çalışanlarının ilgisi": 5, "Güvenlik önlemleri": 5, "Etkinlik çeşitliliği": 4, "Spor imkanları": 4, "Doğal alanların kullanımı": 4 },
    q6: "İyi",
    q7: { "Göl manzarası ve atmosfer": 5, "Göl çevresi yürüyüş alanları": 4, "Dinlenme noktaları": 4, "Fotoğraf alanları": 4, "Doğa ile etkileşim": 4 },
    q8: "Çok iyi",
    comment: "Genel olarak güzeldi, göl manzarasına karşı sabah yürüyüşleri harikaydı."
  }
];

// Helper to calculate average for an object property
const getAverage = (key: string) => {
  const sum = mockResponses.reduce((acc, curr) => acc + (curr.q5[key as keyof typeof curr.q5] || 0), 0);
  return (sum / mockResponses.length).toFixed(1);
};

const getLakeAverage = (key: string) => {
  const sum = mockResponses.reduce((acc, curr) => acc + (curr.q7[key as keyof typeof curr.q7] || 0), 0);
  return (sum / mockResponses.length).toFixed(1);
};

const colors = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#047857', '#065f46', '#064e3b'];

export default function SurveyAnalysisView({ participants, periods, onAddLog }: SurveyAnalysisViewProps) {
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);

  const q1Data = [
    { name: 'Gençlik Kampı', value: mockResponses.filter(r => r.q1 === 'Gençlik Kampı').length },
    { name: 'Çocuk Kampı', value: mockResponses.filter(r => r.q1 === 'Çocuk Kampı').length },
    { name: 'Aile Kampı', value: mockResponses.filter(r => r.q1 === 'Aile Kampı').length },
  ];

  const q5Data = [
    { name: 'Konaklama', avg: parseFloat(getAverage('Konaklama alanları')) },
    { name: 'Yemekhane', avg: parseFloat(getAverage('Yemekhane ve beslenme')) },
    { name: 'Temizlik', avg: parseFloat(getAverage('Temizlik ve hijyen')) },
    { name: 'İlgi', avg: parseFloat(getAverage('Kamp çalışanlarının ilgisi')) },
    { name: 'Güvenlik', avg: parseFloat(getAverage('Güvenlik önlemleri')) },
    { name: 'Etkinlik', avg: parseFloat(getAverage('Etkinlik çeşitliliği')) },
    { name: 'Spor', avg: parseFloat(getAverage('Spor imkanları')) },
    { name: 'Doğa', avg: parseFloat(getAverage('Doğal alanların kullanımı')) },
  ];

  const q7Data = [
    { name: 'Manzara', avg: parseFloat(getLakeAverage('Göl manzarası ve atmosfer')) },
    { name: 'Yürüyüş', avg: parseFloat(getLakeAverage('Göl çevresi yürüyüş alanları')) },
    { name: 'Dinlenme', avg: parseFloat(getLakeAverage('Dinlenme noktaları')) },
    { name: 'Fotoğraf', avg: parseFloat(getLakeAverage('Fotoğraf alanları')) },
    { name: 'Etkileşim', avg: parseFloat(getLakeAverage('Doğa ile etkileşim')) },
  ];

  const overalAverage = (mockResponses.reduce((acc, curr) => acc + curr.q4, 0) / mockResponses.length).toFixed(1);

  if (showReportForm) {
    return (
      <div className="space-y-4">
        <button onClick={() => setShowReportForm(false)} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
           Geri Dön
        </button>
        <KampSonuDegerlendirmeRaporu />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Değerlendirme Raporları</h2>
          <p className="text-sm text-gray-500 mt-1">Kamp sonu değerlendirme anketlerinin genel analiz ve detayları.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowReportForm(true)} className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Anket Formunu Gör
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            PDF Rapor Al
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Toplam Katılım</p>
            <p className="text-2xl font-black text-gray-900">{mockResponses.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Genel Memnuniyet</p>
            <p className="text-2xl font-black text-gray-900">{overalAverage} <span className="text-sm text-gray-400">/ 5.0</span></p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Göl Deneyimi</p>
            <p className="text-2xl font-black text-gray-900">{q7Data[0].avg} <span className="text-sm text-gray-400">/ 5.0</span></p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
            <Trees className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Doğa Deneyimi</p>
            <p className="text-xl font-black text-gray-900">Çok İyi</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-800">Tesis ve Hizmet Memnuniyeti (Ortalama Puanlar)</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={q5Data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="avg" fill="#059669" radius={[6, 6, 0, 0]}>
                  {q5Data.map((entry, index) => (
                    <Cell key={\`cell-\${index}\`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics Pie */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <PieChartIcon className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-800">Kamp Türü Dağılımı</h3>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={q1Data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {q1Data.map((entry, index) => (
                    <Cell key={\`cell-\${index}\`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Lake Experience Bar Chart */}
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Droplets className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-gray-800">Göl Alanı Deneyimi</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={q7Data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" domain={[0, 5]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4b5563' }} width={80} />
                <Tooltip cursor={{ fill: '#f9fafb' }} />
                <Bar dataKey="avg" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Individual Feedback List */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[350px]">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4 shrink-0">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-800">Öne Çıkan Yorumlar</h3>
          </div>
          <div className="overflow-y-auto pr-2 space-y-4 flex-1 scrollbar-thin scrollbar-thumb-gray-200">
            {mockResponses.map(res => (
              <div key={res.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors" onClick={() => setSelectedResponse(res)}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-sm text-gray-900">{res.name}</p>
                    <p className="text-xs text-gray-500">{res.q1} • {res.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({length: res.q4}).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic line-clamp-2">"{res.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Response Detail Modal */}
      {selectedResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm" onClick={() => setSelectedResponse(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 text-lg">Değerlendirme Detayı</h3>
              <button onClick={() => setSelectedResponse(null)} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-lg">
                  {selectedResponse.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-lg">{selectedResponse.name}</h4>
                  <p className="text-sm text-gray-500">{selectedResponse.q1} • {selectedResponse.date} • {selectedResponse.q2}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Genel Memnuniyet</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({length: 5}).map((_, i) => (
                        <Star key={i} className={\`w-5 h-5 \${i < selectedResponse.q4 ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}\`} />
                      ))}
                    </div>
                    <span className="font-bold text-gray-800">{selectedResponse.q4} / 5</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Doğa Deneyimi</p>
                  <p className="font-bold text-emerald-700">{selectedResponse.q6} / {selectedResponse.q8}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Hizmet Puanları (1-5)</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(selectedResponse.q5).map(([key, val]) => (
                    <div key={key} className="bg-white border border-gray-100 p-3 rounded-lg text-center shadow-sm">
                      <p className="text-[10px] font-bold text-gray-500 line-clamp-1 mb-1" title={key}>{key}</p>
                      <p className="text-lg font-black text-emerald-600">{val as number}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Göl Alanı Puanları (1-5)</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(selectedResponse.q7).map(([key, val]) => (
                    <div key={key} className="bg-blue-50/50 border border-blue-100 p-2 rounded-lg text-center">
                      <p className="text-[9px] font-bold text-blue-600/70 line-clamp-2 mb-1 leading-tight" title={key}>{key}</p>
                      <p className="text-base font-black text-blue-700">{val as number}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedResponse.comment && (
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <p className="text-xs font-bold text-emerald-800 uppercase mb-2 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> Yorum ve Açıklama
                  </p>
                  <p className="text-sm text-emerald-900 leading-relaxed italic">"{selectedResponse.comment}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync('src/components/SurveyAnalysisView.tsx', content);
