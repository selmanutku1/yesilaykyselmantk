const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `          {hasAccess('dashboard') && (
            <SidebarNavItem
              id="dashboard"
              label="Kontrol Paneli (Dashboard)"
              icon={LayoutDashboard}
              isActive={activeTab === 'dashboard'}
              isSidebarCollapsed={isSidebarCollapsed}
              onClick={() => handleActiveTabChange('dashboard')}
              hasAccessCheck={true}
              
            />
          )}`;

const newTargetStr = `          {hasAccess('dashboard') && (
            <SidebarNavItem
              id="dashboard"
              label="Kontrol Paneli (Dashboard)"
              icon={LayoutDashboard}
              isActive={activeTab === 'dashboard'}
              isSidebarCollapsed={isSidebarCollapsed}
              onClick={() => handleActiveTabChange('dashboard')}
              hasAccessCheck={true}
            />
          )}

          {hasAccess('kamp-planlama') && (
            <SidebarNavItem
              id="kamp-planlama"
              label="Kamp Planlama ve Dönem Yönetimi"
              icon={Calendar}
              isActive={activeTab === 'kamp-planlama'}
              isSidebarCollapsed={isSidebarCollapsed}
              onClick={() => handleActiveTabChange('kamp-planlama')}
              hasAccessCheck={true}
            />
          )}`;

content = content.replace(targetStr, newTargetStr);
fs.writeFileSync('src/App.tsx', content);
