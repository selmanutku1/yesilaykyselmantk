const fs = require('fs');

let content = fs.readFileSync('src/components/ReportsView.tsx', 'utf8');

// Replace the downloadSummaryPDF function with one that checks dates
content = content.replace(/const downloadSummaryPDF = \(\) => \{[\s\S]*?\};\n/m, '');

const pdfFunction = `
  const downloadSummaryPDF = () => {
    if (!selectedSummaryPeriod) {
      alert('Lütfen özetini almak istediğiniz kamp dönemini seçiniz.');
      return;
    }

    try {
      const doc = new jsPDF();
      
      const period = periods.find(p => p.id === selectedSummaryPeriod);
      const periodName = period ? period.name : 'Secilen Donem';
      const safePeriodName = periodName.replace(/[^a-zA-Z0-9 -]/g, '');

      // Check dates
      const start = period ? new Date(period.startDate) : new Date(0);
      const end = period ? new Date(period.endDate) : new Date(8640000000000000);
      end.setHours(23, 59, 59, 999);

      // Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('DONEM KAPANIS OZETI', 105, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(\`Kamp Donemi: \${safePeriodName}\`, 105, 28, { align: 'center' });

      let currentY = 40;

      // 1. Health Incidents
      const pHealth = healthIncidents.filter(h => {
        const d = new Date(h.dateTime);
        return d >= start && d <= end;
      });
      doc.setFont('helvetica', 'bold');
      doc.text('1. Saglik Olaylari', 14, currentY);
      currentY += 8;

      if (pHealth.length > 0) {
        autoTable(doc, {
          startY: currentY,
          head: [['Tarih', 'Ogrenci TC', 'Durum', 'Sikayet', 'Tedavi']],
          body: pHealth.map(h => [
            new Date(h.dateTime).toLocaleDateString('tr-TR'),
            h.participantId.slice(-4),
            h.status,
            h.complaint.substring(0, 30),
            h.treatment.substring(0, 30)
          ]),
          styles: { fontSize: 8 },
          headStyles: { fillColor: [220, 38, 38] }
        });
        currentY = (doc as any).lastAutoTable.finalY + 15;
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Bu donemde kaydedilmis saglik olayi bulunmamaktadir.', 14, currentY);
        currentY += 15;
      }

      // 2. Technical Tasks
      const pTasks = tasks.filter(t => {
        const d = new Date(t.date);
        return d >= start && d <= end;
      });
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('2. Teknik Talepler ve Operasyon', 14, currentY);
      currentY += 8;

      if (pTasks.length > 0) {
        autoTable(doc, {
          startY: currentY,
          head: [['Tarih', 'Departman', 'Baslik', 'Durum']],
          body: pTasks.map(t => [
            new Date(t.date).toLocaleDateString('tr-TR'),
            t.department,
            t.title.substring(0, 30),
            t.status
          ]),
          styles: { fontSize: 8 },
          headStyles: { fillColor: [147, 51, 234] }
        });
        currentY = (doc as any).lastAutoTable.finalY + 15;
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Bu donemde kaydedilmis teknik gorev/talep bulunmamaktadir.', 14, currentY);
        currentY += 15;
      }

      // 3. Surveys
      const pSurveys = surveys.filter(s => s.campPeriodId === selectedSummaryPeriod);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('3. Katilimci Anket Sonuclari (Ortalamalar)', 14, currentY);
      currentY += 8;

      if (pSurveys.length > 0) {
        const avgMeals = (pSurveys.reduce((sum, s) => sum + s.ratingMeals, 0) / pSurveys.length).toFixed(1);
        const avgActivities = (pSurveys.reduce((sum, s) => sum + s.ratingActivities, 0) / pSurveys.length).toFixed(1);
        const avgBungalows = (pSurveys.reduce((sum, s) => sum + s.ratingBungalows, 0) / pSurveys.length).toFixed(1);
        const avgTrainers = (pSurveys.reduce((sum, s) => sum + s.ratingTrainers, 0) / pSurveys.length).toFixed(1);

        autoTable(doc, {
          startY: currentY,
          head: [['Kriter', 'Ortalama Puan (5 uzerinden)']],
          body: [
            ['Yemekhane ve Ogunler', avgMeals],
            ['Egitim ve Aktiviteler', avgActivities],
            ['Bungalov ve Temizlik', avgBungalows],
            ['Egitmenler ve Ilgi', avgTrainers]
          ],
          styles: { fontSize: 10 },
          headStyles: { fillColor: [5, 150, 105] }
        });
        currentY = (doc as any).lastAutoTable.finalY + 15;
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Bu donem icin doldurulmus anket bulunmamaktadir.', 14, currentY);
      }

      doc.save(\`donem_kapani_ozeti_\${safePeriodName}.pdf\`);

    } catch (err) {
      console.error(err);
      alert('Ozet PDF olusturulurken bir hata olustu.');
    }
  };
`;

content = content.replace("  const downloadPDF = () => {", pdfFunction + "\n  const downloadPDF = () => {");

fs.writeFileSync('src/components/ReportsView.tsx', content);

