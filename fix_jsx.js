import fs from 'fs';
let content = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8');

// The problematic lines:
content = content.replace(
/              <\/button>\n            <\/div>\n          <\/div>\n        <\/div>\n      <\/div>\n    \)\}\n  <\/div>\n\)\}/g,
`              </button>
            </div>
          </div>
        </div>
      )}`
);

content = content.replace(
/                        <\/div>\n                      \)\}\n                    <\/div>\n                  <\/div>\n                <\/div>\n              \)\}\n            <\/div>\n          <\/div>\n        \)\}\n      <\/div>\n    \)\}/g,
`                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
      )}`
);

content = content.replace(
/                          <\/td>\n                        <\/tr>\n                      \)\)}\n                    <\/tbody>\n                  <\/table>\n                <\/div>\n              <\/div>\n            <\/div>\n          \)\}\n        <\/div>\n      \)\}\n    <\/div>\n  \)\}/g,
`                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}`
);

content = content.replace(
/                    <\/button>\n                  <\/div>\n                <\/div>\n              \)\}\n            <\/div>\n          <\/div>\n        \)\}\n      <\/div>\n    \)\}/g,
`                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
      )}`
);

content = content.replace(
/              <\/div>\n            <\/div>\n          <\/div>\n        \)\}\n      <\/div>\n    \)\}/g,
`              </div>
            </div>
          </div>
      )}`
);

content = content.replace(
/              <\/div>\n            <\/div>\n          <\/div>\n        \)\}\n      <\/div>\n    \)\}\n/g,
`              </div>
            </div>
          </div>
      )}
`
);


fs.writeFileSync('src/components/TechnicalOperationsView.tsx', content);
