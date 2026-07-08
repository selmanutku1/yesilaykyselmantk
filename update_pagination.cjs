const fs = require('fs');
let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

// replace fixed ITEMS_PER_PAGE with state
content = content.replace(
  'const [currentPage, setCurrentPage] = useState(1);\n  const ITEMS_PER_PAGE = 15;',
  'const [currentPage, setCurrentPage] = useState(1);\n  const [itemsPerPage, setItemsPerPage] = useState(15);'
);
content = content.replace(
  'const ITEMS_PER_PAGE = 15;',
  'const [itemsPerPage, setItemsPerPage] = useState(15);'
);

// replace ITEMS_PER_PAGE with itemsPerPage in calculations
content = content.replace(/ITEMS_PER_PAGE/g, 'itemsPerPage');

// Add the selector in pagination UI
const oldPaginationStr = `                  <div className="text-xs text-gray-500 font-semibold">
                    Toplam <span className="font-extrabold text-gray-900">{filteredParticipants.length}</span> kayıttan <span className="font-extrabold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-extrabold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredParticipants.length)}</span> arası gösteriliyor.
                  </div>`;

const newPaginationStr = `                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-500 font-semibold">
                      Toplam <span className="font-extrabold text-gray-900">{filteredParticipants.length}</span> kayıttan <span className="font-extrabold text-gray-900">{filteredParticipants.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> - <span className="font-extrabold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredParticipants.length)}</span> arası gösteriliyor.
                    </div>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="text-xs border border-gray-200 rounded p-1 bg-gray-50 text-gray-700 outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value={10}>10 satır</option>
                      <option value={15}>15 satır</option>
                      <option value={20}>20 satır</option>
                      <option value={50}>50 satır</option>
                    </select>
                  </div>`;

content = content.replace(oldPaginationStr, newPaginationStr);

fs.writeFileSync('src/components/ParticipantView.tsx', content);
