const fs = require('fs');
let code = fs.readFileSync('src/components/BungalowView.tsx', 'utf-8');

// Update main grid rendering: length and isClosedBed
const targetRender = `Array.from({ length: bg.capacity }).map((_, idx) => {
                        const bedNum = idx + 1;
                        const isClosedBed = bg.closedBeds?.includes(bedNum);
                        const occupant = occupants.find((o) => o.bedNumber === bedNum);
                      const isMatched = occupant ? isParticipantMatched(occupant) : false;

                      if (isClosedBed) {
                        return (
                          <div key={bedNum} className="p-2 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                             <span className="text-[9px] font-bold text-gray-400">X</span>
                          </div>
                        );
                      }

                      return (`;

const replacementRender = `Array.from({ length: bg.capacity - (bg.closedBeds?.length || 0) }).map((_, idx) => {
                        const bedNum = idx + 1;
                        const occupant = occupants.find((o) => o.bedNumber === bedNum);
                      const isMatched = occupant ? isParticipantMatched(occupant) : false;

                      return (`;

code = code.replace(targetRender, replacementRender);

// Update status label
const targetLabel = `{bg.isClosed ? "KAPALI" : \`\${filledCount}/\${bg.capacity}\`}`;
const replacementLabel = `{bg.isClosed ? "KAPALI" : \`\${filledCount}/\${bg.capacity - (bg.closedBeds?.length || 0)}\`}`;

code = code.replace(targetLabel, replacementLabel);

fs.writeFileSync('src/components/BungalowView.tsx', code);
console.log('Patched bed rendering and labels!');
