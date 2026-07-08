const fs = require('fs');

let content = fs.readFileSync('src/components/HealthView.tsx', 'utf8');

if (!content.includes('exportToExcel')) {
  content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { exportToExcel, exportToPdfTable } from '../utils/exportUtils';");
}

if (!content.includes('FileSpreadsheet')) {
  content = content.replace("FilePlus2,", "FilePlus2, FileSpreadsheet, FileText,");
}

const exportFns = `
  const getExportData = () => {
    if (filteredHealthIncidents.length === 0) return null;
    
    const headers = [
      "Kayıt No", "Tarih/Saat", "Ad Soyad", "T.C. Kimlik No", "Kategori",
      "Şikayet / Teşhis", "Uygulanan Tedavi", "Verilen İlaçlar", "Gözlem/Notlar", "Durum"
    ];

    const rows = filteredHealthIncidents.map(hi => {
      const p = getParticipant(hi.participantId);
      return [
        hi.id,
        new Date(hi.timestamp).toLocaleString(),
        p ? p.name : 'Silinmiş Kayıt',
        p ? p.identityNumber : '-',
        p ? p.category : '-',
        hi.complaint,
        hi.treatment,
        hi.medicationsGiven || 'Yok',
        hi.notes || '',
        hi.status
      ];
    });
    
    return { headers, rows };
  };

  const handleExportToExcel = () => {
    const data = getExportData();
    if (!data) {
      alert("Dışa aktarılacak revir kaydı bulunamadı.");
      return;
    }
    
    const excelData = data.rows.map(row => {
      let obj = {};
      data.headers.forEach((h, i) => {
        obj[h] = row[i];
      });
      return obj;
    });

    exportToExcel(excelData, 'revir_defteri');
    onAddLog('Excel Dışa Aktarımı', 'Revir defteri kayıtları Excel formatında dışa aktarıldı.');
  };

  const handleExportToPDF = () => {
    const data = getExportData();
    if (!data) {
      alert("Dışa aktarılacak revir kaydı bulunamadı.");
      return;
    }
    exportToPdfTable(data.headers, data.rows, 'revir_defteri', 'Revir Defteri Kayıtları');
    onAddLog('PDF Dışa Aktarımı', 'Revir defteri kayıtları PDF formatında dışa aktarıldı.');
  };

  const handleAddIncident = (e: React.FormEvent) => {
`;

if (!content.includes('handleExportToExcel')) {
  content = content.replace("const handleAddIncident = (e: React.FormEvent) => {", exportFns);
}

const exportButtons = `
            <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
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

content = content.replace(
  '<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-150">',
  exportButtons
);

fs.writeFileSync('src/components/HealthView.tsx', content);
