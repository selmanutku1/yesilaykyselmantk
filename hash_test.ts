async function test() {
  const enc = new TextEncoder();
  const d1 = enc.encode('4509');
  const d2 = enc.encode('1920');
  const h1 = await crypto.subtle.digest('SHA-256', d1);
  const h2 = await crypto.subtle.digest('SHA-256', d2);
  const a1 = Array.from(new Uint8Array(h1)).map(b => b.toString(16).padStart(2, '0')).join('');
  const a2 = Array.from(new Uint8Array(h2)).map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('4509:', a1);
  console.log('1920:', a2);
}
test();
