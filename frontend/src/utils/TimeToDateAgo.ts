// Fungsi utilitas untuk menghitung waktu yang lalu dalam TypeScript
type TimeAgoUnit = "detik" | "menit" | "jam" | "hari" | "minggu" | "bulan" | "tahun";

/**
 * Mengembalikan string yang menunjukkan waktu relatif (contoh: "2 menit lalu").
 * @param {string | Date} inputDate - Tanggal yang akan dihitung relatifnya.
 * @returns {string} Waktu relatif dalam format bahasa Indonesia.
 */
export function timeAgo(inputDate: string | Date): string {
  const date = new Date(inputDate); // Konversi input menjadi Date
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // Selisih dalam detik

  if (isNaN(date.getTime())) {
    return "Tanggal tidak valid";
  }

  if (diff < 60) {
    return `${diff} detik lalu`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} menit lalu`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} jam lalu`;
  } else if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days} hari lalu`;
  } else if (diff < 2592000) {
    const weeks = Math.floor(diff / 604800);
    return `${weeks} minggu lalu`;
  } else if (diff < 31536000) {
    const months = Math.floor(diff / 2592000);
    return `${months} bulan lalu`;
  } else {
    const years = Math.floor(diff / 31536000);
    return `${years} tahun lalu`;
  }
}
