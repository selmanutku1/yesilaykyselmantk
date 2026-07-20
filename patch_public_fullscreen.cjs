const fs = require('fs');
let code = fs.readFileSync('src/components/PublicCalendarView.tsx', 'utf-8');

const target = `  // Use CSS-based fullscreen to avoid iframe restrictions
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };`;

const replacement = `  // Attempt native fullscreen, fallback to CSS-based fullscreen
  const toggleFullscreen = () => {
    const docEl = document.documentElement;
    if (!isFullscreen) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch((err) => {
          console.error("Fullscreen request failed, applying fallback layout:", err);
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch((err) => {
          console.error("Exit fullscreen failed, resetting fallback layout:", err);
          setIsFullscreen(false);
        });
      } else {
        setIsFullscreen(false);
      }
    }
  };`;

if(code.includes(target)){
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/PublicCalendarView.tsx', code);
    console.log("Patched PublicCalendarView fullscreen!");
} else {
    console.log("PublicCalendarView fullscreen target not found!");
}
