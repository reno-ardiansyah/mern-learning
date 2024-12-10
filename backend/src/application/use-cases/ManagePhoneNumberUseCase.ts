// src/application/use-cases/ManagePhoneNumberUseCase.ts
import { PhoneNumberRepository } from "../../domain/repositories/PhoneNumberRepository";
import { PhoneNumber } from "../../domain/entities/PhoneNumber";

export class ManagePhoneNumberUseCase {
  constructor(private phoneNumberRepository: PhoneNumberRepository) {}

  async getAllPhoneNumbers(): Promise<PhoneNumber[]> {
    return this.phoneNumberRepository.findAll();
  }

  async getPhoneNumberById(id: string): Promise<PhoneNumber | null> {
    return this.phoneNumberRepository.findById(id);
  }

  async createPhoneNumber(phoneNumber: Omit<PhoneNumber, 'id'>): Promise<PhoneNumber> { // Menghapus 'id' karena 'id' akan dihasilkan oleh database
    const phoneNumberEntity = new PhoneNumber(
      '',
      phoneNumber.number,
      phoneNumber.type,
      phoneNumber.people ? { id: phoneNumber.people.id, name: phoneNumber.people.name } : null,
      phoneNumber.createdAt,
      phoneNumber.updatedAt
    );
    return this.phoneNumberRepository.save(phoneNumberEntity);
  }

  async updatePhoneNumber(id: string, phoneNumber: Partial<Omit<PhoneNumber, 'id'>>): Promise<PhoneNumber | null> {
    if (phoneNumber.people) {
      phoneNumber.people = { id: phoneNumber.people.id, name: phoneNumber.people.name };
    }
    return this.phoneNumberRepository.update(id, phoneNumber);
  }

  async deletePhoneNumber(id: string): Promise<void> {
    return this.phoneNumberRepository.delete(id);
  }

  async getPhoneNumbersPaginated(page: number, limit: number): Promise<{ phoneNumbers: PhoneNumber[], totalCount: number }> {
    return this.phoneNumberRepository.findAllPaginated(page, limit);
  }

  async getPhoneNumberByNumber(number: string): Promise<PhoneNumber | null> {
    return this.phoneNumberRepository.findByNumber(number);
  }

  async getTotalCount(): Promise<number> {
    return this.phoneNumberRepository.count();
  }
}
