const fs = require('fs');
let content = fs.readFileSync('src/components/HealthView.tsx', 'utf8');

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

  const handleCreateIncident = (e: React.FormEvent) => {
`;

if (!content.includes('handleExportToExcel')) {
  content = content.replace("const handleCreateIncident = (e: React.FormEvent) => {", exportFns);
  fs.writeFileSync('src/components/HealthView.tsx', content);
}
