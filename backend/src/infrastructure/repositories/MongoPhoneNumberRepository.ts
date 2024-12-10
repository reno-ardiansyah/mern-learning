import { PhoneNumberRepository } from "../../domain/repositories/PhoneNumberRepository";
import { PhoneNumber } from "../../domain/entities/PhoneNumber";
import { MongoPhoneNumberModel } from "../orm/PhoneNumberModel";

export class MongoPhoneNumberRepository implements PhoneNumberRepository {
  async findAll(): Promise<PhoneNumber[]> {
    const phoneNumberDocs = await MongoPhoneNumberModel.find()
      .populate('peopleId', 'name')  // Menghubungkan peopleId dengan dokumen Person
      .exec();
    
    return phoneNumberDocs.map((doc: any) => new PhoneNumber(
      doc._id?.toString(),
      doc.number,
      doc.type,
      doc.peopleId ? { id: doc.peopleId._id.toString(), name: doc.peopleId.name } : null,
      doc.createdAt,
      doc.updatedAt
    ));
  }

  async findAllPaginated(page: number, limit: number): Promise<{ phoneNumbers: PhoneNumber[], totalCount: number }> {
    const phoneNumberDocs = await MongoPhoneNumberModel.find()
      .populate('peopleId', 'name')  // Menghubungkan peopleId dengan dokumen Person
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const totalCount = await MongoPhoneNumberModel.countDocuments();

    return {
      phoneNumbers: phoneNumberDocs.map((doc: any) => new PhoneNumber(
        doc._id?.toString(),
        doc.number,
        doc.type,
        doc.peopleId ? { id: doc.peopleId._id.toString(), name: doc.peopleId.name } : null,
        doc.createdAt,
        doc.updatedAt
      )),
      totalCount
    };
  }

  async findById(id: string): Promise<PhoneNumber | null> {
    const doc = await MongoPhoneNumberModel.findById(id).exec();
    if (!doc) return null;
    return new PhoneNumber(
      doc._id?.toString(),
      doc.number,
      doc.type,
      doc.peopleId ? { id: doc.peopleId.toString(), name: "" } : null,  // Memastikan people adalah null jika tidak ada
      doc.createdAt,
      doc.updatedAt
    );
  }

  async findByNumber(number: string): Promise<PhoneNumber | null> {
    const doc = await MongoPhoneNumberModel.findOne({ number }).exec();
    if (!doc) return null;
    return new PhoneNumber(
      doc._id?.toString(),
      doc.number,
      doc.type,
      doc.peopleId ? { id: doc.peopleId.toString(), name: "" } : null,  // Memastikan people adalah null jika tidak ada
      doc.createdAt,
      doc.updatedAt
    );
  }

  async save(phoneNumber: PhoneNumber): Promise<PhoneNumber> {
    const doc = new MongoPhoneNumberModel({
      number: phoneNumber.number,
      type: phoneNumber.type,
      peopleId: phoneNumber.people?.id || null,  // Hanya menyimpan id dari objek people atau null
      createdAt: phoneNumber.createdAt,
      updatedAt: phoneNumber.updatedAt
    });
    const savedDoc = await doc.save();
    return new PhoneNumber(
      savedDoc._id?.toString(),
      savedDoc.number,
      savedDoc.type,
      savedDoc.peopleId ? { id: savedDoc.peopleId.toString(), name: "" } : null,  // Memastikan people adalah null jika tidak ada
      savedDoc.createdAt,
      savedDoc.updatedAt
    );
  }

  async update(id: string, phoneNumber: Partial<PhoneNumber>): Promise<PhoneNumber | null> {
    const updateData = {
      ...phoneNumber,
      peopleId: phoneNumber.people?.id || null  // Mengupdate hanya id dari objek people atau null
    };
    
    const doc = await MongoPhoneNumberModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!doc) return null;
    return new PhoneNumber(
      doc._id?.toString(),
      doc.number,
      doc.type,
      doc.peopleId ? { id: doc.peopleId.toString(), name: "" } : null,  // Memastikan people adalah null jika tidak ada
      doc.createdAt,
      doc.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await MongoPhoneNumberModel.findByIdAndDelete(id);
  }

  async count(): Promise<number> {
    return MongoPhoneNumberModel.countDocuments();
  }
}
