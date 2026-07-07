import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Building2, 
  Search, 
  SlidersHorizontal,
  CalendarDays,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { CampActivity, CampCenter } from '../types';

interface PublicCalendarViewProps {
  activities: CampActivity[];
  campCenters: CampCenter[];
}

export default function PublicCalendarView({ activities, campCenters }: PublicCalendarViewProps) {
  // Local active theme state to toggle light/dark
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('kys_theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class to body/html
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('kys_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('kys_theme', 'light');
    }
  }, [isDark]);

  // Calendar states
  const [selectedCampCenterId, setSelectedCampCenterId] = useState<string>(() => {
    return campCenters[0]?.id || 'C01';
  });
  const [calendarReferenceDate, setCalendarReferenceDate] = useState<Date>(new Date('2026-06-18'));
  const [calendarViewMode, setCalendarViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [selectedDetailedEvent, setSelectedDetailedEvent] = useState<CampActivity | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('Tümü');
  const [copied, setCopied] = useState<boolean>(false);
  const [actDetailsCopied, setActDetailsCopied] = useState<boolean>(false);

  // Filter activities based on Center, Type, and Search query
  const filteredActivities = activities.filter(act => {
    const matchesCenter = act.campCenterId === selectedCampCenterId;
    const matchesType = selectedTypeFilter === 'Tümü' || act.type === selectedTypeFilter;
    const matchesSearch = searchQuery === '' || 
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (act.location && act.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (act.instructorId && act.instructorId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCenter && matchesType && matchesSearch;
  });

  const getCalendarTitleText = () => {
    if (calendarViewMode === 'month') {
      return calendarReferenceDate.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });
    } else if (calendarViewMode === 'week') {
      const dayOfWeek = calendarReferenceDate.getDay();
      const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const monday = new Date(calendarReferenceDate.getTime());
      monday.setDate(calendarReferenceDate.getDate() + offsetToMonday);
      const sunday = new Date(monday.getTime());
      sunday.setDate(monday.getDate() + 6);
      
      const monStr = monday.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
      const sunStr = sunday.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
      return `${monStr} - ${sunStr}`;
    } else {
      return calendarReferenceDate.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
    }
  };

  const handlePrevCalendar = () => {
    const d = new Date(calendarReferenceDate.getTime());
    if (calendarViewMode === 'month') {
      d.setMonth(d.getMonth() - 1);
    } else if (calendarViewMode === 'week') {
      d.setDate(d.getDate() - 7);
    } else {
      d.setDate(d.getDate() - 1);
    }
    setCalendarReferenceDate(d);
  };

  const handleNextCalendar = () => {
    const d = new Date(calendarReferenceDate.getTime());
    if (calendarViewMode === 'month') {
      d.setMonth(d.getMonth() + 1);
    } else if (calendarViewMode === 'week') {
      d.setDate(d.getDate() + 7);
    } else {
      d.setDate(d.getDate() + 1);
    }
    setCalendarReferenceDate(d);
  };

  const handleTodayCalendar = () => {
    setCalendarReferenceDate(new Date('2026-06-18'));
  };

  const handleCopyLink = () => {
    const publicUrl = window.location.origin + window.location.pathname + '?view=takvim';
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActivitiesForDate = (date: Date) => {
    return filteredActivities.filter(act => {
      const actD = new Date(act.dateTime);
      return actD.getFullYear() === date.getFullYear() &&
             actD.getMonth() === date.getMonth() &&
             actD.getDate() === date.getDate();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 font-sans flex flex-col" id="public-calendar-master">
      
      {/* Header Banner */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-150 dark:border-gray-750 px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          {/* Authentic Yeşilay Logo Component */}
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-750 rounded-xl p-1 shadow-2xs select-none h-14">
            <div className="w-11 h-11 flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg">
              <svg viewBox="0 0 100 100" className="w-9 h-9">
                <path
                  d="M52,15 A35,35 0 1,0 85,68 A28,28 0 1,1 85,32 A35,35 0 0,0 52,15 Z"
                  fill="#00AB41"
                />
              </svg>
            </div>
            
            <div className="h-9 w-[1.5px] bg-gray-300 dark:bg-gray-600 mx-2.5" />
            
            <div className="pr-3 flex flex-col justify-center">
              <span className="font-black text-[#0B3B24] dark:text-gray-100 tracking-tight text-lg leading-none">YEŞİLAY</span>
              <span className="text-[7.5px] text-[#00AB41] font-black uppercase tracking-[0.2em] mt-1 leading-none">TÜRKİYE</span>
            </div>
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">Kamp Takvimi</h1>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Theme Selector */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
            title="Temayı Değiştir"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-6">
        
        {/* Top filter dashboard */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-750 p-5 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-emerald-600" />
                Günlük ve Haftalık Aktivite Planlayıcısı
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Yeşilay Kamp Merkezleri bünyesindeki tüm spor müsabakalarını, eğitimleri, seminerleri ve atölyeleri buradan canlı olarak inceleyebilirsiniz.
              </p>
            </div>

            {/* Camp Center Selector */}
            <div className="flex items-center gap-2 bg-emerald-50/50 dark:bg-gray-700/50 p-1.5 border border-emerald-100 dark:border-gray-700 rounded-xl w-full lg:w-auto">
              <Building2 className="w-4 h-4 text-emerald-700 dark:text-emerald-300 shrink-0 ml-1" />
              <span className="text-[10px] font-black text-emerald-900 dark:text-emerald-100 uppercase shrink-0">Kamp Merkezi Filtresi:</span>
              <select
                value={selectedCampCenterId}
                onChange={(e) => setSelectedCampCenterId(e.target.value)}
                className="bg-transparent text-xs font-bold text-emerald-950 dark:text-white focus:outline-none cursor-pointer pr-2 flex-grow min-w-0"
              >
                {campCenters.map((cc) => (
                  <option key={cc.id} value={cc.id}>
                    {cc.name} ({cc.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Activity Filters: Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            {/* Search input */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Aktivite adı, salon, konum veya sorumlu ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Calendar Body */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-750 p-5 shadow-xs space-y-4">
          
          {/* Calendar Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 dark:bg-gray-900/50 p-3.5 rounded-xl border border-gray-100 dark:border-gray-750">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleTodayCalendar}
                className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 transition cursor-pointer"
              >
                Bugün
              </button>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-3xs">
                <button
                  type="button"
                  onClick={handlePrevCalendar}
                  className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 border-r border-gray-200 dark:border-gray-700 transition text-gray-600 dark:text-gray-350 cursor-pointer"
                  title="Önceki"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextCalendar}
                  className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-350 cursor-pointer"
                  title="Sonraki"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs font-extrabold text-gray-800 dark:text-gray-100 min-w-[130px] ml-1">
                {getCalendarTitleText()}
              </span>
            </div>

            {/* View Selector Tabs */}
            <div className="flex bg-gray-200/60 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200/30 dark:border-gray-700 self-start sm:self-auto">
              {(['month', 'week', 'day', 'agenda'] as const).map((view) => {
                const label = view === 'month' ? 'Aylık' : view === 'week' ? 'Haftalık' : view === 'day' ? 'Günlük' : 'Ajanda';
                const active = calendarViewMode === view;
                return (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setCalendarViewMode(view)}
                    className={`px-3.5 py-1 rounded-md text-[10px] font-bold transition cursor-pointer ${
                      active
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs'
                        : 'text-gray-500 hover:text-gray-850 dark:hover:text-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calendar Display Grid Router */}
          {(() => {
            const referenceYear = calendarReferenceDate.getFullYear();
            const referenceMonth = calendarReferenceDate.getMonth();

            // Month View grid calculation
            const firstDayOfMonth = new Date(referenceYear, referenceMonth, 1);
            const firstDayOfWeek = firstDayOfMonth.getDay();
            const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
            const gridStartDate = new Date(referenceYear, referenceMonth, 1 - startOffset);

            const monthGridDates: Date[] = [];
            for (let i = 0; i < 42; i++) {
              const d = new Date(gridStartDate.getTime());
              d.setDate(gridStartDate.getDate() + i);
              monthGridDates.push(d);
            }

            // Week View calculations
            const currentDayOfWeek = calendarReferenceDate.getDay();
            const offsetToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
            const mondayDate = new Date(calendarReferenceDate.getTime());
            mondayDate.setDate(calendarReferenceDate.getDate() + offsetToMonday);

            const weekGridDates: Date[] = [];
            for (let i = 0; i < 7; i++) {
              const d = new Date(mondayDate.getTime());
              d.setDate(mondayDate.getDate() + i);
              weekGridDates.push(d);
            }

            return (
              <div className="border border-gray-150 dark:border-gray-750 rounded-xl overflow-hidden shadow-3xs">
                {calendarViewMode === 'month' && (
                  <div>
                    {/* Days of Week headers */}
                    <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-900 border-b border-gray-150 dark:border-gray-750 text-center py-2">
                      {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => (
                        <span key={day} className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">{day}</span>
                      ))}
                    </div>

                    {/* Month Days grid */}
                    <div className="grid grid-cols-7 divide-x divide-y divide-gray-100 dark:divide-gray-750 bg-white dark:bg-gray-800">
                      {monthGridDates.map((d, index) => {
                        const isCurrentMonth = d.getMonth() === referenceMonth;
                        const isToday = d.toDateString() === new Date().toDateString();
                        const isSelected = d.toDateString() === calendarReferenceDate.toDateString();
                        const dateAct = getActivitiesForDate(d);

                        return (
                          <div
                            key={index}
                            className={`min-h-[110px] p-2 flex flex-col justify-between group hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition relative ${
                              isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/30 dark:bg-gray-900/20'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() => {
                                  setCalendarReferenceDate(d);
                                  setCalendarViewMode('day');
                                }}
                                className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold cursor-pointer hover:bg-gray-150 dark:hover:bg-gray-700 transition ${
                                  isToday
                                    ? 'bg-blue-600 text-white'
                                    : isSelected
                                    ? 'bg-emerald-600 text-white'
                                    : isCurrentMonth
                                    ? 'text-gray-800 dark:text-gray-200'
                                    : 'text-gray-350 dark:text-gray-600'
                                }`}
                              >
                                {d.getDate()}
                              </button>
                            </div>

                            {/* Daily Activities Stack */}
                            <div className="flex-1 mt-1.5 space-y-0.5 overflow-y-auto max-h-[64px] scrollbar-none">
                              {dateAct.slice(0, 3).map((act) => {
                                const actTime = new Date(act.dateTime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
                                let pClass = 'bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800';
                                if (act.type === 'Spor') pClass = 'bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900';
                                else if (act.type === 'Atölye') pClass = 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900';
                                else if (act.type === 'Eğitim') pClass = 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900';
                                else if (act.type === 'Seminer') pClass = 'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900';
                                else if (act.type === 'Eğlence') pClass = 'bg-pink-50 text-pink-700 border-pink-100 hover:bg-pink-100 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-900';

                                return (
                                  <div
                                    key={act.id}
                                    onClick={() => setSelectedDetailedEvent(act)}
                                    className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded border leading-tight truncate flex items-center justify-between gap-1 transition cursor-pointer hover:shadow-2xs ${pClass}`}
                                    title={`${actTime} - ${act.title}`}
                                  >
                                    <span className="truncate flex-1 text-left">
                                      {actTime} {act.title}
                                    </span>
                                  </div>
                                );
                              })}
                              {dateAct.length > 3 && (
                                <div className="text-[7.5px] text-gray-400 dark:text-gray-500 font-extrabold text-center">+{dateAct.length - 3} etkinlik</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {calendarViewMode === 'week' && (
                  <div className="grid grid-cols-7 divide-x divide-gray-150 dark:divide-gray-750 bg-white dark:bg-gray-800">
                    {weekGridDates.map((wDate, wIndex) => {
                      const isToday = wDate.toDateString() === new Date().toDateString();
                      const dateAct = getActivitiesForDate(wDate);
                      const dayLabel = wDate.toLocaleDateString('tr-TR', { weekday: 'short' });

                      return (
                        <div key={wIndex} className="min-h-[280px] p-2 hover:bg-gray-50/40 dark:hover:bg-gray-700/20 transition">
                          <div className="border-b dark:border-gray-700 pb-2 mb-2.5 text-center">
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide block">{dayLabel}</span>
                            <span className={`w-7 h-7 inline-flex items-center justify-center rounded-full text-xs font-black mt-1 ${isToday ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                              {wDate.getDate()}
                            </span>
                          </div>

                          <div className="space-y-1.5 overflow-y-auto max-h-[210px] scrollbar-thin">
                            {dateAct.map((act) => {
                              const actTime = new Date(act.dateTime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
                              let badgeC = 'bg-gray-50 border-gray-150 text-gray-700 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-350';
                              if (act.type === 'Spor') badgeC = 'bg-sky-50 border-sky-150 text-sky-700 dark:bg-sky-950/30 dark:border-sky-900 dark:text-sky-300';
                              else if (act.type === 'Atölye') badgeC = 'bg-amber-50 border-amber-150 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300';
                              else if (act.type === 'Eğitim') badgeC = 'bg-emerald-50 border-emerald-150 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-300';
                              else if (act.type === 'Seminer') badgeC = 'bg-purple-50 border-purple-150 text-purple-700 dark:bg-purple-950/30 dark:border-purple-900 dark:text-purple-300';
                              else if (act.type === 'Eğlence') badgeC = 'bg-pink-50 border-pink-150 text-pink-700 dark:bg-pink-950/30 dark:border-pink-900 dark:text-pink-300';

                              return (
                                <div
                                  key={act.id}
                                  onClick={() => setSelectedDetailedEvent(act)}
                                  className={`p-2 rounded-lg border text-3xs font-black leading-tight cursor-pointer transition hover:shadow-xs text-left ${badgeC}`}
                                >
                                  <p className="opacity-75">{actTime}</p>
                                  <h5 className="font-bold truncate mt-0.5">{act.title}</h5>
                                </div>
                              );
                            })}
                            {dateAct.length === 0 && (
                              <div className="text-[9px] text-gray-350 dark:text-gray-650 italic text-center py-8">Etkinlik yok</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {calendarViewMode === 'day' && (
                  <div className="p-5 bg-white dark:bg-gray-800 text-left space-y-4">
                    <div className="flex items-center gap-2 border-b dark:border-gray-700 pb-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                      <h4 className="text-sm font-black text-gray-800 dark:text-gray-200">
                        {calendarReferenceDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })}
                      </h4>
                    </div>

                    <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                      {getActivitiesForDate(calendarReferenceDate).map((act) => {
                        const actTime = new Date(act.dateTime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
                        let badgeC = 'bg-gray-50 border-gray-150 text-gray-700 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300';
                        if (act.type === 'Spor') badgeC = 'bg-sky-50 border-sky-150 text-sky-700 dark:bg-sky-950/30 dark:border-sky-900 dark:text-sky-300';
                        else if (act.type === 'Atölye') badgeC = 'bg-amber-50 border-amber-150 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300';
                        else if (act.type === 'Eğitim') badgeC = 'bg-emerald-50 border-emerald-150 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-300';
                        else if (act.type === 'Seminer') badgeC = 'bg-purple-50 border-purple-150 text-purple-700 dark:bg-purple-950/30 dark:border-purple-900 dark:text-purple-300';
                        else if (act.type === 'Eğlence') badgeC = 'bg-pink-50 border-pink-150 text-pink-700 dark:bg-pink-950/30 dark:border-pink-900 dark:text-pink-300';

                        return (
                          <div
                            key={act.id}
                            onClick={() => setSelectedDetailedEvent(act)}
                            className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition hover:shadow-xs ${badgeC}`}
                          >
                            <div className="space-y-1.5 text-left">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-white/80 dark:bg-gray-800/80 border dark:border-gray-700 px-2.5 py-0.5 rounded-md">{act.type}</span>
                                <span className="text-2xs font-extrabold text-gray-500 dark:text-gray-400">{actTime}</span>
                              </div>
                              <h4 className="text-xs font-black text-gray-850 dark:text-gray-100">{act.title}</h4>
                              <p className="text-[10px] text-gray-450 dark:text-gray-400 font-semibold">
                                Konum: <strong className="text-gray-600 dark:text-gray-200">{act.location}</strong> • Sorumlu Lider: <strong className="text-gray-600 dark:text-gray-200">{act.instructorId}</strong>
                              </p>
                            </div>
                            <span className="text-3xs font-extrabold uppercase bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded border dark:border-gray-700 text-gray-400">Detaylar</span>
                          </div>
                        );
                      })}
                      {getActivitiesForDate(calendarReferenceDate).length === 0 && (
                        <div className="text-center py-14 text-gray-400 dark:text-gray-500 text-xs italic">Seçilen günde planlanmış kamp programı bulunmamaktadır.</div>
                      )}
                    </div>
                  </div>
                )}

                {calendarViewMode === 'agenda' && (
                  <div className="p-5 bg-white dark:bg-gray-800 text-left">
                    {(() => {
                      if (filteredActivities.length === 0) {
                        return <div className="text-center py-14 text-gray-400 dark:text-gray-500 text-xs italic">Seçimlerinize uygun kamp programı bulunmamaktadır.</div>;
                      }

                      const groups: { [key: string]: CampActivity[] } = {};
                      filteredActivities.forEach(act => {
                        const dateStr = new Date(act.dateTime).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
                        if (!groups[dateStr]) groups[dateStr] = [];
                        groups[dateStr].push(act);
                      });

                      return (
                        <div className="space-y-5 max-h-[420px] overflow-y-auto pr-1">
                          {Object.keys(groups).map((dateStr) => (
                            <div key={dateStr} className="space-y-2 text-left">
                              <h4 className="text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md tracking-wider uppercase inline-block">
                                {dateStr}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                {groups[dateStr].map((act) => {
                                  const actTime = new Date(act.dateTime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
                                  let badgeClass = 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
                                  if (act.type === 'Spor') badgeClass = 'bg-sky-50 text-sky-700 border border-sky-100 dark:bg-sky-950/30 dark:text-sky-300 dark:border-sky-900';
                                  else if (act.type === 'Atölye') badgeClass = 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900';
                                  else if (act.type === 'Eğitim') badgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900';
                                  else if (act.type === 'Seminer') badgeClass = 'bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-900';
                                  else if (act.type === 'Eğlence') badgeClass = 'bg-pink-50 text-pink-700 border border-pink-100 dark:bg-pink-950/30 dark:text-pink-300 dark:border-pink-900';

                                  return (
                                    <div
                                      key={act.id}
                                      onClick={() => setSelectedDetailedEvent(act)}
                                      className="p-3.5 bg-gray-50/50 hover:bg-gray-50 dark:bg-gray-900/20 dark:hover:bg-gray-900/50 border border-gray-100 dark:border-gray-750 rounded-xl flex items-start justify-between gap-3 transition cursor-pointer hover:shadow-xs"
                                    >
                                      <div className="space-y-1.5 text-left">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>
                                            {act.type}
                                          </span>
                                          <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold">
                                            {actTime}
                                          </span>
                                        </div>
                                        <h4 className="text-xs font-bold text-gray-850 dark:text-gray-100 line-clamp-1">{act.title}</h4>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-400 font-semibold flex items-center gap-1">
                                          <span>Konum: <strong className="text-gray-600 dark:text-gray-300">{act.location}</strong></span>
                                          <span className="text-gray-300 dark:text-gray-700">|</span>
                                          <span>Eğitmen: <strong className="text-gray-600 dark:text-gray-300">{act.instructorId}</strong></span>
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Informational Footer */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-500 space-y-1.5 pt-4">
          <p className="font-semibold">Türkiye Yeşilay Cemiyeti © 2026 | Kamp Yönetim Sistemi</p>
          <p className="text-[10px] opacity-80">
            Bu sayfa Yeşilay kamp programlarının şeffaf ve güvenli bir şekilde tüm katılımcılar, gönüllüler ve kamuoyu ile paylaşılması amacıyla hazırlanmıştır.
          </p>
        </footer>
      </main>

      {/* Detailed Event Modal */}
      {selectedDetailedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-950 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden border border-gray-150 dark:border-gray-800 animate-in zoom-in-95 duration-200">
            {(() => {
              const act = selectedDetailedEvent;
              const actTime = new Date(act.dateTime);
              const dateStr = actTime.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
              const timeStr = actTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

              let headerBg = 'bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
              let typeBadge = 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
              let iconColor = 'text-gray-500';

              if (act.type === 'Spor') {
                headerBg = 'bg-sky-50 text-sky-950 border-sky-100 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-900';
                typeBadge = 'bg-sky-100/80 text-sky-800 border-sky-200 dark:bg-sky-900/60 dark:text-sky-300 dark:border-sky-800';
                iconColor = 'text-sky-600 dark:text-sky-400';
              } else if (act.type === 'Atölye') {
                headerBg = 'bg-amber-50 text-amber-950 border-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900';
                typeBadge = 'bg-amber-100/80 text-amber-800 border-amber-200 dark:bg-amber-900/60 dark:text-amber-300 dark:border-amber-800';
                iconColor = 'text-amber-600 dark:text-amber-400';
              } else if (act.type === 'Eğitim') {
                headerBg = 'bg-emerald-50 text-emerald-950 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900';
                typeBadge = 'bg-emerald-100/80 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-800';
                iconColor = 'text-emerald-600 dark:text-emerald-400';
              } else if (act.type === 'Seminer') {
                headerBg = 'bg-purple-50 text-purple-950 border-purple-100 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-900';
                typeBadge = 'bg-purple-100/80 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-300 dark:border-purple-800';
                iconColor = 'text-purple-600 dark:text-purple-400';
              } else if (act.type === 'Eğlence') {
                headerBg = 'bg-pink-50 text-pink-950 border-pink-100 dark:bg-pink-950/40 dark:text-pink-200 dark:border-pink-900';
                typeBadge = 'bg-pink-100/80 text-pink-800 border-pink-200 dark:bg-pink-900/60 dark:text-pink-300 dark:border-pink-800';
                iconColor = 'text-pink-600 dark:text-pink-400';
              }

              const handleCopyDetails = () => {
                const textToCopy = `Aktivite: ${act.title}\nTür: ${act.type}\nTarih: ${dateStr} - ${timeStr}\nKonum: ${act.location}\nEğitmen: ${act.instructorId}`;
                navigator.clipboard.writeText(textToCopy);
                setActDetailsCopied(true);
                setTimeout(() => setActDetailsCopied(false), 2000);
              };

              return (
                <>
                  <div className={`p-5 border-b dark:border-gray-800 flex items-start justify-between gap-4 ${headerBg}`}>
                    <div className="space-y-1.5 text-left">
                      <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full border tracking-wide uppercase inline-block ${typeBadge}`}>
                        {act.type}
                      </span>
                      <h3 className="text-sm font-black tracking-tight text-gray-950 dark:text-white leading-snug">
                        {act.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedDetailedEvent(null)}
                      className="text-gray-400 hover:text-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full w-7 h-7 flex items-center justify-center transition border border-gray-150 dark:border-gray-850 cursor-pointer text-xs"
                      title="Kapat"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Date and Time */}
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 ${iconColor}`}>
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <p className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-wider">Tarih ve Saat</p>
                        <p className="text-xs font-bold text-gray-805 dark:text-gray-200">{dateStr}</p>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {timeStr}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 ${iconColor}`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <p className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-wider">Konum / Salon</p>
                        <p className="text-xs font-bold text-gray-850 dark:text-gray-200">{act.location || 'Belirtilmedi'}</p>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 ${iconColor}`}>
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <p className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-wider">Sorumlu Eğitmen / Lider</p>
                        <p className="text-xs font-bold text-gray-850 dark:text-gray-200">{act.instructorId || 'Atanmadı'}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handleCopyDetails}
                        className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-emerald-600 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        {actDetailsCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {actDetailsCopied ? 'Kopyalandı' : 'Bilgileri Kopyala'}
                      </button>
                      <button
                        onClick={() => setSelectedDetailedEvent(null)}
                        className="px-4 py-1.5 bg-gray-900 hover:bg-gray-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 text-xs font-bold rounded-lg cursor-pointer"
                      >
                        Kapat
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
