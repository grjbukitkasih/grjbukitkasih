import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ClipboardList, 
  Search, 
  ShieldCheck, 
  Terminal, 
  Smartphone, 
  Laptop, 
  GraduationCap 
} from 'lucide-react';
import { StudentRegistration, SqlLog, RegistrationStatus } from './types';
import { 
  INITIAL_REGISTRANTS, 
  generateSqlInsertId, 
  generateSqlUpdateStatus, 
  generateSqlSelectOne, 
  createNewLog 
} from './mockData';
import AndroidSimulator from './components/AndroidSimulator';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';
import StatusChecker from './components/StatusChecker';
import AdminPanel from './components/AdminPanel';
import DeveloperCenter from './components/DeveloperCenter';

export default function App() {
  // Navigation State: 'dash' | 'form' | 'status' | 'admin' | 'dev'
  const [activeTab, setActiveTab] = useState<string>('dash');
  
  // Storage State (Persisted in localStorage)
  const [registrants, setRegistrants] = useState<StudentRegistration[]>([]);
  
  // Terminal Logs State
  const [sqlLogs, setSqlLogs] = useState<SqlLog[]>([]);
  
  // Device Preview State: True (Smartphone Mockup), False (Classic Web App)
  const [isAndroidMode, setIsAndroidMode] = useState<boolean>(false);

  // Initialize data on boot
  useEffect(() => {
    // 1. Load registrations
    const cachedData = localStorage.getItem('school_registrations_v1');
    if (cachedData) {
      try {
        setRegistrants(JSON.parse(cachedData));
      } catch (err) {
        setRegistrants(INITIAL_REGISTRANTS);
      }
    } else {
      // Seed initial high quality dummy registrars
      setRegistrants(INITIAL_REGISTRANTS);
      localStorage.setItem('school_registrations_v1', JSON.stringify(INITIAL_REGISTRANTS));
    }

    // 2. Initialize SQL Simulation logs with a boot check
    const bootLog = createNewLog(
      'SELECT',
      'pendaftaran',
      'SELECT * FROM pendaftaran ORDER BY created_at DESC;'
    );
    setSqlLogs([bootLog]);
  }, []);

  // Update storage & push SQL query logs
  const handleAddNewRegistrant = (newReg: Omit<StudentRegistration, 'id' | 'status' | 'createdAt'>) => {
    const randomIdSuffix = Math.floor(1000 + Math.random() * 9000);
    const uniqueId = `REG-2026-${randomIdSuffix}`;
    
    const preparedRegistrant: StudentRegistration = {
      ...newReg,
      id: uniqueId,
      status: 'Menunggu Seleksi',
      createdAt: new Date().toISOString()
    };

    const updatedList = [preparedRegistrant, ...registrants];
    setRegistrants(updatedList);
    localStorage.setItem('school_registrations_v1', JSON.stringify(updatedList));

    // Save insert query log
    const sqlInsertStr = generateSqlInsertId(preparedRegistrant);
    const newInsertLog = createNewLog('INSERT', 'pendaftaran', sqlInsertStr);
    setSqlLogs(prev => [newInsertLog, ...prev]);

    return uniqueId;
  };

  const handleUpdateStatus = (id: string, newStatus: RegistrationStatus, notes: string) => {
    const updatedList = registrants.map(std => {
      if (std.id === id) {
        return { ...std, status: newStatus, notes };
      }
      return std;
    });

    setRegistrants(updatedList);
    localStorage.setItem('school_registrations_v1', JSON.stringify(updatedList));

    // Save update query log
    const sqlUpdateStr = generateSqlUpdateStatus(id, newStatus, notes);
    const newUpdateLog = createNewLog('UPDATE', 'pendaftaran', sqlUpdateStr);
    setSqlLogs(prev => [newUpdateLog, ...prev]);
  };

  const handleSimulateSelectQuery = (idOrNisn: string) => {
    const queryStr = generateSqlSelectOne(idOrNisn);
    const newSelectLog = createNewLog('SELECT', 'pendaftaran', queryStr);
    setSqlLogs(prev => [newSelectLog, ...prev]);
  };

  const handleClearLogs = () => {
    setSqlLogs([]);
  };

  return (
    <AndroidSimulator 
      isAndroidMode={isAndroidMode} 
      onToggleMode={(val) => setIsAndroidMode(val)}
    >
      {/* Brand Navigation Header of internal client template */}
      <nav className="bg-[#1e293b] text-white p-3.5 flex items-center justify-between shadow-md shrink-0 select-none">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm animate-pulse">
            <GraduationCap size={18} strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <p className="font-display font-black text-[12px] tracking-wide text-white uppercase leading-none">PPDB SMART</p>
            <span className="text-[9px] text-[#94a3b8] font-light">E-Registrasi Sekolah Kejuruan</span>
          </div>
        </div>

        {/* Floating Simulator Switch (Inside virtual smartphone screen) */}
        {isAndroidMode && (
          <button
            onClick={() => setIsAndroidMode(false)}
            className="p-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            title="Keluar ke Desktop Web"
            id="mobile-btn-desktop"
          >
            <Laptop size={14} />
          </button>
        )}
      </nav>

      {/* Internal Navigation Tabs */}
      <div className="bg-white border-b border-slate-200/50 flex overflow-x-auto select-none shrink-0 scrollbar-none sticky top-0 z-30">
        {[
          { key: 'dash', label: 'Dashboard', icon: <BookOpen size={13} /> },
          { key: 'form', label: 'Formulir', icon: <ClipboardList size={13} /> },
          { key: 'status', label: 'Cek Status', icon: <Search size={13} /> },
          { key: 'admin', label: 'Admin', icon: <ShieldCheck size={13} /> },
          { key: 'dev', label: 'XAMPP & DB', icon: <Terminal size={13} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 px-1.5 flex flex-col items-center justify-center space-y-1 border-b-2 font-display text-[9px] sm:text-[10px] font-bold tracking-tight transition cursor-pointer min-w-[70px] ${
              activeTab === tab.key 
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/20' 
                : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'
            }`}
            id={`nav-tab-${tab.key}`}
          >
            <div className={`${activeTab === tab.key ? 'text-indigo-600' : 'text-slate-400'}`}>
              {tab.icon}
            </div>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Swappable Frame Workspace content based on current selected tab */}
      <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col pb-6">
        {activeTab === 'dash' && (
          <Dashboard 
            registrants={registrants} 
            onNavigate={(tab) => setActiveTab(tab)} 
            isAndroidMode={isAndroidMode}
          />
        )}
        {activeTab === 'form' && (
          <RegistrationForm 
            onAddRegistrant={handleAddNewRegistrant} 
            isAndroidMode={isAndroidMode}
          />
        )}
        {activeTab === 'status' && (
          <StatusChecker 
            registrants={registrants} 
            onSimulateSelectQuery={handleSimulateSelectQuery} 
            isAndroidMode={isAndroidMode}
          />
        )}
        {activeTab === 'admin' && (
          <AdminPanel 
            registrants={registrants} 
            onUpdateStatus={handleUpdateStatus} 
            isAndroidMode={isAndroidMode}
          />
        )}
        {activeTab === 'dev' && (
          <DeveloperCenter 
            sqlLogs={sqlLogs} 
            onClearLogs={handleClearLogs} 
            isAndroidMode={isAndroidMode}
          />
        )}
      </div>

      {/* Humble digital signature footer inside simulated screens */}
      <footer className="py-2.5 px-4 border-t border-slate-200/50 bg-[#1e293b] text-slate-400 text-center text-[9px] shrink-0 font-mono select-none">
        <p className="leading-tight">&copy; 2026 PPDB Digital &bull; Apache & MySQL DB XAMPP Integrator</p>
      </footer>
    </AndroidSimulator>
  );
}
