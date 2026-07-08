const fs = require('fs');
let content = fs.readFileSync('src/components/PeriodManagementView.tsx', 'utf8');

content = content.replace(
  "import { CampPeriod, CampCenter, SystemLog } from '../types';",
  "import { CampPeriod, CampCenter, SystemLog, Participant } from '../types';"
);

content = content.replace(
  "totalCapacity?: number;\n  inCampCount?: number;",
  "participants: Participant[];"
);

content = content.replace(
  "totalCapacity = 78,\n  inCampCount = 0\n}: PeriodManagementViewProps) {",
  `participants
}: PeriodManagementViewProps) {
  const activeCenter = campCenters.find((c) => c.id === selectedCampCenterId) || campCenters[0];
  const totalCapacity = activeCenter?.capacity || 78;
  const inCampCount = participants.filter((p) => p.status === 'Kampta').length;`
);

fs.writeFileSync('src/components/PeriodManagementView.tsx', content);
