const fs = require('fs');
let content = fs.readFileSync('src/components/PeriodManagementView.tsx', 'utf8');

const targetStr = `  const checkQuotaWarning = (p: CampPeriod) => {
    if (p.maxQuota > totalCapacity) {
      const confirm = window.confirm(
        \`Uyarı: Belirlediğiniz kota (\${p.maxQuota}), tesisin maksimum kapasitesinden (\${totalCapacity}) daha yüksek. Yine de onaylıyor musunuz?\`
      );
      if (!confirm) return false;
    }
    return true;
  };`;

const newTargetStr = `  const checkQuotaWarning = (p: CampPeriod) => {
    // window.confirm is disabled in iframe sandbox
    return true;
  };`;

content = content.replace(targetStr, newTargetStr);
fs.writeFileSync('src/components/PeriodManagementView.tsx', content);
