import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const mapping = [
  ['dashboard', 'Kontrol Paneli (Dashboard)', 'LayoutDashboard'],
  ['bungalov', 'Bungalov & Yerleşim ({centerBungalows.length} Oda)', 'Home'],
  ['katilimci', 'Katılımcı Defteri', 'Users'],
  ['revir', 'Revir & Sağlık Modülü', 'HeartHandshake'],
  ['yemekhane', 'Yemekhane & Öğün Planlama', 'Utensils'],
  ['teknik', 'Teknik Arıza & Malzeme', 'Wrench'],
  ['guvenlik', 'Güvenlik & Nöbetler', 'Shield'],
  ['maliyet', 'Katılımcı Maliyet Analiz Modülü', 'Coins'],
  ['anket-analizi', 'Kamp Sonu Değerlendirme Analizi', 'FileText'],
  ['dijital-arsiv', 'Dijital Arşiv', 'Archive'],
  ['dokümanlar', 'KYS Sistem Tasarım Analizi', 'BookOpen'],
  ['ayarlar', 'Genel Ayarlar', 'Settings'],
  ['olay-kayit', 'Olay Kayıt Sistemi', 'AlertOctagon'],
  ['sistem-loglari', 'Sistem Logları', 'Terminal']
];

for (const [id, title, icon] of mapping) {
  const isDanger = id === 'olay-kayit' ? 'true' : 'false';
  let titleEscaped = title.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/&/g, '&amp;');
  
  // Need to find the exact button block
  const regex = new RegExp(
    `\\{\\s*hasAccess\\('${id}'\\)\\s*&&\\s*\\(\\s*<button[^>]+onClick=\\{[^{}]*handleActiveTabChange\\('${id}'\\)[^{}]*\\}[^>]+>\\s*<${icon}\\s+className="[^"]+"\\s*/>\\s*<span[^>]*>[\\s\\S]*?<\\/span>\\s*<\\/button>\\s*\\)`,
    'm'
  );
  
  const replacement = `{hasAccess('${id}') && (
            <SidebarNavItem
              id="${id}"
              label="${title.replace(/&amp;/g, '&')}"
              icon={${icon}}
              isActive={activeTab === '${id}'}
              isSidebarCollapsed={isSidebarCollapsed}
              onClick={() => handleActiveTabChange('${id}')}
              hasAccessCheck={true}
              ${isDanger === 'true' ? 'isDanger={true}' : ''}
            />
          )}`;
  
  if (regex.test(content)) {
    content = content.replace(regex, replacement);
  } else {
    console.error('Could not match', id);
  }
}

// Write the file back
fs.writeFileSync('src/App.tsx', content);
