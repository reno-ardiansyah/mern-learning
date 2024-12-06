import { Schema, model, Document } from 'mongoose';

export interface IPhoneNumber extends Document {
  number: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

const phoneNumberSchema = new Schema<IPhoneNumber>({
  number: { type: String, required: true },
  type: { type: String, required: true },
}, { timestamps: true });

export const MongoPhoneNumberModel = model<IPhoneNumber>('PhoneNumber', phoneNumberSchema);
