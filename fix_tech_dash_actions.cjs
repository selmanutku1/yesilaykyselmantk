const fs = require('fs');
let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

const oldSpanStr = `              <span className={\`px-2.5 py-1 rounded-lg text-xs font-bold \${
                task.status === 'Tamamlandı' ? 'bg-emerald-50 text-emerald-700' :
                task.status === 'Devam Ediyor' ? 'bg-amber-50 text-amber-700' :
                'bg-gray-100 text-gray-600'
              }\`}>
                {task.status}
              </span>`;

const newSpanStr = `              <div className="flex items-center gap-3">
                <span className={\`px-2.5 py-1 rounded-lg text-xs font-bold \${
                  task.status === 'Tamamlandı' ? 'bg-emerald-50 text-emerald-700' :
                  task.status === 'Devam Ediyor' ? 'bg-amber-50 text-amber-700' :
                  'bg-gray-100 text-gray-600'
                }\`}>
                  {task.status}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleUpdateStatus(task.id, 'Devam Ediyor')} className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">Müdahale Et</button>
                  <button onClick={() => handleUpdateStatus(task.id, 'Tamamlandı')} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">Tamamla</button>
                  <button onClick={() => handleDeleteTask(task.id)} className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer">Sil</button>
                </div>
              </div>`;

content = content.replace(oldSpanStr, newSpanStr);
fs.writeFileSync('src/components/TechnicalOperationsView.tsx', content);
