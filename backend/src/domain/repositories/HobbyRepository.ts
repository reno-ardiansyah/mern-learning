import { Hobby } from '../entities/Hobby';

export interface HobbyRepository {
  findAll(): Promise<Hobby[]>;
  findAllPaginated(page: number, limit: number): Promise<Hobby[]>;
  findById(id: string): Promise<Hobby | null>;
  save(hobby: Hobby): Promise<Hobby>;
  update(id: string, hobby: Partial<Hobby>): Promise<Hobby | null>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
