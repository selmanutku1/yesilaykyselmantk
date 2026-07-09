const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = '<span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 text-[#00875A] dark:text-emerald-100 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide">Kamp Yönetim Sistemi (KYS)</span>';
const replStr = '<span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 text-[#00875A] dark:text-emerald-100 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1.5">Kamp Yönetim Sistemi (KYS) <span className="text-[9px] bg-indigo-500 text-white font-black px-1.5 py-0.5 rounded border border-indigo-600">BETA</span></span>';

content = content.replace(targetStr, replStr);
fs.writeFileSync('src/App.tsx', content);
