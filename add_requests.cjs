const fs = require('fs');
let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

const renderRequestsStr = `  const [newRequestTitle, setNewRequestTitle] = useState('');
  const [newRequestType, setNewRequestType] = useState('Malzeme');
  const [newRequestPriority, setNewRequestPriority] = useState('Normal');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleAddRequest = () => {
    if (!newRequestTitle.trim()) return;
    const newTask = {
      id: 'REQ-' + Math.floor(Math.random() * 10000),
      title: newRequestTitle,
      description: newRequestType + ' Talebi',
      status: 'Bekliyor',
      priority: newRequestPriority,
      department: 'Satın Alma',
      assignedTo: 'Atanmadı',
      dueDate: new Date().toISOString().split('T')[0]
    };
    onUpdateTasks([...tasks, newTask as any]);
    onAddLog('Yeni Talep', newRequestTitle + ' talebi oluşturuldu.');
    setShowRequestForm(false);
    setNewRequestTitle('');
  };

  const renderRequests = () => {
    const requestTasks = tasks.filter(t => t.department === 'Satın Alma' || t.id.startsWith('REQ-'));
    return (
      <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="font-extrabold text-gray-800 text-sm">Malzeme ve Satın Alma Talepleri</h3>
            <p className="text-xs text-gray-500 mt-0.5">Tesis ihtiyaçları ve sarf malzeme istekleri.</p>
          </div>
          <button 
            onClick={() => setShowRequestForm(!showRequestForm)}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3 rounded-lg transition cursor-pointer"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>{showRequestForm ? 'Vazgeç' : 'Yeni Talep Oluştur'}</span>
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {showRequestForm && (
            <div className="p-5 bg-gray-50 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Talep İçeriği / Malzeme</label>
                  <input 
                    type="text" 
                    value={newRequestTitle} 
                    onChange={e => setNewRequestTitle(e.target.value)} 
                    placeholder="Örn: 5 Kutu A4 Kağıt" 
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Kategori</label>
                  <select 
                    value={newRequestType} 
                    onChange={e => setNewRequestType(e.target.value)} 
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="Malzeme">Sarf Malzeme</option>
                    <option value="Hizmet">Hizmet / Bakım</option>
                    <option value="Demirbaş">Demirbaş</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Öncelik</label>
                  <select 
                    value={newRequestPriority} 
                    onChange={e => setNewRequestPriority(e.target.value)} 
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Acil">Acil</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button 
                  onClick={handleAddRequest}
                  disabled={!newRequestTitle.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm py-2 px-6 rounded-lg transition"
                >
                  Talebi İlet
                </button>
              </div>
            </div>
          )}
          {requestTasks.length > 0 ? requestTasks.map(task => (
            <div key={task.id} className="p-5 hover:bg-gray-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <ClipboardList className={\`w-5 h-5 \${task.priority === 'Acil' ? 'text-rose-500' : 'text-blue-500'}\`} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{task.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-2xs font-bold text-gray-400">Öncelik: <span className={task.priority === 'Acil' ? 'text-rose-600' : ''}>{task.priority}</span></span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                 <span className={\`px-2.5 py-1 rounded-lg text-xs font-bold bg-gray-100 text-gray-600\`}>
                  {task.status}
                </span>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => handleUpdateStatus(task.id, 'Onaylandı')} className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">Onayla</button>
                  <button onClick={() => handleUpdateStatus(task.id, 'Tamamlandı')} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">Teslim Edildi</button>
                  <button onClick={() => handleDeleteTask(task.id)} className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer">İptal</button>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-12 text-center text-gray-400">
              <ClipboardList className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="font-medium">Bekleyen talep bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    );
  };`;

content = content.replace('const renderIssues = () => (', renderRequestsStr + '\n\n  const renderIssues = () => (');

// Also update the call site in return:
content = content.replace(
  "{activeTab === 'requests' && renderPlaceholder('Malzeme ve Satın Alma Talepleri', 'Departmanların ihtiyaç duyduğu sarf malzeme ve onarım talepleri.', ClipboardList)}",
  "{activeTab === 'requests' && renderRequests()}"
);

fs.writeFileSync('src/components/TechnicalOperationsView.tsx', content);
