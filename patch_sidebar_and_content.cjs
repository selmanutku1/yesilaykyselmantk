const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add the import
if (!content.includes('import ReportsView')) {
  content = content.replace("import DashboardView from './components/DashboardView';", "import DashboardView from './components/DashboardView';\nimport ReportsView from './components/ReportsView';");
}

const sidebarInsert = `          {hasAccess('raporlar') && (
            <SidebarNavItem
              id="raporlar"
              label="Faaliyet Raporları"
              icon={BarChart2}
              isActive={activeTab === 'raporlar'}
              isSidebarCollapsed={isSidebarCollapsed}
              onClick={() => handleActiveTabChange('raporlar')}
              hasAccessCheck={true}
            />
          )}`;

if (!content.includes('id="raporlar"')) {
  content = content.replace(
    /({hasAccess\('anket-analizi'\) && \([\s\S]*?<\/>\s*\}[\s\S]*?<\/React.Fragment>\s*\)\s*})/m,
    `{hasAccess('anket-analizi') && (
            <SidebarNavItem
              id="anket-analizi"
              label="Kamp Sonu Değerlendirme Analizi"
              icon={FileText}
              isActive={activeTab === 'anket-analizi'}
              isSidebarCollapsed={isSidebarCollapsed}
              onClick={() => handleActiveTabChange('anket-analizi')}
              hasAccessCheck={true}
            />
          )}\n\n` + sidebarInsert
  );
}

const mainContentInsert = `          {activeTab === 'raporlar' && (
            <ReportsView 
              logs={systemLogs}
              expenses={expenses}
              participants={participants}
              campCenters={campCenters}
            />
          )}`;

if (!content.includes("activeTab === 'raporlar'")) {
  content = content.replace(
    /{activeTab === 'anket-analizi' && \([\s\S]*?\)\}/m,
    `{activeTab === 'anket-analizi' && (
            <SurveyAnalysisView
              participants={participants}
              periods={campPeriods}
              onNavigateToParticipant={(id) => {
                setHighlightedParticipantId(id);
                handleActiveTabChange('katilimci');
              }}
              onAddLog={addSystemLog}
            />
          )}\n\n` + mainContentInsert
  );
}

// Add BarChart2 icon
content = content.replace('BarChart,', 'BarChart, BarChart2,');

fs.writeFileSync('src/App.tsx', content);
