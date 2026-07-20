const fs = require('fs');
let code = fs.readFileSync('src/components/BungalowView.tsx', 'utf-8');

const target = `{/* Print / PDF Export Modal */}`;
const modalJSX = `
      {/* Bulk Capacity Confirmation Modal */}
      {bulkCapacityConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Düzen Değişikliği Onayı</h3>
            <p className="text-sm text-gray-600 mb-4">
              {bulkCapacityConfirm.modifiedBungalowCount} bungalovun kapasitesi {bulkCapacityConfirm.newCapacity}'e düşürüldü.
              {bulkCapacityConfirm.ejectedParticipantCount > 0 && (
                <span className="block mt-2 text-red-600 font-bold">
                  ⚠️ {bulkCapacityConfirm.ejectedParticipantCount} katılımcı yerinden çıkarıldı!
                </span>
              )}
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setBulkCapacityConfirm(null)}
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  onUpdateBungalows(bulkCapacityConfirm.updatedBungalows);
                  onUpdateParticipants(bulkCapacityConfirm.updatedParticipants);
                  setBulkCapacityConfirm(null);
                }}
                className="px-4 py-2 text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition"
              >
                Onayla ve Uygula
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print / PDF Export Modal */}`;

code = code.replace(target, modalJSX);
fs.writeFileSync('src/components/BungalowView.tsx', code);
console.log('Patched modal rendering!');
