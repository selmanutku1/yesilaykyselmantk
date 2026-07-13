const fs = require('fs');
let content = fs.readFileSync('src/components/PeriodManagementView.tsx', 'utf8');

const target = `    </div>
  );
}`;

const modal = `      {/* Period Details Modal */}
      {selectedPeriodDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm" onClick={() => setSelectedPeriodDetail(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 text-lg">Dönem Detayları</h3>
              <button onClick={() => setSelectedPeriodDetail(null)} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Dönem Adı</h4>
                <p className="font-semibold text-gray-900 text-lg">{selectedPeriodDetail.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tarih</h4>
                  <p className="font-semibold text-gray-800 text-sm">
                    {new Date(selectedPeriodDetail.startDate).toLocaleDateString('tr-TR')} - {new Date(selectedPeriodDetail.endDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div className="space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Durum</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={\`w-2 h-2 rounded-full \${selectedPeriodDetail.isActive ? 'bg-emerald-500' : 'bg-gray-400'}\`} />
                    <span className="font-semibold text-gray-800 text-sm">{selectedPeriodDetail.status}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-800 border-b pb-2">Katılım Şartları</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-3xs text-gray-500 font-bold uppercase">Cinsiyet</p>
                      <p className="text-sm font-bold text-gray-800">{selectedPeriodDetail.gender || 'Belirtilmemiş'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-3xs text-gray-500 font-bold uppercase">Yaş Aralığı</p>
                      <p className="text-sm font-bold text-gray-800">{selectedPeriodDetail.minAge} - {selectedPeriodDetail.maxAge} Yaş</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                  <p className="text-3xs text-emerald-600 font-bold uppercase mb-1">Kontenjan</p>
                  <p className="text-sm font-bold text-emerald-900">{selectedPeriodDetail.maxQuota} Kişi</p>
                </div>

                {selectedPeriodDetail.criteria && (
                  <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
                    <p className="text-3xs text-amber-600 font-bold uppercase mb-1">Özel Kriterler</p>
                    <p className="text-sm text-amber-900 leading-relaxed whitespace-pre-wrap">{selectedPeriodDetail.criteria}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                <p className="text-xs text-gray-500 font-bold mb-1">Hızlı İşlemler</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      handleCopyPeriodLink(selectedPeriodDetail.id);
                    }}
                    className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-xl text-sm font-bold transition-colors flex justify-center items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    {copiedPeriodId === selectedPeriodDetail.id ? 'Kopyalandı!' : 'Bağlantıyı Kopyala'}
                  </button>
                  <button 
                    onClick={() => {
                      window.open(\`\${window.location.origin}\${window.location.pathname}?portal=basvuru&periodId=\${selectedPeriodDetail.id}\`, '_blank');
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-sm font-bold transition-colors flex justify-center items-center gap-2 shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Formu Aç
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`;

content = content.replace(target, modal);
fs.writeFileSync('src/components/PeriodManagementView.tsx', content, 'utf8');
