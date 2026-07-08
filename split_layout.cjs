const fs = require('fs');
const content = fs.readFileSync('src/components/PeriodManagementView.tsx', 'utf8');

const startListStr = `          <div className="xl:col-span-2 space-y-4">
            <div className="flex justify-between items-center gap-2 flex-wrap">`;
const endListStr = `              ))}
            </div>
          </div>`;

const startFormStr = `          {/* Quick Add period panel */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 space-y-3.5 text-xs h-fit">`;
const endFormStr = `              </button>
            </form>
          </div>`;

const startIndex = content.indexOf(startListStr);
const endListIndex = content.indexOf(endListStr) + endListStr.length;
const startFormIndex = content.indexOf(startFormStr);
const endFormIndex = content.indexOf(endFormStr) + endFormStr.length;

if (startIndex > -1 && endListIndex > -1 && startFormIndex > -1 && endFormIndex > -1) {
  const listBlock = content.substring(startIndex, endListIndex);
  const formBlock = content.substring(startFormIndex, endFormIndex);
  
  const beforeList = content.substring(0, startIndex);
  const afterForm = content.substring(endFormIndex);
  
  // They are side by side: <listBlock> <spaces> <formBlock>
  const middle = content.substring(endListIndex, startFormIndex);
  
  const newContent = beforeList + formBlock + middle + listBlock + afterForm;
  
  fs.writeFileSync('src/components/PeriodManagementView.tsx', newContent);
  console.log('Swapped successfully');
} else {
  console.log('Could not find boundaries');
  console.log(startIndex, endListIndex, startFormIndex, endFormIndex);
}
