const fs = require('fs');
let code = fs.readFileSync('src/components/BungalowView.tsx', 'utf-8');

const target2 = `        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 self-stretch sm:self-auto shrink-0">
          {isDeleteMode ? (`;
const replacement2 = `        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 self-stretch sm:self-auto shrink-0">
          <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-1 mr-1">
            <button
              onClick={() => handleBulkCapacityChange(4)}
              className="px-3 py-1.5 rounded-md text-xs font-bold text-gray-700 hover:bg-white hover:shadow-sm transition"
              title="Tüm bungalovları 4 yataklı düzene geçirir"
            >
              4'lü Düzen
            </button>
            <button
              onClick={() => handleBulkCapacityChange(6)}
              className="px-3 py-1.5 rounded-md text-xs font-bold text-gray-700 hover:bg-white hover:shadow-sm transition"
              title="Tüm bungalovları 6 yataklı düzene geçirir"
            >
              6'lı Düzen
            </button>
          </div>
          {isDeleteMode ? (`;

if (code.includes(target2)) {
    code = code.replace(target2, replacement2);
    fs.writeFileSync('src/components/BungalowView.tsx', code);
    console.log('Buttons added!');
} else {
    console.log('Buttons target missing!');
}
