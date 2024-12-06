import { Schema, model, Document } from 'mongoose';
import { IHobby } from './HobbyModel';
import { IPhoneNumber } from './PhoneNumberModel';

export interface IPerson extends Document {
  name: string;
  age: number;
  hobbies: IHobby[];
  phoneNumber: IPhoneNumber;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

const personSchema = new Schema<IPerson>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobby' }],
  phoneNumber: { type: Schema.Types.ObjectId, ref: 'PhoneNumber', required: true }
}, { timestamps: true });

export const MongoPersonModel = model<IPerson>('Person', personSchema);
