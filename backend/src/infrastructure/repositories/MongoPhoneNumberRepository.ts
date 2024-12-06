import { PhoneNumberRepository } from '../../domain/repositories/PhoneNumberRepository';
import { PhoneNumber } from '../../domain/entities/PhoneNumber';
import { MongoPhoneNumberModel } from '../orm/PhoneNumberModel';

export class MongoPhoneNumberRepository implements PhoneNumberRepository {
  async findAll(): Promise<PhoneNumber[]> {
    const phoneNumberDocs = await MongoPhoneNumberModel.find();
    return phoneNumberDocs.map(doc => new PhoneNumber(doc._id.toString(), doc.number, doc.type, doc.createdAt, doc.updatedAt));
  }

  async findAllPaginated(page: number, limit: number): Promise<PhoneNumber[]> {
    const phoneNumberDocs = await MongoPhoneNumberModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return phoneNumberDocs.map(doc => new PhoneNumber(doc._id.toString(), doc.number, doc.type, doc.createdAt, doc.updatedAt));
  }

  async findById(id: string): Promise<PhoneNumber | null> {
    const phoneNumberDoc = await MongoPhoneNumberModel.findById(id);
    return phoneNumberDoc ? new PhoneNumber(phoneNumberDoc._id.toString(), phoneNumberDoc.number, phoneNumberDoc.type, phoneNumberDoc.createdAt, phoneNumberDoc.updatedAt) : null;
  }

  async save(phoneNumber: PhoneNumber): Promise<PhoneNumber> {
    const phoneNumberDoc = new MongoPhoneNumberModel(phoneNumber);
    await phoneNumberDoc.save();
    return new PhoneNumber(phoneNumberDoc._id.toString(), phoneNumberDoc.number, phoneNumberDoc.type, phoneNumberDoc.createdAt, phoneNumberDoc.updatedAt);
  }

  async update(id: string, phoneNumber: Partial<PhoneNumber>): Promise<PhoneNumber | null> {
    const phoneNumberDoc = await MongoPhoneNumberModel.findByIdAndUpdate(id, phoneNumber, { new: true });
    return phoneNumberDoc ? new PhoneNumber(phoneNumberDoc._id.toString(), phoneNumberDoc.number, phoneNumberDoc.type, phoneNumberDoc.createdAt, phoneNumberDoc.updatedAt) : null;
  }

  async delete(id: string): Promise<void> {
    await MongoPhoneNumberModel.findByIdAndDelete(id);
  }

  async count(): Promise<number> {
    return MongoPhoneNumberModel.countDocuments();
  }
}
