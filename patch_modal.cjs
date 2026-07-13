const fs = require('fs');
const file = 'src/components/ParticipantView.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  `                  {selectedParticipant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}`,
  `                  {(selectedParticipant.name || "K")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}`
);

content = content.replace(
  `                  <span className="font-mono text-gray-700">
                    {selectedParticipant.identityNumber.slice(0, 3)}******
                    {selectedParticipant.identityNumber.slice(-2)}
                  </span>`,
  `                  <span className="font-mono text-gray-700">
                    {selectedParticipant.identityNumber ? selectedParticipant.identityNumber.slice(0, 3) + "******" + selectedParticipant.identityNumber.slice(-2) : "GİRİLMEDİ"}
                  </span>`
);

fs.writeFileSync(file, content, 'utf8');
