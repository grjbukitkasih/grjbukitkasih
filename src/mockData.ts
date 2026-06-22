import { StudentRegistration, SqlLog } from './types';

export const INITIAL_REGISTRANTS: StudentRegistration[] = [
  {
    id: "REG-2026-8012",
    fullName: "Muhammad Fadhil Ramadhan",
    nisn: "0098471201",
    gender: "Laki-laki",
    birthPlace: "Jakarta",
    birthDate: "2010-10-15",
    address: "Jl. Kemang Raya No. 42, Mampang Prapatan, Jakarta Selatan",
    phoneNumber: "081234567890",
    email: "fadhil.ramadhan@gmail.com",
    prevSchool: "SMP Negeri 115 Jakarta",
    registrationPath: "Prestasi",
    chosenMajor: "RPL (Rekayasa Perangkat Lunak)",
    parentName: "Hendra Wijaya",
    parentPhone: "081299887766",
    parentJob: "Pegawai Swasta",
    gpaScore: 92.5,
    status: "Diterima",
    createdAt: "2026-06-20T08:30:00Z",
    notes: "Siswa berprestasi bidang olimpiade matematika tingkat kota. Lolos verifikasi berkas."
  },
  {
    id: "REG-2026-4412",
    fullName: "Siti Nurhaliza",
    nisn: "0107241902",
    gender: "Perempuan",
    birthPlace: "Bandung",
    birthDate: "2011-02-28",
    address: "Bandung Kidul No. 12, Buahbatu, Bandung",
    phoneNumber: "085678901234",
    email: "siti.haliza@yahoo.com",
    prevSchool: "SMP Negeri 5 Bandung",
    registrationPath: "Reguler",
    chosenMajor: "MIPA (Matematika & IPA)",
    parentName: "Ahmad Buchori",
    parentPhone: "085611223344",
    parentJob: "Wiraswasta",
    gpaScore: 84.2,
    status: "Menunggu Seleksi",
    createdAt: "2026-06-21T10:15:00Z"
  },
  {
    id: "REG-2026-9210",
    fullName: "I Gede Putu Wisnu",
    nisn: "0103487192",
    gender: "Laki-laki",
    birthPlace: "Denpasar",
    birthDate: "2010-08-05",
    address: "Jl. Teuku Umar Gg. XIV No. 3, Denpasar Selatan",
    phoneNumber: "087788990111",
    email: "putu.wisnu@gmail.com",
    prevSchool: "SMP Negeri 1 Denpasar",
    registrationPath: "Zonasi",
    chosenMajor: "TKJ (Teknik Komputer Jaringan)",
    parentName: "I Komang Astawa",
    parentPhone: "087722334455",
    parentJob: "PNS",
    gpaScore: 78.8,
    status: "Cadangan",
    createdAt: "2026-06-21T16:45:00Z",
    notes: "Zonasi radius 1.2km dari sekolah. Menunggu kuota sisa pendaftaran."
  },
  {
    id: "REG-2026-1052",
    fullName: "Jessica Amanda Putri",
    nisn: "0095123485",
    gender: "Perempuan",
    birthPlace: "Surabaya",
    birthDate: "2010-12-12",
    address: "Jl. Dharmahusada Indah Blok B-4, Mulyorejo, Surabaya",
    phoneNumber: "082133445566",
    email: "jessica.putri@hotmail.com",
    prevSchool: "SMP Kristen Petra 2 Surabaya",
    registrationPath: "Prestasi",
    chosenMajor: "IPS (Ilmu Pengetahuan Sosial)",
    parentName: "Robert Senjaya",
    parentPhone: "082188776655",
    parentJob: "Direktur Perusahaan",
    gpaScore: 95.0,
    status: "Diterima",
    createdAt: "2026-06-19T09:00:00Z",
    notes: "Juara 2 Lomba Debat Bahasa Inggris Tingkat Provinsi. Berkas lengkap dan memenuhi standar nilai."
  },
  {
    id: "REG-2026-3829",
    fullName: "Rian Prasetyo",
    nisn: "0102148590",
    gender: "Laki-laki",
    birthPlace: "Semarang",
    birthDate: "2011-04-10",
    address: "Jl. Siliwangi Barat No. 89, Ngaliyan, Semarang",
    phoneNumber: "081900112233",
    email: "rian.prasetyo@gmail.com",
    prevSchool: "SMP Negeri 3 Semarang",
    registrationPath: "Afirmasi",
    chosenMajor: "TKJ (Teknik Komputer Jaringan)",
    parentName: "Slamet Utomo",
    parentPhone: "081944556677",
    parentJob: "Buruh Harian Lepas",
    gpaScore: 79.1,
    status: "Menunggu Seleksi",
    createdAt: "2026-06-22T02:30:00Z",
    notes: "Pendaftaran jalur afirmasi (KIP Terlampir dan terverifikasi di sistem pusdatin)."
  }
];

export const MYSQL_SCHEMA = `-- ==========================================
-- SKEMA DATABASE PENDAFTARAN SISWA BARU
-- Import file ini di phpMyAdmin (XAMPP) Anda
-- ==========================================

CREATE DATABASE IF NOT EXISTS \`db_sekolah\`;
USE \`db_sekolah\`;

-- 1. Tabel Pendaftaran Siswa
CREATE TABLE IF NOT EXISTS \`pendaftaran\` (
  \`id\` varchar(20) NOT NULL PRIMARY KEY,
  \`full_name\` varchar(100) NOT NULL,
  \`nisn\` varchar(10) NOT NULL UNIQUE,
  \`gender\` enum('Laki-laki','Perempuan') NOT NULL,
  \`birth_place\` varchar(50) NOT NULL,
  \`birth_date\` date NOT NULL,
  \`address\` text NOT NULL,
  \`phone_number\` varchar(15) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`prev_school\` varchar(100) NOT NULL,
  \`registration_path\` varchar(25) NOT NULL,
  \`chosen_major\` varchar(100) NOT NULL,
  \`parent_name\` varchar(100) NOT NULL,
  \`parent_phone\` varchar(15) NOT NULL,
  \`parent_job\` varchar(100) NOT NULL,
  \`gpa_score\` decimal(5,2) NOT NULL,
  \`status\` varchar(30) NOT NULL DEFAULT 'Menunggu Seleksi',
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  \`notes\` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabel Admin Pengelola
CREATE TABLE IF NOT EXISTS \`admin\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  \`username\` varchar(50) NOT NULL UNIQUE,
  \`password\` varchar(255) NOT NULL, -- Di-hash menggunakan password_hash()
  \`role\` varchar(20) NOT NULL DEFAULT 'Petugas Penerimaan',
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tambahkan akun admin default (username: admin, password: admin123)
-- Password hash berikut dbuat menggunakan password_hash("admin123", PASSWORD_BCRYPT)
INSERT INTO \`admin\` (\`id\`, \`username\`, \`password\`, \`role\`) 
VALUES (1, 'admin', '$2y$10$wN9iLd4bXfeVq7027d.C7ehVreRPhV5b6CiwXCHdZfAOmS.bM7L9i', 'Administrator')
ON DUPLICATE KEY UPDATE \`username\` = \`username\`;
`;

export const PHP_KONEKSI = `<?xml version="1.0" encoding="utf-8"?>
<?php
// ==========================================
// KONEKSI DATABASE (config.php atau koneksi.php)
// Hubungkan dengan server MySQL XAMPP Anda
// ==========================================

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$host = "localhost";
$username = "root";
$password = ""; // Default XAMPP kosong
$database = "db_sekolah";

$koneksi = mysqli_connect($host, $username, $password, $database);

if (!$koneksi) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Koneksi ke database MySQL gagal: " . mysqli_connect_error()
    ]);
    exit();
}
// Set charset agar karakter khusus tampil sempurna
mysqli_set_charset($koneksi, "utf8mb4");
?>`;

export const PHP_API = `<?php
// ==========================================
// ENDPOINT UTAMA: api.php
// Tempatkan file ini di C:/xampp/htdocs/api_sekolah/api.php
// ==========================================

require_once 'koneksi.php'; // Ganti atau sertakan koneksinya

$action = isset($_GET['action']) ? $_GET['action'] : '';

// Mendapatkan data mentah dari kiriman JSON
$input_json = file_get_contents('php://input');
$input_data = json_decode($input_json, true);

switch ($action) {
    case 'register':
        // Menangani pendaftaran siswa baru (POST)
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(["success" => false, "message" => "Metode request tidak diizinkan."]);
            break;
        }

        // Ambil payload dari form
        $fullName = mysqli_real_escape_string($koneksi, $input_data['fullName'] ?? '');
        $nisn = mysqli_real_escape_string($koneksi, $input_data['nisn'] ?? '');
        $gender = mysqli_real_escape_string($koneksi, $input_data['gender'] ?? '');
        $birthPlace = mysqli_real_escape_string($koneksi, $input_data['birthPlace'] ?? '');
        $birthDate = mysqli_real_escape_string($koneksi, $input_data['birthDate'] ?? '');
        $address = mysqli_real_escape_string($koneksi, $input_data['address'] ?? '');
        $phoneNumber = mysqli_real_escape_string($koneksi, $input_data['phoneNumber'] ?? '');
        $email = mysqli_real_escape_string($koneksi, $input_data['email'] ?? '');
        $prevSchool = mysqli_real_escape_string($koneksi, $input_data['prevSchool'] ?? '');
        $registrationPath = mysqli_real_escape_string($koneksi, $input_data['registrationPath'] ?? '');
        $chosenMajor = mysqli_real_escape_string($koneksi, $input_data['chosenMajor'] ?? '');
        $parentName = mysqli_real_escape_string($koneksi, $input_data['parentName'] ?? '');
        $parentPhone = mysqli_real_escape_string($koneksi, $input_data['parentPhone'] ?? '');
        $parentJob = mysqli_real_escape_string($koneksi, $input_data['parentJob'] ?? '');
        $gpaScore = floatval($input_data['gpaScore'] ?? 0);

        // Validasi input wajib
        if (empty($fullName) || empty($nisn) || empty($email) || empty($phoneNumber)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Harap lengkapi semua kolom wajib."]);
            break;
        }

        // Generate ID Unik: REG-Ymd-XXXX
        $uniqueId = "REG-" . date("Y") . "-" . rand(1000, 9999);

        // Cek apakah NISN sudah terdaftar
        $cek_nisn = mysqli_query($koneksi, "SELECT nisn FROM pendaftaran WHERE nisn = '$nisn'");
        if (mysqli_num_rows($cek_nisn) > 0) {
            http_response_code(409);
            echo json_encode(["success" => false, "message" => "NISN $nisn sudah terdaftar di database."]);
            break;
        }

        // Persiapkan query INSERT
        $query = "INSERT INTO pendaftaran (
                    id, full_name, nisn, gender, birth_place, birth_date, address, 
                    phone_number, email, prev_school, registration_path, chosen_major, 
                    parent_name, parent_phone, parent_job, gpa_score, status
                  ) VALUES (
                    '$uniqueId', '$fullName', '$nisn', '$gender', '$birthPlace', '$birthDate', '$address', 
                    '$phoneNumber', '$email', '$prevSchool', '$registrationPath', '$chosenMajor', 
                    '$parentName', '$parentPhone', '$parentJob', $gpaScore, 'Menunggu Seleksi'
                  )";

        if (mysqli_query($koneksi, $query)) {
            echo json_encode([
                "success" => true,
                "message" => "Pendaftaran siswa baru berhasil disimpan.",
                "registration_id" => $uniqueId
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Gagal menyimpan ke database: " . mysqli_error($koneksi)]);
        }
        break;

    case 'check_status':
        // Cek status pendaftaran (GET)
        $idOrNisn = mysqli_real_escape_string($koneksi, $_GET['search'] ?? '');
        if (empty($idOrNisn)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Parameter ID Pendaftaran atau NISN harus diisi."]);
            break;
        }

        $query = "SELECT * FROM pendaftaran WHERE id = '$idOrNisn' OR nisn = '$idOrNisn'";
        $result = mysqli_query($koneksi, $query);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            echo json_encode([
                "success" => true,
                "student" => [
                    "id" => $row['id'],
                    "fullName" => $row['full_name'],
                    "nisn" => $row['nisn'],
                    "gender" => $row['gender'],
                    "chosenMajor" => $row['chosen_major'],
                    "registrationPath" => $row['registration_path'],
                    "gpaScore" => floatval($row['gpa_score']),
                    "status" => $row['status'],
                    "createdAt" => $row['created_at'],
                    "notes" => $row['notes']
                ]
            ]);
        } else {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Data pendaftaran siswa tidak ditemukan."]);
        }
        break;

    case 'update_status':
        // Perbarui status pendaftaran (POST / PUT) - Biasanya dilakukan oleh Admin
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(["success" => false, "message" => "Metode request tidak diizinkan."]);
            break;
        }

        $id = mysqli_real_escape_string($koneksi, $input_data['id'] ?? '');
        $status = mysqli_real_escape_string($koneksi, $input_data['status'] ?? '');
        $notes = mysqli_real_escape_string($koneksi, $input_data['notes'] ?? '');

        if (empty($id) || empty($status)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "ID dan Status wajib disertakan."]);
            break;
        }

        $query = "UPDATE pendaftaran SET status = '$status', notes = '$notes' WHERE id = '$id'";

        if (mysqli_query($koneksi, $query)) {
            echo json_encode([
                "success" => true,
                "message" => "Status pendaftaran siswa dengan ID $id berhasil diperbarui ke: $status."
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Gagal memperbarui status: " . mysqli_error($koneksi)]);
        }
        break;

    case 'list':
        // Mendapatkan semua daftar siswa pendaftar (GET) untuk Panel Dashboard Admin
        $query = "SELECT * FROM pendaftaran ORDER BY created_at DESC";
        $result = mysqli_query($koneksi, $query);
        $students = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $students[] = [
                "id" => $row['id'],
                "fullName" => $row['full_name'],
                "nisn" => $row['nisn'],
                "gender" => $row['gender'],
                "birthPlace" => $row['birth_place'],
                "birthDate" => $row['birth_date'],
                "address" => $row['address'],
                "phoneNumber" => $row['phone_number'],
                "email" => $row['email'],
                "prevSchool" => $row['prev_school'],
                "registrationPath" => $row['registration_path'],
                "chosenMajor" => $row['chosen_major'],
                "parentName" => $row['parent_name'],
                "parentPhone" => $row['parent_phone'],
                "parentJob" => $row['parent_job'],
                "gpaScore" => floatval($row['gpa_score']),
                "status" => $row['status'],
                "createdAt" => $row['created_at'],
                "notes" => $row['notes']
            ];
        }

        echo json_encode([
            "success" => true,
            "data" => $students
        ]);
        break;

    default:
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Endpoint tndakan tidak valid."]);
        break;
}
?>`;

export function generateSqlInsertId(std: StudentRegistration): string {
  return `INSERT INTO pendaftaran (
  id, full_name, nisn, gender, birth_place, birth_date, address, 
  phone_number, email, prev_school, registration_path, chosen_major, 
  parent_name, parent_phone, parent_job, gpa_score, status, notes
) VALUES (
  '${std.id}', 
  '${std.fullName.replace(/'/g, "''")}', 
  '${std.nisn}', 
  '${std.gender}', 
  '${std.birthPlace.replace(/'/g, "''")}', 
  '${std.birthDate}', 
  '${std.address.replace(/'/g, "''")}', 
  '${std.phoneNumber}', 
  '${std.email.replace(/'/g, "''")}', 
  '${std.prevSchool.replace(/'/g, "''")}', 
  '${std.registrationPath}', 
  '${std.chosenMajor}', 
  '${std.parentName.replace(/'/g, "''")}', 
  '${std.parentPhone}', 
  '${std.parentJob.replace(/'/g, "''")}', 
  ${std.gpaScore.toFixed(2)}, 
  '${std.status}', 
  ${std.notes ? `'${std.notes.replace(/'/g, "''")}'` : 'NULL'}
);`;
}

export function generateSqlUpdateStatus(id: string, status: string, notes?: string): string {
  const notesSql = notes ? `, notes = '${notes.replace(/'/g, "''")}'` : '';
  return `UPDATE pendaftaran SET status = '${status}'${notesSql} WHERE id = '${id}';`;
}

export function generateSqlSelectOne(idOrNisn: string): string {
  return `SELECT * FROM pendaftaran WHERE id = '${idOrNisn}' OR nisn = '${idOrNisn}' LIMIT 1;`;
}

export function createNewLog(type: SqlLog['type'], table: string, query: string): SqlLog {
  return {
    id: `log-${Math.random().toString(36).substr(2, 9)}`,
    type,
    table,
    query,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };
}
