import { PhoneNumberRepository } from '../../domain/repositories/PhoneNumberRepository';
import { PhoneNumber } from '../../domain/entities/PhoneNumber';
import { PersonRepository } from '../../domain/repositories/PersonRepository';

export class PhoneNumberService {
  constructor(
    private phoneNumberRepository: PhoneNumberRepository,
    private personRepository: PersonRepository
  ) {}

  async getPhoneNumbers(page: number, limit: number): Promise<{ data: PhoneNumber[], totalCount: number }> {
    const [phoneNumbers, totalCount] = await Promise.all([
      this.phoneNumberRepository.findAllPaginated(page, limit),
      this.phoneNumberRepository.count()
    ]);
    return { data: phoneNumbers, totalCount };
  }

  async getPhoneNumberById(id: string): Promise<PhoneNumber | null> {
    return this.phoneNumberRepository.findById(id);
  }

  async addPhoneNumber(personId: string, number: string, type: string): Promise<PhoneNumber> {
    const phoneNumber = new PhoneNumber("", number, type, new Date(), new Date());
    const savedPhoneNumber = await this.phoneNumberRepository.save(phoneNumber);

    // Update person with the new phoneNumber
    await this.personRepository.update(personId, { phoneNumber: savedPhoneNumber });

    return savedPhoneNumber;
  }

  async updatePhoneNumber(id: string, number: string, type: string): Promise<PhoneNumber | null> {
    const phoneNumber = await this.phoneNumberRepository.findById(id);
    if (!phoneNumber) {
      return null;
    }

    phoneNumber.number = number;
    phoneNumber.type = type;

    return this.phoneNumberRepository.update(id, phoneNumber);
  }

  async deletePhoneNumber(id: string): Promise<void> {
    // Find the person associated with this phoneNumber
    const phoneNumber = await this.phoneNumberRepository.findById(id);
    if (phoneNumber) {
      const person = await this.personRepository.findByPhoneNumber(phoneNumber);
      if (person) {
        // Remove phoneNumber reference from person
        await this.personRepository.update(person.id, { phoneNumber: null });
      }
    }

    await this.phoneNumberRepository.delete(id);
  }
}
