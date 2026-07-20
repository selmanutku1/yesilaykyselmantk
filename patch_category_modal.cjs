const fs = require('fs');
let code = fs.readFileSync('src/components/SurveyAnalysisView.tsx', 'utf-8');

// 1. Add state
code = code.replace(
  "const [activeCategory, setActiveCategory] = useState<string | null>('Tesis');",
  "const [activeCategory, setActiveCategory] = useState<string | null>('Tesis');\n  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState<string | null>(null);"
);

// 2. Make BarChart clickable
const targetBar = `<Bar dataKey="avg" radius={[6, 6, 0, 0]} maxBarSize={60}>`;
const replacementBar = `<Bar dataKey="avg" radius={[6, 6, 0, 0]} maxBarSize={60} onClick={(data) => setSelectedCategoryForModal(data.name)} style={{ cursor: 'pointer' }}>`;
code = code.replace(targetBar, replacementBar);

// 3. Make right sidebar categories open modal
const targetSidebarClick = `onClick={() => setActiveCategory(catKey)}`;
const replacementSidebarClick = `onClick={() => setSelectedCategoryForModal(catKey)}`;
code = code.replaceAll(targetSidebarClick, replacementSidebarClick);

// 4. Add the Modal JSX
const modalJsx = `      {/* Category Detail Modal */}
      {selectedCategoryForModal && (() => {
        const cat = categoryDetailsMap[selectedCategoryForModal];
        const Icon = cat.icon;
        const fieldKey = cat.key as keyof typeof mockSurveyData[0];
        
        const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let total = 0;
        filteredSurveys.forEach(s => {
          const score = Math.round(s[fieldKey] as number);
          if (score >= 1 && score <= 5) {
            dist[score as keyof typeof dist]++;
            total++;
          }
        });

        const sum = filteredSurveys.reduce((acc, curr) => acc + (curr[fieldKey] as number || 0), 0);
        const avg = total > 0 ? (sum / total).toFixed(1) : '0.0';

        return (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedCategoryForModal(null)}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/80">
                <div className="flex items-center gap-3">
                  <div className={\`w-10 h-10 rounded-xl flex items-center justify-center \${cat.color}\`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-lg leading-tight">{cat.label}</h3>
                    <p className="text-xs text-gray-500 font-medium">Kategori Detayları ve Puan Dağılımı</p>
                  </div>
                </div>
                <button onClick={() => setSelectedCategoryForModal(null)} className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6 max-h-[70vh]">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Ortalama Puan</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-3xl font-black text-gray-900">{avg}</p>
                      <span className="text-sm font-bold text-gray-400">/ 5.0</span>
                    </div>
                  </div>
                  <div className="flex-1">
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Toplam Yanıt</p>
                     <p className="text-3xl font-black text-gray-900">{total}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Puan Dağılımı</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(star => {
                      const count = dist[star as keyof typeof dist];
                      const pct = total > 0 ? (count / total) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-600 w-12">{star} Puan</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: \`\${pct}%\` }}></div>
                          </div>
                          <span className="text-xs font-medium text-gray-500 w-12 text-right">{count} kişi</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Alt Metrikler</h4>
                  <div className="space-y-3">
                    {cat.subMetrics && cat.subMetrics.map((sub, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                          <span>{sub.name}</span>
                          <span className={sub.score >= 4.5 ? 'text-emerald-600' : sub.score >= 3.5 ? 'text-amber-500' : 'text-red-500'}>{sub.score.toFixed(1)}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={\`h-full rounded-full \${sub.score >= 4.5 ? 'bg-emerald-500' : sub.score >= 3.5 ? 'bg-amber-400' : 'bg-red-500'}\`} style={{ width: \`\${(sub.score / 5) * 100}%\` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Survey Sending Modal */}`;

const targetModalInsertionPoint = `{/* Survey Sending Modal */}`;
code = code.replace(targetModalInsertionPoint, modalJsx);

fs.writeFileSync('src/components/SurveyAnalysisView.tsx', code);
console.log("Patched Category Modal!");
