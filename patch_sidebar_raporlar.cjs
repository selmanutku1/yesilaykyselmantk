const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

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

const target = `            />
          )}

          {(hasAccess('dokümanlar')`;

content = content.replace(target, `            />
          )}

` + sidebarInsert + `

          {(hasAccess('dokümanlar')`);

fs.writeFileSync('src/App.tsx', content);
