const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

const target = `      {/* Günlük Kamp Programı & Google Calendar Takvimi */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <CalendarDays className="w-4.5 h-4.5 text-emerald-600" />
              Kamp Takvimi
              <HelpTooltip content="Kamp programındaki aktiviteleri bu alandan takip edebilir, silebilir veya Google Calendar API entegrasyonu ile tüm etkinlikleri otomatik senkronize edebilirsiniz." />
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Katılımcıların ve eğitmenlerin günlük aktivitelerini yönetin.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button`;

const replacement = `      {/* Günlük Kamp Programı & Google Calendar Takvimi */}
      <div className={\`bg-white p-5 rounded-xl border border-gray-100 shadow-sm print:hidden \${isCalendarFullscreen ? 'fixed inset-0 z-[100] m-0 rounded-none w-full h-full overflow-y-auto' : ''}\`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <CalendarDays className="w-4.5 h-4.5 text-emerald-600" />
              Kamp Takvimi
              <HelpTooltip content="Kamp programındaki aktiviteleri bu alandan takip edebilir, silebilir veya Google Calendar API entegrasyonu ile tüm etkinlikleri otomatik senkronize edebilirsiniz." />
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Katılımcıların ve eğitmenlerin günlük aktivitelerini yönetin.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCalendarFullscreen(!isCalendarFullscreen)}
              className="p-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
              title={isCalendarFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
            >
              {isCalendarFullscreen ? <Minimize2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Maximize2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
            </button>
            <button`;

if(code.includes(target)){
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/DashboardView.tsx', code);
    console.log("Patched admin calendar part 1!");
} else {
    console.log("Admin calendar part 1 target not found!");
}
