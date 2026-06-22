import React, { useState } from 'react';
import { Search, MapPin, Printer, Clipboard, Calendar, FileCheck, HelpCircle, BadgeCheck, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { StudentRegistration } from '../types';

interface StatusCheckerProps {
  registrants: StudentRegistration[];
  onSimulateSelectQuery: (idOrNisn: string) => void;
  isAndroidMode: boolean;
}

export default function StatusChecker({ registrants, onSimulateSelectQuery, isAndroidMode }: StatusCheckerProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchedStudent, setSearchedStudent] = useState<StudentRegistration | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // Trigger SQL select simulation
    onSimulateSelectQuery(query);

    // Look up registrant locally (by id or NISN)
    const match = registrants.find(
      r => r.id.toLowerCase() === query.toLowerCase() || r.nisn === query
    );

    setSearchedStudent(match || null);
    setHasSearched(true);
  };

  const printDocument = () => {
    window.print();
  };

  const getStatusBadge = (status: StudentRegistration['status']) => {
    switch (status) {
      case 'Diterima':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <BadgeCheck size={14} className="stroke-[2.5]" />
            <span>Lolos Seleksi (Diterima)</span>
          </span>
        );
      case 'Ditolak':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle size={14} />
            <span>Tidak Lolos Seleksi (Ditolak)</span>
          </span>
        );
      case 'Cadangan':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <AlertTriangle size={14} />
            <span>Siswa Cadangan (Waiting List)</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={14} />
            <span>Menunggu Hasil Seleksi Berkas</span>
          </span>
        );
    }
  };

  return (
    <div className={`flex-1 ${isAndroidMode ? 'p-4' : 'p-6 max-w-2xl mx-auto w-full'} space-y-6 animate-fade-in`}>
      
      {/* Search status header */}
      <div className="bg-white border border-slate-200/85 rounded-xl shadow-md p-5">
        <div className="space-y-1 mb-4 text-left">
          <h3 className="font-display font-extrabold text-slate-800 text-base flex items-center space-x-2">
            <Search size={18} className="text-indigo-600" />
            <span>Lacak Kelulusan Berkas & PPDB</span>
          </h3>
          <p className="text-slate-500 text-[11px] font-light">
            Masukkan Nomor Registrasi pendaftaran (e.g., <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-amber-700">REG-2026-8012</code>) atau 10 digit NISN Anda untuk memeriksa status kelulusan berkas.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex space-x-2">
          <input
            type="text"
            placeholder="Cari menggunakan REG-XXXX-XXXX atau NISN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-xs text-slate-800"
            id="search-status-box"
          />
          <button
            type="submit"
            className="px-4.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center space-x-1"
            id="btn-search-status"
          >
            <Search size={14} />
            <span className="hidden sm:inline">Cek Status</span>
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="space-y-5 animate-slide-in">
          {searchedStudent ? (
            <div className="space-y-5">
              
              {/* Detailed Tracking Status Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md flex flex-col space-y-4 text-left">
                
                {/* Header Info */}
                <div className="flex items-start justify-between border-b border-rose-50/10 pb-4 flex-wrap gap-2">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block tracking-wider uppercase">Calon Pendaftar</span>
                    <h4 className="font-display font-bold text-slate-800 text-base">{searchedStudent.fullName}</h4>
                    <span className="text-xs text-slate-500">NISN: <code className="font-mono font-bold">{searchedStudent.nisn}</code> &bull; Jalur {searchedStudent.registrationPath}</span>
                  </div>
                  <div>
                    {getStatusBadge(searchedStudent.status)}
                  </div>
                </div>

                {/* Vertical Process Timeline */}
                <div className="py-2.5">
                  <h5 className="font-bold text-[11px] text-slate-400 uppercase tracking-widest mb-3">Linimasa Berkas & Seleksi</h5>
                  <div className="relative border-l-2 border-slate-100 pl-4 space-y-4">
                    
                    {/* Stage 1 */}
                    <div className="relative">
                      <div className="absolute -left-[22px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                      <p className="text-xs font-bold text-slate-800">Berkas Diterima Ke Sistem</p>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">Pendaftar mengunggah data administrasi dan berkas akademik melalui portal web.</p>
                    </div>

                    {/* Stage 2 */}
                    <div className="relative">
                      <div className="absolute -left-[22px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                      <p className="text-xs font-bold text-slate-800">Verifikasi Dokumen Administrasi</p>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">Penitia sekolah melakukan kroscek validitas nomor NISN, data orangtua, dan kesesuaian nilai rapor.</p>
                    </div>

                    {/* Stage 3 */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-0.5 w-3 h-3 rounded-full ${
                        searchedStudent.status === 'Menunggu Seleksi' ? 'bg-amber-400 animate-pulse ring-4 ring-amber-50' : 'bg-emerald-500 ring-4 ring-emerald-50'
                      }`}></div>
                      <p className="text-xs font-bold text-slate-800">Ujian CAT & Pemeringkatan Nilai</p>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">
                        Nilai rapor: <code className="bg-slate-50 px-1 py-0.5 text-xs text-indigo-700 font-bold font-mono rounded">{searchedStudent.gpaScore.toFixed(2)}</code>. 
                        {searchedStudent.status === 'Menunggu Seleksi' ? ' Sedang dalam antrean pemeringkatan kuota siswa baru.' : ' Pemeringkatan nilai dan validasi selesai.'}
                      </p>
                    </div>

                    {/* Stage 4 */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-0.5 w-3 h-3 rounded-full ${
                        searchedStudent.status === 'Menunggu Seleksi' ? 'bg-slate-200' :
                        searchedStudent.status === 'Diterima' ? 'bg-emerald-500 ring-4 ring-emerald-50' :
                        searchedStudent.status === 'Cadangan' ? 'bg-purple-500 ring-4 ring-purple-50' : 'bg-rose-500 ring-4 ring-rose-50'
                      }`}></div>
                      <p className="text-xs font-bold text-slate-800">Keputusan Hasil Akhir</p>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">
                        {searchedStudent.status === 'Menunggu Seleksi' ? 'Hasil keputusan kelulusan berkas final akan dirilis resmi sesuai jadwal kalender sekolah.' : 
                         searchedStudent.status === 'Diterima' ? 'Selamat! Anda diyatalkan Lolos Seleksi. Silakan mengunduh tanda bukti kelolosan untuk digunakan pendaftaran ulang.' :
                         searchedStudent.status === 'Cadangan' ? 'Anda masuk daftar berkas Cadangan. Kami akan menghubungi jika kuota reguler masih tersedia setelah pendaftaran ulang.' :
                         'Kami mohon maaf, saat ini nilai atau kelengkapan berkas Anda belum memenuhi standar kelulusan masuk kuota jalurnya.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes from Admin */}
                {searchedStudent.notes && (
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 text-xs leading-relaxed text-blue-800 mt-2">
                    <span className="font-bold block text-blue-900 border-b border-blue-100/60 pb-1 mb-1 shadow-sm">Catatan Resmi Panitia PPDB:</span>
                    {searchedStudent.notes}
                  </div>
                )}
              </div>

              {/* Printable Ticket Receipt Card */}
              <div id="print-area" className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 shadow-sm text-left relative overflow-hidden space-y-4 bg-gradient-to-br from-indigo-50/20 to-slate-50/50 print:border-none print:shadow-none print:p-0">
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-500/5 rounded-full translate-x-4 -translate-y-4"></div>
                
                {/* School Header Slips */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-display font-extrabold text-white text-xs">PS</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-800 leading-none">PANITIA PPDB SEKOLAH DIGITAL</h4>
                      <span className="text-[9px] text-slate-400">Bukti Registrasi & Kartu Ujian Fisik</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block tracking-widest uppercase">Nomor Bukti</span>
                    <span className="font-mono font-bold text-xs text-indigo-600">{searchedStudent.id}</span>
                  </div>
                </div>

                {/* Receipt Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Nama Calon Siswa :</span>
                    <strong className="text-slate-700 text-xs">{searchedStudent.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Nomor NISN :</span>
                    <strong className="text-slate-700 text-xs font-mono">{searchedStudent.nisn}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Asal SMP :</span>
                    <strong className="text-slate-700 text-xs">{searchedStudent.prevSchool}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Program Keahlian :</span>
                    <strong className="text-slate-700 text-xs">{searchedStudent.chosenMajor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Jalur Masuk :</span>
                    <strong className="text-slate-700 text-xs">{searchedStudent.registrationPath}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Nilai Rata-Rapor :</span>
                    <strong className="text-slate-700 text-xs font-mono">{searchedStudent.gpaScore.toFixed(2)}</strong>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 text-center text-[9px] text-slate-400 flex justify-between items-center bg-slate-50/50 p-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Calendar size={11} />
                    <span>Terdaftar: {new Date(searchedStudent.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <span className="font-semibold text-slate-500">RESMI - TANDA BUKTI PPDB DIGITAL</span>
                </div>

                {/* Print Control in Screen */}
                <div className="flex justify-end pt-1 print:hidden">
                  <button
                    onClick={printDocument}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition cursor-pointer"
                  >
                    <Printer size={13} />
                    <span>Cetak Bukti Registrasi</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-200/90 rounded-xl p-8 text-center space-y-3.5 max-w-md mx-auto">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
                <HelpCircle size={24} />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-800 text-sm">Nomor Registrasi Tidak Ditemukan</h4>
                <p className="text-slate-400 text-xs leading-normal mt-1 max-w-xs mx-auto">
                  Pastikan ejaan karakter ID Pendaftaran yang Anda ketik sudah sesuai (e.g., <code className="font-mono text-indigo-600 select-all">REG-2026-8012</code>) atau tanyakan panitia.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
