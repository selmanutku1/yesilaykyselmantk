const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

const target = `        {/* Günlük Kamp Programı */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <CalendarDays className="w-4.5 h-4.5 text-emerald-600" />
                Kamp Takvimi
                <HelpTooltip content="Kamp programındaki aktiviteleri bu alandan takip edebilirsiniz." />
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Aylık, haftalık ve günlük görünümler arasında geçiş yaparak kamp programını takip edin.</p>
            </div>
          </div>`;

const replacement = `        {/* Günlük Kamp Programı */}
        <div className={\`bg-white p-5 rounded-xl border border-gray-100 shadow-sm print:hidden \${isCalendarFullscreen ? 'fixed inset-0 z-[100] m-0 rounded-none w-full h-full overflow-y-auto' : ''}\`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <CalendarDays className="w-4.5 h-4.5 text-emerald-600" />
                Kamp Takvimi
                <HelpTooltip content="Kamp programındaki aktiviteleri bu alandan takip edebilirsiniz." />
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Aylık, haftalık ve günlük görünümler arasında geçiş yaparak kamp programını takip edin.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCalendarFullscreen(!isCalendarFullscreen)}
                className="p-1.5 md:p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center cursor-pointer border border-gray-200/50 dark:border-gray-700"
                title={isCalendarFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
              >
                {isCalendarFullscreen ? <Minimize2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Maximize2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
              </button>
            </div>
          </div>`;

if(code.includes(target)){
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/DashboardView.tsx', code);
    console.log("Patched gonullu calendar!");
} else {
    console.log("Gonullu target not found!");
}
