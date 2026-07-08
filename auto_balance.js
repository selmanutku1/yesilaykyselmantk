import fs from 'fs';

let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

// The best way is to manually remove the extra </div> at the end of sections.
// Dashboard has 4 extra
content = content.replace(
/              <\/button>\n            <\/div>\n          <\/div>\n        <\/div>\n      \)\}/,
`              </button>
            </div>
          </div>
      )}`
);
// Above regex had 3 </div>. If I need to remove 4:
// Wait, the original end of dashboard had:
//            </div>
//          </div>
//        </div>
//      </div>
//    )}
//  </div>
// )}
// Then I replaced it, so now it's:
//            </div>
//          </div>
//        )}
//
// I will just open the file, find the lines where activeSubView ends, and fix it manually.
