import fs from 'fs';

let lines = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8').split('\n');
let depth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const opens = (line.match(/<div/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  depth += opens;
  depth -= closes;
  
  if (depth < 0) {
    console.log(`Negative depth at line ${i+1}: ${line}`);
    depth = 0; // Reset to avoid cascading
  }
}
console.log("Final depth: " + depth);
