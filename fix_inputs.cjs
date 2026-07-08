const fs = require('fs');

function fixScreensaver() {
  let content = fs.readFileSync('src/components/Screensaver.tsx', 'utf8');

  if (!content.includes('useRef')) {
    content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect, useRef } from 'react';");
  }

  // Add ref declaration
  if (!content.includes('const inputRef = useRef<HTMLInputElement>(null);')) {
    content = content.replace("const [error, setError] = useState<string>('');", "const [error, setError] = useState<string>('');\n  const inputRef = useRef<HTMLInputElement>(null);");
  }

  // Update input
  const inputRegex = /<input[\s\S]*?className="w-40 bg-zinc-900\/50 border border-emerald-500\/30[^>]*\/>/;
  content = content.replace(inputRegex, `<input
                  ref={inputRef}
                  type="password"
                  maxLength={4}
                  autoFocus
                  placeholder="****"
                  onChange={(e) => {
                    setError('');
                    const val = e.target.value.replace(/\\D/g, '');
                    if (e.target.value !== val) e.target.value = val;
                    if (val.length === 4) {
                      setTimeout(() => handleVerify(val), 150);
                    }
                  }}
                  className="w-40 bg-zinc-900/50 border border-emerald-500/30 text-emerald-400 text-center text-2xl font-black tracking-[0.5em] rounded-xl py-3 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all placeholder:text-zinc-600 placeholder:tracking-normal"
                />`);

  // Update handleVerify
  content = content.replace("setPasscode('');", "setPasscode('');\n      if (inputRef.current) inputRef.current.value = '';");

  fs.writeFileSync('src/components/Screensaver.tsx', content);
}

function fixLoginView() {
  let content = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

  if (!content.includes('useRef')) {
    content = content.replace("import { useState } from 'react';", "import { useState, useRef } from 'react';");
  }

  // Add ref declaration
  if (!content.includes('const passcodeRef = useRef<HTMLInputElement>(null);')) {
    content = content.replace("const [passcode, setPasscode] = useState('');", "const [passcode, setPasscode] = useState('');\n  const passcodeRef = useRef<HTMLInputElement>(null);");
  }

  // Update input
  const inputRegex = /<input\s+type="password"\s+maxLength=\{4\}\s+placeholder="••••"\s+value=\{passcode\}\s+onChange=\{[\s\S]*?\}\s+className="w-full text-center tracking-widest text-lg font-extrabold py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:bg-white focus:outline-none transition-all"\s+autoFocus\s*\/>/;
  
  content = content.replace(inputRegex, `<input
                  ref={passcodeRef}
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPasscodeError('');
                  }}
                  className="w-full text-center tracking-widest text-lg font-extrabold py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:bg-white focus:outline-none transition-all"
                  autoFocus
                />`);

  // Update handlePasscodeSubmit error case
  // Wait, in handlePasscodeSubmit it might just set error.
  // When 'İptal' is clicked, it clears passcode.
  content = content.replace("setPasscode('');\n                    setPasscodeError('');", "setPasscode('');\n                    setPasscodeError('');\n                    if (passcodeRef.current) passcodeRef.current.value = '';");

  fs.writeFileSync('src/components/LoginView.tsx', content);
}

fixScreensaver();
fixLoginView();
