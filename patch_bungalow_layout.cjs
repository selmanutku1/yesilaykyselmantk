const fs = require('fs');
let code = fs.readFileSync('src/components/BungalowView.tsx', 'utf-8');

// 1. Fix handleBulkCapacityChange
const funcTarget = `    updatedBungalows = updatedBungalows.map(bg => {
      if (bg.campCenterId !== selectedCenterId || bg.type !== 'Standart') return bg;
      
      const newClosedBeds = newCapacity === 4 ? [5, 6] : [];
      const newCapacityVal = 6; 

      if (bg.closedBeds?.toString() !== newClosedBeds.toString()) {
        if (newCapacity === 4) {
          // Eject from beds 5 and 6
          const occupantsToEject = updatedParticipants.filter(p => p.bungalowId === bg.id && p.bedNumber && (p.bedNumber === 5 || p.bedNumber === 6));
          if (occupantsToEject.length > 0) {
            ejectedParticipantCount += occupantsToEject.length;
            updatedParticipants = updatedParticipants.map(p => {
              if (p.bungalowId === bg.id && p.bedNumber && (p.bedNumber === 5 || p.bedNumber === 6)) {
                return { ...p, bungalowId: null, bedNumber: null };
              }
              return p;
            });
          }
        }
        modifiedBungalowCount++;
        return { ...bg, capacity: newCapacityVal, closedBeds: newClosedBeds };
      }
      return bg;
    });`;

const funcReplacement = `    updatedBungalows = updatedBungalows.map(bg => {
      if (bg.campCenterId !== selectedCenterId || bg.type !== 'Standart') return bg;
      
      if (bg.capacity !== newCapacity) {
        if (bg.capacity > newCapacity) {
          // Eject from beds > newCapacity
          const occupantsToEject = updatedParticipants.filter(p => p.bungalowId === bg.id && p.bedNumber && p.bedNumber > newCapacity);
          if (occupantsToEject.length > 0) {
            ejectedParticipantCount += occupantsToEject.length;
            updatedParticipants = updatedParticipants.map(p => {
              if (p.bungalowId === bg.id && p.bedNumber && p.bedNumber > newCapacity) {
                return { ...p, bungalowId: null, bedNumber: null };
              }
              return p;
            });
          }
        }
        modifiedBungalowCount++;
        return { ...bg, capacity: newCapacity };
      }
      return bg;
    });`;

code = code.replace(funcTarget, funcReplacement);

// 2. Fix rendering: Remove closedBeds usage in labels
const labelTarget = `{bg.isClosed ? "KAPALI" : \`\${filledCount}/\${bg.capacity - (bg.closedBeds?.length || 0)}\`}`;
const labelReplacement = `{bg.isClosed ? "KAPALI" : \`\${filledCount}/\${bg.capacity}\`}`;

code = code.replace(labelTarget, labelReplacement);

// 3. Fix rendering: Remove closedBeds usage in bed grid
const gridTarget = `Array.from({ length: bg.capacity - (bg.closedBeds?.length || 0) }).map((_, idx) => {`;
const gridReplacement = `Array.from({ length: bg.capacity }).map((_, idx) => {`;

code = code.replace(gridTarget, gridReplacement);

fs.writeFileSync('src/components/BungalowView.tsx', code);
console.log('Patched BungalowView.tsx layout logic!');
