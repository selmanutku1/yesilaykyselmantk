const fs = require('fs');
let content = fs.readFileSync('src/components/PeriodManagementView.tsx', 'utf8');

const target = `                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyPeriodLink(per.id);
                      }}
                      title="Bu kamp için başvuru formu bağlantısını kopyala"
                      className={\`py-1 px-2 text-3xs font-bold rounded border transition-all flex items-center gap-1 \${
                        copiedPeriodId === per.id
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 animate-pulse'
                          : 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-150'
                      }\`}
                    >
                      {copiedPeriodId === per.id ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Kopyalandı!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Link Al</span>
                        </>
                      )}
                    </button>`;

const replacement = `                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyPeriodLink(per.id);
                        }}
                        title="Bu kamp için başvuru formu bağlantısını kopyala"
                        className={\`py-1 px-2 text-3xs font-bold rounded border transition-all flex items-center gap-1 \${
                          copiedPeriodId === per.id
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 animate-pulse'
                            : 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-150'
                        }\`}
                      >
                        {copiedPeriodId === per.id ? (
                          <>
                            <Check className="w-2.5 h-2.5 text-emerald-600" />
                            <span>Kopyalandı!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-2.5 h-2.5 text-emerald-600" />
                            <span>Link Al</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(\`\${window.location.origin}\${window.location.pathname}?portal=basvuru&periodId=\${per.id}\`, '_blank');
                        }}
                        title="Başvuru formunu yeni sekmede aç"
                        className="py-1 px-2 text-3xs font-bold rounded border transition-all flex items-center gap-1 bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-150"
                      >
                        <ExternalLink className="w-2.5 h-2.5 text-emerald-600" />
                        <span>Aç</span>
                      </button>
                    </div>`;

if(content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/PeriodManagementView.tsx', content, 'utf8');
  console.log("Patched successfully");
} else {
  console.log("Target not found!");
}
