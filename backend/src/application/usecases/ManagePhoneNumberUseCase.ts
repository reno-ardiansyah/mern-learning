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

  async createPhoneNumber(phoneNumber: PhoneNumber): Promise<PhoneNumber> {
    return this.phoneNumberRepository.save(phoneNumber);
  }

  async updatePhoneNumber(id: string, phoneNumber: Partial<PhoneNumber>): Promise<PhoneNumber | null> {
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
