const fs = require('fs');
let content = `import React, { useState } from 'react';
import { Send, CheckCircle, MessageSquare, Link, Settings, Plus, Trash2, Edit2 } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const defaultQuestions: Question[] = [
  { id: 1, text: "Kamp tesisleri ve konaklama kalitesi?", options: ["Çok Kötü", "Kötü", "Orta", "İyi", "Çok İyi"] },
  { id: 2, text: "Yemeklerin lezzeti ve çeşitliliği?", options: ["Çok Kötü", "Kötü", "Orta", "İyi", "Çok İyi"] },
  { id: 3, text: "Sosyal etkinlikler ve atölyeler?", options: ["Çok Kötü", "Kötü", "Orta", "İyi", "Çok İyi"] },
  { id: 4, text: "Liderlerin rehberliği ve iletişimi?", options: ["Çok Kötü", "Kötü", "Orta", "İyi", "Çok İyi"] },
];

export default function KampSonuDegerlendirmeRaporu() {
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + "?form=kamp-sonu-degerlendirme");
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rapor gönderildi:", { answers, comment });
    setSubmitted(true);
  };

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([...questions, { id: newId, text: "Yeni Soru?", options: ["Çok Kötü", "Kötü", "Orta", "İyi", "Çok İyi"] }]);
  };

  const updateQuestionText = (id: number, text: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
    const newAnswers = { ...answers };
    delete newAnswers[id];
    setAnswers(newAnswers);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-emerald-100 animate-in fade-in">
        <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-black text-gray-900">Teşekkürler!</h2>
        <p className="text-gray-600 mt-2">Değerlendirmeniz başarıyla kaydedildi.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-gray-900">Kamp Sonu Değerlendirme Raporu</h2>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setEditMode(!editMode)}
            className={\`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-bold transition-colors \${editMode ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'}\`}
          >
            <Settings className="w-4 h-4" />
            <span>{editMode ? 'Düzenlemeyi Bitir' : 'Soruları Düzenle'}</span>
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-colors"
          >
            {linkCopied ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Link className="w-4 h-4" />
                <span>Bağlantıyı Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {editMode && (
        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 mb-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-indigo-900 flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Soru Yönetimi
            </h3>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Yeni Soru Ekle
            </button>
          </div>
          
          <div className="space-y-3">
            {questions.map((q, index) => (
              <div key={q.id} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-indigo-100/50 shadow-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={q.text}
                  onChange={(e) => updateQuestionText(q.id, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeQuestion(q.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-0.5 shrink-0"
                  title="Soruyu Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {questions.length === 0 && (
              <div className="text-center py-4 text-sm font-medium text-indigo-400">
                Hiç soru bulunmuyor. Yeni soru ekleyebilirsiniz.
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="space-y-3">
              <p className="font-bold text-gray-800 flex gap-2">
                <span className="text-gray-400">{index + 1}.</span> {q.text}
              </p>
              <div className="flex gap-2 flex-wrap">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAnswers({...answers, [q.id]: opt})}
                    disabled={editMode}
                    className={\`px-4 py-2 rounded-lg text-sm font-semibold transition-colors \${
                      answers[q.id] === opt 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } \${editMode ? 'opacity-50 cursor-not-allowed' : ''}\`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <label className="font-bold text-gray-800 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            Yorum ve Açıklamalarınız
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={editMode}
            className={\`w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[120px] \${editMode ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}\`}
            placeholder="Eklemek istediğiniz diğer düşünceleriniz..."
          />
        </div>

        <button
          type="submit"
          disabled={editMode || questions.length === 0}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Değerlendirmeyi Gönder
        </button>
      </form>
    </div>
  );
}
`;
fs.writeFileSync('src/components/KampSonuDegerlendirmeRaporu.tsx', content, 'utf-8');
