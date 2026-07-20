const fs = require('fs');
let code = fs.readFileSync('src/components/SurveyAnalysisView.tsx', 'utf-8');

const targetActive = `{isActive && (
                      <div className="mt-3 pt-3 border-t border-indigo-100/50 animate-in slide-in-from-top-2 duration-200">
                        <p className="text-xs font-medium text-gray-500 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                    )}`;

const replacementActive = `{isActive && (
                      <div className="mt-3 pt-3 border-t border-indigo-100/50 animate-in slide-in-from-top-2 duration-200">
                        <p className="text-xs font-medium text-gray-500 leading-relaxed mb-3">
                          {cat.description}
                        </p>
                        <div className="space-y-2">
                          {cat.subMetrics && cat.subMetrics.map((sub, i) => (
                            <div key={i} className="flex flex-col gap-1">
                              <div className="flex justify-between items-center text-[10px] font-bold text-gray-600">
                                <span>{sub.name}</span>
                                <span className={sub.score >= 4.5 ? 'text-emerald-600' : sub.score >= 3.5 ? 'text-amber-500' : 'text-red-500'}>{sub.score.toFixed(1)}</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className={\`h-full rounded-full \${sub.score >= 4.5 ? 'bg-emerald-500' : sub.score >= 3.5 ? 'bg-amber-400' : 'bg-red-500'}\`} style={{ width: \`\${(sub.score / 5) * 100}%\` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}`;

if(code.includes(targetActive)){
    code = code.replace(targetActive, replacementActive);
    fs.writeFileSync('src/components/SurveyAnalysisView.tsx', code);
    console.log("Patched Active Category UI!");
} else {
    console.log("Active Category target not found!");
}
