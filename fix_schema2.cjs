const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const newInstruction = `- DATA_ACTION: Veri üzerinde işlem yapar. type olarak "DATA_ACTION" ve dataObj olarak bir JSON objesi döner.
  Geçerli actionName'ler ve data formatları:
  * CREATE_CAMP_PERIOD: Yeni bir kamp dönemi oluşturur. data formatı: { name: string, campCenterId: "CEN-01", startDate: string, endDate: string, maxQuota: number, isActive: true, status: 'Planlandı' }
  * ADD_PARTICIPANT: Yeni bir katılımcı ekler. data formatı: { firstName: string, lastName: string, tcNo: string, gender: 'Erkek'|'Kadın', birthDate: string, phone: string, status: 'Kayıtlı' }
  * ADD_HEALTH_INCIDENT: Yeni bir sağlık vakası ekler. data formatı: { participantId: string, date: string, type: 'Yaralanma'|'Hastalık'|'Diğer', description: string, status: 'Açık' }

Örnek Yanıtlar:
Kullanıcı: "Yeni bir kamp dönemi oluştur, adı Yaz Kampı olsun" -> text: "Yaz Kampı başarıyla oluşturuluyor...", action: { type: "DATA_ACTION", dataObj: {"actionName": "CREATE_CAMP_PERIOD", "data": {"name": "Yaz Kampı", "campCenterId": "CEN-01", "startDate": "2026-07-01", "endDate": "2026-07-15", "maxQuota": 100, "isActive": true, "status": "Planlandı"}} }
Kullanıcı: "Tam ekrana geç" -> text: "Tam ekran modu açılıyor.", action: { type: "FULLSCREEN", payload: "true" }`;

server = server.replace(/- DATA_ACTION:[\s\S]*?payload: "true" }/, newInstruction);

const schemaReplaceStrOld = `                type: { type: Type.STRING, description: "Eylem tipi: 'NAVIGATE', 'FULLSCREEN', 'THEME', 'LOCK_SCREEN', 'DATA_ACTION'" },
                payload: { type: Type.STRING, description: "Eylem parametresi. Eğer yönlendirme veya tema ise string. Eğer DATA_ACTION ise JSON formatında bir STRING döner." }`;

const schemaReplaceStrNew = `                type: { type: Type.STRING, description: "Eylem tipi: 'NAVIGATE', 'FULLSCREEN', 'THEME', 'LOCK_SCREEN', 'DATA_ACTION'" },
                payload: { type: Type.STRING, description: "Eylem parametresi." },
                dataObj: { type: Type.OBJECT, description: "DATA_ACTION için actionName ve data alanlarını içeren obje" }`;

server = server.replace(schemaReplaceStrOld, schemaReplaceStrNew);
fs.writeFileSync('server.ts', server);
