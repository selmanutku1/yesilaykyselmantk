const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const injection = `
          onDataAction={(actionName, data) => {
            if (actionName === 'CREATE_CAMP_PERIOD') {
              const newPeriod = { id: \`PRD-\${Date.now()}\`, ...data };
              setPeriods([...periods, newPeriod]);
              addNotification('Sistem (YeşilAI)', \`Yeni kamp dönemi eklendi: \${data.name}\`, 'success');
              handleActiveTabChange('kamp-planlama');
            } else if (actionName === 'ADD_PARTICIPANT') {
              const newParticipant = { id: \`STD-\${Date.now()}\`, ...data };
              setParticipants([...participants, newParticipant]);
              addNotification('Sistem (YeşilAI)', \`Yeni katılımcı eklendi: \${data.firstName} \${data.lastName}\`, 'success');
              handleActiveTabChange('katilimci');
            } else if (actionName === 'ADD_HEALTH_INCIDENT') {
              const incident = { id: \`INC-\${Date.now()}\`, ...data };
              setHealthIncidents([...healthIncidents, incident]);
              addNotification('Sistem (YeşilAI)', \`Sağlık vakası kaydedildi.\`, 'warning');
              handleActiveTabChange('revir');
            }
          }}
`;

code = code.replace(
  "onThemeChange={setTheme}",
  "onThemeChange={setTheme}\n" + injection
);

fs.writeFileSync('src/App.tsx', code);
