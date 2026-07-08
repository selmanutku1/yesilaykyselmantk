const fs = require('fs');
let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

content = content.replace(
  `checked={
                              filteredParticipants.length > 0 &&
                              selectedForBulk.length ===
                                filteredParticipants.length
                            }`,
  `checked={
                              paginatedParticipants.length > 0 &&
                              paginatedParticipants.every(p => selectedForBulk.includes(p.id))
                            }`
);

fs.writeFileSync('src/components/ParticipantView.tsx', content);
