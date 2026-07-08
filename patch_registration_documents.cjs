const fs = require('fs');

let content = fs.readFileSync('src/components/RegistrationView.tsx', 'utf8');

if (!content.includes("import LegalDocumentBox")) {
  content = content.replace("import SignaturePad from './SignaturePad';", "import SignaturePad from './SignaturePad';\nimport LegalDocumentBox from './LegalDocumentBox';");
}

const docsJSX = `              {/* CONSENTS & CONTRACTS FOR GROUP */}
              <div className="space-y-4 border-t pt-4 font-semibold text-gray-650">
                <LegalDocumentBox 
                  title="KVKK Onay ve Aydınlatma Metni"
                  label="Tüm KVKK aydınlatma metnini okudum, kişisel ve özel nitelikli verilerimin işlenmesini kabul ediyorum."
                  checked={kvkkChecked}
                  onChange={setKvkkChecked}
                  content={
                    <>
                      <h4 className="font-black text-center text-gray-900 mb-2">T.C. YEŞİLAY CEMİYETİ<br/>YAYLAGÖL ULUSLARARASI KAMP MERKEZİ<br/>KİŞİSEL VERİLERİN KORUNMASI AYDINLATMA METNİ</h4>
                      <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Türkiye Yeşilay Cemiyeti Yaylagöl Uluslararası Kamp Merkezi olarak, kamp kaydınız ve konaklamanız kapsamında elde ettiğimiz kişisel verilerinizi yetkili servis sağlayıcılarımız vasıtasıyla işliyoruz.</p>
                      <p><strong>1. İşlenen Kişisel Veriler:</strong> Kimlik bilgileriniz (Ad, Soyad, TC No), iletişim bilgileriniz, sağlık verileriniz (alerji, kronik rahatsızlık, kullanılan ilaçlar) ve kamp içi güvenlik/konaklama/oda atama bilgileriniz.</p>
                      <p><strong>2. İşlenme Amacı:</strong> Konaklama hizmetinin eksiksiz sunulması, acil tıbbi müdahale gereksinimlerinin karşılanması, kampüs güvenliğinin sağlanması ve 1774 sayılı Kimlik Bildirme Kanunu gerekliliklerinin yerine getirilmesi amacıyla işlenmektedir.</p>
                      <p><strong>3. Verilerin Aktarımı:</strong> Sağlık verileriniz sadece kamp reviri yetkilileri ve acil durumlarda sağlık personeliyle; kimlik bilgileriniz ise yasal zorunluluk kapsamında kolluk kuvvetleri ile paylaşılmaktadır.</p>
                      <p>İşbu aydınlatma metnini okuduğumu, sağlık durumumu eksiksiz bildirdiğimi ve verilerimin kamp faaliyetleri süresince işlenmesine açık rıza gösterdiğimi kabul ederim.</p>
                    </>
                  }
                />

                <LegalDocumentBox 
                  title="Kamp Katılım Taahhütnamesi"
                  label="Kamp Katılım Taahhütnamesinde yer alan tüm kuralları okudum, anladım ve kabul ediyorum."
                  checked={consentChecked}
                  onChange={setConsentChecked}
                  content={
                    <>
                      <h4 className="font-black text-center text-gray-900 mb-2">T.C. YEŞİLAY CEMİYETİ<br/>YAYLAGÖL ULUSLARARASI KAMP MERKEZİ<br/>KAMP KATILIM TAAHHÜTNAMESİ</h4>
                      <p>Yaylagöl Uluslararası Kamp Merkezi'nde konaklayacağım süre boyunca aşağıdaki kurallara kayıtsız şartsız uyacağımı taahhüt ederim:</p>
                      <ul className="list-disc pl-4 space-y-1 mt-2">
                        <li>Kamp alanına tütün, alkol, uyuşturucu madde, kesici/delici alet getirmeyeceğimi ve kullanmayacağımı kabul ediyorum.</li>
                        <li>Kamp yetkililerinin, liderlerin ve güvenlik personelinin yönlendirmelerine harfiyen uyacağımı beyan ederim.</li>
                        <li>Tarafıma tahsis edilen bungalov/çadır, yatak ve ortak alanlardaki demirbaşları koruyacağımı, kasıtlı verilen zararları tazmin edeceğimi kabul ederim.</li>
                        <li>Kamp sınırları dışına, yetkililerden izinsiz ve tek başıma çıkmayacağımı taahhüt ederim.</li>
                        <li>Revir kayıtlarında beyan ettiğim sağlık durumu bilgilerinin (alerji, kronik hastalık vb.) doğru olduğunu, eksik veya hatalı bilgi vermemden kaynaklı doğacak sağlık problemlerinde sorumluluğun tarafıma ait olduğunu kabul ederim.</li>
                        <li>Kamptaki diğer katılımcıların huzurunu bozacak her türlü eylemden kaçınacağımı, kurallara uymamam durumunda kamp idaresi tarafından kamptan ilişiğimin kesilebileceğini kabul ve beyan ederim.</li>
                      </ul>
                    </>
                  }
                />
              </div>`;

content = content.replace(/\{\/\* CONSENTS & CONTRACTS FOR GROUP \*\/\}[\s\S]*?<\/label>\s*<\/div>/, docsJSX);

// Now apply this to the single application form as well if it exists.
// Wait, is there a single application form in this file?
// Let's check where `handleSubmit` is for single applicant.
