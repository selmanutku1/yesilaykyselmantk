const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Import
content = content.replace("import LoginView from './components/LoginView';", "import LoginView from './components/LoginView';\nimport SystemUpdatesView from './components/SystemUpdatesView';");

// 2. Type definition
content = content.replace(" | 'olay-kayit')[];", " | 'olay-kayit' | 'sistem-guncellemeleri')[];");

// 3. Update admins and mudur
content = content.replace(/'dokümanlar', 'ayarlar', 'sistem-loglari', 'dijital-arsiv', 'olay-kayit']/g, "'dokümanlar', 'ayarlar', 'sistem-loglari', 'dijital-arsiv', 'olay-kayit', 'sistem-guncellemeleri']");
content = content.replace(/'dokümanlar', 'ayarlar', 'dijital-arsiv', 'olay-kayit']/g, "'dokümanlar', 'ayarlar', 'dijital-arsiv', 'olay-kayit', 'sistem-guncellemeleri']");

// 4. Sidebar section
const systemStandardsHeader = `{(hasAccess('dokümanlar') || hasAccess('ayarlar') || hasAccess('dijital-arsiv') || hasAccess('olay-kayit')) && (
            <span className={\`text-4xs font-extrabold text-gray-400 tracking-widest uppercase mt-6 mb-2 px-3 block \${isSidebarCollapsed ? 'lg:hidden' : 'block'}\`}>SİSTEM STANDARTLARI</span>
          )}`;

const systemStandardsHeaderNew = `{(hasAccess('dokümanlar') || hasAccess('ayarlar') || hasAccess('dijital-arsiv') || hasAccess('olay-kayit') || hasAccess('sistem-guncellemeleri')) && (
            <span className={\`text-4xs font-extrabold text-gray-400 tracking-widest uppercase mt-6 mb-2 px-3 block \${isSidebarCollapsed ? 'lg:hidden' : 'block'}\`}>SİSTEM STANDARTLARI</span>
          )}
          {hasAccess('sistem-guncellemeleri') && (
            <SidebarNavItem
              id="sistem-guncellemeleri"
              label="Sistem Güncellemeleri"
              icon={Sparkles}
              isActive={activeTab === 'sistem-guncellemeleri'}
              isSidebarCollapsed={isSidebarCollapsed}
              onClick={() => handleActiveTabChange('sistem-guncellemeleri')}
              hasAccessCheck={true}
            />
          )}`;

content = content.replace(systemStandardsHeader, systemStandardsHeaderNew);

// 5. Main content routing
const olayKayitCase = `            {activeTab === 'olay-kayit' && (
              <IncidentLogView
                currentUser={currentUser}
                campCenters={campCenters}
                selectedCampCenterId={selectedCenterId}
              />
            )}`;

const guncellemeCase = `            {activeTab === 'olay-kayit' && (
              <IncidentLogView
                currentUser={currentUser}
                campCenters={campCenters}
                selectedCampCenterId={selectedCenterId}
              />
            )}
            {activeTab === 'sistem-guncellemeleri' && (
              <SystemUpdatesView />
            )}`;

content = content.replace(olayKayitCase, guncellemeCase);

fs.writeFileSync('src/App.tsx', content);
