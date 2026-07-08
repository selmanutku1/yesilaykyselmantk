import React, { useState } from 'react';
import { 
  Wrench, ClipboardList, TrendingUp, Sparkles, FileText, 
  MapPin, CheckCircle, Clock, AlertTriangle, AlertCircle, Phone, Smartphone 
} from 'lucide-react';
import { Task, ShiftAssignment, TechnicalIssue, SupplyRequest } from '../types';

interface TechnicalOperationsViewProps {
  selectedCenterId: string;
  tasks: Task[];
  shifts: ShiftAssignment[];
  onUpdateTasks: (tasks: Task[]) => void;
  onUpdateShifts: (shifts: ShiftAssignment[]) => void;
  onAddLog: (action: string, details: string) => void;
  activeSubView?: 'dashboard' | 'issues' | 'requests' | 'ai-copilot' | 'reports' | 'areas' | 'vardiya';
  onChangeSubView?: (view: 'dashboard' | 'issues' | 'requests' | 'ai-copilot' | 'reports' | 'areas' | 'vardiya') => void;
}

export default function TechnicalOperationsView({
  selectedCenterId,
  tasks,
  shifts,
  onUpdateTasks,
  activeSubView = 'dashboard',
  onChangeSubView
}: TechnicalOperationsViewProps) {
  const [activeTab, setActiveTab] = useState(activeSubView);

  // Sync prop to state if it changes externally
  React.useEffect(() => {
    if (activeSubView) {
      setActiveTab(activeSubView);
    }
  }, [activeSubView]);

  const handleTabChange = (tab: typeof activeSubView) => {
    setActiveTab(tab);
    if (onChangeSubView) onChangeSubView(tab);
  };

  const techTasks = tasks.filter(t => t.department === 'Teknik');
  const pendingTasks = techTasks.filter(t => t.status !== 'Tamamlandı');
  const completedTasks = techTasks.filter(t => t.status === 'Tamamlandı');

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Aktif Teknik Görevler</p>
            <p className="text-3xl font-black text-gray-900 mt-1">{pendingTasks.length}</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tamamlanan</p>
            <p className="text-3xl font-black text-emerald-600 mt-1">{completedTasks.length}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kritik Arızalar</p>
            <p className="text-3xl font-black text-rose-600 mt-1">
              {pendingTasks.filter(t => t.priority === 'Kritik').length}
            </p>
          </div>
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-extrabold text-gray-800 text-sm">Son Teknik Görevler</h3>
          <button onClick={() => handleTabChange('issues')} className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
            Tümünü Gör
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {techTasks.slice(0, 5).map(task => (
            <div key={task.id} className="p-4 hover:bg-gray-50 flex justify-between items-center transition">
              <div>
                <p className="font-bold text-gray-900 text-sm">{task.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                task.status === 'Tamamlandı' ? 'bg-emerald-50 text-emerald-700' :
                task.status === 'Devam Ediyor' ? 'bg-amber-50 text-amber-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
          {techTasks.length === 0 && (
            <div className="p-8 text-center text-gray-400 font-medium text-sm">
              Görüntülenecek teknik görev bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderIssues = () => (
    <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h3 className="font-extrabold text-gray-800 text-sm">Arıza ve Bakım Defteri</h3>
          <p className="text-xs text-gray-500 mt-0.5">Saha personeli tarafından girilen aktif arıza kayıtları.</p>
        </div>
        <button className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3 rounded-lg transition cursor-pointer">
          <Wrench className="w-3.5 h-3.5" />
          <span>Yeni Arıza Bildir</span>
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {pendingTasks.length > 0 ? pendingTasks.map(task => (
          <div key={task.id} className="p-5 hover:bg-gray-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <AlertTriangle className={`w-5 h-5 ${task.priority === 'Kritik' ? 'text-rose-500' : 'text-amber-500'}`} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{task.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xs font-bold text-gray-400">Öncelik: <span className={task.priority === 'Kritik' ? 'text-rose-600' : ''}>{task.priority}</span></span>
                  <span className="text-2xs font-bold text-gray-400">Bölge: {task.department}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-2 shrink-0">
               <span className={`px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700`}>
                {task.status}
              </span>
              <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">Müdahale Et</button>
            </div>
          </div>
        )) : (
          <div className="p-12 text-center text-gray-400">
            <Wrench className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="font-medium">Bekleyen teknik arıza bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPlaceholder = (title: string, desc: string, Icon: any) => (
    <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-extrabold text-gray-800 text-sm flex items-center gap-2">
          <Icon className="w-4 h-4 text-emerald-600" />
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <div className="p-12 text-center text-gray-400">
        <p className="font-medium text-sm">Bu modül daha sade ve net bir deneyim için yenilenmektedir.</p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Kontrol Paneli', icon: TrendingUp },
    { id: 'issues', label: 'Arıza Defteri', icon: Wrench },
    { id: 'requests', label: 'Talepler', icon: ClipboardList },
    { id: 'ai-copilot', label: 'AI Copilot', icon: Sparkles },
    { id: 'reports', label: 'Raporlar', icon: FileText },
    { id: 'areas', label: 'Bölgesel Tarama', icon: MapPin },
  ] as const;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Tabs */}
      <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm overflow-x-auto hide-scrollbar">
        <div className="flex space-x-1 min-w-max">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-800 shadow-sm border border-emerald-100/50' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="transition-all duration-300">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'issues' && renderIssues()}
        {activeTab === 'requests' && renderPlaceholder('Malzeme ve Satın Alma Talepleri', 'Departmanların ihtiyaç duyduğu sarf malzeme ve onarım talepleri.', ClipboardList)}
        {activeTab === 'ai-copilot' && renderPlaceholder('Yapay Zeka Teknik Copilot', 'Geçmiş arıza verilerini işleyerek kronik sorunları tespit eden asistan.', Sparkles)}
        {activeTab === 'reports' && renderPlaceholder('Teknik Raporlar', 'SLA özetleri ve departman performans karnesi.', FileText)}
        {activeTab === 'areas' && renderPlaceholder('Bölgesel Tarama', 'Tesis denetim logları ve QR bildirimleri.', MapPin)}
        {activeTab === 'vardiya' && renderPlaceholder('Vardiya Yönetimi', 'Teknik personel vardiya çizelgesi.', Clock)}
      </div>
    </div>
  );
}
