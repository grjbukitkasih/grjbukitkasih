import React, { useState } from 'react';
import { User, Book, Users, Check, ArrowRight, ArrowLeft, Clipboard, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { StudentRegistration } from '../types';

interface RegistrationFormProps {
  onAddRegistrant: (newReg: Omit<StudentRegistration, 'id' | 'status' | 'createdAt'>) => string;
  isAndroidMode: boolean;
}

export default function RegistrationForm({ onAddRegistrant, isAndroidMode }: RegistrationFormProps) {
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    nisn: '',
    gender: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    birthPlace: '',
    birthDate: '',
    address: '',
    phoneNumber: '',
    email: '',
    prevSchool: '',
    registrationPath: 'Reguler' as 'Reguler' | 'Prestasi' | 'Afirmasi' | 'Zonasi',
    chosenMajor: 'RPL (Rekayasa Perangkat Lunak)' as 'RPL (Rekayasa Perangkat Lunak)' | 'TKJ (Teknik Komputer Jaringan)',
    parentName: '',
    parentPhone: '',
    parentJob: '',
    gpaScore: ''
  });

  // Success State
  const [registeredId, setRegisteredId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const tempErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) tempErrors.fullName = 'Nama lengkap wajib diisi';
      if (!formData.nisn.trim()) {
        tempErrors.nisn = 'NISN wajib diisi';
      } else if (!/^\d{10}$/.test(formData.nisn)) {
        tempErrors.nisn = 'NISN harus berupa 10 digit angka';
      }
      if (!formData.birthPlace.trim()) tempErrors.birthPlace = 'Tempat lahir wajib diisi';
      if (!formData.birthDate) tempErrors.birthDate = 'Tanggal lahir wajib diisi';
      if (!formData.prevSchool.trim()) tempErrors.prevSchool = 'Asal sekolah SMP wajib dlihar/diisi';
      if (!formData.address.trim()) tempErrors.address = 'Alamat lengkap wajib diisi';
    } else if (currentStep === 2) {
      if (!formData.email.trim()) {
        tempErrors.email = 'Email wajib diisi';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = 'Format email tidak valid';
      }
      if (!formData.phoneNumber.trim()) {
        tempErrors.phoneNumber = 'Nomor HP/WhatsApp wajib diisi';
      } else if (!/^\d{9,15}$/.test(formData.phoneNumber)) {
        tempErrors.phoneNumber = 'Nomor HP harus berupa angka (9 - 15 digit)';
      }
      if (!formData.gpaScore) {
        tempErrors.gpaScore = 'Nilai Rata-rata Rapor semester 1-5 wajib diisi';
      } else {
        const gpa = parseFloat(formData.gpaScore);
        if (isNaN(gpa) || gpa < 0 || gpa > 100) {
          tempErrors.gpaScore = 'Nilai Rapor harus berada di antara rentang 0 - 100';
        }
      }
    } else if (currentStep === 3) {
      if (!formData.parentName.trim()) tempErrors.parentName = 'Nama orang tua/wali wajib diisi';
      if (!formData.parentPhone.trim()) {
        tempErrors.parentPhone = 'Nomor HP orang tua wajib diisi';
      } else if (!/^\d{9,15}$/.test(formData.parentPhone)) {
        tempErrors.parentPhone = 'Nomor HP harus berupa angka';
      }
      if (!formData.parentJob.trim()) tempErrors.parentJob = 'Pekerjaan orang tua wajib diisi';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    const gpa = parseFloat(formData.gpaScore) || 0;
    const newRegId = onAddRegistrant({
      fullName: formData.fullName,
      nisn: formData.nisn,
      gender: formData.gender,
      birthPlace: formData.birthPlace,
      birthDate: formData.birthDate,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      prevSchool: formData.prevSchool,
      registrationPath: formData.registrationPath,
      chosenMajor: formData.chosenMajor as any,
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
      parentJob: formData.parentJob,
      gpaScore: gpa
    });

    setRegisteredId(newRegId);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      nisn: '',
      gender: 'Laki-laki',
      birthPlace: '',
      birthDate: '',
      address: '',
      phoneNumber: '',
      email: '',
      prevSchool: '',
      registrationPath: 'Reguler',
      chosenMajor: 'RPL (Rekayasa Perangkat Lunak)',
      parentName: '',
      parentPhone: '',
      parentJob: '',
      gpaScore: ''
    });
    setRegisteredId(null);
    setStep(1);
    setErrors({});
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('ID Pendaftaran berhasil disalin!');
  };

  if (registeredId) {
    return (
      <div className={`flex-1 ${isAndroidMode ? 'p-4' : 'p-6 max-w-xl mx-auto w-full'} flex items-center justify-center animate-fade-in`}>
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl p-6 text-center space-y-6 w-full">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-inner">
            <CheckCircle2 size={36} className="stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-xl text-slate-800">Formulir Dikirim Berhasil!</h3>
            <p className="text-slate-500 text-xs leading-relaxed max-w-md mx-auto">
              Berkas data pendaftaran siswa baru Anda telah masuk database. Simpan ID di bawah untuk melacak status kelulusan berkas.
            </p>
          </div>

          {/* Virtual Receipt Voucher style Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 rounded-xl p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/5 -rotate-45 translate-x-2 -translate-y-2 rounded-lg"></div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6366f1]">Nomor Pendaftaran PPDB</span>
              <div className="flex items-center justify-center space-x-2 mt-1">
                <span className="font-mono font-bold text-lg text-slate-800" id="receipt-id-text">{registeredId}</span>
                <button
                  onClick={() => copyToClipboard(registeredId)}
                  className="text-indigo-600 hover:text-indigo-500 transition p-1 hover:bg-white rounded border border-indigo-100"
                  title="Salin ID"
                  id="btn-copy-receipt-id"
                >
                  <Clipboard size={14} />
                </button>
              </div>
            </div>

            <div className="border-t border-slate-200/50 pt-3 grid grid-cols-2 gap-2 text-left text-xs">
              <div>
                <span className="text-slate-400 text-[10px]">Nama Siswa:</span>
                <p className="font-bold text-slate-700 truncate">{formData.fullName}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Pilihan Jurusan:</span>
                <p className="font-bold text-slate-700 truncate">{formData.chosenMajor.split(' ')[0]}</p>
              </div>
            </div>
          </div>

          {/* Educational Developer call-out */}
          <div className="p-3 bg-amber-50 rounded-lg text-left flex items-start space-x-2.5 border border-amber-100">
            <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="text-[10px] text-amber-800 leading-relaxed font-light">
              <span className="font-semibold block text-amber-900">Edu-Note (XAMPP / MySQL Simulation):</span>
              Tindakan di atas baru saja mensimulasikan query SQL <code className="font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">INSERT INTO pendaftaran ...</code> secara lokal. Catatannya langsung terekam pada menu <b>Developer Center MySQL Logs</b> di atas!
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              onClick={resetForm}
              className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
              id="btn-reset-form"
            >
              Daftar Siswa Lainnya
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 ${isAndroidMode ? 'p-4' : 'p-6 max-w-2xl mx-auto w-full'} space-y-6 animate-fade-in`}>
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-md p-5 sm:p-6 space-y-5">
        
        {/* Dynamic Multi-Step Header Header */}
        <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h3 className="font-display font-extrabold text-slate-800 text-base flex items-center space-x-2">
            <User size={18} className="text-indigo-600" />
            <span>Formulir Pendaftaran Online</span>
          </h3>
          <p className="text-slate-500 text-[11px]">
            Input berkas kelengkapan siswa baru. Kolom dengan tanda bintang (<span className="text-red-500 font-bold">*</span>) wajib diisi.
          </p>

          {/* Stepper visual index circles */}
          <div className="flex items-center justify-between pt-4 pb-2 px-1">
            <div className={`flex flex-col items-center space-y-1 ${step >= 1 ? 'text-indigo-600 font-bold' : 'text-slate-300'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border ${step >= 1 ? 'bg-indigo-50 border-indigo-600 shadow-sm' : 'bg-white border-slate-200'}`}>
                {step > 1 ? <Check size={12} strokeWidth={3} /> : '1'}
              </div>
              <span className="text-[9px]">Data Siswa</span>
            </div>
            <div className="flex-1 h-[2px] bg-slate-100 mx-1.5 -translate-y-2.5">
              <div className={`h-full bg-indigo-600 transition-all duration-300`} style={{ width: step === 2 ? '50%' : step > 2 ? '100%' : '0%' }}></div>
            </div>

            <div className={`flex flex-col items-center space-y-1 ${step >= 2 ? 'text-indigo-600 font-bold' : 'text-slate-300'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border ${step >= 2 ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-slate-200'}`}>
                {step > 2 ? <Check size={12} strokeWidth={3} /> : '2'}
              </div>
              <span className="text-[9px]">Nilai & Akademis</span>
            </div>
            <div className="flex-1 h-[2px] bg-slate-100 mx-1.5 -translate-y-2.5">
              <div className={`h-full bg-indigo-600 transition-all duration-300`} style={{ width: step === 3 ? '100%' : '0%' }}></div>
            </div>

            <div className={`flex flex-col items-center space-y-1 ${step >= 3 ? 'text-indigo-600 font-bold' : 'text-slate-300'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border ${step >= 3 ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-slate-200'}`}>
                3
              </div>
              <span className="text-[9px]">Orang Tua & Wali</span>
            </div>
          </div>
        </div>

        {/* Formulir Multi-step Switch container based on state */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {step === 1 && (
            <div className="space-y-3 animate-slide-in">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center space-x-1 border-b border-slate-100 pb-1.5">
                <span>Langkah 1: Identitas Pribadi Calon Siswa</span>
              </h4>

              {/* Nama Lengkap */}
              <div className="flex flex-col text-left space-y-1 mt-1">
                <label className="text-xs font-semibold text-slate-700">Nama Lengkap Siswa <span className="text-red-500 font-bold">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Contoh: Muhammad Azis Saputra"
                  className={`w-full px-3 py-1.5 border ${errors.fullName ? 'border-red-400 bg-red-50/10' : 'border-slate-200 focus:border-indigo-600'} rounded-lg text-xs outline-none`}
                  id="input-fullname"
                />
                {errors.fullName && <span className="text-[10px] text-red-500 font-medium">{errors.fullName}</span>}
              </div>

              {/* NISN (10 digits) */}
              <div className="flex flex-col text-left space-y-1">
                <label className="text-xs font-semibold text-slate-700">Nomor NISN (10 Digit) <span className="text-red-500 font-bold">*</span></label>
                <input
                  type="text"
                  name="nisn"
                  maxLength={10}
                  value={formData.nisn}
                  onChange={handleInputChange}
                  placeholder="Contoh: 0097481023"
                  className={`w-full px-3 py-1.5 border ${errors.nisn ? 'border-red-400 bg-red-50/10' : 'border-slate-200 focus:border-indigo-600'} rounded-lg text-xs font-mono outline-none`}
                  id="input-nisn"
                />
                <span className="text-[9px] text-slate-400 font-light leading-none">Catt: Nomor Induk Siswa Nasional, harus berupa 10 digit angka.</span>
                {errors.nisn && <span className="text-[10px] text-red-500 font-medium">{errors.nisn}</span>}
              </div>

              {/* Jenis Kelamin & Tanggal Lahir (2 Columns/Grid) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Jenis Kelamin <span className="text-red-500 font-bold">*</span></label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs outline-none bg-white"
                    id="input-gender"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="flex flex-col text-left space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Tempat Lahir <span className="text-red-500 font-bold">*</span></label>
                  <input
                    type="text"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleInputChange}
                    placeholder="Contoh: Bandung"
                    className={`w-full px-3 py-1.5 border ${errors.birthPlace ? 'border-red-400' : 'border-slate-200'} rounded-lg text-xs outline-none`}
                    id="input-birthplace"
                  />
                  {errors.birthPlace && <span className="text-[10px] text-red-500 font-medium">{errors.birthPlace}</span>}
                </div>
              </div>

              {/* Tanggal Lahir & Asal Sekolah */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Tanggal Lahir <span className="text-red-500 font-bold">*</span></label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-1.5 border ${errors.birthDate ? 'border-red-400' : 'border-slate-200'} rounded-lg text-xs outline-none`}
                    id="input-birthdate"
                  />
                  {errors.birthDate && <span className="text-[10px] text-red-500 font-medium">{errors.birthDate}</span>}
                </div>

                <div className="flex flex-col text-left space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Sekolah Asal (SMP) <span className="text-red-500 font-bold">*</span></label>
                  <input
                    type="text"
                    name="prevSchool"
                    value={formData.prevSchool}
                    onChange={handleInputChange}
                    placeholder="Contoh: SMP Negeri 1 Bandung"
                    className={`w-full px-3 py-1.5 border ${errors.prevSchool ? 'border-red-400' : 'border-slate-200'} rounded-lg text-xs outline-none`}
                    id="input-prevschool"
                  />
                  {errors.prevSchool && <span className="text-[10px] text-red-500 font-medium">{errors.prevSchool}</span>}
                </div>
              </div>

              {/* Alamat Lengkap */}
              <div className="flex flex-col text-left space-y-1">
                <label className="text-xs font-semibold text-slate-700">Alamat Rumah Lengkap <span className="text-red-500 font-bold">*</span></label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Tuliskan nama jalan, no rumah, RT/RW, kelurahan, kecamatan, kota, provinsi..."
                  rows={2.5}
                  className={`w-full px-3 py-1.5 border ${errors.address ? 'border-red-400' : 'border-slate-200'} rounded-lg text-xs outline-none`}
                  id="input-address"
                />
                {errors.address && <span className="text-[10px] text-red-500 font-medium">{errors.address}</span>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 animate-slide-in">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center space-x-1 border-b border-slate-100 pb-1.5">
                <span>Langkah 2: Rincian Akademik & Akademis</span>
              </h4>

              {/* Email & No HP Siswa (Grid) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Aktif Siswa <span className="text-red-500 font-bold">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Contoh: nama@domain.com"
                    className={`w-full px-3 py-1.5 border ${errors.email ? 'border-red-400' : 'border-slate-200'} rounded-lg text-xs outline-none`}
                    id="input-email"
                  />
                  {errors.email && <span className="text-[10px] text-red-500 font-medium">{errors.email}</span>}
                </div>

                <div className="flex flex-col text-left space-y-1">
                  <label className="text-xs font-semibold text-slate-700">No HP / WhatsApp Aktif <span className="text-red-500 font-bold">*</span></label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Contoh: 081234567890"
                    className={`w-full px-3 py-1.5 border ${errors.phoneNumber ? 'border-red-400' : 'border-slate-200'} rounded-lg text-xs font-mono outline-none`}
                    id="input-phone"
                  />
                  {errors.phoneNumber && <span className="text-[10px] text-red-500 font-medium">{errors.phoneNumber}</span>}
                </div>
              </div>

              {/* Jalur Pendaftaran & Pilihan Jurusan */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Jalur Pendaftaran <span className="text-red-500 font-bold">*</span></label>
                  <select
                    name="registrationPath"
                    value={formData.registrationPath}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs outline-none bg-white"
                    id="input-path"
                  >
                    <option value="Reguler">Reguler (Rata-rata Rapor)</option>
                    <option value="Prestasi">Prestasi (Sertifikat / Piagam)</option>
                    <option value="Zonasi">Zonasi (Jarak Radius Rumah)</option>
                    <option value="Afirmasi">Afirmasi (Pemegang KIP/KKS)</option>
                  </select>
                </div>

                <div className="flex flex-col text-left space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Pilihan Kejuruan <span className="text-red-500 font-bold">*</span></label>
                  <select
                    name="chosenMajor"
                    value={formData.chosenMajor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs outline-none bg-white"
                    id="input-major"
                  >
                    <option value="RPL (Rekayasa Perangkat Lunak)">RPL (Rekayasa Perangkat Lunak)</option>
                    <option value="TKJ (Teknik Komputer Jaringan)">TKJ (Teknik Komputer Jaringan)</option>
                    <option value="MIPA (Matematika & IPA)">MIPA (Matematika & IPA)</option>
                    <option value="IPS (Ilmu Pengetahuan Sosial)">IPS (Ilmu Pengetahuan Sosial)</option>
                  </select>
                </div>
              </div>

              {/* Nilai Rata-rata Rapor */}
              <div className="flex flex-col text-left space-y-1">
                <label className="text-xs font-semibold text-slate-700">Rata-rata Nilai Rapor (Semester 1 - 5) <span className="text-red-500 font-bold">*</span></label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  name="gpaScore"
                  value={formData.gpaScore}
                  onChange={handleInputChange}
                  placeholder="Contoh: 88.50"
                  className={`w-full px-3 py-1.5 border ${errors.gpaScore ? 'border-red-400 bg-red-50/15' : 'border-slate-200 focus:border-indigo-600'} rounded-lg text-xs font-mono outline-none`}
                  id="input-gpascore"
                />
                <span className="text-[10px] text-slate-400 font-light leading-tight">Gunakan skala nilai puluhan (misal: 87.50, range: 0 s/d 100).</span>
                {errors.gpaScore && <span className="text-[10px] text-red-500 font-medium">{errors.gpaScore}</span>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 animate-slide-in">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center space-x-1 border-b border-slate-100 pb-1.5">
                <span>Langkah 3: Informasi Kontak Orang Tua / Wali</span>
              </h4>

              {/* Nama Orang Tua */}
              <div className="flex flex-col text-left space-y-1">
                <label className="text-xs font-semibold text-slate-700">Nama Lengkap Ayah/Ibu/Wali <span className="text-red-500 font-bold">*</span></label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="Contoh: Hendra Wijaya"
                  className={`w-full px-3 py-1.5 border ${errors.parentName ? 'border-red-400' : 'border-slate-200'} rounded-lg text-xs outline-none`}
                  id="input-parentname"
                />
                {errors.parentName && <span className="text-[10px] text-red-500 font-medium">{errors.parentName}</span>}
              </div>

              {/* No HP & Pekerjaan Orang Tua (Grid) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-xs font-semibold text-slate-700">No HP Orang Tua <span className="text-red-500 font-bold">*</span></label>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    placeholder="Contoh: 081299887766"
                    className={`w-full px-3 py-1.5 border ${errors.parentPhone ? 'border-red-400' : 'border-slate-200'} rounded-lg text-xs font-mono outline-none`}
                    id="input-parentphone"
                  />
                  {errors.parentPhone && <span className="text-[10px] text-red-500 font-medium">{errors.parentPhone}</span>}
                </div>

                <div className="flex flex-col text-left space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Pekerjaan Orang Tua <span className="text-red-500 font-bold">*</span></label>
                  <input
                    type="text"
                    name="parentJob"
                    value={formData.parentJob}
                    onChange={handleInputChange}
                    placeholder="Contoh: Pegawai Swasta / Wiraswasta"
                    className={`w-full px-3 py-1.5 border ${errors.parentJob ? 'border-red-400' : 'border-slate-200'} rounded-lg text-xs outline-none`}
                    id="input-parentjob"
                  />
                  {errors.parentJob && <span className="text-[10px] text-red-500 font-medium">{errors.parentJob}</span>}
                </div>
              </div>

              {/* Review summary block before confirmation submission */}
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-150 space-y-2 mt-3 select-none">
                <p className="text-xs font-bold text-slate-700">Pernyataan Validitas:</p>
                <p className="text-[10px] text-slate-500 leading-normal font-light">
                  Dengan mengklik tombol kirim, Saya menyatakan seluruh data di atas adalah benar milik calon pendaftar siswa baru yang sah dan dapat dipertanggungjawabkan keasliannya jika lolos kelulusan berkas.
                </p>
              </div>
            </div>
          )}

          {/* Controls Panel */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 flex-wrap gap-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center space-x-1.5 px-3.5 py-1.8 border border-slate-200 text-slate-500 hover:bg-slate-50 transition font-semibold rounded-lg text-xs cursor-pointer"
                id="btn-prev-step"
              >
                <ArrowLeft size={14} />
                <span>Sebelumnya</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center space-x-1.5 px-4 py-1.8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs shadow-sm transition cursor-pointer ml-auto"
                id="btn-next-step"
              >
                <span>Lanjut</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center space-x-1.5 px-5 py-2.2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-lg text-xs shadow-md shadow-emerald-500/10 transition cursor-pointer ml-auto"
                id="btn-submit-form"
              >
                <Check size={14} strokeWidth={2.5} />
                <span>Kirim & Daftar Siswa Baru</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
