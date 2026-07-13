const fs = require('fs');
let content = fs.readFileSync('src/components/KampSonuDegerlendirmeRaporu.tsx', 'utf-8');

content = content.replace(
  '<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">\n        <h2 className="text-2xl font-black text-gray-900">Kamp Sonu Değerlendirme Anketi</h2>',
  `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-10 h-10">
              <path d="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C75 95 95 75 95 50 C95 25 75 5 50 5 Z" fill="#059669"/>
              <path d="M70 30 C70 30 55 45 40 60 C35 65 25 55 30 50 C45 35 60 20 60 20 Z" fill="#ffffff"/>
              <path d="M40 70 C40 70 55 55 70 40 C75 35 85 45 80 50 C65 65 50 80 50 80 Z" fill="#ffffff"/>
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900">Kamp Sonu Değerlendirme Anketi</h2>
        </div>`
);

fs.writeFileSync('src/components/KampSonuDegerlendirmeRaporu.tsx', content, 'utf-8');
