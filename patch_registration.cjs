const fs = require('fs');

let content = fs.readFileSync('src/components/RegistrationView.tsx', 'utf8');

// 1. Add import
if (!content.includes("import SignaturePad")) {
  content = content.replace("import { HelpTooltip } from './HelpTooltip';", "import { HelpTooltip } from './HelpTooltip';\nimport SignaturePad from './SignaturePad';");
}

// 2. Add signature state
if (!content.includes("const [signatureData")) {
  content = content.replace("const [consentChecked, setConsentChecked] = useState(false);", "const [consentChecked, setConsentChecked] = useState(false);\n  const [signatureData, setSignatureData] = useState<string | null>(null);");
}

// 3. Clear signature on success in handleSubmitConvoy
content = content.replace("setConsentChecked(false);\n    setAutoAllocate(true);", "setConsentChecked(false);\n    setSignatureData(null);\n    setAutoAllocate(true);");

// 4. Validate signature in handleSubmitConvoy
const validationStr = `if (!kvkkChecked || !consentChecked) {
      alert('Lütfen sözleşme ve katılım onay kutularını işaretleyiniz.');
      return;
    }`;

if (content.includes(validationStr) && !content.includes("if (!signatureData)")) {
  content = content.replace(validationStr, `${validationStr}\n    if (!signatureData) {\n      alert('Lütfen dijital muvafakatname için imza alanını doldurunuz.');\n      return;\n    }`);
}

// 5. Add SignaturePad component to UI. We will place it before the submit button of convoy form.
// Let's find the submit button area for convoy form.
// In the convoy form, there's a section with checkboxes:
/*
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="accent-emerald-700 mt-0.5"
                    required
                  />
                  <span className="text-[10px]">
                    <strong>Kamp Katılım Taahhütnamesi:</strong> Kafilemizin tüm üyelerinin Yeşilay Kamp Kurallarına ve acil tıbbi müdahale düzenlemelerine uyacağını taahhüt ederim.
                  </span>
                </label>
              </div>

              <button
                type="submit"
*/

const signatureUI = `                </label>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
                <SignaturePad onSignatureChange={setSignatureData} />
                {signatureData && (
                  <p className="text-3xs text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> İmza Alındı
                  </p>
                )}
              </div>

              <button
                type="submit"`;

content = content.replace(/<\/label>\s*<\/div>\s*<button\s*type="submit"\s*className="w-full bg-emerald-700/, signatureUI + '\n                className="w-full bg-emerald-700');

fs.writeFileSync('src/components/RegistrationView.tsx', content);
