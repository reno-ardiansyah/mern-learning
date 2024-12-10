import { Schema, model, Document } from 'mongoose';

// Interface untuk MongoDB schema
export interface IPhoneNumber extends Document {
  number: string;
  type: string;
  peopleId: Schema.Types.ObjectId; // Mengganti `people_id` menjadi camelCase
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

// Mongoose schema dengan properti yang diperbarui
const phoneNumberSchema = new Schema<IPhoneNumber>({
  number: { type: String, required: true },
  type: { type: String, required: true },
  peopleId: { type: Schema.Types.ObjectId, ref: 'Person', required: true }, // Properti referensi
}, { timestamps: true }); // Mengaktifkan `createdAt` dan `updatedAt` otomatis

// Model untuk digunakan dalam operasi database
export const MongoPhoneNumberModel = model<IPhoneNumber>('PhoneNumber', phoneNumberSchema);
