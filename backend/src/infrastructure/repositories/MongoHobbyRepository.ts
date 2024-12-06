import { HobbyRepository } from '../../domain/repositories/HobbyRepository';
import { Hobby } from '../../domain/entities/Hobby';
import { MongoHobbyModel } from '../orm/HobbyModel';

export class MongoHobbyRepository implements HobbyRepository {
  async findAll(): Promise<Hobby[]> {
    const hobbyDocs = await MongoHobbyModel.find();
    return hobbyDocs.map(doc => new Hobby(doc._id.toString(), doc.name, doc.description, doc.createdAt, doc.updatedAt));
  }

  async findAllPaginated(page: number, limit: number): Promise<Hobby[]> {
    const hobbyDocs = await MongoHobbyModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return hobbyDocs.map(doc => new Hobby(doc._id.toString(), doc.name, doc.description, doc.createdAt, doc.updatedAt));
  }

  async findById(id: string): Promise<Hobby | null> {
    const hobbyDoc = await MongoHobbyModel.findById(id);
    return hobbyDoc ? new Hobby(hobbyDoc._id.toString(), hobbyDoc.name, hobbyDoc.description, hobbyDoc.createdAt, hobbyDoc.updatedAt) : null;
  }

  async save(hobby: Hobby): Promise<Hobby> {
    const hobbyDoc = new MongoHobbyModel(hobby);
    await hobbyDoc.save();
    return new Hobby(hobbyDoc._id.toString(), hobbyDoc.name, hobbyDoc.description, hobbyDoc.createdAt, hobbyDoc.updatedAt);
  }

  async update(id: string, hobby: Partial<Hobby>): Promise<Hobby | null> {
    const hobbyDoc = await MongoHobbyModel.findByIdAndUpdate(id, hobby, { new: true });
    return hobbyDoc ? new Hobby(hobbyDoc._id.toString(), hobbyDoc.name, hobbyDoc.description, hobbyDoc.createdAt, hobbyDoc.updatedAt) : null;
  }

  async delete(id: string): Promise<void> {
    await MongoHobbyModel.findByIdAndDelete(id);
  }

  async count(): Promise<number> {
    return MongoHobbyModel.countDocuments();
  }
}
