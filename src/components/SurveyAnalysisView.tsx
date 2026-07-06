import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  X, 
  Check, 
  BarChart3, 
  TrendingUp, 
  Download,
  Home, 
  Utensils, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  Users, 
  Info,
  HelpCircle,
  MessageSquare,
  Printer,
  Send,
  Edit2,
  Trash2,
  Plus,
  Eye,
  Settings,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip 
} from 'recharts';

interface SurveyAnalysisViewProps {
  participants: any[];
  periods: any[];
  onNavigateToParticipant?: (participantId: string) => void;
  onAddLog?: (action: string, details: string) => void;
}

const mockSurveyData = [
  {
    id: 1,
    name: 'Selman UTKU',
    camp: 'Antalya / Sarısu Gençlik Kampı',
    period: 'Ağustos - 1. Dönem',
    date: '12 Ağustos 2026',
    genel: 5,
    tesis: 4,
    egitim: 5,
    etkinlik: 5,
    temizlik: 4,
    yemek: 4,
    guvenlik: 5,
    liderler: 5,
    feedback: 'Eğitimler çok verimli geçti, kamp alanının doğası harikaydı. Bungalovlarda temizlik biraz daha sık yapılabilirdi.'
  },
  {
    id: 2,
    name: 'Batuhan Kara',
    camp: 'Antalya / Sarısu Gençlik Kampı',
    period: 'Ağustos - 1. Dönem',
    date: '13 Ağustos 2026',
    genel: 4,
    tesis: 5,
    egitim: 4,
    etkinlik: 4,
    temizlik: 5,
    yemek: 5,
    guvenlik: 4,
    liderler: 5,
    feedback: 'Yemekler çok lezzetliydi, etkinlikler dolu doluydu. Çok memnun kaldım.'
  },
  {
    id: 3,
    name: 'Yiğit Şahin',
    camp: 'Sakarya / Pamukova Gençlik Kampı',
    period: 'Temmuz - 4. Dönem',
    date: '30 Temmuz 2026',
    genel: 5,
    tesis: 5,
    egitim: 5,
    etkinlik: 5,
    temizlik: 5,
    yemek: 5,
    guvenlik: 5,
    liderler: 5,
    feedback: 'Hayatımın en güzel kamp deneyimiydi. Liderlerimiz çok ilgiliydi.'
  },
  {
    id: 4,
    name: 'Test Katılımcı 1',
    camp: 'Sakarya / Pamukova Gençlik Kampı',
    period: 'Temmuz - 4. Dönem',
    date: '28 Temmuz 2026',
    genel: 3,
    tesis: 4,
    egitim: 3,
    etkinlik: 3,
    temizlik: 4,
    yemek: 3,
    guvenlik: 4,
    liderler: 4,
    feedback: 'Eğitim süreleri çok uzundu, biraz daha fazla serbest zaman bırakılabilirdi.'
  },
  {
    id: 5,
    name: 'Test Katılımcı 2',
    camp: 'Antalya / Sarısu Gençlik Kampı',
    period: 'Ağustos - 1. Dönem',
    date: '14 Ağustos 2026',
    genel: 4,
    tesis: 4,
    egitim: 5,
    etkinlik: 5,
    temizlik: 5,
    yemek: 3,
    guvenlik: 5,
    liderler: 5,
    feedback: 'Yemek çeşitliliği biraz daha arttırılabilir. Onun dışında her şey mükemmeldi.'
  }
];

const categoryDetailsMap: { [key: string]: { label: string; key: string; description: string } } = {
  'Tesis': {
    label: 'Tesis & Konaklama',
    key: 'tesis',
    description: 'Bungalovlar, yatak konforu, oda düzeni ve kampın fiziki altyapısı.'
  },
  'Yemek': {
    label: 'Yemekhane & Beslenme',
    key: 'yemek',
    description: 'Yemeklerin porsiyon miktarı, besleyicilik, sıcaklık, lezzet ve servis hijyeni.'
  },
  'Eğitim': {
    label: 'Eğitim Faaliyetleri',
    key: 'egitim',
    description: 'Kişisel gelişim seminerleri, teknoloji atölyeleri ve farkındalık çalışmaları.'
  },
  'Etkinlik': {
    label: 'Sosyal Etkinlikler',
    key: 'etkinlik',
    description: 'Doğa yürüyüşleri, spor turnuvaları, istasyon oyunları ve akşam eğlenceleri.'
  },
  'Güvenlik': {
    label: 'Güvenlik Hizmetleri',
    key: 'guvenlik',
    description: 'Nöbetçi liderler, giriş-çıkış kontrolleri ve acil durumlara müdahale hazırlığı.'
  },
  'Temizlik': {
    label: 'Temizlik & Hijyen',
    key: 'temizlik',
    description: 'Ortak kullanım alanları, tuvalet/duş temizliği ve genel hijyen koşulları.'
  },
  'Liderler': {
    label: 'Lider İletişimi',
    key: 'liderler',
    description: 'Grup liderlerinin güler yüzlülüğü, desteği, empati seviyesi ve rehberliği.'
  }
};

export default function SurveyAnalysisView({ participants, periods, onNavigateToParticipant, onAddLog }: SurveyAnalysisViewProps) {
  const [selectedSurveyDetail, setSelectedSurveyDetail] = useState<any>(null);
  const [filterCamp, setFilterCamp] = useState('Tümü');
  const [activeCategory, setActiveCategory] = useState<string | null>('Tesis'); // Default select Tesis for immediate beautiful visual feedback
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [showPrintWarning, setShowPrintWarning] = useState(false);

  // Extract unique convoy names from participants, filtering out empty values
  const uniqueConvoys = Array.from(
    new Set(
      participants
        ?.map((p) => p.convoyName)
        .filter((name): name is string => typeof name === 'string' && name.trim().length > 0) || []
    )
  );

  const fallbackConvoys = [
    'İstanbul Pendik Genç Yeşilay Kafilesi',
    'Ankara Keçiören Yeşilay Kulübü Kafilesi',
    'İzmir Bornova Genç Yeşilay Grubu',
    'Bursa İnegöl Sağlıklı Yaşam Grubu',
    'Tüm Aktif Katılımcılar',
  ];

  const availableConvoys = uniqueConvoys.length > 0 ? uniqueConvoys : fallbackConvoys;

  // Survey Sending & Customization States
  const [selectedConvoy, setSelectedConvoy] = useState<string>(availableConvoys[0] || 'İstanbul Pendik Genç Yeşilay Kafilesi');
  const [questions, setQuestions] = useState<string[]>([
    "Kamp tesisleri, bungalovlar ve konaklama kalitesini nasıl değerlendiriyorsunuz?",
    "Yemeklerin lezzeti, porsiyon miktarı ve hijyen koşullarından memnun kaldınız mı?",
    "Eğitim faaliyetleri, seminerler ve atölye çalışmalarını faydalı buldunuz mu?",
    "Sosyal etkinlikler, spor turnuvaları ve akşam eğlencelerinden keyif aldınız mı?",
    "Kampın güvenlik önlemleri, nöbetçi liderler ve acil durum hazırlığını nasıl buluyorsunuz?",
    "Ortak alanların, tuvaletlerin ve duşların temizlik seviyesi yeterli miydi?",
    "Grup liderlerinizin sizinle olan iletişimi, ilgisi ve rehberliğinden memnun musunuz?"
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  const [editingQuestionText, setEditingQuestionText] = useState('');
  const [isSendingSurvey, setIsSendingSurvey] = useState(false);
  const [surveySendResult, setSurveySendResult] = useState<{ success: boolean; convoy: string; count: number } | null>(null);

  const handleSendSurvey = () => {
    if (questions.length === 0) {
      alert("Gönderilecek anket için en az 1 soru bulunmalıdır.");
      return;
    }
    
    setIsSendingSurvey(true);
    setSurveySendResult(null);
    
    setTimeout(() => {
      setIsSendingSurvey(false);
      
      let recipientCount = 15;
      if (selectedConvoy.toLowerCase().includes("tüm")) {
        recipientCount = participants?.length || 148;
      } else {
        const count = participants?.filter(p => p.convoyName === selectedConvoy).length || 0;
        recipientCount = count > 0 ? count : Math.floor(Math.random() * 8) + 12;
      }
      
      setSurveySendResult({
        success: true,
        convoy: selectedConvoy,
        count: recipientCount
      });
      
      if (onAddLog) {
        onAddLog(
          'Memnuniyet Anketi Gönderildi', 
          `"${selectedConvoy}" grubundaki ${recipientCount} katılımcıya ${questions.length} soruluk memnuniyet anketi başarıyla gönderildi.`
        );
      }
    }, 1500);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setQuestions([...questions, newQuestionText.trim()]);
    setNewQuestionText('');
    if (onAddLog) {
      onAddLog('Anket Sorusu Eklendi', `Yeni bir memnuniyet sorusu eklendi: "${newQuestionText.trim()}"`);
    }
  };

  const handleDeleteQuestion = (index: number) => {
    const qToRemove = questions[index];
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    if (editingQuestionIndex === index) {
      setEditingQuestionIndex(null);
    }
    if (onAddLog) {
      onAddLog('Anket Sorusu Silindi', `Bir memnuniyet sorusu silindi: "${qToRemove}"`);
    }
  };

  const startEditingQuestion = (index: number) => {
    setEditingQuestionIndex(index);
    setEditingQuestionText(questions[index]);
  };
  
  const saveEditedQuestion = (index: number) => {
    if (!editingQuestionText.trim()) return;
    const updated = [...questions];
    updated[index] = editingQuestionText.trim();
    setQuestions(updated);
    setEditingQuestionIndex(null);
    if (onAddLog) {
      onAddLog('Anket Sorusu Güncellendi', `Soru #${index + 1} güncellendi: "${editingQuestionText.trim()}"`);
    }
  };

  const filteredSurveys = filterCamp === 'Tümü' 
    ? mockSurveyData 
    : mockSurveyData.filter(s => s.camp === filterCamp);

  // Helper to calculate participant's average rating
  const getParticipantAverage = (item: any) => {
    const scores = [item.genel, item.tesis, item.egitim, item.etkinlik, item.temizlik, item.yemek, item.guvenlik, item.liderler];
    const validScores = scores.filter(v => typeof v === 'number');
    if (validScores.length === 0) return '0.0';
    const sum = validScores.reduce((acc, curr) => acc + curr, 0);
    return (sum / validScores.length).toFixed(1);
  };

  // Helper to dynamically calculate stats of a category
  const getCategoryStats = (categoryName: string) => {
    const config = categoryDetailsMap[categoryName];
    if (!config) return { percentage: 0, average: 0, counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, totalCount: 0 };
    const key = config.key;

    let total = 0;
    let count = 0;
    const counts: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    filteredSurveys.forEach(s => {
      const val = s[key as keyof typeof s];
      if (typeof val === 'number') {
        total += val;
        count++;
        if (val >= 1 && val <= 5) {
          counts[val]++;
        }
      }
    });

    const average = count > 0 ? total / count : 0;
    const percentage = count > 0 ? Math.round((average / 5) * 100) : 0;

    return {
      percentage,
      average: parseFloat(average.toFixed(1)),
      counts,
      totalCount: count
    };
  };

  // Build dynamic chart data based on selected camp's surveys
  const dynamicChartData = [
    { name: 'Tesis', 'Memnuniyet (%)': getCategoryStats('Tesis').percentage },
    { name: 'Yemek', 'Memnuniyet (%)': getCategoryStats('Yemek').percentage },
    { name: 'Eğitim', 'Memnuniyet (%)': getCategoryStats('Eğitim').percentage },
    { name: 'Etkinlik', 'Memnuniyet (%)': getCategoryStats('Etkinlik').percentage },
    { name: 'Güvenlik', 'Memnuniyet (%)': getCategoryStats('Güvenlik').percentage },
    { name: 'Temizlik', 'Memnuniyet (%)': getCategoryStats('Temizlik').percentage },
    { name: 'Liderler', 'Memnuniyet (%)': getCategoryStats('Liderler').percentage },
  ];

  const handleDownloadReport = () => {
    let csvContent = "\uFEFF";
    csvContent += "ID;Katılımcı Adı;Kamp Alanı;Dönem;Tarih;Genel Memnuniyet;Tesis Puanı;Eğitim Puanı;Etkinlik Puanı;Temizlik Puanı;Yemek Puanı;Güvenlik Puanı;Liderler Puanı;Geri Bildirim\n";

    filteredSurveys.forEach(survey => {
      const row = [
        survey.id,
        `"${survey.name.replace(/"/g, '""')}"`,
        `"${survey.camp.replace(/"/g, '""')}"`,
        `"${survey.period.replace(/"/g, '""')}"`,
        `"${survey.date.replace(/"/g, '""')}"`,
        survey.genel,
        survey.tesis,
        survey.egitim,
        survey.etkinlik,
        survey.temizlik,
        survey.yemek,
        survey.guvenlik,
        survey.liderler,
        `"${survey.feedback.replace(/"/g, '""')}"`
      ].join(";");
      csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Memnuniyet_Analizi_Raporu_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onAddLog) {
      onAddLog('Memnuniyet Raporu İndirildi', `"${filterCamp}" kamp alanına ait detaylı memnuniyet anketi CSV raporu indirildi.`);
    }
  };

  const handleNameClick = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    if (onNavigateToParticipant) {
      const participant = participants.find(p => p.name === name);
      if (participant) {
        onNavigateToParticipant(participant.id);
      } else {
        alert('Bu katılımcının profil bilgisi sistemde bulunamadı.');
      }
    }
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Tesis':
        return <Home className="w-5 h-5" />;
      case 'Yemek':
        return <Utensils className="w-5 h-5" />;
      case 'Eğitim':
        return <BookOpen className="w-5 h-5" />;
      case 'Etkinlik':
        return <Compass className="w-5 h-5" />;
      case 'Güvenlik':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Temizlik':
        return <Sparkles className="w-5 h-5" />;
      case 'Liderler':
        return <Users className="w-5 h-5" />;
      default:
        return <BarChart3 className="w-5 h-5" />;
    }
  };

  // Calculate the overall camp score based on all answers in currently selected camp
  const calculateOverallCampScore = () => {
    if (filteredSurveys.length === 0) return '0.0';
    let totalAll = 0;
    let countAll = 0;
    filteredSurveys.forEach(s => {
      const scores = [s.genel, s.tesis, s.egitim, s.etkinlik, s.temizlik, s.yemek, s.guvenlik, s.liderler];
      scores.forEach(v => {
        if (typeof v === 'number') {
          totalAll += v;
          countAll++;
        }
      });
    });
    if (countAll === 0) return '0.0';
    return ((totalAll / countAll) * 20).toFixed(1); // convert to 100-scale
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <FileText className="w-7 h-7 text-indigo-600" />
            Memnuniyet Analizi
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Kamp sonu değerlendirme anketleri, katılımcı görüşleri ve memnuniyet analizleri
          </p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setIsPdfModalOpen(true)}
             className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700 transition cursor-pointer"
           >
             <Printer className="w-4 h-4" />
             Rapor
           </button>
           <button 
             onClick={handleDownloadReport}
             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition cursor-pointer"
           >
             <Download className="w-4 h-4" />
             Rapor İndir (Excel/CSV)
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Chart Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  Kategori Bazlı Memnuniyet Dağılımı
                </h3>
              </div>
            </div>
            
            <div className="h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dynamicChartData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 'bold' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dx={-10} domain={[0, 100]} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(79, 70, 229, 0.04)' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }}
                  />
                  <Bar 
                    dataKey="Memnuniyet (%)" 
                    radius={[6, 6, 0, 0]} 
                    barSize={45}
                    onClick={(data) => {
                      if (data && data.name) {
                        setActiveCategory(activeCategory === data.name ? null : data.name);
                      }
                    }}
                  >
                    {dynamicChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={activeCategory === entry.name ? '#10b981' : '#4f46e5'} 
                        className="cursor-pointer hover:opacity-85 transition-opacity"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Click Details Card */}
          {activeCategory && (
            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm animate-in slide-in-from-bottom-2 duration-200">
              <div className="flex justify-between items-start mb-5 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100/50">
                    {getCategoryIcon(activeCategory)}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-gray-900 flex items-center gap-2">
                      {categoryDetailsMap[activeCategory]?.label || activeCategory} Detay Analizi
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {categoryDetailsMap[activeCategory]?.description}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-50 rounded-lg"
                  title="Detayı Kapat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {/* Score Summary Block */}
                <div className="flex flex-col items-center justify-center p-4 bg-indigo-50/30 border border-indigo-100/50 rounded-xl text-center">
                  <span className="text-[10px] font-black text-indigo-650 uppercase tracking-widest">Kategori Ortalaması</span>
                  <div className="mt-2.5 flex items-baseline gap-1">
                    <span className="text-5xl font-black text-indigo-950">{getCategoryStats(activeCategory).average}</span>
                    <span className="text-base font-bold text-indigo-450">/ 5</span>
                  </div>
                  <div className="mt-2 flex gap-0.5 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.round(getCategoryStats(activeCategory).average) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold mt-3">
                    Toplam {getCategoryStats(activeCategory).totalCount} anket değerlendirmesi
                  </span>
                </div>

                {/* Stars Breakdown progress bars */}
                <div className="md:col-span-2 space-y-2.5 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Puan Dağılım Grafiği</span>
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const stats = getCategoryStats(activeCategory);
                    const count = stats.counts[rating] || 0;
                    const percentage = stats.totalCount > 0 ? Math.round((count / stats.totalCount) * 100) : 0;
                    return (
                      <div key={rating} className="flex items-center gap-3 text-xs">
                        <span className="w-12 font-bold text-gray-600 shrink-0 flex items-center gap-1 justify-end">
                          {rating} <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                        </span>
                        <div className="flex-1 h-3 bg-gray-100 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-indigo-600 rounded-lg transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-16 text-right text-gray-500 font-bold shrink-0">{count} kişi ({percentage}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Comments specifically for this category */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span className="text-2xs font-black text-gray-400 uppercase tracking-widest">
                    Katılımcı Yorumları & Bu Kategori Puanları
                  </span>
                </div>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {filteredSurveys.map((survey) => {
                    const catKey = categoryDetailsMap[activeCategory]?.key;
                    const score = survey[catKey as keyof typeof survey];
                    return (
                      <div key={survey.id} className="p-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-150 rounded-xl transition flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span 
                              className="text-xs font-bold text-gray-900 hover:text-indigo-600 hover:underline cursor-pointer"
                              onClick={(e) => handleNameClick(e, survey.name)}
                            >
                              {survey.name}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">• {survey.camp}</span>
                          </div>
                          <p className="text-xs text-gray-600 italic">
                            "{survey.feedback}"
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-1 px-2 py-1 bg-white border border-gray-150 rounded-lg shadow-3xs">
                          <span className="text-xs font-black text-indigo-700">{score}</span>
                          <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Anket Gönderim & Soru Yönetim Portalı */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Send className="w-5 h-5 text-indigo-600 animate-pulse" />
                Anket Gönderim & Soru Yönetim Paneli
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Katılımcı ve kafile gruplarına özel memnuniyet anketleri tasarlayın, canlı önizleyin ve anında gönderin.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left Column: Config & Question CRUD */}
              <div className="xl:col-span-7 space-y-6">
                
                {/* Cohort Group Selection */}
                <div className="space-y-2">
                  <span className="block text-3xs font-extrabold text-gray-400 tracking-wider uppercase">Hedef Kafile / Katılımcı Grubu Seçin</span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <select
                        value={selectedConvoy}
                        onChange={(e) => {
                          setSelectedConvoy(e.target.value);
                          setSurveySendResult(null);
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer font-bold"
                      >
                        {availableConvoys.map((conv, idx) => (
                          <option key={idx} value={conv}>{conv}</option>
                        ))}
                      </select>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-50 border border-indigo-150 rounded-xl text-xs text-indigo-700 font-bold justify-center">
                      <Users className="w-4 h-4 shrink-0" />
                      <span>
                        {selectedConvoy.toLowerCase().includes("tüm") 
                          ? `${participants?.length || 148} Katılımcı` 
                          : `${participants?.filter(p => p.convoyName === selectedConvoy).length || 15} Kişi`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Soru Ekleme Formu */}
                <div className="space-y-2">
                  <span className="block text-3xs font-extrabold text-gray-400 tracking-wider uppercase">Yeni Değerlendirme Sorusu Ekle</span>
                  <form onSubmit={handleAddQuestion} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Örn: Kamp liderlerinin rehberliğini nasıl buluyorsunuz?..."
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Ekle
                    </button>
                  </form>
                </div>

                {/* Soru Düzenleme Listesi */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="block text-3xs font-extrabold text-gray-400 tracking-wider uppercase">Mevcut Anket Soruları ({questions.length})</span>
                    {questions.length === 0 && (
                      <span className="text-3xs text-rose-500 font-bold">Lütfen en az bir soru ekleyin</span>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1 border border-gray-150 rounded-xl p-3 bg-gray-50/50">
                    {questions.map((q, index) => {
                      const isEditing = editingQuestionIndex === index;
                      return (
                        <div key={index} className="transition-all">
                          {isEditing ? (
                            <div className="flex items-center gap-2 bg-white p-2.5 border border-indigo-200 rounded-xl shadow-3xs animate-in fade-in duration-200">
                              <input
                                type="text"
                                value={editingQuestionText}
                                onChange={(e) => setEditingQuestionText(e.target.value)}
                                className="flex-1 px-2.5 py-1.5 border border-indigo-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-indigo-50/5"
                              />
                              <button
                                type="button"
                                onClick={() => saveEditedQuestion(index)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black shadow-3xs shrink-0 cursor-pointer"
                              >
                                Kaydet
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingQuestionIndex(null)}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold shrink-0 cursor-pointer"
                              >
                                İptal
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-3 bg-white p-3 border border-gray-150 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/5 transition-all group shadow-3xs">
                              <div className="flex items-start gap-2.5 min-w-0">
                                <span className="w-5 h-5 shrink-0 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-700 text-[10px] font-black flex items-center justify-center">
                                  {index + 1}
                                </span>
                                <span className="text-xs text-gray-700 font-semibold leading-relaxed">
                                  {q}
                                </span>
                              </div>
                              <div className="flex gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                                <button
                                  type="button"
                                  onClick={() => startEditingQuestion(index)}
                                  className="p-1.5 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 rounded-lg transition cursor-pointer"
                                  title="Soruyu Düzenle"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteQuestion(index)}
                                  className="p-1.5 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition cursor-pointer"
                                  title="Soruyu Sil"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {questions.length === 0 && (
                      <div className="text-center py-8 text-xs text-gray-400 font-bold bg-white rounded-xl border border-dashed border-gray-200">
                        Henüz anket sorusu bulunmuyor. Lütfen yeni bir soru yazıp ekleyin.
                      </div>
                    )}
                  </div>
                </div>

                {/* Dispatch Controls & Status */}
                <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendSurvey}
                    disabled={isSendingSurvey || questions.length === 0}
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSendingSurvey ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                        <span>Anket Dağıtılıyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Anketi Seçilen Gruba Gönder</span>
                      </>
                    )}
                  </button>
                  
                  {surveySendResult && (
                    <div className="flex-1 w-full bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-[11px] text-emerald-800 font-bold leading-relaxed">
                        Anket başarıyla gönderildi! <strong className="text-emerald-950 font-extrabold">{surveySendResult.convoy}</strong> grubundaki <strong className="text-emerald-950 font-extrabold">{surveySendResult.count}</strong> katılımcıya SMS ve sistem bildirimi yoluyla iletildi.
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Interactive Smartphone Mockup Preview */}
              <div className="xl:col-span-5 bg-slate-50 p-4 border border-gray-100 rounded-2xl flex flex-col items-center justify-center min-h-[460px]">
                <div className="flex items-center gap-1.5 mb-4 shrink-0 text-gray-500 self-start">
                  <Eye className="w-4 h-4 text-indigo-500" />
                  <span className="text-3xs font-extrabold tracking-wider uppercase">Mobil Katılımcı Anketi Canlı Önizlemesi</span>
                </div>

                {/* Smartphone Shell Mockup */}
                <div className="w-full max-w-[280px] border-[6px] border-slate-800 rounded-[2.2rem] bg-white p-2.5 shadow-lg relative overflow-hidden flex flex-col h-[420px] transition-all hover:shadow-xl shrink-0">
                  {/* Smartphone camera notch */}
                  <div className="w-20 h-3.5 bg-slate-800 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-10" />
                  
                  {/* Phone Header */}
                  <div className="bg-emerald-700 text-white p-3 rounded-t-[1.6rem] text-center shrink-0 flex flex-col items-center pt-5">
                    <div className="w-6 h-6 mb-1">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M52,15 A35,35 0 1,0 85,68 A28,28 0 1,1 85,32 A35,35 0 0,0 52,15 Z" fill="#10B981" />
                      </svg>
                    </div>
                    <h4 className="text-[9px] font-black tracking-widest uppercase leading-none">T.C. YEŞİLAY CEMİYETİ</h4>
                    <span className="text-[8px] text-emerald-100 font-semibold mt-0.5 leading-none">Gençlik Kampları Değerlendirme Anketi</span>
                  </div>

                  {/* Phone Screen Content - Scrollable */}
                  <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3 bg-slate-50 text-left text-[10px]">
                    <div className="bg-indigo-50 border border-indigo-100 text-center text-[8px] text-indigo-800 font-semibold p-2 rounded-lg leading-relaxed">
                      Sevgili Katılımcı, kamp deneyiminizi iyileştirebilmemiz için lütfen aşağıdaki soruları 1-5 yeşil hilal arası değerlendiriniz.
                    </div>

                    {questions.map((q, idx) => (
                      <div key={idx} className="space-y-1.5 bg-white p-2.5 rounded-lg border border-gray-200/60 shadow-3xs">
                        <div className="font-bold text-gray-800 leading-tight">
                          {idx + 1}. {q}
                        </div>
                        <div className="flex gap-1 justify-start">
                          {[1,2,3,4,5].map((star) => (
                            <svg key={star} viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600 opacity-90 cursor-pointer hover:scale-115 transition-transform shrink-0">
                              <path d="M52,15 A35,35 0 1,0 85,68 A28,28 0 1,1 85,32 A35,35 0 0,0 52,15 Z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="space-y-1 bg-white p-2.5 rounded-lg border border-gray-200/60 shadow-3xs">
                      <label className="font-bold text-gray-800 block">Ek Görüş ve Önerileriniz</label>
                      <textarea 
                        disabled 
                        placeholder="Örn: Yemekler harikaydı, her şey için teşekkürler..." 
                        className="w-full h-14 p-1.5 border border-gray-200 rounded-lg text-[8px] resize-none bg-gray-50 focus:outline-none placeholder-gray-300" 
                      />
                    </div>
                    
                    <button type="button" disabled className="w-full py-2 bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider text-center cursor-not-allowed opacity-90">
                      Değerlendirmeyi Tamamla
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Participant Reviews Grid with minimal layout & average scores */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Katılımcı Görüşleri
              </h3>
              <select
                value={filterCamp}
                onChange={(e) => setFilterCamp(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer font-bold"
              >
                <option value="Tümü">Tüm Kamplar</option>
                <option value="Antalya / Sarısu Gençlik Kampı">Antalya / Sarısu Gençlik Kampı</option>
                <option value="Sakarya / Pamukova Gençlik Kampı">Sakarya / Pamukova Gençlik Kampı</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSurveys.map((item) => {
                const avgScore = getParticipantAverage(item);
                return (
                  <div 
                    key={item.id} 
                    className="bg-white border border-gray-150 rounded-xl p-4 shadow-3xs cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all group flex flex-col justify-between"
                    onClick={() => setSelectedSurveyDetail(item)}
                  >
                    <div className="flex justify-between items-start gap-3 mb-3 pb-3 border-b border-gray-100">
                      <div className="min-w-0">
                        <h4 
                          className="font-bold text-gray-900 text-sm hover:text-indigo-600 hover:underline transition-colors cursor-pointer truncate"
                          onClick={(e) => handleNameClick(e, item.name)}
                        >
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-gray-500 truncate mt-0.5">{item.camp}</p>
                        <p className="text-[9px] text-gray-400 font-medium">{item.period} • {item.date}</p>
                      </div>
                      
                      {/* Compact Average Score Pill */}
                      <div className="flex items-center gap-1 bg-indigo-50/80 border border-indigo-100 text-indigo-700 px-2 py-1 rounded-lg text-xs font-black shadow-3xs shrink-0" title="Ortalama Puan">
                        <span>{avgScore}</span>
                        <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50/60 p-2.5 rounded-lg border border-gray-100/80">
                      <p className="text-xs text-gray-600 italic line-clamp-2 leading-relaxed">
                        "{item.feedback}"
                      </p>
                    </div>
                  </div>
                );
              })}
              {filteredSurveys.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500 text-sm font-medium">
                  Bu kampa ait anket sonucu bulunamadı.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: overall scores and achievements */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-indigo-100 font-medium text-sm mb-1 uppercase tracking-wider">Genel Memnuniyet Skoru</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-black">{calculateOverallCampScore()}</span>
              <span className="text-indigo-200 font-bold">/ 100</span>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center backdrop-blur-sm border border-white/10">
                <span className="text-sm">Toplam Anket Sayısı</span>
                <span className="font-bold text-lg">1,248</span>
              </div>
              <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center backdrop-blur-sm border border-white/10">
                <span className="text-sm">Öneri Bırakan</span>
                <span className="font-bold text-lg">842</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Öne Çıkan Başarılar
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Güvenlik Hizmetleri</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Katılımcıların %98'i güvenlik önlemlerinden çok memnun.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Lider İletişimi</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Liderlerin ilgi ve alakası en yüksek 2. memnuniyet oranına sahip.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Eğitim İçerikleri</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Eğitimlerin kalitesi ve anlaşılırlığı beklentilerin üzerinde.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Survey Detail Modal (All 7 fields included + etkinlik) */}
      {selectedSurveyDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl p-0 w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 bg-indigo-50/50 flex justify-between items-start">
              <div>
                <h3 
                  className="font-bold text-lg text-indigo-950 hover:text-indigo-700 hover:underline cursor-pointer"
                  onClick={(e) => handleNameClick(e, selectedSurveyDetail.name)}
                >
                  {selectedSurveyDetail.name}
                </h3>
                <p className="text-xs text-indigo-700 font-bold">{selectedSurveyDetail.camp}</p>
                <p className="text-[10px] text-indigo-600 font-medium mt-0.5">{selectedSurveyDetail.period} • {selectedSurveyDetail.date}</p>
              </div>
              <button onClick={() => setSelectedSurveyDetail(null)} className="text-gray-400 hover:text-gray-600 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-gray-900">Genel Memnuniyet Derecesi</h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className={`w-4 h-4 ${i < selectedSurveyDetail.genel ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600">Tesis & Konaklama</span>
                  <span className="font-black text-indigo-600 text-sm">{selectedSurveyDetail.tesis}/5</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600">Yemekhane</span>
                  <span className="font-black text-indigo-600 text-sm">{selectedSurveyDetail.yemek}/5</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600">Eğitimler</span>
                  <span className="font-black text-indigo-600 text-sm">{selectedSurveyDetail.egitim}/5</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600">Sosyal Etkinlikler</span>
                  <span className="font-black text-indigo-600 text-sm">{selectedSurveyDetail.etkinlik || 5}/5</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600">Temizlik</span>
                  <span className="font-black text-indigo-600 text-sm">{selectedSurveyDetail.temizlik}/5</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600">Güvenlik</span>
                  <span className="font-black text-indigo-600 text-sm">{selectedSurveyDetail.guvenlik}/5</span>
                </div>
                <div className="col-span-2 bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600">Lider İletişimi & Yaklaşımı</span>
                  <span className="font-black text-indigo-600 text-sm">{selectedSurveyDetail.liderler}/5</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-100 pb-2">Katılımcı Görüşü ve Öneriler</h4>
                <p className="text-sm text-gray-700 bg-white border border-gray-200 p-4 rounded-xl leading-relaxed italic shadow-sm">
                  "{selectedSurveyDetail.feedback}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Report Preview Modal */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <div className="bg-slate-100 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col my-8">
            {/* Modal Toolbar */}
            <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-gray-800">Rapor</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.self !== window.top) {
                      setShowPrintWarning(true);
                    } else {
                      window.print();
                    }
                    if (onAddLog) {
                      onAddLog('Rapor Yazdırıldı', `"${filterCamp}" kamp alanına ait memnuniyet analizi resmi raporu yazdırıldı veya PDF olarak kaydedildi.`);
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Yazdır / PDF Kaydet
                </button>
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md transition cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Excel/CSV İndir
                </button>
                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="p-2 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-xl transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable container displaying the document styled like an A4 page */}
            <div className="p-8 overflow-y-auto max-h-[85vh] flex justify-center bg-slate-200">
              {/* CSS block specifically injected to style print outputs */}
              <style>{`
                @media print {
                  /* Hide all default web elements including headers, sidebars, modallers */
                  body * {
                    visibility: hidden !important;
                  }
                  #root, .fixed, .bg-black\\/60, .backdrop-blur-xs {
                    display: none !important;
                  }
                  /* Make ONLY the A4 report block visible at print time */
                  #pdf-report-print-area-outer, #pdf-report-print-area-outer * {
                    visibility: visible !important;
                  }
                  #pdf-report-print-area-outer {
                    display: block !important;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 210mm;
                    height: auto;
                    background: white !important;
                    color: black !important;
                    box-shadow: none !important;
                    border: none !important;
                    padding: 20mm !important;
                    margin: 0 !important;
                  }
                  /* Force black-on-white text printing and background fills */
                  * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                  }
                }
              `}</style>

              <div 
                id="pdf-report-print-area-outer" 
                className="w-[210mm] min-h-[297mm] bg-white p-[15mm] md:p-[20mm] shadow-xl rounded-sm border border-gray-300 text-gray-900 font-sans text-left relative"
              >
                {/* Official Crescent Header */}
                <div className="border-b-4 border-emerald-800 pb-5 mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {/* Green Crescent Official SVG */}
                    <div className="w-14 h-14 shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M52,15 A35,35 0 1,0 85,68 A28,28 0 1,1 85,32 A35,35 0 0,0 52,15 Z" fill="#00AB41" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-sm font-black tracking-widest text-emerald-950 uppercase leading-tight">
                        T.C. YEŞİLAY CEMİYETİ
                      </h1>
                      <h2 className="text-xs font-bold text-emerald-850 uppercase tracking-wider">
                        GENÇLİK KAMPLARI GENEL KOORDİNATÖRLÜĞÜ
                      </h2>
                      <p className="text-[10px] text-gray-500 font-semibold mt-0.5">
                        Kamp Operasyonları Yönetim ve Analiz Birimi
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-gray-500 space-y-0.5">
                    <p className="font-bold">KOD: YEK-MEMNUN-2026</p>
                    <p>TARİH: {new Date().toLocaleDateString('tr-TR')}</p>
                    <p>STATÜ: RESMİ ANALİZ RAPORU</p>
                  </div>
                </div>

                {/* Report Title Banner */}
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-lg mb-6">
                  <h3 className="text-base font-black text-emerald-950 uppercase tracking-wide">
                    Rapor
                  </h3>
                  <p className="text-xs text-emerald-850 mt-1">
                    Aktif Kamp Alanı Filtresi: <strong className="text-emerald-950 font-black">{filterCamp}</strong>
                  </p>
                </div>

                {/* Metadata & Key Metrics Overview Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">ÖRNEKLEM BOYUTU</span>
                    <span className="text-xl font-black text-gray-900 mt-1 block">{filteredSurveys.length} Katılımcı</span>
                    <span className="text-[9px] text-gray-500 mt-0.5 block">Doldurulan Değerlendirme Anketi</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 col-span-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">GENEL KAMP MEMNUNİYET SKORU</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-black text-emerald-700">{calculateOverallCampScore()}</span>
                      <span className="text-xs font-bold text-gray-500">/ 100</span>
                      <span className="text-xs text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-black ml-2">
                        {parseFloat(calculateOverallCampScore()) >= 90 ? 'Mükemmel' : 'Çok Başarılı'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Categories Table (Official document style) */}
                <div className="mb-6">
                  <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-3 border-b border-gray-200 pb-1">
                    1. KATEGORİ BAZLI DETAYLI MEMNUNİYET ANALİZİ
                  </h4>
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                        <th className="p-2 border-r border-gray-200">Değerlendirme Kategorisi</th>
                        <th className="p-2 text-center border-r border-gray-200">Memnuniyet Oranı (%)</th>
                        <th className="p-2 text-center border-r border-gray-200">Ortalama Puan (5 Üzerinden)</th>
                        <th className="p-2">Hizmet Seviyesi / Yorum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dynamicChartData.map((category) => {
                        const stats = getCategoryStats(category.name);
                        return (
                          <tr key={category.name} className="border-b border-gray-200 hover:bg-gray-50/50">
                            <td className="p-2 font-bold border-r border-gray-200 flex items-center gap-2">
                              {categoryDetailsMap[category.name]?.label || category.name}
                            </td>
                            <td className="p-2 text-center font-bold text-emerald-700 border-r border-gray-200">
                              {stats.percentage}%
                            </td>
                            <td className="p-2 text-center font-black text-gray-950 border-r border-gray-200">
                              {stats.average} / 5
                            </td>
                            <td className="p-2 text-gray-500 text-[10px]">
                              {stats.average >= 4.5 ? 'Yüksek Başarı Seviyesi' : stats.average >= 4.0 ? 'Yeterli / Başarılı' : 'Geliştirilmesi Önerilir'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Participant Feedbacks / Comments Section */}
                <div className="mb-8">
                  <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-3 border-b border-gray-200 pb-1">
                    2. SEÇİLMİŞ KATILIMCI GÖRÜŞLERİ VE ANALİZ BİLGİLERİ
                  </h4>
                  <div className="space-y-3">
                    {filteredSurveys.slice(0, 6).map((item, idx) => {
                      const avg = getParticipantAverage(item);
                      return (
                        <div key={item.id} className="p-3 bg-gray-50 rounded-lg border border-gray-150 text-xs">
                          <div className="flex justify-between items-center mb-1 font-bold text-gray-900">
                            <span>{idx + 1}. {item.name} <span className="font-normal text-gray-400 text-[10px]">({item.camp})</span></span>
                            <span className="text-emerald-700 font-extrabold px-1.5 py-0.5 bg-emerald-50 border border-emerald-150 rounded">
                              Ortalama Puan: {avg} / 5
                            </span>
                          </div>
                          <p className="text-gray-600 italic">"{item.feedback}"</p>
                          <div className="text-[10px] text-gray-400 mt-1 flex gap-3">
                            <span>Dönem: {item.period}</span>
                            <span>Tarih: {item.date}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Professional Signature Block (Essential for official reports) */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                  <div className="flex justify-center text-center text-xs">
                    <div className="space-y-12 w-64">
                      <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">RAPORU HAZIRLAYAN</p>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Selman UTKU</p>
                        <p className="text-[10px] text-gray-400 mt-1 italic">İmza / Tarih</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Footer message */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-[9px] text-gray-400 font-medium">
                  Bu belge dijital olarak Yeşilay Gençlik Kampları Otomasyon Sistemi tarafından üretilmiştir.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Warning Modal for iframe */}
      {showPrintWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-gray-900">PDF Rapor Oluşturma</h3>
            <p className="text-sm text-gray-600">
              Uygulama şu anda önizleme modunda (iframe) çalışmaktadır. Memnuniyet analizi raporunu tam sayfa resmi PDF veya yazıcı çıktısı olarak alabilmek için lütfen uygulamayı <strong>yeni bir sekmede</strong> açınız.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setShowPrintWarning(false)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition cursor-pointer"
              >
                Anladım, Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
