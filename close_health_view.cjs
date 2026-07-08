const fs = require('fs');
let content = fs.readFileSync('src/components/HealthView.tsx', 'utf8');

const target = `className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-150 rounded-xl text-xs focus:bg-white focus:border-emerald-600 outline-none transition font-semibold"
              />
            </div>
          </div>`;

const replacement = `className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-150 rounded-xl text-xs focus:bg-white focus:border-emerald-600 outline-none transition font-semibold"
              />
            </div>
            </div>
          </div>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/HealthView.tsx', content);
