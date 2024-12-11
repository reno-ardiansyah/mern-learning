import { Hobby } from "../../domain/entities/Hobby";
import { ManageHobbyUseCase } from "../use-cases/ManageHobbyUseCase";
import { RedisCache } from "../../infrastructure/cache/RedisCache";
import { paginate } from "../../utils/pagination";

export class HobbyService {
  constructor(
    private manageHobbyUseCase: ManageHobbyUseCase,
    private cache: RedisCache
  ) {}

  async getHobbies(page: number, limit: number) {
    const cacheKey = `hobbies_page_${page}_limit_${limit}`;
    const cachedData = await this.cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const { data, totalCount } = await this.manageHobbyUseCase.getHobbies(page, limit);
    const paginatedData = paginate(data, page, limit);

    await this.cache.set(cacheKey, { data: paginatedData, totalCount });

    return { data: paginatedData, totalCount };
  }

  async getAllHobbies() {
    const cacheKey = `hobbies_all`;
    const cachedData = await this.cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const hobbies = await this.manageHobbyUseCase.getAllHobbies();
    await this.cache.set(cacheKey, hobbies);

    return hobbies;
  }

  async getHobbyById(id: string) {
    const cacheKey = `hobby_${id}`;
    const cachedData = await this.cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const hobby = await this.manageHobbyUseCase.getHobbyById(id);
    await this.cache.set(cacheKey, hobby);

    return hobby;
  }

  async addHobby(name: string, description: string) {
    const newHobby = await this.manageHobbyUseCase.addHobby(name, description);
    await this.cache.del('hobbies_all');
    return newHobby;
  }

  async updateHobby(id: string, hobbyData: Partial<Hobby>) {
    const updatedHobby = await this.manageHobbyUseCase.updateHobby(id, hobbyData);
    await this.cache.del(`hobby_${id}`); 
    await this.cache.del('hobbies_all'); 
    return updatedHobby;
  }

  async deleteHobby(id: string) {
    await this.manageHobbyUseCase.deleteHobby(id);
    await this.cache.del(`hobby_${id}`);
    await this.cache.del('hobbies_all'); 
  }
}
