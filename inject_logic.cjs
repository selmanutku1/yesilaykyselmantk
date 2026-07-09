const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const anchor = 'const [copiedPublicCalendarLink, setCopiedPublicCalendarLink] = useState(false);';
const insertion = `
  // --- KAMP FAALİYET RAPORU (SİSTEM LOGLARI) ---
  const [reportStartDate, setReportStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  });
  const [reportEndDate, setReportEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const generateActivityReport = () => {
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      
      const start = new Date(reportStartDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(reportEndDate);
      end.setHours(23, 59, 59, 999);

      const filteredLogs = logs.filter(log => {
        const d = new Date(log.timestamp);
        return d >= start && d <= end;
      });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text('KAMP FAALIYET RAPORU (SISTEM)', 105, 20, { align: 'center' });
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(\`Tarih Araligi: \${start.toLocaleDateString('tr-TR')} - \${end.toLocaleDateString('tr-TR')}\`, 105, 28, { align: 'center' });
      doc.text(\`Olusturan: \${currentUser?.name} (\${currentUser?.roleName})\`, 105, 34, { align: 'center' });
      doc.text(\`Toplam Islem Sayisi: \${filteredLogs.length}\`, 105, 40, { align: 'center' });

      autoTable(doc, {
        startY: 50,
        head: [['Tarih/Saat', 'Kullanici', 'Islem Tipi', 'Detaylar']],
        body: filteredLogs.map(log => [
          new Date(log.timestamp).toLocaleString('tr-TR'),
          log.user,
          log.action,
          log.details
        ]),
        styles: { fontSize: 8, cellPadding: 2, font: 'helvetica' },
        headStyles: { fillColor: [5, 150, 105], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { top: 50, right: 15, bottom: 15, left: 15 },
        columnStyles: {
          0: { cellWidth: 35 },
          1: { cellWidth: 35 },
          2: { cellWidth: 35 },
          3: { cellWidth: 'auto' }
        }
      });

      doc.save(\`Kamp_Faaliyet_Raporu_\${reportStartDate}_\${reportEndDate}.pdf\`);
      if (onAddLog) {
        onAddLog('Kamp Faaliyet Raporu', \`\${start.toLocaleDateString('tr-TR')} - \${end.toLocaleDateString('tr-TR')} tarih aralığı için faaliyet raporu oluşturuldu.\`);
      }
    } catch (error) {
      console.error("Rapor oluşturma hatası:", error);
      alert("Rapor oluşturulurken bir hata oluştu. Lütfen uygulamanın yeni bir sekmede açık olduğundan emin olun.");
    }
  };
`;

content = content.replace(anchor, anchor + '\n' + insertion);
fs.writeFileSync('src/components/DashboardView.tsx', content);
