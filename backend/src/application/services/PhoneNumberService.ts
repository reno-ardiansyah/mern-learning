// src/application/services/PhoneNumberService.ts
import { PhoneNumber } from "../../domain/entities/PhoneNumber";
import { ManagePhoneNumberUseCase } from "../use-cases/ManagePhoneNumberUseCase";

export class PhoneNumberService {
  constructor(private managePhoneNumberUseCase: ManagePhoneNumberUseCase) {}

  async getAllPhoneNumbers(): Promise<PhoneNumber[]> {
    return this.managePhoneNumberUseCase.getAllPhoneNumbers();
  }

  async getPhoneNumbersPaginated(
    page: number,
    limit: number
  ): Promise<{ phoneNumbers: PhoneNumber[]; totalCount: number }> {
    return this.managePhoneNumberUseCase.getPhoneNumbersPaginated(page, limit);
  }

  async getPhoneNumberById(id: string): Promise<PhoneNumber | null> {
    return this.managePhoneNumberUseCase.getPhoneNumberById(id);
  }

  async getPhoneNumberByNumber(number: string): Promise<PhoneNumber | null> {
    return this.managePhoneNumberUseCase.getPhoneNumberByNumber(number);
  }

  async createPhoneNumber(phoneNumber: Omit<PhoneNumber, 'id'>): Promise<PhoneNumber> { // Menghapus 'id' karena 'id' akan dihasilkan oleh database
    return this.managePhoneNumberUseCase.createPhoneNumber(phoneNumber);
  }

  async updatePhoneNumber(
    id: string,
    phoneNumber: Partial<Omit<PhoneNumber, 'id'>>
  ): Promise<PhoneNumber | null> {
    return this.managePhoneNumberUseCase.updatePhoneNumber(id, phoneNumber);
  }

  async deletePhoneNumber(id: string): Promise<void> {
    return this.managePhoneNumberUseCase.deletePhoneNumber(id);
  }
}
