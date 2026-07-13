const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Update ReportsView props in App.tsx
app = app.replace(
  '<ReportsView \n              logs={logs}\n              expenses={expenses}\n              participants={participants}\n              campCenters={campCenters}\n              tasks={tasks}\n              incidents={incidents}\n              healthIncidents={healthIncidents}\n              activities={activities}\n            />',
  '<ReportsView \n              logs={logs}\n              expenses={expenses}\n              participants={participants}\n              campCenters={campCenters}\n              tasks={tasks}\n              incidents={incidents}\n              healthIncidents={healthIncidents}\n              activities={activities}\n              surveys={surveys}\n              periods={periods}\n            />'
);
fs.writeFileSync('src/App.tsx', app);
