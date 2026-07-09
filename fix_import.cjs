const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');
content = content.replace('  HelpCircle\n  Mic,\n} from \'lucide-react\';', '  HelpCircle,\n  Mic,\n  Sparkles\n} from \'lucide-react\';');
fs.writeFileSync('src/components/DashboardView.tsx', content);
