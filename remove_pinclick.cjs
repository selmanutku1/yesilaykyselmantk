const fs = require('fs');

let content = fs.readFileSync('src/components/Screensaver.tsx', 'utf8');

const regex = /  const handlePinClick = \(num: string\) => \{\n    setError\(''\);\n    if \(passcode\.length < 4\) \{\n      const nextCode = passcode \+ num;\n      setPasscode\(nextCode\);\n      if \(nextCode\.length === 4\) \{\n        setTimeout\(\(\) => \{\n          handleVerify\(nextCode\);\n        \}, 150\);\n      \}\n    \}\n  \};\n\n/g;

content = content.replace(regex, '');

fs.writeFileSync('src/components/Screensaver.tsx', content);
