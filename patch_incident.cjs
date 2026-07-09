const fs = require('fs');
let content = fs.readFileSync('src/components/IncidentLogsView.tsx', 'utf8');

if (!content.includes('import VoiceNoteButton')) {
  content = content.replace('import { HelpTooltip } from \'./HelpTooltip\';', 'import { HelpTooltip } from \'./HelpTooltip\';\nimport VoiceNoteButton from \'./VoiceNoteButton\';');
}

const lblDetails = '<label className="text-xs font-bold text-gray-600">Olayın Detayları</label>';
const replDetails = `<div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-600">Olayın Detayları</label>
                <VoiceNoteButton onTranscript={(t) => setNewDescription(prev => prev ? prev + ' ' + t : t)} />
              </div>`;
content = content.replace(lblDetails, replDetails);

const lblAction = '<label className="text-xs font-bold text-gray-600">Alınan Aksiyon (Varsa)</label>';
const replAction = `<div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-600">Alınan Aksiyon (Varsa)</label>
                <VoiceNoteButton onTranscript={(t) => setNewActionTaken(prev => prev ? prev + ' ' + t : t)} />
              </div>`;
content = content.replace(lblAction, replAction);

fs.writeFileSync('src/components/IncidentLogsView.tsx', content);
