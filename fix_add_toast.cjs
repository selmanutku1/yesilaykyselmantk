const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/addNotification\('Sistem \(YeşilAI\)', `Yeni kamp dönemi eklendi: \$\{data\.name\}`, 'success'\);/g, "addToast(`Yeni kamp dönemi eklendi: ${data.name}`, 'info');");
code = code.replace(/addNotification\('Sistem \(YeşilAI\)', `Yeni katılımcı eklendi: \$\{data\.firstName\} \$\{data\.lastName\}`, 'success'\);/g, "addToast(`Yeni katılımcı eklendi: ${data.firstName} ${data.lastName}`, 'info');");
code = code.replace(/addNotification\('Sistem \(YeşilAI\)', `Yeni görev atandı: \$\{data\.title\}`, 'info'\);/g, "addToast(`Yeni görev atandı: ${data.title}`, 'info');");
code = code.replace(/addNotification\('Sistem \(YeşilAI\)', `Yeni bungalov eklendi: \$\{data\.number\}`, 'success'\);/g, "addToast(`Yeni bungalov eklendi: ${data.number}`, 'info');");
code = code.replace(/addNotification\('Sistem \(YeşilAI\)', `Sağlık vakası kaydedildi.`, 'warning'\);/g, "addToast(`Sağlık vakası kaydedildi.`, 'warning');");

fs.writeFileSync('src/App.tsx', code);
