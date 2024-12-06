import { PersonRepository } from "../../domain/repositories/PersonRepository";
import { Person } from "../../domain/entities/Person";
import { MongoPersonModel } from "../orm/PersonModel";
import { Hobby } from "../../domain/entities/Hobby";
import { PhoneNumber } from "../../domain/entities/PhoneNumber";

export class MongoPersonRepository implements PersonRepository {
  async findAll(): Promise<Person[]> {
    const personDocs = await MongoPersonModel.find()
      .populate("hobbies")
      .populate("phoneNumber")
      .exec();

    return personDocs.map(
      (doc) =>
        new Person(
          doc._id.toString(),
          doc.name,
          doc.age,
          doc.hobbies.map(
            (hobby: any) =>
              new Hobby(
                hobby._id.toString(),
                hobby.name,
                hobby.description,
                hobby.createdAt,
                hobby.updatedAt
              )
          ),
          doc.phoneNumber
            ? new PhoneNumber(
                doc.phoneNumber._id.toString(),
                doc.phoneNumber.number,
                doc.phoneNumber.type,
                doc.phoneNumber.createdAt,
                doc.phoneNumber.updatedAt
              )
            : null,
          doc.createdAt,
          doc.updatedAt
        )
    );
  }

  async findAllPaginated(page: number, limit: number): Promise<Person[]> {
    const personDocs = await MongoPersonModel.find()
      .populate("hobbies")
      .populate("phoneNumber")
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return personDocs.map(
      (doc) =>
        new Person(
          doc._id.toString(),
          doc.name,
          doc.age,
          doc.hobbies.map(
            (hobby: any) =>
              new Hobby(
                hobby._id.toString(),
                hobby.name,
                hobby.description,
                hobby.createdAt,
                hobby.updatedAt
              )
          ),
          doc.phoneNumber
            ? new PhoneNumber(
                doc.phoneNumber._id.toString(),
                doc.phoneNumber.number,
                doc.phoneNumber.type,
                doc.phoneNumber.createdAt,
                doc.phoneNumber.updatedAt
              )
            : null,
          doc.createdAt,
          doc.updatedAt
        )
    );
  }

  async findById(id: string): Promise<Person | null> {
    const personDoc = await MongoPersonModel.findById(id)
      .populate("hobbies")
      .populate("phoneNumber")
      .exec();

    return personDoc
      ? new Person(
          personDoc._id.toString(),
          personDoc.name,
          personDoc.age,
          personDoc.hobbies.map(
            (hobby: any) =>
              new Hobby(
                hobby._id.toString(),
                hobby.name,
                hobby.description,
                hobby.createdAt,
                hobby.updatedAt
              )
          ),
          personDoc.phoneNumber
            ? new PhoneNumber(
                personDoc.phoneNumber._id.toString(),
                personDoc.phoneNumber.number,
                personDoc.phoneNumber.type,
                personDoc.phoneNumber.createdAt,
                personDoc.phoneNumber.updatedAt
              )
            : null,
          personDoc.createdAt,
          personDoc.updatedAt
        )
      : null;
  }

  async save(person: Person): Promise<Person> {
    const personDoc = new MongoPersonModel({
      name: person.name,
      age: person.age,
      hobbies: person.hobbies.map((hobby) => hobby.id),
      phoneNumber: person.phoneNumber ? person.phoneNumber.id : null,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
    });
    await personDoc.save();

    // Populate hobbies and phoneNumber
    const populatedPersonDoc: any = await MongoPersonModel.findById(
      personDoc._id
    )
      .populate("hobbies")
      .populate("phoneNumber")
      .exec();

    return new Person(
      populatedPersonDoc._id.toString(),
      populatedPersonDoc.name,
      populatedPersonDoc.age,
      populatedPersonDoc.hobbies.map(
        (hobby: any) =>
          new Hobby(
            hobby._id.toString(),
            hobby.name,
            hobby.description,
            hobby.createdAt,
            hobby.updatedAt
          )
      ),
      populatedPersonDoc.phoneNumber
        ? new PhoneNumber(
            populatedPersonDoc.phoneNumber._id.toString(),
            populatedPersonDoc.phoneNumber.number,
            populatedPersonDoc.phoneNumber.type,
            populatedPersonDoc.phoneNumber.createdAt,
            populatedPersonDoc.phoneNumber.updatedAt
          )
        : null,
      populatedPersonDoc.createdAt,
      populatedPersonDoc.updatedAt
    );
  }

  async update(id: string, person: Partial<Person>): Promise<Person | null> {
    const personDoc = await MongoPersonModel.findByIdAndUpdate(
      id,
      {
        ...person,
        hobbies: person.hobbies?.map((hobby) => hobby.id),
        phoneNumber: person.phoneNumber?.id,
      },
      { new: true }
    )
      .populate("hobbies")
      .populate("phoneNumber")
      .exec();

    return personDoc
      ? new Person(
          personDoc._id.toString(),
          personDoc.name,
          personDoc.age,
          personDoc.hobbies.map(
            (hobby: any) =>
              new Hobby(
                hobby._id.toString(),
                hobby.name,
                hobby.description,
                hobby.createdAt,
                hobby.updatedAt
              )
          ),
          personDoc.phoneNumber
            ? new PhoneNumber(
                personDoc.phoneNumber._id.toString(),
                personDoc.phoneNumber.number,
                personDoc.phoneNumber.type,
                personDoc.phoneNumber.createdAt,
                personDoc.phoneNumber.updatedAt
              )
            : null,
          personDoc.createdAt,
          personDoc.updatedAt
        )
      : null;
  }

  async findByPhoneNumber(phoneNumber: PhoneNumber): Promise<Person | null> {
    const personDoc = await MongoPersonModel.findOne({
      phoneNumber: phoneNumber.id,
    })
      .populate("hobbies")
      .populate("phoneNumber")
      .exec();
    return personDoc
      ? new Person(
          personDoc._id.toString(),
          personDoc.name,
          personDoc.age,
          personDoc.hobbies.map(
            (hobby: any) =>
              new Hobby(
                hobby._id.toString(),
                hobby.name,
                hobby.description,
                hobby.createdAt,
                hobby.updatedAt
              )
          ),
          personDoc.phoneNumber
            ? new PhoneNumber(
                personDoc.phoneNumber._id.toString(),
                personDoc.phoneNumber.number,
                personDoc.phoneNumber.type,
                personDoc.phoneNumber.createdAt,
                personDoc.phoneNumber.updatedAt
              )
            : null,
          personDoc.createdAt,
          personDoc.updatedAt
        )
      : null;
  }

  async delete(id: string): Promise<void> {
    await MongoPersonModel.findByIdAndDelete(id);
  }

  async count(): Promise<number> {
    return MongoPersonModel.countDocuments();
  }
}
