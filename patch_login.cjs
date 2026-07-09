const fs = require('fs');
let content = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

const gonulluCategoryStr = `{/* Gönüllü Yönetimi Giriş Alanı */}`;

const adminCategoryStr = `{/* Sistem Yöneticisi Giriş Alanı */}
              <div className="space-y-2 mb-4 bg-indigo-50/50 p-2.5 rounded-2xl border border-indigo-100">
                <h3 className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest pl-1">Sistem Yöneticisi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {users.filter(u => u.role === 'admin').map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handlePresetClick(user)}
                      disabled={isLoading}
                      className="p-3 border rounded-xl text-left transition flex items-start gap-3 group cursor-pointer hover:shadow-md focus:outline-none bg-white border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50 shadow-sm"
                    >
                      <div className="p-1.5 bg-indigo-50 border border-indigo-100 rounded-lg shrink-0 group-hover:scale-110 transition duration-150 shadow-3xs">
                        {getRoleIcon(user.role)}
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-black truncate leading-tight text-indigo-950 group-hover:text-indigo-800">{user.name}</span>
                        </div>
                        <span className={\`px-1.5 py-0.5 border rounded-md text-[8px] font-extrabold uppercase inline-block leading-none \${getRoleBadgeColor(user.role)}\`}>
                          {user.roleName}
                        </span>
                        <p className="text-[9px] text-gray-500 font-medium leading-normal line-clamp-2">
                          {getRoleTabsDescription(user)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gönüllü Yönetimi Giriş Alanı */}`;

content = content.replace(gonulluCategoryStr, adminCategoryStr);

const oldYonetimStr = `{users.filter(u => ['admin', 'mudur'].includes(u.role)).map((user) => (`;
const newYonetimStr = `{users.filter(u => ['mudur'].includes(u.role)).map((user) => (`;

content = content.replace(oldYonetimStr, newYonetimStr);

fs.writeFileSync('src/components/LoginView.tsx', content);
