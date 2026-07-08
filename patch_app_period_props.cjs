const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  `campCenters={CAMP_CENTERS}
              selectedCampCenterId={selectedCampCenterId}`,
  `campCenters={CAMP_CENTERS}
              selectedCampCenterId={selectedCampCenterId}
              participants={participants}`
);

fs.writeFileSync('src/App.tsx', content);
