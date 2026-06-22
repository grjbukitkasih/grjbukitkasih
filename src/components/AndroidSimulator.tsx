import React from 'react';
import { Smartphone, Laptop, Wifi, Battery, Signal, ArrowLeft, Home, RotateCcw } from 'lucide-react';

interface AndroidSimulatorProps {
  children: React.ReactNode;
  isAndroidMode: boolean;
  onToggleMode: (val: boolean) => void;
}

export default function AndroidSimulator({ children, isAndroidMode, onToggleMode }: AndroidSimulatorProps) {
  const currentTimeString = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  if (!isAndroidMode) {
    return (
      <div className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
        {/* Floating Toggle Controls in desktop/web header */}
        <div className="bg-slate-900 text-white py-3 px-6 shadow-md flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center font-display font-bold text-white text-lg shadow-sm">
              PP
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight tracking-tight">PPDB Online</h1>
              <p className="text-xs text-slate-400">Portal Penerimaan Peserta Didik Baru</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 mr-2 hidden sm:inline">Tampilan Pratinjau:</span>
            <button
              onClick={() => onToggleMode(false)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-600 text-white shadow-sm transition hover:bg-emerald-500"
              id="btn-desktop-view"
            >
              <Laptop size={14} />
              <span>Full Web (Desktop)</span>
            </button>
            <button
              onClick={() => onToggleMode(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 hover:text-white transition"
              id="btn-android-view"
            >
              <Smartphone size={14} />
              <span>Android App</span>
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans flex flex-col items-center justify-center py-6 px-4">
      {/* Header Info */}
      <div className="text-center max-w-md mb-4">
        <h1 className="font-display font-bold text-xl text-emerald-400">Pratinjau Aplikasi Android (Mobile)</h1>
        <p className="text-xs text-slate-400 mt-1">
          Simulasi jalannya aplikasi pendaftaran siswa dalam WebView / APK Android. Klik tombol di bawah untuk kembali ke web penuh.
        </p>
        <button
          onClick={() => onToggleMode(false)}
          className="mt-3 inline-flex items-center space-x-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-900 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
          id="btn-exit-simulator"
        >
          <Laptop size={13} strokeWidth={2.5} />
          <span>Kembali ke Web penuh (Desktop)</span>
        </button>
      </div>

      {/* Realistic Smart Phone Frame wrapper with shadows */}
      <div className="relative w-[380px] h-[780px] bg-slate-950 rounded-[50px] p-3 shadow-2xl border-4 border-slate-800 ring-12 ring-slate-900/50 flex flex-col overflow-hidden">
        
        {/* Physical Camera Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-950 rounded-full z-50 flex items-center justify-center p-1">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-800/80 mr-1.5 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-900"></div>
          </div>
          <div className="w-12 h-1 bg-slate-900 rounded-full"></div>
        </div>

        {/* Floating Mobile Status Bar */}
        <div className="h-7 bg-indigo-950 rounded-t-[38px] text-[11px] font-medium text-slate-200 px-6 flex items-center justify-between z-40 select-none pb-0.5 pt-1.5 shrink-0">
          <div>{currentTimeString}</div>
          <div className="flex items-center space-x-1.5">
            <Signal size={12} />
            <span className="text-[10px] font-mono select-none">4G</span>
            <Wifi size={12} />
            <Battery size={13} className="rotate-90 origin-center text-emerald-400" />
          </div>
        </div>

        {/* Application Content Screen Area */}
        <div className="flex-1 bg-slate-50 text-slate-800 overflow-y-auto rounded-[30px] flex flex-col relative select-text scrollbar-thin">
          {children}
        </div>

        {/* Software Navigation Bar (Android bottom bar) */}
        <div className="h-10 bg-slate-950 rounded-b-[38px] flex items-center justify-around z-40 select-none border-t border-slate-900/60 shrink-0">
          <button 
            onClick={() => onToggleMode(false)} 
            className="text-slate-400 hover:text-white transition p-1.5"
            title="Keluar dari Mockup"
          >
            <RotateCcw size={15} />
          </button>
          
          <button 
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white transition active:scale-95"
            title="Home"
          >
            <Home size={15} />
          </button>

          <button 
            className="text-slate-400 hover:text-white transition p-1.5"
            title="Kembali"
          >
            <ArrowLeft size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
