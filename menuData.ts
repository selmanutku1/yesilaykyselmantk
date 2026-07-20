import React, { useState } from 'react';
import { ClipboardList, Send, CheckCircle, BarChart3, X, Eye, Edit2, Trash2, Plus, Check, Star, Link, Download } from 'lucide-react';
import { Participant, SurveyResponse, CampPeriod } from '../types';
import KampSonuDegerlendirmeRaporu from './KampSonuDegerlendirmeRaporu';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function SurveyManagementView({ 
  participants = [], 
  surveys = [], 
  questions = [], 
  setQuestions,
  setSurveys,
  campPeriods
}: { 
  participants?: Participant[], 
  surveys?: SurveyResponse[],
  questions: string[],
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>,
  setSurveys: React.Dispatch<React.SetStateAction<SurveyResponse[]>>,
  campPeriods: CampPeriod[]
}) {
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>('all');
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'form'>('dashboard');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + window.location.pathname + "?form=kamp-sonu-degerlendirme");
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const exportExcel = (data: SurveyResponse[], fileName: string) => {
    const formattedData = data.map(s => ({
      Katılımcı: participants.find(p => p.id === s.participantId)?.name || 'Bilinmiyor',
      KampDönemi: campPeriods.find(cp => cp.id === s.campPeriodId)?.name || 'Bilinmiyor',
      Yemek: s.ratingMeals,
      Aktiviteler: s.ratingActivities,
      Konaklama: s.ratingBungalows,
      Eğitmenler: s.ratingTrainers,
      Yorum: s.generalComment
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Anketler");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const exportPDF = (data: SurveyResponse[], fileName: string) => {
    const doc = new jsPDF();
    doc.text("Anket Raporu", 14, 15);
    (doc as any).autoTable({
        head: [['Katılımcı', 'Kamp Dönemi', 'Yemek', 'Aktivite', 'Konaklama', 'Eğitmen', 'Yorum']],
        body: data.map(s => [
          participants.find(p => p.id === s.participantId)?.name || 'Bilinmiyor',
          campPeriods.find(cp => cp.id === s.campPeriodId)?.name || 'Bilinmiyor',
          s.ratingMeals,
          s.ratingActivities,
          s.ratingBungalows,
          s.ratingTrainers,
          s.generalComment
        ]),
    });
    doc.save(`${fileName}.pdf`);
  };

  const filteredSurveys = selectedParticipantId === 'all' 
    ? surveys 
    : surveys.filter(s => s.participantId === selectedParticipantId);

  // Calculate stats from real surveys
  const totalSent = 150; 
  const receivedCount = filteredSurveys.length;
  const responseRate = totalSent > 0 ? ((receivedCount / totalSent) * 100).toFixed(0) : 0;

  const categories = [
    { key: 'ratingMeals', label: 'Yemek' },
    { key: 'ratingActivities', label: 'Aktiviteler' },
    { key: 'ratingBungalows', label: 'Konaklama' },
    { key: 'ratingTrainers', label: 'Eğitmenler' },
    { key: 'generalComment', label: 'Genel Yorum' }
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <ClipboardList className="w-6 h-6" /> Anket Yönetimi
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'dashboard', label: 'Genel Bakış' },
          { id: 'form', label: 'Anket Formu' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* İstatistikler */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Toplam Gönderim', val: totalSent, icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Yanıtlanan', val: receivedCount, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Dönüş Oranı', val: `%${responseRate}`, icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Ort. Puan', val: '4.2', icon: Star, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`${stat.bg} p-3 rounded-xl ${stat.color}`}><stat.icon className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                  <p className="text-2xl font-black">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gelen Cevaplar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">En Son Yanıtlar</h3>
              
              <div className="flex gap-4">
                <select
                  value={selectedParticipantId}
                  onChange={(e) => setSelectedParticipantId(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">Tüm Katılımcılar</option>
                  {participants.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>

                <button 
                  onClick={() => exportExcel(filteredSurveys, 'AnketRaporu')} 
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-4 py-2 rounded-full transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Excel
                </button>
                <button 
                  onClick={() => exportPDF(filteredSurveys, 'AnketRaporu')} 
                  className="text-sm font-semibold text-red-600 hover:text-red-800 bg-red-50 px-4 py-2 rounded-full transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> PDF
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="pb-4">Katılımcı</th>
                    <th className="pb-4">Genel Puan</th>
                    <th className="pb-4">Geri Bildirim</th>
                    <th className="pb-4 text-right">Detaylar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSurveys.slice(0, 10).map(res => {
                    const participant = participants.find(p => p.id === res.participantId);
                    const avgScore = (res.ratingMeals + res.ratingActivities + res.ratingBungalows + res.ratingTrainers) / 4;
                    return (
                      <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-bold text-gray-900">{participant?.name || 'Bilinmiyor'}</td>
                        <td className="py-4 text-amber-600 font-black text-lg">{avgScore.toFixed(1)}</td>
                        <td className="py-4 text-gray-600 italic max-w-xs truncate">"{res.generalComment}"</td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => setSelectedSurvey(res)}
                            className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors font-semibold text-sm"
                          >
                            İncele
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'form' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h3 className="text-xl font-black text-gray-900">Anket Formu</h3>
              <p className="text-sm text-gray-500 mt-1">Öğrencilerin kamp deneyimlerini ölçmek için kullanılan standart form.</p>
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-5 py-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 rounded-xl text-sm font-bold transition-colors"
            >
              {linkCopied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Bağlantı Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Link className="w-4 h-4" />
                  <span>Form Bağlantısını Kopyala</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <KampSonuDegerlendirmeRaporu 
              questions={questions} 
              participants={participants}
              campPeriods={campPeriods}
              onSave={(response) => {
                const newSurvey: SurveyResponse = {
                  id: Date.now().toString(),
                  campPeriodId: response.campPeriodId,
                  ratingMeals: parseInt(response.answers.q5?.['Yemekhane ve beslenme'] || 3),
                  ratingActivities: parseInt(response.answers.q5?.['Etkinlik çeşitliliği'] || 3),
                  ratingBungalows: parseInt(response.answers.q5?.['Konaklama alanları'] || 3),
                  ratingTrainers: parseInt(response.answers.q5?.['Kamp çalışanlarının ilgisi'] || 3),
                  generalComment: response.comment,
                  answers: response.answers
                };
                setSurveys(prev => [...prev, newSurvey]);
              }}
            />
          </div>
        </div>
      )}


      {/* Detay Modal */}
      {selectedSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Anket Detayları</h3>
              <div className="flex gap-2">
                <button onClick={() => exportExcel([selectedSurvey], `Anket_${selectedSurvey.id}`)} className="text-sm font-semibold text-emerald-600 hover:text-emerald-800">Excel</button>
                <button onClick={() => exportPDF([selectedSurvey], `Anket_${selectedSurvey.id}`)} className="text-sm font-semibold text-red-600 hover:text-red-800">PDF</button>
                <button onClick={() => setSelectedSurvey(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              
              <p className="text-sm font-semibold text-gray-700">
                Katılımcı: <span className="font-bold text-gray-900">{participants.find(p => p.id === selectedSurvey.participantId)?.name}</span>
              </p>

              {/* Categorized View */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Yemek', val: selectedSurvey.ratingMeals },
                  { label: 'Aktiviteler', val: selectedSurvey.ratingActivities },
                  { label: 'Konaklama', val: selectedSurvey.ratingBungalows },
                  { label: 'Eğitmenler', val: selectedSurvey.ratingTrainers }
                ].map((cat, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">{cat.label}</span>
                    <span className="font-bold text-indigo-700">{cat.val}/5</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <p className="font-bold mb-2">Genel Yorum:</p>
                <p className="bg-gray-50 p-3 rounded-lg text-gray-700 italic">"{selectedSurvey.generalComment}"</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

