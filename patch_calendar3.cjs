const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

const target1 = `  const [calendarReferenceDate, setCalendarReferenceDate] = useState<Date>(new Date('2026-06-18'));
  const [isCalendarFullscreen, setIsCalendarFullscreen] = useState(false);`;

const replacement1 = `  const [calendarReferenceDate, setCalendarReferenceDate] = useState<Date>(new Date('2026-06-18'));
  const [isCalendarFullscreen, setIsCalendarFullscreen] = useState(false);

  const toggleCalendarFullscreen = () => {
    const docEl = document.documentElement;
    if (!isCalendarFullscreen) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().then(() => {
          setIsCalendarFullscreen(true);
        }).catch((err) => {
          console.error("Fullscreen request failed, applying fallback layout:", err);
          setIsCalendarFullscreen(true);
        });
      } else {
        setIsCalendarFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsCalendarFullscreen(false);
        }).catch((err) => {
          console.error("Exit fullscreen failed, resetting fallback layout:", err);
          setIsCalendarFullscreen(false);
        });
      } else {
        setIsCalendarFullscreen(false);
      }
    }
  };`;

const target2 = `onClick={() => setIsCalendarFullscreen(!isCalendarFullscreen)}`;
const replacement2 = `onClick={toggleCalendarFullscreen}`;

if(code.includes(target1)){
    code = code.replace(target1, replacement1);
    code = code.replaceAll(target2, replacement2);
    fs.writeFileSync('src/components/DashboardView.tsx', code);
    console.log("Patched toggleCalendarFullscreen!");
} else {
    console.log("toggleCalendarFullscreen target not found!");
}
