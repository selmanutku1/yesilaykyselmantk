const fs = require('fs');

let content = fs.readFileSync('src/components/CostAnalysisView.tsx', 'utf8');

if (!content.includes('exportToExcel')) {
  content = content.replace("import React, { useState, useMemo, useCallback } from 'react';", "import React, { useState, useMemo, useCallback } from 'react';\nimport { exportToExcel, exportToPdfTable } from '../utils/exportUtils';");
}

if (!content.includes('FileSpreadsheet')) {
  content = content.replace("FileText,", "FileText, FileSpreadsheet,");
}

const exportFns = `
  const getExportData = () => {
    if (filteredExpenses.length === 0) return null;
    
    const headers = [
      "Tarih", "Gider Adı", "Kategori", "Tür", "Tutar (TL)", "Açıklama"
    ];

    const rows = filteredExpenses.map(e => [
      new Date(e.date).toLocaleDateString('tr-TR'),
      e.name,
      e.category,
      e.type,
      e.amount.toLocaleString('tr-TR'),
      e.description || '-'
    ]);
    
    return { headers, rows };
  };

  const handleExportToExcel = () => {
    const data = getExportData();
    if (!data) {
      alert("Dışa aktarılacak gider kaydı bulunamadı.");
      return;
    }
    
    const excelData = data.rows.map((row) => {
      let obj = {};
      data.headers.forEach((h, i) => {
        obj[h] = row[i];
      });
      return obj;
    });

    exportToExcel(excelData, 'maliyet_analizi');
    onAddLog('Excel Dışa Aktarımı', 'Maliyet analiz listesi Excel formatında dışa aktarıldı.');
  };

  const handleExportToPDF = () => {
    const data = getExportData();
    if (!data) {
      alert("Dışa aktarılacak gider kaydı bulunamadı.");
      return;
    }
    exportToPdfTable(data.headers, data.rows, 'maliyet_analizi', 'Maliyet Analiz Raporu');
    onAddLog('PDF Dışa Aktarımı', 'Maliyet analiz listesi PDF formatında dışa aktarıldı.');
  };

  return (
`;

if (!content.includes('handleExportToExcel')) {
  content = content.replace("return (", exportFns);
}

const buttonsTarget = `        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition duration-200 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Gider Girişi</span>
        </button>
      </div>`;

const newButtons = `        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <button
              onClick={handleExportToExcel}
              className="px-3 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-extrabold transition-all duration-150 flex items-center gap-1.5 shadow-xs hover:border-emerald-500 cursor-pointer"
              title="Excel İndir"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Excel
            </button>
            <button
              onClick={handleExportToPDF}
              className="px-3 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-extrabold transition-all duration-150 flex items-center gap-1.5 shadow-xs hover:border-red-500 cursor-pointer"
              title="PDF İndir"
            >
              <FileText className="w-4 h-4 text-red-600" />
              PDF
            </button>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Gider Girişi</span>
          </button>
        </div>
      </div>`;

content = content.replace(buttonsTarget, newButtons);

fs.writeFileSync('src/components/CostAnalysisView.tsx', content);
