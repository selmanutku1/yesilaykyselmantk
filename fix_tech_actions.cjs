const fs = require('fs');
let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

const handleAddTask = `  const handleAddTask = () => {`;
const handleUpdateStatus = `  const handleUpdateStatus = (taskId: string, newStatus: string) => {
    onUpdateTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    onAddLog('Teknik Görev', taskId + ' numaralı görev ' + newStatus + ' olarak işaretlendi.');
  };
  
  const handleDeleteTask = (taskId: string) => {
    if(confirm('Bu görevi silmek istediğinize emin misiniz?')) {
       onUpdateTasks(tasks.filter(t => t.id !== taskId));
       onAddLog('Teknik Görev', taskId + ' numaralı görev silindi.');
    }
  };

  const handleAddTask = () => {`;

content = content.replace(handleAddTask, handleUpdateStatus);

// Inside renderIssues() and renderDashboard(), fix the buttons.
// Find: <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">Müdahale Et</button>
// Replace with dropdown or actions.

const actionButtonsStr = `              <div className="flex items-center gap-2">
                <button onClick={() => handleUpdateStatus(task.id, 'Devam Ediyor')} className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">Müdahale Et</button>
                <button onClick={() => handleUpdateStatus(task.id, 'Tamamlandı')} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">Tamamla</button>
                <button onClick={() => handleDeleteTask(task.id)} className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer">Sil</button>
              </div>`;

content = content.replace(/<button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">Müdahale Et<\/button>/g, actionButtonsStr);

fs.writeFileSync('src/components/TechnicalOperationsView.tsx', content);
