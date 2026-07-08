const fs = require('fs');
let content = fs.readFileSync('src/components/PeriodManagementView.tsx', 'utf8');

const importStr = `import { Sparkles, Calendar, Users, Edit2, Plus, Check, Share2, AlertTriangle, ShieldCheck, FileText, ChevronRight, CheckCircle2, ChevronDown, Trash2 } from 'lucide-react';`;
if (!content.includes('Search } from')) {
  content = content.replace(importStr, `import { Search, Sparkles, Calendar, Users, Edit2, Plus, Check, Share2, AlertTriangle, ShieldCheck, FileText, ChevronRight, CheckCircle2, ChevronDown, Trash2 } from 'lucide-react';`);
}

const stateStr = `const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);`;
content = content.replace(stateStr, `const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);\n  const [searchTerm, setSearchTerm] = useState('');`);

const mapStr = `{periods.map((per) => (`;
const newMapStr = `{periods.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((per) => (`;
content = content.replace(mapStr, newMapStr);

const headerStr = `<div className="flex justify-between items-center gap-2 flex-wrap">
              <h4 className="text-2xs font-extrabold text-gray-400 tracking-wider uppercase">Dönem Listesi</h4>
            </div>`;
const newHeaderStr = `<div className="flex justify-between items-center gap-2 flex-wrap mb-2">
              <h4 className="text-2xs font-extrabold text-gray-400 tracking-wider uppercase">Dönem Listesi</h4>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Dönem ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-emerald-500"
                />
              </div>
            </div>`;
content = content.replace(headerStr, newHeaderStr);

fs.writeFileSync('src/components/PeriodManagementView.tsx', content);
