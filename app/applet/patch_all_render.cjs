const fs = require('fs');
let code = fs.readFileSync('src/components/BungalowView.tsx', 'utf-8');

// Patch 2304
const target2304 = `{bg.isClosed ? <div className="col-span-3 text-[7px] font-bold text-center text-gray-400 py-1">KULLANIM DIŞI</div> : Array.from({ length: bg.capacity }).map((_, idx) => {
                        const bedNum = idx + 1;`;
const replacement2304 = `{bg.isClosed ? <div className="col-span-3 text-[7px] font-bold text-center text-gray-400 py-1">KULLANIM DIŞI</div> : Array.from({ length: bg.capacity }).map((_, idx) => {
                        const bedNum = idx + 1;
                        if (bg.closedBeds?.includes(bedNum)) return null;`;
code = code.replace(target2304, replacement2304);

// Patch 1466
const target1466 = `Array.from({ length: bg.capacity }).map((_, idx) => {
                    const bedNum = idx + 1;
                    const occupier = occupants.find((o) => o.bedNumber === bedNum);`;
const replacement1466 = `Array.from({ length: bg.capacity }).map((_, idx) => {
                    const bedNum = idx + 1;
                    if (bg.closedBeds?.includes(bedNum)) return null;
                    const occupier = occupants.find((o) => o.bedNumber === bedNum);`;
code = code.replace(target1466, replacement1466);

// Patch 1987
const target1987 = `Array.from({ length: bg.capacity }).map((_, idx) => {
                                  const bedNum = idx + 1;
                                  const occupier = occupants.find((o) => o.bedNumber === bedNum);`;
const replacement1987 = `Array.from({ length: bg.capacity }).map((_, idx) => {
                                  const bedNum = idx + 1;
                                  if (bg.closedBeds?.includes(bedNum)) return null;
                                  const occupier = occupants.find((o) => o.bedNumber === bedNum);`;
code = code.replace(target1987, replacement1987);

fs.writeFileSync('src/components/BungalowView.tsx', code);
console.log('Patched all rendering locations!');
