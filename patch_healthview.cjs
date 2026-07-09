const fs = require('fs');
let content = fs.readFileSync('src/components/HealthView.tsx', 'utf8');

if (!content.includes('import VoiceNoteButton')) {
  content = content.replace("import { HelpTooltip } from './HelpTooltip';", "import { HelpTooltip } from './HelpTooltip';\nimport VoiceNoteButton from './VoiceNoteButton';");
}

const lbl1 = '<label className="block text-3xs font-extrabold text-gray-500 mb-1.5 uppercase tracking-wider">\n                  Şikayet ve Belirtiler *\n                </label>';
const repl1 = `<div className="flex justify-between items-center mb-1.5">
                  <label className="block text-3xs font-extrabold text-gray-500 uppercase tracking-wider">
                    Şikayet ve Belirtiler *
                  </label>
                  <VoiceNoteButton onTranscript={(t) => setComplaint(prev => prev ? prev + ' ' + t : t)} />
                </div>`;
content = content.replace(lbl1, repl1);

const lbl2 = '<label className="block text-3xs font-extrabold text-gray-500 mb-1.5 uppercase tracking-wider">\n                  Uygulanan Tedavi &amp; İlaç *\n                </label>';
const repl2 = `<div className="flex justify-between items-center mb-1.5">
                  <label className="block text-3xs font-extrabold text-gray-500 uppercase tracking-wider">
                    Uygulanan Tedavi &amp; İlaç *
                  </label>
                  <VoiceNoteButton onTranscript={(t) => setTreatment(prev => prev ? prev + ' ' + t : t)} />
                </div>`;
content = content.replace(lbl2, repl2);

fs.writeFileSync('src/components/HealthView.tsx', content);
