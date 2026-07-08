const fs = require('fs');

let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

const targetUseState = `  const [activeTab, setActiveTab] = useState<"list" | "reports">("list");`;
const newStates = `  const [activeTab, setActiveTab] = useState<"list" | "reports">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;`;

if (!content.includes('const [currentPage')) {
  content = content.replace(targetUseState, newStates);
}

const targetEffect = `  const filteredParticipants = participants.filter((p) => {`;
const newEffect = `  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, periodFilter, statusFilter, categoryFilter, participants.length]);

  const filteredParticipants = participants.filter((p) => {`;

if (!content.includes('setCurrentPage(1)')) {
  content = content.replace(targetEffect, newEffect);
}

const paginatedLogic = `  const filteredParticipants = participants.filter((p) => {
    // Search
    const searchMatch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.identityNumber.includes(searchTerm) ||
      (p.groupName && p.groupName.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filters
    const periodMatch = periodFilter === "All" || p.campPeriodId === periodFilter;
    const statusMatch = statusFilter === "All" || p.status === statusFilter;
    const categoryMatch = categoryFilter === "All" || p.category === categoryFilter;

    return searchMatch && periodMatch && statusMatch && categoryMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE));
  const paginatedParticipants = filteredParticipants.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);`;

const oldLogic = `  const filteredParticipants = participants.filter((p) => {
    // Search
    const searchMatch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.identityNumber.includes(searchTerm) ||
      (p.groupName && p.groupName.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filters
    const periodMatch = periodFilter === "All" || p.campPeriodId === periodFilter;
    const statusMatch = statusFilter === "All" || p.status === statusFilter;
    const categoryMatch = categoryFilter === "All" || p.category === categoryFilter;

    return searchMatch && periodMatch && statusMatch && categoryMatch;
  });`;

if (!content.includes('paginatedParticipants')) {
  content = content.replace(oldLogic, paginatedLogic);
}

content = content.replace(/filteredParticipants\.map\(\(p\)/g, 'paginatedParticipants.map((p)');

const targetTableEnd = `                    </tbody>
                  </table>
                </div>
              ) : (`;

const paginationUI = `                    </tbody>
                  </table>
                </div>
              ) : (`;

// We need to add pagination UI after the views end. 
// Let's find the end of the view section.
