const fs = require('fs');

let content = fs.readFileSync('src/components/HealthView.tsx', 'utf8');

// Replace the bad insertion
const badInsert = `            <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button
                onClick={handleExportToExcel}
                className="flex-1 sm:flex-none px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-2xs font-extrabold transition-all duration-150 flex items-center justify-center gap-1.5 shadow-2xs hover:border-emerald-500 cursor-pointer"
                title="Excel İndir"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                Excel
              </button>
              <button
                onClick={handleExportToPDF}
                className="flex-1 sm:flex-none px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-2xs font-extrabold transition-all duration-150 flex items-center justify-center gap-1.5 shadow-2xs hover:border-red-500 cursor-pointer"
                title="PDF İndir"
              >
                <FileText className="w-3.5 h-3.5 text-red-600" />
                PDF
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-150">`;

const goodInsert = `          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-150">`;

content = content.replace(badInsert, goodInsert);

const targetLocation = `<div className="relative w-full sm:w-64 shrink-0">`;
const buttons = `
            <div className="flex items-center gap-2">
              <div className="flex gap-2 mr-2">
                <button
                  onClick={handleExportToExcel}
                  className="px-2.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-2xs font-extrabold transition-all duration-150 flex items-center gap-1.5 shadow-2xs hover:border-emerald-500 cursor-pointer"
                  title="Excel İndir"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  Excel
                </button>
                <button
                  onClick={handleExportToPDF}
                  className="px-2.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-2xs font-extrabold transition-all duration-150 flex items-center gap-1.5 shadow-2xs hover:border-red-500 cursor-pointer"
                  title="PDF İndir"
                >
                  <FileText className="w-3.5 h-3.5 text-red-600" />
                  PDF
                </button>
              </div>
`;

content = content.replace(targetLocation, buttons + targetLocation);

fs.writeFileSync('src/components/HealthView.tsx', content);
