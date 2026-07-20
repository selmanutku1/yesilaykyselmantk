const fs = require('fs');
let code = fs.readFileSync('src/components/BungalowView.tsx', 'utf-8');

// 1. Add state
const stateTarget = `const [confirmDialog, setConfirmDialog] = useState<{`;
const stateReplacement = `  const [bulkCapacityConfirm, setBulkCapacityConfirm] = useState<{
    isOpen: boolean;
    newCapacity: number;
    modifiedBungalowCount: number;
    ejectedParticipantCount: number;
    updatedParticipants: any[];
    updatedBungalows: any[];
  } | null>(null);
  
  const [confirmDialog, setConfirmDialog] = useState<{`;
code = code.replace(stateTarget, stateReplacement);

// 2. Change handleBulkCapacityChange to use custom state instead of confirm()
const funcTarget = `    if (modifiedBungalowCount > 0) {
      if (confirm(\`\${modifiedBungalowCount} adet bungalov \${newCapacity} kişilik düzene geçirilecek.\${ejectedParticipantCount > 0 ? \` \\n\\nDİKKAT: \${newCapacity} kapasitenin üzerindeki yataklarda kalan \${ejectedParticipantCount} katılımcının odadan çıkışı yapılacak!\` : ''}\\n\\nOnaylıyor musunuz?\`)) {
        onUpdateParticipants(updatedParticipants);
        onUpdateBungalows(updatedBungalows);
        onAddLog("Oda Düzeni Değiştirildi", \`\${modifiedBungalowCount} oda \${newCapacity} kişilik düzene geçirildi. \${ejectedParticipantCount > 0 ? \`\${ejectedParticipantCount} katılımcı odadan çıkarıldı.\` : ''}\`);
      }
    } else {
      alert("Odalar zaten bu kapasitede.");
    }`;

const funcReplacement = `    if (modifiedBungalowCount > 0) {
      setBulkCapacityConfirm({
        isOpen: true,
        newCapacity,
        modifiedBungalowCount,
        ejectedParticipantCount,
        updatedParticipants,
        updatedBungalows
      });
    } else {
      alert("Odalar zaten bu kapasitede.");
    }`;
code = code.replace(funcTarget, funcReplacement);

// 3. Add Modal JSX at the end, right before final </div>
const modalJsxTarget = `      {/* Delete/Vacate Confirmation Dialog */}`;
const modalJsxReplacement = `      {/* Bulk Capacity Confirmation Modal */}
      {bulkCapacityConfirm && bulkCapacityConfirm.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 bg-gray-50/50">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Düzen Değişikliği Onayı</h3>
              <p className="text-sm font-medium text-gray-500 mt-2">
                <strong className="text-gray-900">{bulkCapacityConfirm.modifiedBungalowCount} adet</strong> bungalov <strong className="text-gray-900">{bulkCapacityConfirm.newCapacity} kişilik</strong> düzene geçirilecek.
              </p>
            </div>
            
            <div className="p-6 bg-white space-y-4">
              {bulkCapacityConfirm.ejectedParticipantCount > 0 ? (
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-red-900">Kritik Uyarı!</h4>
                    <p className="text-xs text-red-700 mt-1 leading-relaxed">
                      Yeni kapasite ({bulkCapacityConfirm.newCapacity}), bazı odalardaki mevcut kişi sayısından daha düşük. Bu nedenle <strong className="font-black">{bulkCapacityConfirm.ejectedParticipantCount} katılımcının</strong> odayla ilişiği kesilecek ve yerleşimleri sıfırlanacaktır.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-800 font-medium">Bu işlem sonucunda hiçbir katılımcı odasından çıkarılmayacaktır. Tüm odaların kapasitesi güncellenecektir.</p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setBulkCapacityConfirm(null)}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
              >
                İptal Et
              </button>
              <button
                onClick={() => {
                  onUpdateParticipants(bulkCapacityConfirm.updatedParticipants);
                  onUpdateBungalows(bulkCapacityConfirm.updatedBungalows);
                  onAddLog(
                    "Oda Düzeni Değiştirildi",
                    \`\${bulkCapacityConfirm.modifiedBungalowCount} oda \${bulkCapacityConfirm.newCapacity} kişilik düzene geçirildi. \${
                      bulkCapacityConfirm.ejectedParticipantCount > 0
                        ? \`\${bulkCapacityConfirm.ejectedParticipantCount} katılımcı odadan çıkarıldı.\`
                        : ''
                    }\`
                  );
                  setBulkCapacityConfirm(null);
                }}
                className="px-6 py-2.5 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors shadow-md flex items-center gap-2"
              >
                Onaylıyorum, Uygula
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete/Vacate Confirmation Dialog */}`;
code = code.replace(modalJsxTarget, modalJsxReplacement);

fs.writeFileSync('src/components/BungalowView.tsx', code);
console.log("Patched bulk confirmation!");
