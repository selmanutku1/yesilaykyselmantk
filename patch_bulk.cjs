const fs = require('fs');
let code = fs.readFileSync('src/components/BungalowView.tsx', 'utf-8');

const target1 = `  const handleAdd100Participants = () => {`;
const replacement1 = `  const handleBulkCapacityChange = (newCapacity: number) => {
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
    });

    if (modifiedBungalowCount > 0) {
      if (confirm(\`\${modifiedBungalowCount} adet bungalov \${newCapacity} kişilik düzene geçirilecek.\${ejectedParticipantCount > 0 ? \` \\n\\nDİKKAT: \${newCapacity} kapasitenin üzerindeki yataklarda kalan \${ejectedParticipantCount} katılımcının odadan çıkışı yapılacak!\` : ''}\\n\\nOnaylıyor musunuz?\`)) {
        onUpdateParticipants(updatedParticipants);
        onUpdateBungalows(updatedBungalows);
        onAddLog("Oda Düzeni Değiştirildi", \`\${modifiedBungalowCount} oda \${newCapacity} kişilik düzene geçirildi. \${ejectedParticipantCount > 0 ? \`\${ejectedParticipantCount} katılımcı odadan çıkarıldı.\` : ''}\`);
      }
    } else {
      alert("Odalar zaten bu kapasitede.");
    }
  };

  const handleAdd100Participants = () => {`;

if (code.includes(target1)) {
    code = code.replace(target1, replacement1);
    fs.writeFileSync('src/components/BungalowView.tsx', code);
    console.log('Bulk func added!');
} else {
    console.log('Bulk func target missing!');
}
