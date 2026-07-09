const fs = require('fs');
let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

if (!content.includes('import VoiceNoteButton')) {
  content = content.replace("import { Task, ShiftAssignment, TechnicalIssue, SupplyRequest } from '../types';", "import { Task, ShiftAssignment, TechnicalIssue, SupplyRequest } from '../types';\nimport VoiceNoteButton from './VoiceNoteButton';");
}

const stateRepl = `const [activeTab, setActiveTab] = useState(activeSubView);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'Normal' | 'Acil' | 'Kritik'>('Normal');
  const [newTaskDepartment, setNewTaskDepartment] = useState('Teknik');`;
content = content.replace('const [activeTab, setActiveTab] = useState(activeSubView);', stateRepl);

const taskFilterStr = `const completedTasks = techTasks.filter(t => t.status === 'Tamamlandı');`;
const addTaskFn = `const completedTasks = techTasks.filter(t => t.status === 'Tamamlandı');

  const handleAddTask = () => {
    if (!newTaskTitle.trim() || !newTaskDesc.trim()) return;
    const newTask = {
      id: 'TSK-' + Math.floor(Math.random() * 10000),
      title: newTaskTitle,
      description: newTaskDesc,
      status: 'Bekliyor',
      priority: newTaskPriority,
      department: newTaskDepartment,
      assignedTo: 'Atanmadı',
      dueDate: new Date().toISOString().split('T')[0]
    };
    onUpdateTasks([...tasks, newTask as Task]);
    onAddLog('Yeni Görev', newTaskTitle + ' görevi oluşturuldu.');
    setShowAddForm(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskPriority('Normal');
  };`;
content = content.replace(taskFilterStr, addTaskFn);

const headerBtnStr = `<button className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3 rounded-lg transition cursor-pointer">
          <Wrench className="w-3.5 h-3.5" />
          <span>Yeni Arıza Bildir</span>
        </button>`;
const newHeaderBtnStr = `<button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3 rounded-lg transition cursor-pointer"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Vazgeç' : 'Yeni Arıza Bildir'}</span>
        </button>`;
content = content.replace(headerBtnStr, newHeaderBtnStr);

const listDivStr = `<div className="divide-y divide-gray-100">`;
const formUiStr = `<div className="divide-y divide-gray-100">
        {showAddForm && (
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
content = content.replace(listDivStr, formUiStr);

fs.writeFileSync('src/components/TechnicalOperationsView.tsx', content);
