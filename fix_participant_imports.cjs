const fs = require('fs');
let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

if (!content.includes('exportToExcel')) {
  content = content.replace('import { Participant, Group, CampPeriod } from "../types";', 'import { exportToExcel, exportToPdfTable } from "../utils/exportUtils";\nimport { Participant, Group, CampPeriod, Bungalow } from "../types";');
  fs.writeFileSync('src/components/ParticipantView.tsx', content);
}
