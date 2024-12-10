import { PersonRepository } from "../../domain/repositories/PersonRepository";
import { Person } from "../../domain/entities/Person";
import { MongoPersonModel } from "../orm/PersonModel";
import { Hobby } from "../../domain/entities/Hobby";

export class MongoPersonRepository implements PersonRepository {
  async findAll(): Promise<Person[]> {
    const personDocs = await MongoPersonModel.find()
      .populate("hobbies")
      .exec();

    return personDocs.map(
      (doc: any) =>
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
          doc.createdAt,
          doc.updatedAt
        )
    );
  }

  async findAllPaginated(page: number, limit: number): Promise<Person[]> {
    const personDocs = await MongoPersonModel.find()
      .populate("hobbies")
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return personDocs.map(
      (doc: any) =>
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
          doc.createdAt,
          doc.updatedAt
        )
    );
  }

  async findById(id: string): Promise<Person | null> {
    const personDoc: any = await MongoPersonModel.findById(id)
      .populate("hobbies")
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
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
    });
    await personDoc.save();

    const populatedPersonDoc: any = await MongoPersonModel.findById(
      personDoc._id
    ).populate("hobbies").exec();

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
      populatedPersonDoc.createdAt,
      populatedPersonDoc.updatedAt
    );
  }

  async update(id: string, person: Partial<Person>): Promise<Person | null> {
    const personDoc: any = await MongoPersonModel.findByIdAndUpdate(
      id,
      {
        ...person,
        hobbies: person.hobbies?.map((hobby) => hobby.id),
      },
      { new: true }
    ).populate("hobbies").exec();

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
