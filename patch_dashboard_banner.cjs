const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const targetStr = `      {/* Sistem Güncellemeleri - Beta */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 sm:p-5 rounded-xl border border-indigo-100 shadow-sm print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-indigo-600" />
              Sistem Güncellemeleri (v0.9.1 Beta)
            </h3>
            <p className="text-xs text-indigo-700/80 mt-0.5">KYS platformuna eklenen en yeni özellikler ve iyileştirmeler.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg border border-indigo-100/50 shadow-3xs flex items-start gap-3">
            <div className="mt-0.5 p-1.5 bg-indigo-100 rounded text-indigo-600 shrink-0">
              <Mic className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800">Sesli Not ve Komut Asistanı</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Revir, teknik arıza bildirimleri ve olay tutanaklarında sesli not ile hızlı metin girişi eklendi.</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-indigo-100/50 shadow-3xs flex items-start gap-3">
            <div className="mt-0.5 p-1.5 bg-indigo-100 rounded text-indigo-600 shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800">Gelişmiş Google Takvim Entegrasyonu</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Sistem takvimi ile Google Calendar arasında çift yönlü senkronizasyon ve ajanda görünümleri sağlandı.</p>
            </div>
          </div>
        </div>
      </div>

`;

content = content.replace(targetStr, "");
fs.writeFileSync('src/components/DashboardView.tsx', content);
