import fs from 'fs';

let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

// Replace Dashboard accordion wrapper
content = content.replace(
  /\{\(!activeSubView \|\| activeSubView === 'dashboard'\) && \([\s\S]*?id="tech-dashboard-panel">/,
  `{activeSubView === 'dashboard' && (
          <div className="bg-white rounded-2xl border border-gray-150 shadow-xs overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-emerald-50/20 to-transparent border-b border-gray-100 flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                <TrendingUp className="w-4 h-4" />
              </span>
              <div className="text-left">
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block">Yönetici Kontrol Paneli</span>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">SLA hedefleri, departman bazlı iş yükü ve genel teknik veriler.</p>
              </div>
            </div>
            <div className="p-5 space-y-6 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="space-y-6" id="tech-dashboard-panel">`
);

// Replace Issues accordion wrapper
content = content.replace(
  /\{\(!activeSubView \|\| activeSubView === 'issues'\) && \([\s\S]*?id="tech-issues-panel">/,
  `{activeSubView === 'issues' && (
          <div className="bg-white rounded-2xl border border-gray-150 shadow-xs overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-emerald-50/20 to-transparent border-b border-gray-100 flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                <Wrench className="w-4 h-4" />
              </span>
              <div>
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block">Arıza &amp; Bakım Defteri ({visibleIssues.length})</span>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Saha personeli tarafından girilen aktif elektrik, su, donanım arıza kayıtları.</p>
              </div>
            </div>
            <div className="p-5 space-y-6 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="space-y-6" id="tech-issues-panel">`
);

// Replace Requests accordion wrapper
content = content.replace(
  /\{\(!activeSubView \|\| activeSubView === 'requests'\) && \([\s\S]*?id="tech-requests-panel">/,
  `{activeSubView === 'requests' && (
          <div className="bg-white rounded-2xl border border-gray-150 shadow-xs overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-emerald-50/20 to-transparent border-b border-gray-100 flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                <ClipboardList className="w-4 h-4" />
              </span>
              <div>
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block">Malzeme &amp; Satın Alma Talepleri ({visibleRequests.length})</span>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Departmanların ihtiyaç duyduğu sarf malzeme ve onarım parça talepleri.</p>
              </div>
            </div>
            <div className="p-5 space-y-6 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="space-y-6" id="tech-requests-panel">`
);

// Replace AI Copilot accordion wrapper
content = content.replace(
  /\{\(!activeSubView \|\| activeSubView === 'ai-copilot'\) && \([\s\S]*?id="tech-copilot-panel">/,
  `{activeSubView === 'ai-copilot' && (
          <div className="bg-white rounded-2xl border border-gray-150 shadow-xs overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-emerald-50/20 to-transparent border-b border-gray-100 flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </span>
              <div>
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block">KYS Teknik Yapay Zeka Copilot</span>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Geçmiş arıza verilerini işleyerek kronik sorunları tespit eden akıllı asistan.</p>
              </div>
            </div>
            <div className="p-5 space-y-6 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="space-y-6" id="tech-copilot-panel">`
);

// Replace Reports accordion wrapper
content = content.replace(
  /\{\(!activeSubView \|\| activeSubView === 'reports'\) && \([\s\S]*?id="tech-reports-panel">/,
  `{activeSubView === 'reports' && (
          <div className="bg-white rounded-2xl border border-gray-150 shadow-xs overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-emerald-50/20 to-transparent border-b border-gray-100 flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                <FileText className="w-4 h-4" />
              </span>
              <div>
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block">Raporlar &amp; Çıktılar</span>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Yönetim toplantıları için SLA özetleri ve departman performans karnesi.</p>
              </div>
            </div>
            <div className="p-5 space-y-6 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="space-y-6" id="tech-reports-panel">`
);

// Replace Areas accordion wrapper
content = content.replace(
  /\{\(!activeSubView \|\| activeSubView === 'areas'\) && \([\s\S]*?id="tech-areas-panel">/,
  `{activeSubView === 'areas' && (
          <div className="bg-white rounded-2xl border border-gray-150 shadow-xs overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-emerald-50/20 to-transparent border-b border-gray-100 flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block">Bölgesel Tesis Tarama &amp; QR Raporu</span>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Kamp bölgelerine göre tesis denetim logları ve QR ile bildirim özetleri.</p>
              </div>
            </div>
            <div className="p-5 space-y-6 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="space-y-6" id="tech-areas-panel">`
);

fs.writeFileSync('src/components/TechnicalOperationsView.tsx', content);

console.log("Replacements done!");
