const fs = require('fs');
let content = fs.readFileSync('src/components/PeriodManagementView.tsx', 'utf8');

const insertAfterStr = `  const handleDeactivatePeriod = (pId: string) => {`;
const deleteFuncStr = `  const handleDeletePeriod = (pId: string) => {
    const periodToDelete = periods.find(p => p.id === pId);
    if (!periodToDelete) return;
    
    // We assume the user wants to delete, window.confirm may be disabled in iframe
    const updated = periods.filter(p => p.id !== pId);
    onUpdatePeriods(updated);
    onAddLog('Dönem Silindi', \`"\${periodToDelete.name}" dönemi silindi.\`);
    setEditingPeriod(null);
  };

`;

content = content.replace(insertAfterStr, deleteFuncStr + insertAfterStr);

const modalActionStr = `<div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingPeriod(null)}
                  className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-sm transition"
                >
                  Güncelle
                </button>
              </div>`;

const newModalActionStr = `<div className="pt-4 flex justify-between items-center border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleDeletePeriod(editingPeriod.id)}
                  className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-xl transition flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Dönemi Sil
                </button>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingPeriod(null)}
                    className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-sm transition"
                  >
                    Güncelle
                  </button>
                </div>
              </div>`;

content = content.replace(modalActionStr, newModalActionStr);

fs.writeFileSync('src/components/PeriodManagementView.tsx', content);
