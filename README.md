# MERN Project

## Pendahuluan

Proyek ini menggunakan teknologi MERN (MongoDB, Express, React, Node.js) untuk membangun aplikasi web full-stack. Proyek ini terdiri dari dua bagian utama: backend dan frontend.

## Bagian Backend

Bagian backend diimplementasikan menggunakan Express dan MongoDB, menyediakan API RESTful untuk aplikasi. Backend juga mengadopsi clean architecture untuk memisahkan logika bisnis dari detail implementasi.

### Struktur Proyek Backend

\`\`\`
backend/
├── src/
│ ├── application/
│ │ ├── usecases/
│ │ └── services/
│ ├── domain/
│ │ ├── entities/
│ │ ├── repositories/
│ │ ├── types/
│ │ └── valueObjects/
│ ├── infrastructure/
│ │ ├── database/
│ │ ├── orm/
│ │ └── repositories/
│ ├── interfaces/
│ │ ├── http/
│ │ │ ├── controllers/
│ │ │ ├── middleware/
│ │ │ ├── validators/
│ │ │ ├── routes/
│ │ │ └── dtos/
│ │ └── cli/
│ └── app.ts
├── package.json
└── .gitignore
\`\`\`

### Penjelasan Struktur Backend

- **application/**: Mengelola logika bisnis utama aplikasi.
  - **usecases/**: Kasus penggunaan atau interaktor yang mengatur logika bisnis.
  - **services/**: Layanan yang berinteraksi dengan repository dan entitas domain.
- **domain/**: Inti dari logika bisnis.
  - **entities/**: Representasi objek nyata dalam bisnis.
  - **repositories/**: Antarmuka untuk akses data.
  - **types/**: Tipe data, antarmuka, dan enum yang digunakan di seluruh aplikasi.
  - **valueObjects/**: Objek nilai dalam domain.
- **infrastructure/**: Mengelola detail implementasi dan interaksi dengan teknologi eksternal.
  - **database/**: Konfigurasi koneksi dan skema database.
  - **orm/**: Model ORM untuk berinteraksi dengan database.
  - **repositories/**: Implementasi repository.
- **interfaces/**: Mengelola komunikasi dengan dunia luar.
  - **http/**: Antarmuka HTTP, termasuk controller, middleware, validator, dan routes.
  - **cli/**: Skrip untuk command line interface.
- **app.ts**: File entri utama untuk inisialisasi aplikasi.

### Setup Backend

1. **Clone Repositori**
   \`\`\`bash
   cd ./backend
   \`\`\`
2. **Install Dependensi**
   \`\`\`bash
   pnpm i
   \`\`\`
3. **Konfigurasi Lingkungan**
   duplicad file \`.env.exemple\` menjadi \`.env\` di direktori root proyek dan tambahkan variabel lingkungan:
   \`\`\`plaintext
   MONGO_URI=
   PORT=5001
   ACCESS_TOKEN_SECRET=yoursecred
   REFRESH_TOKEN_SECRET=yoursecred
   \`\`\`
4. **Menjalankan Server**
   \`\`\`bash
   pnpm dev
   \`\`\`

## Bagian Frontend

Bagian frontend diimplementasikan menggunakan React dengan pendekatan struktur komponen atomic design.

### Struktur Proyek Frontend

\`\`\`
my-react-app/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── components/
│ │ ├── atoms/
│ │ ├── molecules/
│ │ ├── organisms/
│ │ ├── templates/
│ │ └── pages/
│ ├── services/
│ │ ├── hobbyService.js
│ │ ├── personService.js
│ │ └── ...
│ ├── App.js
│ ├── index.js
│ ├── App.css
│ ├── index.css
│ └── ...
├── package.json
├── .gitignore
└── README.md
\`\`\`

### Penjelasan Struktur Frontend

- **components/**: Komponen UI yang diorganisir berdasarkan atomic design (atoms, molecules, organisms, templates, pages).
  - **atoms/**: Komponen dasar dan tidak dapat dipecah lagi (misalnya, button, input).
  - **molecules/**: Gabungan beberapa atoms (misalnya, form, card).
  - **organisms/**: Struktur kompleks yang terdiri dari molecules dan atoms (misalnya, header, footer).
  - **templates/**: Layout halaman (misalnya, landing page layout).
  - **pages/**: Halaman aplikasi (misalnya, Home, Hobbies, Persons).
- **services/**: Layanan untuk berkomunikasi dengan backend (API calls).

### Setup Frontend

1. **Clone Repositori**
   \`\`\`bash
   git clone https://github.com/username/repo.git
   cd repo/frontend
   \`\`\`
2. **Install Dependensi**
   \`\`\`bash
   npm install
   \`\`\`
3. **Menjalankan Aplikasi**
   \`\`\`bash
   npm start
   \`\`\`

Dengan mengikuti panduan ini, Anda dapat dengan mudah menyiapkan dan menjalankan aplikasi MERN Anda. Jika ada pertanyaan lebih lanjut atau butuh bantuan, jangan ragu untuk menghubungi kami.
