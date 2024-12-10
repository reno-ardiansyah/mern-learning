import { HobbyRepository } from "../../domain/repositories/HobbyRepository";
import { Hobby } from "../../domain/entities/Hobby";

export class HobbyService {
  constructor(private hobbyRepository: HobbyRepository) {}

  async getHobbies(
    page: number,
    limit: number
  ): Promise<{ data: Hobby[]; totalCount: number }> {
    const [hobbies, totalCount] = await Promise.all([
      this.hobbyRepository.findAllPaginated(page, limit),
      this.hobbyRepository.count(),
    ]);
    return { data: hobbies, totalCount };
  }

  async getAllHobbies(): Promise<Hobby[]> {
    return this.hobbyRepository.findAll();
  }

  async getHobbyById(id: string): Promise<Hobby | null> {
    return this.hobbyRepository.findById(id);
  }

  async addHobby(name: string, description: string): Promise<Hobby> {
    const hobby = new Hobby("", name, description, new Date(), new Date());
    return this.hobbyRepository.save(hobby);
  }

  async updateHobby(id: string, hobby: Partial<Hobby>): Promise<Hobby | null> {
    return this.hobbyRepository.update(id, hobby);
  }

  async deleteHobby(id: string): Promise<void> {
    await this.hobbyRepository.delete(id);
  }
}
