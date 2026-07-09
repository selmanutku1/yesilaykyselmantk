const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

// Fix Duplicate Sparkles
content = content.replace("  Sparkles\n} from 'lucide-react';", "} from 'lucide-react';");

// Fix user -> userName
content = content.replace('log.user', 'log.userName');
content = content.replace('log.user', 'log.userName');
content = content.replace('log.user', 'log.userName');

fs.writeFileSync('src/components/DashboardView.tsx', content);
