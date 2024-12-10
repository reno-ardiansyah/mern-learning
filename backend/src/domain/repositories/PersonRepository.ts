import { Person } from '../entities/Person';

export interface PersonRepository {
  findAll(): Promise<Person[]>;
  findAllPaginated(page: number, limit: number): Promise<Person[]>;
  findById(id: string): Promise<Person | null>;
  save(person: Person): Promise<Person>;
  update(id: string, person: Partial<Person>): Promise<Person | null>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
