const fs = require('fs');

let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

if (!content.includes('exportToExcel')) {
  content = content.replace("import React, { useState, useMemo } from 'react';", "import React, { useState, useMemo } from 'react';\nimport { exportToExcel, exportToPdfTable } from '../utils/exportUtils';");
}
if (!content.includes('FileText')) {
    content = content.replace("FileSpreadsheet,", "FileSpreadsheet, FileText,");
}

const csvFnRegex = /const handleExportToCSV = \(\) => \{[\s\S]*?onAddLog\([\s\S]*?\);\n  \};/;

const newExportFns = `
  const getExportData = () => {
    if (filteredParticipants.length === 0) return null;
    
    const headers = [
      "T.C. Kimlik No", "Ad Soyad", "Kategori", "Cinsiyet", "Doğum Tarihi", 
      "Telefon", "E-Posta", "Kamp Dönemi", "Grup Adı", "Bungalov No", 
      "Yatak No", "Alerjiler", "Sağlık Notu", "Kayıt Durumu"
    ];

    const rows = filteredParticipants.map(p => {
      const periodName = periods.find((per) => per.id === p.campPeriodId)?.name || p.campPeriodId || 'Belirtilmedi';
      const groupName = groups.find((g) => g.id === p.groupId)?.name || 'Atanmadı';
      const bungalowName = bungalows.find((b) => b.id === p.bungalowId)?.name || 'Atanmadı';

      return [
        p.identityNumber || '',
        p.name || '',
        p.category || '',
        p.gender || '',
        p.birthDate || '',
        p.phone || '',
        p.email || '',
        periodName,
        groupName,
        bungalowName,
        p.bedNumber ? p.bedNumber.toString() : 'Atanmadı',
        p.allergies || '',
        p.healthNote || '',
        p.status || ''
      ];
    });
    
    return { headers, rows };
  };

  const handleExportToExcel = () => {
    const data = getExportData();
    if (!data) {
      alert("Dışa aktarılacak katılımcı bulunamadı.");
      return;
    }
    
    const excelData = data.rows.map(row => {
      let obj = {};
      data.headers.forEach((h, i) => {
        obj[h] = row[i];
      });
      return obj;
    });

    exportToExcel(excelData, 'katilimci_listesi');
    onAddLog('Excel Dışa Aktarımı', 'Katılımcı listesi Excel formatında dışa aktarıldı.');
  };

  const handleExportToPDF = () => {
    const data = getExportData();
    if (!data) {
      alert("Dışa aktarılacak katılımcı bulunamadı.");
      return;
    }
    exportToPdfTable(data.headers, data.rows, 'katilimci_listesi', 'Katılımcı Listesi');
    onAddLog('PDF Dışa Aktarımı', 'Katılımcı listesi PDF formatında dışa aktarıldı.');
  };
`;

content = content.replace(csvFnRegex, newExportFns);

const buttonRegex = /\{\/\* CSV Dışa Aktar Button \*\/\}[\s\S]*?<\/button>/;

const newButtons = `            {/* Export Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleExportToExcel}
                className="px-3 py-1.5 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg text-2xs font-extrabold transition-all duration-150 flex items-center gap-1.5 shadow-2xs cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500"
                title="Excel İndir"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Excel
              </button>
              <button
                onClick={handleExportToPDF}
                className="px-3 py-1.5 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg text-2xs font-extrabold transition-all duration-150 flex items-center gap-1.5 shadow-2xs cursor-pointer hover:border-red-500 dark:hover:border-red-500"
                title="PDF İndir"
              >
                <FileText className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                PDF
              </button>
            </div>`;

content = content.replace(buttonRegex, newButtons);

fs.writeFileSync('src/components/ParticipantView.tsx', content);
