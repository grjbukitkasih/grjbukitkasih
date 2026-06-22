import React, { useState } from 'react';
import { Lock, LogOut, Search, UserCheck, ShieldAlert, BadgeCheck, FileText, XCircle, Clock, AlertTriangle, ArrowUpDown, ChevronRight, MessageSquare, BookOpen, Key } from 'lucide-react';
import { StudentRegistration, RegistrationStatus } from '../types';

interface AdminPanelProps {
  registrants: StudentRegistration[];
  onUpdateStatus: (id: string, status: RegistrationStatus, notes: string) => void;
  isAndroidMode: boolean;
}

export default function AdminPanel({ registrants, onUpdateStatus, isAndroidMode }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Table Filters & Modals
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pathFilter, setPathFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'gpa'>('date');
  const [selectedStudent, setSelectedStudent] = useState<StudentRegistration | null>(null);

  // Status updating fields in modal
  const [modalStatus, setModalStatus] = useState<RegistrationStatus>('Menunggu Seleksi');
  const [modalNotes, setModalNotes] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Kredensial salah! Gunakan username: admin & password: admin123');
    }
  };

  const autoLogin = () => {
    setUsername('admin');
    setPassword('admin123');
    setIsAuthenticated(true);
    setLoginError('');
  };

  const handleOpenModal = (std: StudentRegistration) => {
    setSelectedStudent(std);
    setModalStatus(std.status);
    setModalNotes(std.notes || '');
  };

  const handleSaveChanges = () => {
    if (!selectedStudent) return;
    onUpdateStatus(selectedStudent.id, modalStatus, modalNotes);
    
    // Update the local modal state too
    setSelectedStudent(prev => prev ? { ...prev, status: modalStatus, notes: modalNotes } : null);
    alert(`Data siswa ${selectedStudent.fullName} berhasil diperbarui!`);
  };

  // Filter & Sort Applicants
  const filteredStudents = registrants
    .filter(std => {
      const matchQuery = std.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         std.nisn.includes(searchQuery) || 
                         std.prevSchool.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || std.status === statusFilter;
      const matchPath = pathFilter === 'all' || std.registrationPath === pathFilter;
      return matchQuery && matchStatus && matchPath;
    })
    .sort((a, b) => {
      if (sortBy === 'gpa') {
        return b.gpaScore - a.gpaScore; // Highest GPA first
      } else {
        // Date descending (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  if (!isAuthenticated) {
    return (
      <div className={`flex-1 ${isAndroidMode ? 'p-4' : 'p-6 max-w-sm mx-auto w-full'} flex items-center justify-center animate-fade-in`}>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 w-full text-left space-y-5">
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-lg shadow-inner">
              <Lock size={20} />
            </div>
            <h3 className="font-display font-extrabold text-slate-800 text-base">Portal Seleksi Admin</h3>
            <p className="text-slate-400 text-[10px] sm:text-xs">Masuk untuk mengelola data berkas pendaftar baru.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5">
            <div className="flex flex-col space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Username</label>
              <input
                type="text"
                placeholder="Masukkan username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs outline-none text-slate-800 focus:border-indigo-500"
                id="admin-username-input"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="Masukkan password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs outline-none text-slate-800 focus:border-indigo-500"
                id="admin-pwd-input"
              />
            </div>

            {loginError && <p className="text-[9px] text-red-500 text-center font-semibold">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 transition text-white font-bold rounded-lg text-xs shadow-sm cursor-pointer"
              id="admin-login-submit"
            >
              Sign In Akun Admin
            </button>
          </form>

          {/* Quick bypass button for user convenience */}
          <div className="border-t border-slate-100 pt-4 text-center">
            <span className="text-[10px] text-slate-400 font-light block mb-2">Menguji Sandbox? Klik di bawah untuk auto-login:</span>
            <button
              onClick={autoLogin}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-semibold text-[10px] transition cursor-pointer"
              id="admin-autologin-btn"
            >
              <Key size={11} className="text-amber-500" />
              <span>Gunakan Akun Demo (admin)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 ${isAndroidMode ? 'p-3' : 'p-6 max-w-7xl mx-auto w-full'} space-y-4 text-left animate-fade-in`}>
      
      {/* Admin Dashboard Header */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-center justify-between shadow-sm flex-wrap gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-sm">
            ADM
          </div>
          <div>
            <h3 className="font-display font-extrabold text-slate-800 text-sm">Dashboard Pengawas & Panitia</h3>
            <span className="text-[10px] text-slate-400">Petugas : <b>admin (Administrator)</b></span>
          </div>
        </div>
        
        <button
          onClick={() => setIsAuthenticated(false)}
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-red-50/50 hover:text-red-500 text-slate-500 text-[10px] font-bold transition cursor-pointer"
          id="btn-admin-logout"
        >
          <LogOut size={12} />
          <span>Keluar Panel</span>
        </button>
      </div>

      {/* Control Filters Area */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Pencarian Siswa</label>
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Nama, NISN atau SMP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-[11px] outline-none text-slate-800"
              id="admin-search-box"
            />
          </div>
        </div>

        {/* Filter Status */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Filter Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] bg-white outline-none"
            id="admin-status-filter"
          >
            <option value="all">Semua Status</option>
            <option value="Menunggu Seleksi">Menunggu Seleksi</option>
            <option value="Diterima">Diterima (Lolos)</option>
            <option value="Cadangan">Cadangan</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

        {/* Filter Jalur */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Filter Jalur Masuk</label>
          <select
            value={pathFilter}
            onChange={(e) => setPathFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] bg-white outline-none"
            id="admin-path-filter"
          >
            <option value="all">Semua Jalur</option>
            <option value="Reguler">Reguler</option>
            <option value="Prestasi">Prestasi</option>
            <option value="Zonasi">Zonasi</option>
            <option value="Afirmasi">Afirmasi</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Urutan Pemeringkatan</label>
          <div className="flex space-x-1">
            <button
              onClick={() => setSortBy('date')}
              className={`flex-1 py-1.5 rounded-md border text-[10px] font-bold transition cursor-pointer ${
                sortBy === 'date' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-200 bg-white text-slate-500'
              }`}
              id="sort-btn-date"
            >
              Terbaru
            </button>
            <button
              onClick={() => setSortBy('gpa')}
              className={`flex-1 py-1.5 rounded-md border text-[10px] font-bold transition cursor-pointer ${
                sortBy === 'gpa' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-200 bg-white text-slate-500'
              }`}
              id="sort-btn-gpa"
            >
              Nilai Rapor
            </button>
          </div>
        </div>
      </div>

      {/* applicants lists display container */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm">
        
        {/* Table layout for Web View / Small screens card layout */}
        {filteredStudents.length > 0 ? (
          <div className="overflow-x-auto">
            
            {/* Desktop Full Table View */}
            <table className="w-full border-collapse text-left text-xs hidden sm:table">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 select-none">
                  <th className="py-3 px-4">Nama Siswa / NISN</th>
                  <th className="py-3 px-4">Asal SMP</th>
                  <th className="py-3 px-4">Jalur & Jurusan</th>
                  <th className="py-3 px-4 text-center">Nilai Rata Rapor</th>
                  <th className="py-3 px-4">Status Seleksi</th>
                  <th className="py-3 px-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800">{std.fullName}</p>
                      <span className="text-[10px] text-slate-400 font-mono">NISN: {std.nisn} &bull; {std.id}</span>
                    </td>
                    <td className="py-3 px-4 font-light text-slate-600">{std.prevSchool}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-1.8 py-0.5 rounded text-[9px] bg-slate-100 text-slate-600 font-semibold mb-0.5">{std.registrationPath}</span>
                      <p className="text-[10px] text-slate-500 truncate max-w-[130px]">{std.chosenMajor.split(' ')[0]}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <strong className="text-indigo-600 font-mono text-xs">{std.gpaScore.toFixed(2)}</strong>
                    </td>
                    <td className="py-3 px-4">
                      {std.status === 'Diterima' && <span className="px-2 py-0.8 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Diterima</span>}
                      {std.status === 'Ditolak' && <span className="px-2 py-0.8 text-[10px] font-bold rounded-full bg-rose-50 text-rose-700">Ditolak</span>}
                      {std.status === 'Cadangan' && <span className="px-2 py-0.8 text-[10px] font-bold rounded-full bg-purple-50 text-purple-700">Cadangan</span>}
                      {std.status === 'Menunggu Seleksi' && <span className="px-2 py-0.8 text-[10px] font-bold rounded-full bg-amber-50 text-amber-700">Seleksi</span>}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenModal(std)}
                        className="p-1 px-2.5 rounded border border-slate-200 hover:border-indigo-500 hover:bg-slate-50 text-[10px] font-bold text-indigo-600 transition cursor-pointer"
                      >
                        Kelola
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile / Responsive Shell Card list */}
            <div className="block sm:hidden divide-y divide-slate-100">
              {filteredStudents.map((std) => (
                <div key={std.id} className="p-3 hover:bg-slate-50/50 transition flex items-center justify-between" onClick={() => handleOpenModal(std)}>
                  <div className="space-y-1">
                    <p className="font-extrabold text-slate-800 text-xs">{std.fullName}</p>
                    <p className="text-[10px] text-slate-400 font-light">
                      SMP: <span className="font-normal text-slate-600">{std.prevSchool}</span> &bull; Rapor: <span className="font-bold text-indigo-600 font-mono">{std.gpaScore.toFixed(1)}</span>
                    </p>
                    <div className="flex items-center space-x-1.5 pt-1">
                      <span className="px-1.5 py-0.5 rounded text-[8px] bg-slate-100 font-semibold">{std.registrationPath}</span>
                      <span className="text-[9px] text-slate-400">{std.chosenMajor.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1.5 shrink-0 ml-2">
                    {std.status === 'Diterima' && <span className="px-1.5 py-0.5 text-[8px] font-bold rounded-full bg-emerald-50 text-emerald-700">Lolos</span>}
                    {std.status === 'Ditolak' && <span className="px-1.5 py-0.5 text-[8px] font-bold rounded-full bg-rose-50 text-rose-700">Ditolak</span>}
                    {std.status === 'Cadangan' && <span className="px-1.5 py-0.5 text-[8px] font-bold rounded-full bg-purple-50 text-purple-700">Cadangan</span>}
                    {std.status === 'Menunggu Seleksi' && <span className="px-1.5 py-0.5 text-[8px] font-bold rounded-full bg-amber-50 text-amber-700">Seleksi</span>}
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 font-light space-y-1">
            <ShieldAlert size={36} className="mx-auto text-slate-300 mb-2" />
            <p className="text-xs font-bold text-slate-800">Tidak ada pendaftar baru</p>
            <p className="text-[10px]">Coba sesuaikan kata kunci pencarian atau bersihkan filter di atas.</p>
          </div>
        )}
      </div>

      {/* applicant detail updating modal overlays */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-950/70 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-scale-up text-left">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest block">Manajemen Seleksi Siswa</span>
                <h4 className="font-display font-extrabold text-slate-800 text-sm sm:text-base leading-tight mt-0.5">{selectedStudent.fullName}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">No. Registrasi: {selectedStudent.id} &bull; NISN: {selectedStudent.nisn}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <XCircle size={18} />
              </button>
            </div>

            {/* Modal Grid of biodata details */}
            <div className="grid grid-cols-2 gap-3 text-xs border-b border-slate-150 pb-4">
              <div>
                <span className="text-slate-400 text-[9px] block">Asal Sekolah (SMP) :</span>
                <span className="font-bold text-slate-700">{selectedStudent.prevSchool}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] block">Nilai Rata Rapor :</span>
                <span className="font-mono font-bold text-indigo-600">{selectedStudent.gpaScore.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] block">Jalur Penerimaan :</span>
                <span className="font-bold text-slate-700">{selectedStudent.registrationPath}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] block">Pilihan Jurusan :</span>
                <span className="font-bold text-slate-700 whitespace-nowrap truncate max-w-[150px]">{selectedStudent.chosenMajor.split(' ')[0]}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] block">No HP Siswa :</span>
                <span className="font-bold text-slate-700 font-mono">{selectedStudent.phoneNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] block">Email Siswa :</span>
                <span className="font-bold text-slate-700 truncate block max-w-[150px]">{selectedStudent.email}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] block">Nama Orang Tua :</span>
                <span className="font-bold text-slate-700">{selectedStudent.parentName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] block">No Orang Tua :</span>
                <span className="font-bold text-slate-700 font-mono">{selectedStudent.parentPhone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 text-[9px] block">Alamat Rumah Lengkap :</span>
                <p className="font-light text-slate-600 leading-normal text-[11px]">{selectedStudent.address}</p>
              </div>
            </div>

            {/* Decision making action fields */}
            <div className="space-y-3.5 bg-slate-50 p-4 rounded-xl border border-slate-150">
              <h5 className="font-bold text-slate-800 text-xs">Evaluasi Hasil Kelulusan</h5>
              
              {/* Dropdown status selector */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Perbarui Status Pendaftaran</label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(['Menunggu Seleksi', 'Diterima', 'Cadangan', 'Ditolak'] as RegistrationStatus[]).map((statusValue) => (
                    <button
                      key={statusValue}
                      type="button"
                      onClick={() => setModalStatus(statusValue)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border transition cursor-pointer ${
                        modalStatus === statusValue
                          ? 'bg-slate-800 border-slate-800 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-150'
                      }`}
                    >
                      {statusValue === 'Menunggu Seleksi' ? 'Proses Seleksi' : statusValue}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea for interviewer notes */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center space-x-1">
                  <MessageSquare size={11} />
                  <span>Keterangan / Catatan Verifikator</span>
                </label>
                <textarea
                  placeholder="Tambahkan informasi kelulusan, alasan diterima/ditolak, atau jadwal wawancara di sini..."
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  rows={2}
                  className="w-full p-2 rounded-lg border border-slate-200 text-xs outline-none bg-white text-slate-800"
                  id="modal-notes-area"
                />
              </div>
            </div>

            {/* Action buttons inside Modal footer */}
            <div className="flex justify-end space-x-2 border-t border-slate-100 pt-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-1.8 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-bold transition border border-transparent cursor-pointer"
              >
                Kembali
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-5 py-1.8 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-lg text-xs shadow-md shadow-emerald-500/10 transition cursor-pointer"
                id="btn-modal-save"
              >
                Simpan Perubahan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
