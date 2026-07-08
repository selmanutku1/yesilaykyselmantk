import fs from 'fs';

let lines = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8').split('\n');
let outLines = [];
let divStack = 0;
let inSection = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes("{activeSubView ===")) {
    inSection = true;
    divStack = 0;
  }

  if (inSection) {
    const opens = (line.match(/<div/g) || []).length;
    const closes = (line.match(/<\/div>/g) || []).length;
    divStack += opens;
    
    // If the line has closes, only keep them if stack > 0
    if (closes > 0) {
      let newLine = line;
      for (let c = 0; c < closes; c++) {
        if (divStack <= 0) {
          // Remove one </div>
          newLine = newLine.replace('</div>', '');
        } else {
          divStack--;
        }
      }
      // If after removing extra </div> the line is just spaces, we can skip it or push empty
      if (newLine.trim() === '') {
        continue;
      }
      outLines.push(newLine);
      
      // Also handle the `)}` closing
      if (newLine.includes(')}')) {
        inSection = false;
        divStack = 0;
      }
      continue;
    }
    
    if (line.includes(')}')) {
      inSection = false;
      divStack = 0;
    }
  }

  outLines.push(line);
}

fs.writeFileSync('src/components/TechnicalOperationsView.tsx', outLines.join('\n'));
console.log('done');
