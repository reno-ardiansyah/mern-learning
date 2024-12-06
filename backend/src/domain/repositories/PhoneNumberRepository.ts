import { PhoneNumber } from '../entities/PhoneNumber';

export interface PhoneNumberRepository {
  findAll(): Promise<PhoneNumber[]>;
  findAllPaginated(page: number, limit: number): Promise<PhoneNumber[]>;
  findById(id: string): Promise<PhoneNumber | null>;
  save(phoneNumber: PhoneNumber): Promise<PhoneNumber>;
  update(id: string, phoneNumber: PhoneNumber): Promise<PhoneNumber | null>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
