const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const systemInstructionOld = `Sistem Verisi (Proje İçi Besleme - Sorulara Buradan Yanıt Ver):`;

const systemInstructionNew = `- DATA_ACTION: Veri üzerinde işlem yapar (Örneğin kamp planlama, katılımcı ekleme). type olarak "DATA_ACTION" ve payload olarak bir obje döner: {"actionName": "...", "data": {...}}.
  Geçerli actionName'ler ve data formatları:
  * CREATE_CAMP_PERIOD: Yeni bir kamp dönemi oluşturur. data formatı: { name: string, campCenterId: string, startDate: string, endDate: string, maxQuota: number, isActive: boolean, status: 'Planlandı' }
  * ADD_PARTICIPANT: Yeni bir katılımcı ekler. data formatı: { firstName: string, lastName: string, tcNo: string, gender: 'Erkek'|'Kadın', birthDate: string, phone: string, status: 'Kayıtlı' }
  * ADD_HEALTH_INCIDENT: Yeni bir sağlık vakası ekler. data formatı: { participantId: string, date: string, type: 'Yaralanma'|'Hastalık'|'Diğer', description: string, status: 'Açık' }

Örnek Yanıtlar:
Kullanıcı: "Yeni bir kamp dönemi oluştur, adı Yaz Kampı olsun" -> text: "Yaz Kampı başarıyla oluşturuluyor...", action: { type: "DATA_ACTION", payload: { actionName: "CREATE_CAMP_PERIOD", data: { name: "Yaz Kampı", campCenterId: "CEN-01", startDate: "2026-07-01", endDate: "2026-07-15", maxQuota: 100, isActive: true, status: "Planlandı" } } }

Sistem Verisi (Proje İçi Besleme - Sorulara Buradan Yanıt Ver):`;

server = server.replace(systemInstructionOld, systemInstructionNew);

// We need to change the schema definition in generateContent config:
// type: Type.STRING description: "Eylem parametresi. Örnekler: 'ayarlar', 'dark', 'true'" -> We need this to be an object or string? Wait. The schema says `payload: { type: Type.STRING }`.
// Wait, if payload is an object, we should change payload type to ANY or OBJECT, but Gemini structured outputs don't support Any type directly unless we use Type.OBJECT. But it might fail if sometimes it's string.
// Let's modify the schema to handle both string and object, or just remove the strict schema for `payload` and let it be `any` (Type.ANY if it exists) or just make it an Object with `value: string`, `actionName: string`, `data: object`.
// Let's rewrite the schema entirely in server.ts.
