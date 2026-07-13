const fs = require('fs');
let content = fs.readFileSync('src/components/PublicCalendarView.tsx', 'utf8');

content = content.replace('Sun,\n  Moon', 'Sun,\n  Moon,\n  Maximize,\n  Minimize');

const stateStr = `  const [isDark, setIsDark] = useState<boolean>(() => {`;
const fullScreenState = `  const [isFullscreen, setIsFullscreen] = useState(false);
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.getElementById('public-calendar-master')?.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

`;

content = content.replace(stateStr, fullScreenState + stateStr);

const buttonsStr = `<button              onClick={() => setIsDark(!isDark)}              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"              title={isDark ? "Açık Tema" : "Koyu Tema"}            >              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}            </button>`;

const fullScreenButton = `<button              onClick={toggleFullscreen}              className="w-8 h-8 hidden md:flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"              title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}            >              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}            </button>            `;

content = content.replace(buttonsStr, fullScreenButton + buttonsStr);

fs.writeFileSync('src/components/PublicCalendarView.tsx', content);
