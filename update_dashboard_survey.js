import fs from 'fs';
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

content = content.replace(
  "let chName = surveyChannel === 'sms' ? 'SMS' : surveyChannel === 'email' ? 'E-posta' : 'SMS ve E-posta';",
  "let chName = surveyChannel === 'sms' ? 'SMS' : surveyChannel === 'email' ? 'E-posta' : surveyChannel === 'whatsapp' ? 'WhatsApp' : 'Tüm Kanallar (WhatsApp+SMS+Mail)';"
);

content = content.replace(
  "Tüm Kanallar (SMS + E-posta)", // Not sure if this exact string is there, will just replace what's found
  "Tüm Kanallar"
);

const oldOptions = `                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="channel" 
                        value="both" 
                        checked={surveyChannel === 'both'}
                        onChange={(e) => setSurveyChannel(e.target.value)}
                        className="text-indigo-600 focus:ring-indigo-500" 
                      />
                      <span className="text-sm font-medium text-gray-700">Her İkisi (SMS + E-posta)</span>
                    </label>`;

const newOptions = `                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="channel" 
                        value="whatsapp" 
                        checked={surveyChannel === 'whatsapp'}
                        onChange={(e) => setSurveyChannel(e.target.value)}
                        className="text-emerald-600 focus:ring-emerald-500" 
                      />
                      <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="channel" 
                        value="both" 
                        checked={surveyChannel === 'both'}
                        onChange={(e) => setSurveyChannel(e.target.value)}
                        className="text-indigo-600 focus:ring-indigo-500" 
                      />
                      <span className="text-sm font-medium text-gray-700">Tümü</span>
                    </label>`;

content = content.replace(oldOptions, newOptions);

content = content.replace(
  "<h4 className=\"text-xs font-bold text-gray-500 uppercase tracking-wider\">Önizleme ({surveyChannel === 'sms' ? 'SMS' : surveyChannel === 'email' ? 'E-posta' : 'SMS & E-posta'})</h4>",
  "<h4 className=\"text-xs font-bold text-gray-500 uppercase tracking-wider\">Önizleme ({surveyChannel === 'sms' ? 'SMS' : surveyChannel === 'email' ? 'E-posta' : surveyChannel === 'whatsapp' ? 'WhatsApp' : 'Tüm Kanallar'})</h4>"
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
