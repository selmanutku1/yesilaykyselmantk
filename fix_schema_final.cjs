const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const oldStr = `              },
              required: ["type", "payload"]
            }`;

const newStr = `              }
            }`;

server = server.replace(oldStr, newStr);
fs.writeFileSync('server.ts', server);
