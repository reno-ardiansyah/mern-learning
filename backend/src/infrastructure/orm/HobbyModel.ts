import { Schema, model, Document } from 'mongoose';

export interface IHobby extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

const hobbySchema = new Schema<IHobby>({
  name: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export const MongoHobbyModel = model<IHobby>('Hobby', hobbySchema);
