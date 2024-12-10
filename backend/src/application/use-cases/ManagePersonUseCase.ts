// src/application/use-cases/ManagePersonUseCase.ts
import { PersonRepository } from '../../domain/repositories/PersonRepository';
import { Person } from '../../domain/entities/Person';
import { Hobby } from '../../domain/entities/Hobby';

export class ManagePersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  async getPersons(page: number, limit: number): Promise<{ data: Person[], totalCount: number }> {
    const [persons, totalCount] = await Promise.all([
      this.personRepository.findAllPaginated(page, limit),
      this.personRepository.count()
    ]);
    return { data: persons, totalCount };
  }

  async getAllPersons(): Promise<Person[] | null> {
    return this.personRepository.findAll();
  }

  async getPersonById(id: string): Promise<Person | null> {
    return this.personRepository.findById(id);
  }

  async addPerson(name: string, age: number, hobbies: string[]): Promise<Person> {
    const hobbiesEntities = hobbies.map(id => new Hobby(id, "", "", new Date(), new Date()));
    const person = new Person("", name, age, hobbiesEntities, null, new Date(), new Date());
    return this.personRepository.save(person);
  }

  async updatePerson(id: string, person: any): Promise<Person | null> {
    if (person.hobbies && Array.isArray(person.hobbies)) {
      person.hobbies = person.hobbies.map((item: any) => new Hobby(item, "", "", new Date(), new Date()));
    }
    return this.personRepository.update(id, person);
  }

  async deletePerson(id: string): Promise<void> {
    await this.personRepository.delete(id);
  }
}
