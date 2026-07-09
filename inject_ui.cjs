const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const anchor = '{/* Mini Stats Grid */}';
const insertion = `      {/* KAMP FAALİYET RAPORU WIDGET */}
      {(currentUser?.role === 'admin' || currentUser?.role === 'mudur') && (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 print:hidden mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 text-indigo-700 p-2 rounded-lg shrink-0">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Kamp Faaliyet Raporu (Sistem Logları)</h3>
              <p className="text-xs text-gray-500">Seçtiğiniz tarih aralığındaki tüm sistem işlemlerinin dökümünü alın.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input 
              type="date" 
              value={reportStartDate} 
              onChange={(e) => setReportStartDate(e.target.value)} 
              className="text-xs p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
            />
            <span className="text-gray-400 font-bold">-</span>
            <input 
              type="date" 
              value={reportEndDate} 
              onChange={(e) => setReportEndDate(e.target.value)} 
              className="text-xs p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
            />
            <button 
              onClick={generateActivityReport}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center gap-2 transition cursor-pointer shadow-sm shadow-indigo-600/20 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              Oluştur
            </button>
          </div>
        </div>
      )}\n`;

content = content.replace(anchor, insertion + '      ' + anchor);
fs.writeFileSync('src/components/DashboardView.tsx', content);
