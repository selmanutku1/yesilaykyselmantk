const fs = require('fs');

const content = fs.readFileSync('src/App.tsx', 'utf-8');

const injection = `
  if (isKampSonuForm) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-center items-center z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-2 rounded-xl">
              <svg viewBox="0 0 100 100" className="w-10 h-10">
                <path d="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C75 95 95 75 95 50 C95 25 75 5 50 5 Z" fill="#059669"/>
                <path d="M70 30 C70 30 55 45 40 60 C35 65 25 55 30 50 C45 35 60 20 60 20 Z" fill="#ffffff"/>
                <path d="M40 70 C40 70 55 55 70 40 C75 35 85 45 80 50 C65 65 50 80 50 80 Z" fill="#ffffff"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">YEŞİLAY</h1>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">TÜRKİYE YEŞİLAY CEMİYETİ</span>
            </div>
          </div>
        </header>
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 pt-8 md:pt-12">
          <KampSonuDegerlendirmeRaporu />
        </main>
        <footer className="py-6 border-t border-gray-200 bg-white text-center text-xs text-gray-500 font-semibold mt-12">
          <p>© 2026 Türkiye Yeşilay Cemiyeti</p>
        </footer>
      </div>
    );
  }
`;

const updatedContent = content.replace("  if (isRemotePortal) {", injection + "\n  if (isRemotePortal) {");

fs.writeFileSync('src/App.tsx', updatedContent, 'utf-8');
