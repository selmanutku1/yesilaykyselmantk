const fs = require('fs');
let code = fs.readFileSync('src/components/SurveyAnalysisView.tsx', 'utf-8');

const targetStats = `      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-colors">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Doldurulan Anket</p>
            <p className="text-2xl font-black text-gray-900">{filteredSurveys.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Genel Memnuniyet</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-black text-gray-900">{overallAvg}</p>
              <span className="text-sm font-bold text-gray-400">/ 5.0</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center hover:border-gray-300 transition-colors md:col-span-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Kamp Merkezi Filtresi</p>
          <select 
            value={filterCamp} 
            onChange={(e) => setFilterCamp(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="Tümü">Tüm Kamp Merkezleri</option>
            <option value="Sarısu">Antalya / Sarısu Gençlik Kampı</option>
            <option value="Pamukova">Sakarya / Pamukova Gençlik Kampı</option>
          </select>
        </div>
      </div>`;

const replacementStats = `      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors col-span-1 md:col-span-2 bg-gradient-to-r from-emerald-50 to-white">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Genel Memnuniyet Skoru</p>
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-black text-gray-900">{overallAvg}</p>
                <span className="text-sm font-bold text-gray-500">/ 5.0</span>
              </div>
              <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className={\`h-full rounded-full \${parseFloat(overallAvg) >= 4.0 ? 'bg-emerald-500' : parseFloat(overallAvg) >= 3.0 ? 'bg-amber-400' : 'bg-red-500'}\`} style={{ width: \`\${(parseFloat(overallAvg) / 5) * 100}%\` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-colors">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Doldurulan Anket</p>
            <p className="text-2xl font-black text-gray-900">{filteredSurveys.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center hover:border-gray-300 transition-colors">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Kamp Merkezi Filtresi</p>
          <select 
            value={filterCamp} 
            onChange={(e) => setFilterCamp(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="Tümü">Tüm Kamp Merkezleri</option>
            <option value="Sarısu">Antalya / Sarısu Gençlik Kampı</option>
            <option value="Pamukova">Sakarya / Pamukova Gençlik Kampı</option>
          </select>
        </div>
      </div>`;

if(code.includes(targetStats)){
    code = code.replace(targetStats, replacementStats);
    fs.writeFileSync('src/components/SurveyAnalysisView.tsx', code);
    console.log("Patched overall stats!");
} else {
    console.log("Overall stats target not found!");
}
