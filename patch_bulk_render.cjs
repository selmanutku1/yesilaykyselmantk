const fs = require('fs');
let code = fs.readFileSync('src/components/BungalowView.tsx', 'utf-8');

// Update bed rendering
const targetRender = `Array.from({ length: bg.capacity }).map((_, idx) => {
                        const bedNum = idx + 1;
                        const occupant = occupants.find((o) => o.bedNumber === bedNum);
                      const isMatched = occupant ? isParticipantMatched(occupant) : false;

                      return (`;

const replacementRender = `Array.from({ length: bg.capacity }).map((_, idx) => {
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

code = code.replace(targetRender, replacementRender);
fs.writeFileSync('src/components/BungalowView.tsx', code);
console.log('Patched bed render!');
