import fs from 'fs';

let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

const sections = [
  { id: 'dashboard', divId: 'tech-dashboard-panel' },
  { id: 'issues', divId: 'tech-issues-list-view' },
  { id: 'requests', divId: 'tech-requests-list-view' },
  { id: 'ai-copilot', divId: 'tech-copilot-view' },
  { id: 'reports', divId: 'tech-reports-view' },
  { id: 'areas', divId: 'tech-areas-view' }
];

for (const section of sections) {
  const regex = new RegExp(
    `\\{\\(!activeSubView \\|\\| activeSubView === '${section.id}'\\) && \\([\\s\\S]*?<div className="[\\s\\S]*?" id="${section.divId}">`,
    'm'
  );
  
  content = content.replace(regex, `{activeSubView === '${section.id}' && (\n        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300" id="${section.divId}">`);
}

content = content.replace(/\{\/\* Accordion 1: Dashboard \*\/\}/g, '');
content = content.replace(/\{\/\* Accordion 2: Issues \*\/\}/g, '');
content = content.replace(/\{\/\* Accordion 3: Requests \*\/\}/g, '');
content = content.replace(/\{\/\* Accordion 4: AI Copilot \*\/\}/g, '');
content = content.replace(/\{\/\* Accordion 5: Reports \*\/\}/g, '');
content = content.replace(/\{\/\* Accordion 6: Areas \*\/\}/g, '');

content = content.replace(
/              <\/div>\n            \)\}\n          <\/div>\n        \)\}\n      <\/div>\n    \)\}/g,
'              </div>\n    )}'
);

fs.writeFileSync('src/components/TechnicalOperationsView.tsx', content);

console.log('done');
