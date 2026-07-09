const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
const searchStr = `<ReportsView 
              logs={logs}
              expenses={expenses}
              participants={participants}
              campCenters={campCenters}
            />`;
const replaceStr = `<ReportsView 
              logs={logs}
              expenses={expenses}
              participants={participants}
              campCenters={campCenters}
              tasks={tasks}
              incidents={incidents}
              healthIncidents={healthIncidents}
              activities={activities}
            />`;
content = content.replace(searchStr, replaceStr);
fs.writeFileSync('src/App.tsx', content);
