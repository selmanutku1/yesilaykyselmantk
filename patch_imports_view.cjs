const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// add PeriodManagementView import
if (!content.includes('import PeriodManagementView')) {
    content = content.replace(
        "import DashboardView from './components/DashboardView';",
        "import DashboardView from './components/DashboardView';\nimport PeriodManagementView from './components/PeriodManagementView';"
    );
}

// add Calendar icon if missing
if (!content.includes('Calendar,')) {
    content = content.replace(
        "import { ",
        "import { Calendar, "
    );
}

// add rendering logic
const renderTarget = `{activeTab === 'dashboard' && (`;
const renderNew = `{activeTab === 'kamp-planlama' && (
            <PeriodManagementView
              periods={periods}
              onAddPeriod={(p) => setPeriods([...periods, p])}
              onUpdatePeriods={setPeriods}
              onAddLog={addSystemLog}
              campCenters={CAMP_CENTERS}
              selectedCampCenterId={selectedCampCenterId}
            />
          )}

          {activeTab === 'dashboard' && (`

content = content.replace(renderTarget, renderNew);

fs.writeFileSync('src/App.tsx', content);
