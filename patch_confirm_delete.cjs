const fs = require('fs');
let content = fs.readFileSync('src/components/PeriodManagementView.tsx', 'utf8');

const stateStr = `  const [selectedPeriodDetail, setSelectedPeriodDetail] = useState<CampPeriod | null>(null);`;
const newStateStr = `  const [selectedPeriodDetail, setSelectedPeriodDetail] = useState<CampPeriod | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);`;

content = content.replace(stateStr, newStateStr);

const deleteFuncStr = `  const handleDeletePeriod = (pId: string) => {
    const periodToDelete = periods.find(p => p.id === pId);
    if (!periodToDelete) return;
    
    // We assume the user wants to delete, window.confirm may be disabled in iframe
    const updated = periods.filter(p => p.id !== pId);
    onUpdatePeriods(updated);
    onAddLog('Dönem Silindi', \`"\${periodToDelete.name}" dönemi silindi.\`);
    setEditingPeriod(null);
  };`;

const newDeleteFuncStr = `  const handleDeletePeriod = (pId: string) => {
    const periodToDelete = periods.find(p => p.id === pId);
    if (!periodToDelete) return;
    
    const updated = periods.filter(p => p.id !== pId);
    onUpdatePeriods(updated);
    onAddLog('Dönem Silindi', \`"\${periodToDelete.name}" dönemi silindi.\`);
    setEditingPeriod(null);
    setIsConfirmingDelete(false);
  };`;

content = content.replace(deleteFuncStr, newDeleteFuncStr);

const closeBtn1 = `<button
                onClick={() => setEditingPeriod(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >`;
const newCloseBtn1 = `<button
                onClick={() => {
                  setEditingPeriod(null);
                  setIsConfirmingDelete(false);
                }}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >`;
              
content = content.replace(closeBtn1, newCloseBtn1);

const deleteActionStr = `<button
                  type="button"
                  onClick={() => handleDeletePeriod(editingPeriod.id)}
                  className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-xl transition flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Dönemi Sil
                </button>`;

const newDeleteActionStr = `{isConfirmingDelete ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-600 mr-1">Emin misiniz?</span>
                    <button
                      type="button"
                      onClick={() => handleDeletePeriod(editingPeriod.id)}
                      className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
                    >
                      Evet, Sil
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsConfirmingDelete(false)}
                      className="px-3 py-1.5 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition"
                    >
                      İptal
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsConfirmingDelete(true)}
                    className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-xl transition flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Dönemi Sil
                  </button>
                )}`;
                
content = content.replace(deleteActionStr, newDeleteActionStr);

const cancelBtnStr = `<button
                    type="button"
                    onClick={() => setEditingPeriod(null)}
                    className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition"
                  >
                    İptal
                  </button>`;
                  
const newCancelBtnStr = `<button
                    type="button"
                    onClick={() => {
                      setEditingPeriod(null);
                      setIsConfirmingDelete(false);
                    }}
                    className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition"
                  >
                    İptal
                  </button>`;

content = content.replace(cancelBtnStr, newCancelBtnStr);

fs.writeFileSync('src/components/PeriodManagementView.tsx', content);
