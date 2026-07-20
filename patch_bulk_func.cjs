const fs = require('fs');
let code = fs.readFileSync('src/components/BungalowView.tsx', 'utf-8');

const targetFunc = `  const handleBulkCapacityChange = (newCapacity: number) => {
    let updatedParticipants = [...participants];
    let updatedBungalows = [...bungalows];
    let modifiedBungalowCount = 0;
    let ejectedParticipantCount = 0;

    updatedBungalows = updatedBungalows.map(bg => {
      if (bg.campCenterId !== selectedCenterId) return bg;
      
      if (bg.capacity !== newCapacity) {
        if (bg.capacity > newCapacity) {
          // Find participants in beds > newCapacity for this bungalow
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

const replacementFunc = `  const handleBulkCapacityChange = (newCapacity: number) => {
    let updatedParticipants = [...participants];
    let updatedBungalows = [...bungalows];
    let modifiedBungalowCount = 0;
    let ejectedParticipantCount = 0;

    updatedBungalows = updatedBungalows.map(bg => {
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

code = code.replace(targetFunc, replacementFunc);
fs.writeFileSync('src/components/BungalowView.tsx', code);
console.log('Patched handleBulkCapacityChange!');
