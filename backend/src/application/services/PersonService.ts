// src/application/services/PersonService.ts
import { ManagePersonUseCase } from '../use-cases/ManagePersonUseCase';
import { Person } from '../../domain/entities/Person';

export class PersonService {
  constructor(private managePersonUseCase: ManagePersonUseCase) {}

  async getPersons(page: number, limit: number): Promise<{ data: Person[], totalCount: number }> {
    return this.managePersonUseCase.getPersons(page, limit);
  }

  async getAllPersons(): Promise<Person[] | null> {
    return this.managePersonUseCase.getAllPersons();
  }

  async getPersonById(id: string): Promise<Person | null> {
    return this.managePersonUseCase.getPersonById(id);
  }

  async addPerson(name: string, age: number, hobbies: string[]): Promise<Person> {
    return this.managePersonUseCase.addPerson(name, age, hobbies);
  }

  async updatePerson(id: string, person: any): Promise<Person | null> {
    return this.managePersonUseCase.updatePerson(id, person);
  }

  async deletePerson(id: string): Promise<void> {
    return this.managePersonUseCase.deletePerson(id);
  }
}
