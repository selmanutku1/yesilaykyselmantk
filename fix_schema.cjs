const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

server = server.replace(
  "payload: { type: Type.STRING, description: \"Eylem parametresi. Eğer DATA_ACTION ise JSON formatında string döner.\" }",
  "payload: { type: Type.STRING, description: \"Eylem parametresi. Eğer yönlendirme veya tema ise string. Eğer DATA_ACTION ise JSON formatında bir STRING döner.\" }"
);

server = server.replace(
  "action: { type: \"DATA_ACTION\", payload: '{\"actionName\": \"CREATE_CAMP_PERIOD\", \"data\": {\"name\": \"Yaz Kampı\", \"campCenterId\": \"CEN-01\", \"startDate\": \"2026-07-01\", \"endDate\": \"2026-07-15\", \"maxQuota\": 100, \"isActive\": true, \"status\": \"Planlandı\"}}' }",
  "action: { type: \"DATA_ACTION\", payload: \"{\\\"actionName\\\": \\\"CREATE_CAMP_PERIOD\\\", \\\"data\\\": {\\\"name\\\": \\\"Yaz Kampı\\\", \\\"campCenterId\\\": \\\"CEN-01\\\", \\\"startDate\\\": \\\"2026-07-01\\\", \\\"endDate\\\": \\\"2026-07-15\\\", \\\"maxQuota\\\": 100, \\\"isActive\\\": true, \\\"status\\\": \\\"Planlandı\\\"}}\" }"
);

fs.writeFileSync('server.ts', server);
