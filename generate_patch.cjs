const fs = require('fs');

let content = fs.readFileSync('src/components/ReportsView.tsx', 'utf8');

// Imports
content = content.replace(
  "import { SystemLog, Expense, Participant, CampCenter, Task, CampIncident, HealthIncident, CampActivity } from '../types';",
  "import { SystemLog, Expense, Participant, CampCenter, Task, CampIncident, HealthIncident, CampActivity, SurveyResponse, CampPeriod } from '../types';"
);

content = content.replace(
  "import { Filter, Calendar, MapPin, Download, RefreshCw, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';",
  "import { Filter, Calendar, MapPin, Download, RefreshCw, BarChart2, ChevronLeft, ChevronRight, FileText } from 'lucide-react';"
);

// Props interface
content = content.replace(
  "  activities?: CampActivity[];\n}",
  "  activities?: CampActivity[];\n  surveys?: SurveyResponse[];\n  periods?: CampPeriod[];\n}"
);

// Props destructuring
content = content.replace(
  "  activities = []\n}: ReportsViewProps) {",
  "  activities = [],\n  surveys = [],\n  periods = []\n}: ReportsViewProps) {"
);

// Add selectedSummaryPeriod state
content = content.replace(
  "  const [currentPage, setCurrentPage] = useState(1);",
  "  const [currentPage, setCurrentPage] = useState(1);\n  const [selectedSummaryPeriod, setSelectedSummaryPeriod] = useState<string>('');"
);

// Summary PDF function
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

      // Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('DONEM KAPANIS OZETI', 105, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(\`Kamp Donemi: \${safePeriodName}\`, 105, 28, { align: 'center' });

      let currentY = 40;

      // 1. Health Incidents
      const pHealth = healthIncidents.filter(h => h.campPeriodId === selectedSummaryPeriod);
      doc.setFont('helvetica', 'bold');
      doc.text('1. Saglik Olaylari', 14, currentY);
      currentY += 8;

      if (pHealth.length > 0) {
        autoTable(doc, {
          startY: currentY,
          head: [['Tarih', 'Ogrenci TC', 'Durum']],
          body: pHealth.map(h => [
            new Date(h.dateTime).toLocaleDateString('tr-TR'),
            h.participantId.slice(-4),
            h.notes.substring(0, 50) + '...'
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
      const pTasks = tasks.filter(t => t.campPeriodId === selectedSummaryPeriod);
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

// UI injection
const newUI = `
      {/* Dönem Kapanış Özeti Paneli */}
      <div className="bg-emerald-50/50 p-4 sm:p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-emerald-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Dönem Kapanış Özeti
          </h3>
          <p className="text-xs text-emerald-700 mt-1">
            Seçilen kamp dönemine ait sağlık, teknik ve anket sonuçlarını içeren özet raporu oluşturun.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={selectedSummaryPeriod}
            onChange={(e) => setSelectedSummaryPeriod(e.target.value)}
            className="p-2.5 border border-emerald-200 rounded-xl text-sm font-semibold bg-white focus:outline-emerald-500 w-full md:w-56"
          >
            <option value="">-- Dönem Seçin --</option>
            {periods.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button
            onClick={downloadSummaryPDF}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Özet PDF Al
          </button>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
`;

content = content.replace(
  '<div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">',
  newUI
);

fs.writeFileSync('src/components/ReportsView.tsx', content);

