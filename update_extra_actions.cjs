const fs = require('fs');
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

const injection = `
            } else if (actionName === 'CREATE_TASK') {
              const newTask = { id: \`TSK-\${Date.now()}\`, history: [], ...data };
              setTasks([...tasks, newTask]);
              addNotification('Sistem (YeşilAI)', \`Yeni görev atandı: \${data.title}\`, 'info');
              handleActiveTabChange('teknik');
            } else if (actionName === 'ADD_BUNGALOW') {
              const newBungalow = { id: \`BNG-\${Date.now()}\`, currentOccupants: 0, status: 'Müsait', conditions: { cleanliness: 100, maintenance: 100, lastCleaned: new Date().toISOString() }, issues: [], ...data };
              setBungalows([...bungalows, newBungalow]);
              addNotification('Sistem (YeşilAI)', \`Yeni bungalov eklendi: \${data.number}\`, 'success');
              handleActiveTabChange('bungalov');
`;

appCode = appCode.replace(
  "} else if (actionName === 'ADD_HEALTH_INCIDENT') {",
  injection + "            } else if (actionName === 'ADD_HEALTH_INCIDENT') {"
);

fs.writeFileSync('src/App.tsx', appCode);

let serverCode = fs.readFileSync('server.ts', 'utf8');
const instructionUpdate = `  * ADD_HEALTH_INCIDENT: Yeni bir sağlık vakası ekler. data formatı: { participantId: string, date: string, type: 'Yaralanma'|'Hastalık'|'Diğer', description: string, status: 'Açık' }
  * CREATE_TASK: Yeni görev oluşturur (teknik/temizlik). data formatı: { title: string, description: string, assignedToName: string, department: 'Temizlik'|'Güvenlik'|'Teknik', status: 'Bekliyor', priority: 'Yüksek' }
  * ADD_BUNGALOW: Yeni bungalov ekler. data formatı: { number: string, campCenterId: "C01", capacity: number, genderType: 'Erkek'|'Kadın'|'Karışık/Aile' }`;

serverCode = serverCode.replace(
  "* ADD_HEALTH_INCIDENT: Yeni bir sağlık vakası ekler. data formatı: { participantId: string, date: string, type: 'Yaralanma'|'Hastalık'|'Diğer', description: string, status: 'Açık' }",
  instructionUpdate
);

fs.writeFileSync('server.ts', serverCode);
