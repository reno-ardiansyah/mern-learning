# Backend MERN Project

## Setup Proyek
Ikuti langkah-langkah berikut untuk menyiapkan proyek backend ini di lokal Anda:

1. **Clone Repositori**
   \`\`\`bash
   git clone https://github.com/username/repo.git
   cd repo/backend
   \`\`\`

2. **Install Dependensi**
   Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) dan [npm](https://www.npmjs.com/).
   \`\`\`bash
   npm install
   \`\`\`

3. **Konfigurasi Lingkungan**
   Buat file \`.env\` di direktori root proyek dan tambahkan variabel lingkungan yang diperlukan:
   \`\`\`plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/yourdbname
   \`\`\`

4. **Menjalankan Server**
   Jalankan server dengan perintah berikut:
   \`\`\`bash
   npm start
   \`\`\`
   Server akan berjalan di \`http://localhost:3000\`.

## Struktur Proyek
Proyek backend ini diatur menggunakan clean architecture untuk memastikan keterpisahan kekhawatiran dan kemudahan pemeliharaan. Berikut adalah struktur direktori dan penjelasan singkat tentang masing-masing bagian:

\`\`\`
backend/
├── src/
│   ├── application/
│   │   ├── usecases/
│   │   └── services/
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   ├── types/
│   │   └── valueObjects/
│   ├── infrastructure/
│   │   ├── database/
│   │   ├── orm/
│   │   └── repositories/
│   ├── interfaces/
│   │   ├── http/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── validators/
│   │   │   ├── routes/
│   │   │   └── dtos/
│   │   └── cli/
│   └── app.ts
├── package.json
└── .gitignore
\`\`\`

### Penjelasan Struktur

#### \`application/\`
Lapisan aplikasi bertanggung jawab untuk mengoordinasikan logika bisnis. Terdiri dari dua bagian utama:
- **usecases/**: Berisi kasus penggunaan yang menggambarkan logika bisnis utama.
- **services/**: Layanan yang berinteraksi dengan repository dan entitas domain.

#### \`domain/\`
Lapisan domain adalah inti dari logika bisnis aplikasi. Terdiri dari:
- **entities/**: Representasi objek nyata dalam bisnis atau domain masalah.
- **repositories/**: Antarmuka untuk akses data yang diimplementasikan di lapisan infrastruktur.
- **types/**: Tipe data, antarmuka, dan enum yang digunakan di seluruh aplikasi.
- **valueObjects/**: Objek nilai yang merepresentasikan konsep domain yang tidak memiliki identitas.

#### \`infrastructure/\`
Lapisan infrastruktur menangani semua detail implementasi dan interaksi dengan teknologi eksternal:
- **database/**: Konfigurasi koneksi dan skema database.
- **orm/**: Model ORM untuk berinteraksi dengan database.
- **repositories/**: Implementasi repository yang mengakses database atau layanan eksternal.

#### \`interfaces/\`
Lapisan antarmuka mengelola komunikasi dengan dunia luar (misalnya, HTTP request, CLI). Terdiri dari:
- **http/**: Berisi antarmuka HTTP seperti controller, middleware, validator, dan routes.
  - **controllers/**: Mengelola request dan response HTTP.
  - **middleware/**: Middleware untuk proses request dan response.
  - **validators/**: Validator untuk memeriksa validitas data yang masuk.
  - **routes/**: Definisi rute aplikasi.
  - **dtos/**: Objek transfer data untuk pertukaran data antar lapisan.
- **cli/**: Skrip untuk command line interface.

#### \`app.ts\`
File entri utama yang menginisialisasi aplikasi, menghubungkan ke database, dan mengatur middleware serta rute.

### Menjalankan Proyek
1. **Menjalankan Server**
   \`\`\`bash
   npm start
   \`\`\`

2. **Menjalankan CLI**
   \`\`\`bash
   ts-node src/interfaces/cli/somescript.ts
   \`\`\`
