const fs = require('fs');
const file = 'src/components/ParticipantView.tsx';
let content = fs.readFileSync(file, 'utf8');

// Patch handlePrintBadge
content = content.replace(
  `  const handlePrintBadge = (
    p: Participant,
    groupName: string,
    groupColor: string,
  ) => {
    const badgeHtml = \`
      <html>
        <head>
          <title>Yeşilay Kamp Katılım Kartı - \${p.name}</title>
          <style>`,
  `  const handlePrintBadge = (
    p: Participant,
    groupName: string,
    groupColor: string,
  ) => {
    if (window.self !== window.top) {
      setShowPrintWarning(true);
      return;
    }
    const badgeHtml = \`
          <style>
            #print-section {
              background-color: white;
              width: 100%;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }`
);

content = content.replace(
  `            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
            body {`,
  `            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
            #print-section * {`
);

content = content.replace(
  `        </body>
      </html>
    \`;`,
  `    \`;`
);

content = content.replace(
  `            <div class="badge-body">
              <div class="avatar-container">
                \${p.name`,
  `            <div class="badge-body">
              <div class="avatar-container">
                \${(p.name || "")`
);

content = content.replace(
  `\${p.identityNumber.slice(0, 3)}******\${p.identityNumber.slice(-2)}`,
  `\${p.identityNumber ? p.identityNumber.slice(0, 3) + "******" + p.identityNumber.slice(-2) : "GİRİLMEDİ"}`
);

// Patch handlePrintBulkBadges
content = content.replace(
  `  const handlePrintBulkBadges = () => {
    const selectedParticipantsList = participants.filter((p) =>`,
  `  const handlePrintBulkBadges = () => {
    if (window.self !== window.top) {
      setShowPrintWarning(true);
      return;
    }
    const selectedParticipantsList = participants.filter((p) =>`
);

content = content.replace(
  `        <head>
          <title>Toplu Yaka Kartı Yazdırma</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
            body {`,
  `          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
            #print-section * {`
);

content = content.replace(
  `            }
          </style>
        </head>
        <body>`,
  `            }
          </style>`
);

content = content.replace(
  `        </body>
      </html>
    \`;`,
  `    \`;`
);

content = content.replace(
  `      <html>`,
  ``
);

fs.writeFileSync(file, content, 'utf8');
