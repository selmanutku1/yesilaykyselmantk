import fs from 'fs';

let lines = fs.readFileSync('src/components/TechnicalOperationsView.tsx', 'utf8').split('\n');
let depth = 0;
let newLines = [];
let blockDepth = null;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.includes("{activeSubView ===")) {
    blockDepth = depth; // Remember depth before opening this block
  }

  const opens = (line.match(/<div/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  depth += opens;
  depth -= closes;
  
  if (line.includes(")}")) {
    if (blockDepth !== null) {
      // Before closing the block, we should be at blockDepth.
      // If we are deeper, it means we missed some </div>.
      while (depth > blockDepth) {
        newLines.push("</div>");
        depth--;
      }
      // If we are shallower, it means we had too many </div>.
      // This is harder to fix here since they are already printed.
      blockDepth = null;
    }
  }

  // If depth < 0, it means an extra </div> was added. Let's just remove it!
  if (depth < 0) {
    // Remove the last </div> from the line
    line = line.replace(/<\/div>/, '');
    depth++;
  }

  newLines.push(line);
}

fs.writeFileSync('src/components/TechnicalOperationsView.tsx', newLines.join('\n'));
console.log('done');
