const fs = require('fs');
let content = fs.readFileSync('src/components/PublicCalendarView.tsx', 'utf8');

// 1. Month view
content = content.replace(`                                let pClass = 'bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800';
                                if (act.type === \\'Spor\\') pClass = 'bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900';
                                else if (act.type === \\'Atölye\\') pClass = 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900';
                                else if (act.type === \\'Eğitim\\') pClass = 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900';
                                else if (act.type === \\'Seminer\\') pClass = 'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900';
                                else if (act.type === \\'Eğlence\\') pClass = 'bg-pink-50 text-pink-700 border-pink-100 hover:bg-pink-100 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-900';`, `                                let pClass = 'bg-gray-500 text-white border-gray-600 hover:bg-gray-600 dark:bg-gray-600 dark:text-white dark:border-gray-700';
                                if (act.type === 'Spor') pClass = 'bg-sky-500 text-white border-sky-600 hover:bg-sky-600 dark:bg-sky-600 dark:text-white dark:border-sky-700';
                                else if (act.type === 'Atölye') pClass = 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600 dark:bg-amber-600 dark:text-white dark:border-amber-700';
                                else if (act.type === 'Eğitim') pClass = 'bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600 dark:bg-emerald-600 dark:text-white dark:border-emerald-700';
                                else if (act.type === 'Seminer') pClass = 'bg-purple-500 text-white border-purple-600 hover:bg-purple-600 dark:bg-purple-600 dark:text-white dark:border-purple-700';
                                else if (act.type === 'Eğlence') pClass = 'bg-pink-500 text-white border-pink-600 hover:bg-pink-600 dark:bg-pink-600 dark:text-white dark:border-pink-700';`);

// 2. Week view
content = content.replace(`                              let badgeC = 'bg-gray-50 border-gray-150 text-gray-700 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-350';
                              if (act.type === \\'Spor\\') badgeC = 'bg-sky-50 border-sky-150 text-sky-700 dark:bg-sky-950/30 dark:border-sky-900 dark:text-sky-300';
                              else if (act.type === \\'Atölye\\') badgeC = 'bg-amber-50 border-amber-150 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300';
                              else if (act.type === \\'Eğitim\\') badgeC = 'bg-emerald-50 border-emerald-150 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-300';
                              else if (act.type === \\'Seminer\\') badgeC = 'bg-purple-50 border-purple-150 text-purple-700 dark:bg-purple-950/30 dark:border-purple-900 dark:text-purple-300';
                              else if (act.type === \\'Eğlence\\') badgeC = 'bg-pink-50 border-pink-150 text-pink-700 dark:bg-pink-950/30 dark:border-pink-900 dark:text-pink-300';`, `                              let badgeC = 'bg-gray-500 border-gray-600 text-white dark:bg-gray-600 dark:border-gray-700 dark:text-white';
                              if (act.type === 'Spor') badgeC = 'bg-sky-500 border-sky-600 text-white dark:bg-sky-600 dark:border-sky-700 dark:text-white';
                              else if (act.type === 'Atölye') badgeC = 'bg-amber-500 border-amber-600 text-white dark:bg-amber-600 dark:border-amber-700 dark:text-white';
                              else if (act.type === 'Eğitim') badgeC = 'bg-emerald-500 border-emerald-600 text-white dark:bg-emerald-600 dark:border-emerald-700 dark:text-white';
                              else if (act.type === 'Seminer') badgeC = 'bg-purple-500 border-purple-600 text-white dark:bg-purple-600 dark:border-purple-700 dark:text-white';
                              else if (act.type === 'Eğlence') badgeC = 'bg-pink-500 border-pink-600 text-white dark:bg-pink-600 dark:border-pink-700 dark:text-white';`);

// 3. Day view
content = content.replace(`                        let badgeC = 'bg-gray-50 border-gray-150 text-gray-700 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300';
                        if (act.type === \\'Spor\\') badgeC = 'bg-sky-50 border-sky-150 text-sky-700 dark:bg-sky-950/30 dark:border-sky-900 dark:text-sky-300';
                        else if (act.type === \\'Atölye\\') badgeC = 'bg-amber-50 border-amber-150 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300';
                        else if (act.type === \\'Eğitim\\') badgeC = 'bg-emerald-50 border-emerald-150 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-300';
                        else if (act.type === \\'Seminer\\') badgeC = 'bg-purple-50 border-purple-150 text-purple-700 dark:bg-purple-950/30 dark:border-purple-900 dark:text-purple-300';
                        else if (act.type === \\'Eğlence\\') badgeC = 'bg-pink-50 border-pink-150 text-pink-700 dark:bg-pink-950/30 dark:border-pink-900 dark:text-pink-300';`, `                        let badgeC = 'bg-gray-500 border-gray-600 text-white dark:bg-gray-600 dark:border-gray-700 dark:text-white';
                        if (act.type === 'Spor') badgeC = 'bg-sky-500 border-sky-600 text-white dark:bg-sky-600 dark:border-sky-700 dark:text-white';
                        else if (act.type === 'Atölye') badgeC = 'bg-amber-500 border-amber-600 text-white dark:bg-amber-600 dark:border-amber-700 dark:text-white';
                        else if (act.type === 'Eğitim') badgeC = 'bg-emerald-500 border-emerald-600 text-white dark:bg-emerald-600 dark:border-emerald-700 dark:text-white';
                        else if (act.type === 'Seminer') badgeC = 'bg-purple-500 border-purple-600 text-white dark:bg-purple-600 dark:border-purple-700 dark:text-white';
                        else if (act.type === 'Eğlence') badgeC = 'bg-pink-500 border-pink-600 text-white dark:bg-pink-600 dark:border-pink-700 dark:text-white';`);

// 4. Agenda view
content = content.replace(`                                  let badgeClass = 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
                                  if (act.type === \\'Spor\\') badgeClass = 'bg-sky-50 text-sky-700 border border-sky-100 dark:bg-sky-950/30 dark:text-sky-300 dark:border-sky-900';
                                  else if (act.type === \\'Atölye\\') badgeClass = 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900';
                                  else if (act.type === \\'Eğitim\\') badgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900';
                                  else if (act.type === \\'Seminer\\') badgeClass = 'bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-900';
                                  else if (act.type === \\'Eğlence\\') badgeClass = 'bg-pink-50 text-pink-700 border border-pink-100 dark:bg-pink-950/30 dark:text-pink-300 dark:border-pink-900';`, `                                  let badgeClass = 'bg-gray-500 text-white border-gray-600 dark:bg-gray-600 dark:text-white dark:border-gray-700';
                                  if (act.type === 'Spor') badgeClass = 'bg-sky-500 text-white border border-sky-600 dark:bg-sky-600 dark:text-white dark:border-sky-700';
                                  else if (act.type === 'Atölye') badgeClass = 'bg-amber-500 text-white border border-amber-600 dark:bg-amber-600 dark:text-white dark:border-amber-700';
                                  else if (act.type === 'Eğitim') badgeClass = 'bg-emerald-500 text-white border border-emerald-600 dark:bg-emerald-600 dark:text-white dark:border-emerald-700';
                                  else if (act.type === 'Seminer') badgeClass = 'bg-purple-500 text-white border border-purple-600 dark:bg-purple-600 dark:text-white dark:border-purple-700';
                                  else if (act.type === 'Eğlence') badgeClass = 'bg-pink-500 text-white border border-pink-600 dark:bg-pink-600 dark:text-white dark:border-pink-700';`);

// 5. Modal details view
content = content.replace(`              if (act.type === \\'Spor\\') {
                headerBg = 'bg-sky-50 text-sky-950 border-sky-100 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-900';
                typeBadge = 'bg-sky-100/80 text-sky-800 border-sky-200 dark:bg-sky-900/60 dark:text-sky-300 dark:border-sky-800';
                iconColor = 'text-sky-600 dark:text-sky-400';
              } else if (act.type === \\'Atölye\\') {
                headerBg = 'bg-amber-50 text-amber-950 border-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900';
                typeBadge = 'bg-amber-100/80 text-amber-800 border-amber-200 dark:bg-amber-900/60 dark:text-amber-300 dark:border-amber-800';
                iconColor = 'text-amber-600 dark:text-amber-400';
              } else if (act.type === \\'Eğitim\\') {
                headerBg = 'bg-emerald-50 text-emerald-950 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900';
                typeBadge = 'bg-emerald-100/80 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-800';
                iconColor = 'text-emerald-600 dark:text-emerald-400';
              } else if (act.type === \\'Seminer\\') {
                headerBg = 'bg-purple-50 text-purple-950 border-purple-100 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-900';
                typeBadge = 'bg-purple-100/80 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-300 dark:border-purple-800';
                iconColor = 'text-purple-600 dark:text-purple-400';
              } else if (act.type === \\'Eğlence\\') {
                headerBg = 'bg-pink-50 text-pink-950 border-pink-100 dark:bg-pink-950/40 dark:text-pink-200 dark:border-pink-900';
                typeBadge = 'bg-pink-100/80 text-pink-800 border-pink-200 dark:bg-pink-900/60 dark:text-pink-300 dark:border-pink-800';
                iconColor = 'text-pink-600 dark:text-pink-400';
              }`, `              if (act.type === 'Spor') {
                headerBg = 'bg-sky-500 text-white border-sky-600 dark:bg-sky-600 dark:text-white dark:border-sky-700';
                typeBadge = 'bg-white/20 text-white border-white/30 dark:bg-white/10 dark:text-white dark:border-white/20';
                iconColor = 'text-sky-600 dark:text-sky-400';
              } else if (act.type === 'Atölye') {
                headerBg = 'bg-amber-500 text-white border-amber-600 dark:bg-amber-600 dark:text-white dark:border-amber-700';
                typeBadge = 'bg-white/20 text-white border-white/30 dark:bg-white/10 dark:text-white dark:border-white/20';
                iconColor = 'text-amber-600 dark:text-amber-400';
              } else if (act.type === 'Eğitim') {
                headerBg = 'bg-emerald-500 text-white border-emerald-600 dark:bg-emerald-600 dark:text-white dark:border-emerald-700';
                typeBadge = 'bg-white/20 text-white border-white/30 dark:bg-white/10 dark:text-white dark:border-white/20';
                iconColor = 'text-emerald-600 dark:text-emerald-400';
              } else if (act.type === 'Seminer') {
                headerBg = 'bg-purple-500 text-white border-purple-600 dark:bg-purple-600 dark:text-white dark:border-purple-700';
                typeBadge = 'bg-white/20 text-white border-white/30 dark:bg-white/10 dark:text-white dark:border-white/20';
                iconColor = 'text-purple-600 dark:text-purple-400';
              } else if (act.type === 'Eğlence') {
                headerBg = 'bg-pink-500 text-white border-pink-600 dark:bg-pink-600 dark:text-white dark:border-pink-700';
                typeBadge = 'bg-white/20 text-white border-white/30 dark:bg-white/10 dark:text-white dark:border-white/20';
                iconColor = 'text-pink-600 dark:text-pink-400';
              }`);

fs.writeFileSync('src/components/PublicCalendarView.tsx', content);
