import React from 'react';
import { ClipboardList, Search, BookOpen, Clock, Calendar, ShieldCheck, Mail, Phone, MapPin, Users, UserCheck, AlertCircle } from 'lucide-react';
import { StudentRegistration } from '../types';

interface DashboardProps {
  registrants: StudentRegistration[];
  onNavigate: (tab: string) => void;
  isAndroidMode: boolean;
}

export default function Dashboard({ registrants, onNavigate, isAndroidMode }: DashboardProps) {
  // Compute school stats dynamically
  const total = registrants.length;
  const accepted = registrants.filter(r => r.status === 'Diterima').length;
  const pending = registrants.filter(r => r.status === 'Menunggu Seleksi').length;
  const waitingList = registrants.filter(r => r.status === 'Cadangan').length;

  const timelineSteps = [
    { date: '1 Juni - 30 Juni 2026', title: 'Pendaftaran Online', desc: 'Pengisian data lengkap, berkas, & pemilihan jurusan.' },
    { date: '1 Juli - 5 Juli 2026', title: 'Seleksi Berkas & CAT', desc: 'Verifikasi berkas nilai, prestasi, dan ujian tertulis online.' },
    { date: '10 Juli 2026', title: 'Pengumuman Resmi', desc: 'Hasil seleksi diumumkan secara transparan melalui web/app.' },
    { date: '12 Juli - 15 Juli 2026', title: 'Daftar Ulang', desc: 'Verifikasi fisik dokumen dan wawancara di sekolah.' }
  ];

  const paths = [
    { name: 'Jalur Prestasi', limit: 'Raport min. 85 / sertifikat kejuaraan', color: 'border-emerald-500 text-emerald-700 bg-emerald-50' },
    { name: 'Jalur Zonasi', limit: 'Berdasarkan jarak domisili radiasi terdekat', color: 'border-indigo-500 text-indigo-700 bg-indigo-50' },
    { name: 'Jalur Reguler', limit: 'Seleksi rata-rata nilai raport umum', color: 'border-blue-500 text-blue-700 bg-blue-50' },
    { name: 'Jalur Afirmasi', limit: 'Bagi penerima KIP/KKS/PKH terdaftar', color: 'border-amber-500 text-amber-700 bg-amber-50' }
  ];

  return (
    <div className={`flex-1 ${isAndroidMode ? 'p-4' : 'p-6 max-w-7xl mx-auto w-full'} space-y-6 animate-fade-in`}>
      
      {/* Welcome & Announcement Hero */}
      <div className="bg-gradient-to-r from-teal-800 to-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-indigo-950/20">
        <div className="absolute right-0 bottom-0 translate-y-6 translate-x-6 opacity-10 pointer-events-none select-none">
          <BookOpen size={240} />
        </div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 shadow-sm animate-pulse">
            <Clock size={12} className="stroke-[3]" />
            <span>Gelombang I Dibuka</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">
            Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-light">
            Selamat datang di sistem PPDB Digital. Daftarkan putra-putri terbaik Anda secara mudah, mandiri, dan pantau status kelolosan secara transparan dan realtime.
          </p>

          <div className="pt-3 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('form')}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-sm transition shadow-md shadow-emerald-400/10 cursor-pointer"
              id="dash-btn-daftar"
            >
              <ClipboardList size={16} />
              <span>Daftar Siswa Baru</span>
            </button>
            <button
              onClick={() => onNavigate('status')}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-900/65 hover:bg-slate-900/80 border border-slate-700/60 text-white font-semibold rounded-lg text-sm transition cursor-pointer"
              id="dash-btn-cek"
            >
              <Search size={16} />
              <span>Cek Status Pendaftaran</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Registration Stats */}
      <div>
        <h3 className="font-display font-bold text-lg text-slate-900 mb-3 flex items-center space-x-2">
          <Users size={18} className="text-indigo-600" />
          <span>Statistik PPDB Terkini</span>
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
              <Users size={20} />
            </div>
            <div>
              <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Pendaftar</span>
              <span className="font-display font-extrabold text-xl text-slate-800">{total} <span className="text-xs font-normal text-slate-400">Siswa</span></span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
              <UserCheck size={20} />
            </div>
            <div>
              <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">Diterima</span>
              <span className="font-display font-extrabold text-xl text-slate-800">{accepted} <span className="text-xs font-normal text-emerald-500">Lolos</span></span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <Clock size={20} />
            </div>
            <div>
              <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">Proses Seleksi</span>
              <span className="font-display font-extrabold text-xl text-slate-800">{pending} <span className="text-xs font-normal text-slate-400">Siswa</span></span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <AlertCircle size={20} />
            </div>
            <div>
              <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">Cadangan</span>
              <span className="font-display font-extrabold text-xl text-slate-800">{waitingList} <span className="text-xs font-normal text-slate-400">Siswa</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout of Paths and Timeline */}
      <div className={`grid ${isAndroidMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'} gap-6`}>
        
        {/* Timeline Jadwal (Left Column) */}
        <div className={`${isAndroidMode ? '' : 'md:col-span-7'} bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-4`}>
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Calendar className="text-slate-700" size={18} />
            <h4 className="font-display font-bold text-slate-900 text-sm">Jadwal & Agenda Penting</h4>
          </div>

          <div className="relative border-l-2 border-slate-100 pl-4 space-y-5 py-1">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Node counter DOT */}
                <div className="absolute -left-[24px] top-1.5 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white ring-4 ring-indigo-50"></div>
                <div className="text-[11px] font-semibold text-indigo-600 flex items-center space-x-1">
                  <Clock size={10} />
                  <span>{step.date}</span>
                </div>
                <h5 className="font-bold text-xs text-slate-800 mt-0.5">{step.title}</h5>
                <p className="text-[11px] text-slate-400 font-light mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Jalur Pendaftaran (Right Column) */}
        <div className={`${isAndroidMode ? '' : 'md:col-span-5'} bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-3`}>
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="text-slate-700" size={18} />
            <h4 className="font-display font-bold text-slate-900 text-sm">Jalur Penerimaan & Persyaratan</h4>
          </div>

          <div className="space-y-2.5">
            {paths.map((p, idx) => (
              <div key={idx} className={`p-3 rounded-lg border-l-4 ${p.color} border border-slate-100 transition hover:-translate-y-0.5`}>
                <h5 className="font-bold text-xs text-slate-800 leading-tight">{p.name}</h5>
                <p className="text-[10px] text-slate-500 mt-1 leading-snug">{p.limit}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 p-3 rounded-lg text-[10px] text-slate-500 space-y-1.5 leading-relaxed">
            <p className="font-bold text-slate-700 text-xs">Persiapan Dokumen Pembantu:</p>
            <ul className="list-disc pl-3.5 space-y-0.5">
              <li>Kartu Keluarga (KK) & Akta Kelahiran</li>
              <li>Sertifikat Prestasi (Fotokopi/Digital)</li>
              <li>Rata-rata Nilai Rapor Semester 1-5</li>
              <li>Pas Foto resmi 3x4 berlatar merah/biru</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Info Kontak Sekolah */}
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-3.5">
        <h4 className="font-display font-bold text-slate-800 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Informasi & Kontak Bantuan</h4>
        <div className={`grid ${isAndroidMode ? 'grid-cols-1 gap-2.5' : 'grid-cols-1 md:grid-cols-3 gap-4'} text-[11px] text-slate-500`}>
          <div className="flex items-start space-x-2 text-left">
            <MapPin size={15} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-700">Hubungi Kampus Fisik</p>
              <p className="font-light">Jl. Pendidikan Nasional No. 100, Kel. Kebon Raya, Bandung, Jawa Barat</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 text-left">
            <Phone size={15} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-700">Layanan Telepon & WA</p>
              <p className="font-light">(022) 7654-3210 (Hari Kerja)</p>
              <p className="font-light">+62 812-3456-7890 (Panitia PPDB)</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 text-left">
            <Mail size={15} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-700">Kirim Email Pertanyaan</p>
              <p className="font-light">ppdb@sekolahmaju.sch.id</p>
              <p className="font-light">humas@sekolahmaju.sch.id</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
