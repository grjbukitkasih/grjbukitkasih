export type RegistrationStatus = 'Menunggu Seleksi' | 'Diterima' | 'Cadangan' | 'Ditolak';

export interface StudentRegistration {
  id: string; // e.g. REG-2026-6284
  fullName: string;
  nisn: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthPlace: string;
  birthDate: string;
  address: string;
  phoneNumber: string;
  email: string;
  prevSchool: string;
  registrationPath: 'Reguler' | 'Prestasi' | 'Afirmasi' | 'Zonasi';
  chosenMajor: 'RPL (Rekayasa Perangkat Lunak)' | 'TKJ (Teknik Komputer Jaringan)' | 'MIPA (Matematika & IPA)' | 'IPS (Ilmu Pengetahuan Sosial)';
  parentName: string;
  parentPhone: string;
  parentJob: string;
  gpaScore: number; // Nilai rata-rata rapor (0-100)
  status: RegistrationStatus;
  createdAt: string;
  notes?: string;
}

export interface SqlLog {
  id: string;
  type: 'INSERT' | 'SELECT' | 'UPDATE' | 'DELETE';
  table: string;
  query: string;
  timestamp: string;
}

export type RegistrationPathNames = Record<StudentRegistration['registrationPath'], string>;
export type MajorNames = Record<StudentRegistration['chosenMajor'], string>;
