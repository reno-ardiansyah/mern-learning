import { Schema, model, Document } from 'mongoose';
import { IHobby } from './HobbyModel';

export interface IPerson extends Document {
  name: string;
  age: number;
  hobbies: IHobby[];
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

const personSchema = new Schema<IPerson>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobby' }],
}, { timestamps: true });

export const MongoPersonModel = model<IPerson>('Person', personSchema);