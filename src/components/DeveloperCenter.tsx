import React, { useState } from 'react';
import { Database, Terminal, FileCode, CheckCircle, Copy, Info, Share2, Smartphone, Download, Check } from 'lucide-react';
import { SqlLog } from '../types';
import { MYSQL_SCHEMA, PHP_KONEKSI, PHP_API } from '../mockData';

interface DeveloperCenterProps {
  sqlLogs: SqlLog[];
  onClearLogs: () => void;
  isAndroidMode: boolean;
}

export default function DeveloperCenter({ sqlLogs, onClearLogs, isAndroidMode }: DeveloperCenterProps) {
  const [activeFileTab, setActiveFileTab] = useState<'sql' | 'koneksi' | 'api'>('sql');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const getFileContent = () => {
    switch (activeFileTab) {
      case 'koneksi':
        return PHP_KONEKSI;
      case 'api':
        return PHP_API;
      default:
        return MYSQL_SCHEMA;
    }
  };

  const getFileName = () => {
    switch (activeFileTab) {
      case 'koneksi':
        return 'koneksi.php';
      case 'api':
        return 'api.php';
      default:
        return 'db_sekolah.sql';
    }
  };

  const handleCopyCode = () => {
    const code = getFileContent();
    navigator.clipboard.writeText(code);
    setCopiedFile(activeFileTab);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const xamppSteps = [
    { title: 'Jalankan XAMPP', desc: 'Buka XAMPP Control Panel, lalu klik tombol "Start" pada modul Apache dan MySQL.' },
    { title: 'Buat Database', desc: 'Akses http://localhost/phpmyadmin/ lalu buat database baru dengan nama "db_sekolah".' },
    { title: 'Impor Skema SQL', desc: 'Klik tab "SQL" atau "Import" di phpMyAdmin, tempelkan skema "db_sekolah.sql" dan klik "Go".' },
    { title: 'Siapkan Berkas PHP di htdocs', desc: 'Buat folder baru "api_sekolah" di C:/xampp/htdocs/. Simpan file koneksi.php dan api.php di dalam folder tersebut.' },
    { title: 'Uji Koneksi Backend', desc: 'Hubungkan formulir frontend Anda dengan melakukan fetch ke URL endpoint: http://localhost/api_sekolah/api.php' }
  ];

  const androidSteps = [
    { title: 'Pasang Node.js & Android Studio', desc: 'Pastikan laptop Anda telah terinstall Node.js aktif dan Android Studio dengan SDK Manager yang lengkap.' },
    { title: 'Inisialisasi Capacitor di Project', desc: 'Jalankan perintah "npm install @capacitor/core @capacitor/cli" untuk mengaktifkan modul pembungkus WebView.' },
    { title: 'Inisiasi Konfigurasi Aplikasi', desc: 'Jalankan "npx cap init" lalu isi nama aplikasi "PPDB Online" dan app ID "com.sekolah.ppdb". Set webDir ke "dist".' },
    { title: 'Tambahkan Platform Android', desc: 'Jalankan "npm run build" untuk kompilasi react, lalu "npm install @capacitor/android" dan "npx cap add android".' },
    { title: 'Singkronkan Kode & Jalankan APK', desc: 'Jalankan "npx cap sync" untuk mengirim visual web ke folder android. Jalankan "npx cap open android" untuk membuka project di Android Studio, lalu Build APK langsung!' }
  ];

  return (
    <div className={`flex-1 ${isAndroidMode ? 'p-3' : 'p-6 max-w-7xl mx-auto w-full'} space-y-6 text-left animate-fade-in`}>
      
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 flex items-start space-x-3.5 shadow-md">
        <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/15 shrink-0 mt-0.5 select-none">
          <Database size={24} />
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <h3 className="font-display font-extrabold text-[#f1f5f9] text-base leading-snug">Pusat Integrasi Database & XAMPP</h3>
          <p className="text-slate-400 text-xs leading-normal font-light">
            Butuh menjalankan aplikasi ini secara lokal menggunakan <b>XAMPP (Apache, PHP, MySQL)</b> dan dijadikan <b>Aplikasi Android</b>? Salin skema database SQL dan kode API PHP di bawah ini ke htdocs lokal Anda.
          </p>
        </div>
      </div>

      {/* Grid of Two Columns: Left (Codes Explorer) & Right (SQL terminal logger + Setup guides) */}
      <div className={`grid ${isAndroidMode ? 'grid-cols-1 gap-6' : 'grid-cols-1 lg:grid-cols-12 gap-6'}`}>
        
        {/* Codes Explorer (Left Column - 7/12) */}
        <div className={`${isAndroidMode ? '' : 'lg:col-span-7'} bg-[#0b0f19] border border-slate-800 rounded-xl shadow-lg flex flex-col overflow-hidden`}>
          
          {/* Code Window Header */}
          <div className="bg-[#111827] border-b border-slate-800 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <FileCode className="text-emerald-400" size={16} />
              <span className="font-mono text-xs font-bold text-slate-300">{getFileName()}</span>
            </div>
            
            {/* Toggle File Tabs */}
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveFileTab('sql')}
                className={`px-2.5 py-1 rounded text-[10px] font-bold font-mono transition cursor-pointer ${
                  activeFileTab === 'sql' ? 'bg-indigo-600/85 text-white' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                db_sekolah.sql
              </button>
              <button
                onClick={() => setActiveFileTab('koneksi')}
                className={`px-2.5 py-1 rounded text-[10px] font-bold font-mono transition cursor-pointer ${
                  activeFileTab === 'koneksi' ? 'bg-indigo-600/85 text-white' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                koneksi.php
              </button>
              <button
                onClick={() => setActiveFileTab('api')}
                className={`px-2.5 py-1 rounded text-[10px] font-bold font-mono transition cursor-pointer ${
                  activeFileTab === 'api' ? 'bg-indigo-600/85 text-white' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                api.php
              </button>
            </div>
          </div>

          {/* Code display screen */}
          <div className="relative flex-1 p-4 overflow-x-auto select-all max-h-[360px] cursor-text">
            <pre className="font-mono text-[10px] leading-relaxed text-emerald-400/90 whitespace-pre">
              <code>{getFileContent()}</code>
            </pre>
          </div>

          {/* Copy Button in Footer */}
          <div className="bg-[#0f172a] border-t border-slate-800 px-4 py-2.5 flex items-center justify-between">
            <span className="text-[9px] text-slate-500 font-mono">Bahasa: SQL / PHP Native (PDO & MySQLi kompatibel)</span>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 font-bold text-[10px] text-slate-900 transition cursor-pointer"
              id="btn-copy-code"
            >
              {copiedFile === activeFileTab ? (
                <>
                  <Check size={12} strokeWidth={2.5} />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Salin Kode Lengkap</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live SQL Console Logs (Right Column - 5/12) */}
        <div className={`${isAndroidMode ? '' : 'lg:col-span-5'} flex flex-col space-y-6`}>
          
          {/* Live Terminal */}
          <div className="bg-black border border-slate-900 rounded-xl shadow-md overflow-hidden flex flex-col h-[230px]">
            <div className="bg-[#0b0f19] border-b border-slate-950 px-3.5 py-2 flex items-center justify-between select-none shrink-0">
              <div className="flex items-center space-x-2">
                <Terminal size={14} className="text-amber-400" />
                <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live SQL Query Simulator (MySQL)</span>
              </div>
              <button
                onClick={onClearLogs}
                className="text-[9px] text-slate-500 hover:text-slate-300 transition font-mono border border-slate-800 px-1.5 py-0.5 rounded cursor-pointer"
                id="btn-clear-logs"
              >
                Clear Log
              </button>
            </div>

            {/* Scrolling Logs Panel */}
            <div className="flex-1 p-3 overflow-y-auto font-mono text-[9px] text-slate-300 space-y-2.5 text-left scrollbar-thin select-text">
              {sqlLogs.length > 0 ? (
                sqlLogs.map((log) => (
                  <div key={log.id} className="border-l border-slate-800 pl-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`px-1 rounded text-[8px] font-bold ${
                        log.type === 'INSERT' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/30' :
                        log.type === 'UPDATE' ? 'bg-amber-950 text-amber-400 border border-amber-900/30' : 'bg-indigo-950 text-indigo-400'
                      }`}>
                        {log.type} SUCCESS
                      </span>
                      <span className="text-slate-600 text-[8px] font-sans">{log.timestamp}</span>
                    </div>
                    <code className="text-[10px] text-indigo-300 block leading-relaxed break-all whitespace-pre-wrap">{log.query}</code>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-1 select-none">
                  <Terminal size={22} className="stroke-1 text-slate-700" />
                  <p className="font-bold text-[10px]">Konsol SQL Kosong</p>
                  <p className="text-[9px] text-slate-500 text-center max-w-xs font-light">Kirim pendaftaran siswa baru, atau perbarui status di panel admin untuk melihat simulasi query terpapar di sini!</p>
                </div>
              )}
            </div>
          </div>

          {/* Setup Instructions lists */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-xs space-y-3.5">
            <h4 className="font-display font-extrabold text-slate-800 text-xs tracking-wide flex items-center space-x-1.5 uppercase border-b border-slate-100 pb-2">
              <Share2 size={13} className="text-indigo-600" />
              <span>Panduan Konfigurasi & Setup Lokal</span>
            </h4>

            {/* Interactive instructions lists widget */}
            <div className="space-y-4">
              
              {/* XAMPP Steps Accordion */}
              <div>
                <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider mb-2">1. Pasang di XAMPP (Local Host)</p>
                <div className="space-y-2.5">
                  {xamppSteps.map((step, idx) => (
                    <div key={idx} className="flex space-x-2 text-slate-500 leading-relaxed pl-1 align-top text-left items-start">
                      <div className="w-4.5 h-4.5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-[11px] block">{step.title}</span>
                        <p className="text-[10px] font-light leading-snug">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacitor wrapper steps */}
              <div className="border-t border-slate-100 pt-3">
                <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider mb-2 flex items-center space-x-1">
                  <Smartphone size={13} className="text-emerald-500" />
                  <span>2. Kompilasi ke Android (.APK)</span>
                </p>
                <div className="space-y-2.5">
                  {androidSteps.map((step, idx) => (
                    <div key={idx} className="flex space-x-2 text-slate-500 leading-relaxed pl-1 align-top text-left items-start">
                      <div className="w-4.5 h-4.5 rounded-full bg-emerald-50 flex items-center justify-center text-[10px] font-bold text-emerald-700 shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-[11px] block">{step.title}</span>
                        <p className="text-[10px] font-light leading-snug">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
