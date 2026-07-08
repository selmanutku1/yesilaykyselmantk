const fs = require('fs');
let content = fs.readFileSync('src/components/RegistrationView.tsx', 'utf8');

const importSearch = `import { 
  FileEdit,`;
const newImportSearch = `import { Search } from 'lucide-react';\nimport { 
  FileEdit,`;

if (!content.includes('Search } from \'lucide-react\'')) {
  content = content.replace(importSearch, newImportSearch);
}

const stateRegex = /const \[copiedLink, setCopiedLink\] = useState\(false\);/;
content = content.replace(stateRegex, `const [copiedLink, setCopiedLink] = useState(false);\n  const [searchTerm, setSearchTerm] = useState('');`);

const appFilterStr = `  const applications = participants.filter(
    (p) => (p.status === 'Başvuru Yapıldı' || p.status === 'Yedek Listede') && p.convoyName && p.convoyName.trim() !== ''
  );`;

const newAppFilterStr = `  const applications = participants.filter(
    (p) => (p.status === 'Başvuru Yapıldı' || p.status === 'Yedek Listede') && p.convoyName && p.convoyName.trim() !== ''
  ).filter(p => 
    searchTerm.trim() === '' || 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.identityNumber.includes(searchTerm) ||
    p.convoyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );`;

content = content.replace(appFilterStr, newAppFilterStr);

const renderSearchStr = `{/* GROUPED ACCORDION VIEW OF APPLICATIONS BY INSTITUTION / CONVOY */}`;
const newRenderSearchStr = `
          {/* SEARCH BAR */}
          <div className="mb-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Başvurularda ara (İsim, T.C. Kimlik No veya Kafile)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-250 rounded-lg text-xs w-full focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
          
          {/* GROUPED ACCORDION VIEW OF APPLICATIONS BY INSTITUTION / CONVOY */}`;
content = content.replace(renderSearchStr, newRenderSearchStr);

fs.writeFileSync('src/components/RegistrationView.tsx', content);
