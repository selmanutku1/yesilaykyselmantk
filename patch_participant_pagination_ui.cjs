const fs = require('fs');

let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

const targetStr = `                  })}
                </div>
              )}`;

const paginationUI = `                  })}
                </div>
              )}
              
              {filteredParticipants.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
                  <div className="text-xs text-gray-500 font-semibold">
                    Toplam <span className="font-extrabold text-gray-900">{filteredParticipants.length}</span> kayıttan <span className="font-extrabold text-gray-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> - <span className="font-extrabold text-gray-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredParticipants.length)}</span> arası gösteriliyor.
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Önceki
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={\`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors \${
                            currentPage === page
                              ? 'bg-emerald-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }\`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Sonraki
                    </button>
                  </div>
                </div>
              )}`;

content = content.replace(targetStr, paginationUI);

fs.writeFileSync('src/components/ParticipantView.tsx', content);
