// src/domain/repositories/PhoneNumberRepository.ts
import { PhoneNumber } from "../entities/PhoneNumber";

export interface PhoneNumberRepository {
  // Ambil semua nomor telepon
  findAll(): Promise<PhoneNumber[]>;

  // Ambil nomor telepon dengan paginasi
  findAllPaginated(page: number, limit: number): Promise<{ phoneNumbers: PhoneNumber[], totalCount: number }>;

  // Cari berdasarkan ID
  findById(id: string): Promise<PhoneNumber | null>;

  // Cari berdasarkan nomor telepon
  findByNumber(number: string): Promise<PhoneNumber | null>;

  // Simpan data nomor telepon baru
  save(phoneNumber: PhoneNumber): Promise<PhoneNumber>;

  // Perbarui data berdasarkan ID
  update(id: string, phoneNumber: Partial<PhoneNumber>): Promise<PhoneNumber | null>;

  // Hapus data berdasarkan ID
  delete(id: string): Promise<void>;

  // Hitung jumlah total nomor telepon
  count(): Promise<number>;
}
