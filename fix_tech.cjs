const fs = require('fs');
let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

const addFormHtml = `{showAddForm && (
          <div className="p-5 bg-gray-50 border-b border-gray-100 space-y-4">
            <h4 className="font-bold text-sm text-gray-800">Yeni Arıza / Görev Bildir</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Başlık</label>
                <input 
                  type="text" 
                  value={newTaskTitle} 
                  onChange={e => setNewTaskTitle(e.target.value)} 
                  placeholder="Örn: Elektrik Kesintisi" 
                  className="w-full p-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Öncelik</label>
                <select 
                  value={newTaskPriority} 
                  onChange={e => setNewTaskPriority(e.target.value as any)} 
                  className="w-full p-2 border rounded-lg text-sm"
                >
                  <option value="Normal">Normal</option>
                  <option value="Acil">Acil</option>
                  <option value="Kritik">Kritik</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-600">Açıklama / Detay</label>
                  <VoiceNoteButton onTranscript={(t) => setNewTaskDesc(prev => prev ? prev + ' ' + t : t)} />
                </div>
                <textarea 
                  value={newTaskDesc} 
                  onChange={e => setNewTaskDesc(e.target.value)} 
                  placeholder="Arıza detayı ve nerede olduğu..." 
                  className="w-full p-2 border rounded-lg text-sm h-20"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button 
                onClick={handleAddTask}
                disabled={!newTaskTitle.trim() || !newTaskDesc.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm py-2 px-6 rounded-lg transition"
              >
                Kaydet
              </button>
            </div>
          </div>
        )}`;

// Add the form to renderIssues() right after the opening of the divide-y div
const issueDivStr = '<div className="divide-y divide-gray-100">';
content = content.replace('  const renderIssues = () => (\n    <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">\n      <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">', 
  '  const renderIssues = () => (\n    <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">\n      <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">'
);
content = content.replace(
  '      </div>\n      <div className="divide-y divide-gray-100">\n        {pendingTasks.length > 0 ? pendingTasks.map(task => (',
  '      </div>\n      <div className="divide-y divide-gray-100">\n        ' + addFormHtml + '\n        {pendingTasks.length > 0 ? pendingTasks.map(task => ('
);

fs.writeFileSync('src/components/TechnicalOperationsView.tsx', content);
