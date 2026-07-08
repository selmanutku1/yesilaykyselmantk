const fs = require('fs');
let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

const targetUseState = '  const [viewMode, setViewMode] = useState<"table" | "grid">("table");';
const newStates = '  const [viewMode, setViewMode] = useState<"table" | "grid">("table");\n  const [currentPage, setCurrentPage] = useState(1);\n  const ITEMS_PER_PAGE = 15;';

if (!content.includes('const [currentPage')) {
  content = content.replace(targetUseState, newStates);
}

fs.writeFileSync('src/components/ParticipantView.tsx', content);
