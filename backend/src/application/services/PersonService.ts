import { PersonRepository } from '../../domain/repositories/PersonRepository';
import { Person } from '../../domain/entities/Person';
import { Hobby } from '../../domain/entities/Hobby';
import { PhoneNumber } from '../../domain/entities/PhoneNumber';

export class PersonService {
  constructor(private personRepository: PersonRepository) {}

  async getPersons(page: number, limit: number): Promise<{ data: Person[], totalCount: number }> {
    const [persons, totalCount] = await Promise.all([
      this.personRepository.findAllPaginated(page, limit),
      this.personRepository.count()
    ]);
    return { data: persons, totalCount };
  }

  public async getPersonById(id: string): Promise<Person | null> {
    return this.personRepository.findById(id);
  }

  public async addPerson(name: string, age: number, hobbies: string[], phoneNumber: string): Promise<Person> {
    const hobbiesEntities = hobbies.map(id => new Hobby(id, "", "", new Date(), new Date()));
    const phoneNumberEntity = new PhoneNumber(phoneNumber, "", "", new Date(), new Date());
    const person = new Person("", name, age, hobbiesEntities, phoneNumberEntity, new Date(), new Date());
    return this.personRepository.save(person);
  }

  async updatePerson(id: string, person: Partial<Person>): Promise<Person | null> {
    if (person.hobbies) {
      person.hobbies = person.hobbies.map(hobby => new Hobby(hobby.id, hobby.name, hobby.description, hobby.createdAt, hobby.updatedAt));
    }
    if (person.phoneNumber) {
      person.phoneNumber = new PhoneNumber(person.phoneNumber.id, person.phoneNumber.number, person.phoneNumber.type, person.phoneNumber.createdAt, person.phoneNumber.updatedAt);
    }
    return this.personRepository.update(id, person);
  }

  async deletePerson(id: string): Promise<void> {
    await this.personRepository.delete(id);
  }
}
