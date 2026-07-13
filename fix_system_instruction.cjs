const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const targetStr = `Örnek Yanıtlar:`;

const newInstruction = `- DATA_ACTION: Veri üzerinde işlem yapar (Örneğin kamp planlama, katılımcı ekleme). type olarak "DATA_ACTION" ve payload olarak bir JSON string döner. Payload JSON stringi parse edildiğinde şu objeyi vermelidir: {"actionName": "...", "data": {...}}.
  Geçerli actionName'ler ve data formatları:
  * CREATE_CAMP_PERIOD: Yeni bir kamp dönemi oluşturur. data formatı: { name: string, campCenterId: "CEN-01", startDate: string, endDate: string, maxQuota: number, isActive: true, status: 'Planlandı' }
  * ADD_PARTICIPANT: Yeni bir katılımcı ekler. data formatı: { firstName: string, lastName: string, tcNo: string, gender: 'Erkek'|'Kadın', birthDate: string, phone: string, status: 'Kayıtlı' }
  * ADD_HEALTH_INCIDENT: Yeni bir sağlık vakası ekler. data formatı: { participantId: string, date: string, type: 'Yaralanma'|'Hastalık'|'Diğer', description: string, status: 'Açık' }

Örnek Yanıtlar:
Kullanıcı: "Yeni bir kamp dönemi oluştur, adı Yaz Kampı olsun" -> text: "Yaz Kampı başarıyla oluşturuluyor...", action: { type: "DATA_ACTION", payload: '{"actionName": "CREATE_CAMP_PERIOD", "data": {"name": "Yaz Kampı", "campCenterId": "CEN-01", "startDate": "2026-07-01", "endDate": "2026-07-15", "maxQuota": 100, "isActive": true, "status": "Planlandı"}}' }
`;

server = server.replace(targetStr, newInstruction + targetStr);
fs.writeFileSync('server.ts', server);
