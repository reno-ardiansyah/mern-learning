import { Hobby } from "../../domain/entities/Hobby";
import { ManageHobbyUseCase } from "../use-cases/ManageHobbyUseCase";

export class HobbyService {
  constructor(private manageHobbyUseCase: ManageHobbyUseCase) {}

  async getHobbies(page: number, limit: number) {
    return this.manageHobbyUseCase.getHobbies(page, limit);
  }

  async getAllHobbies() {
    return this.manageHobbyUseCase.getAllHobbies();
  }

  async getHobbyById(id: string) {
    return this.manageHobbyUseCase.getHobbyById(id);
  }

  async addHobby(name: string, description: string) {
    return this.manageHobbyUseCase.addHobby(name, description);
  }

  async updateHobby(id: string, hobbyData: Partial<Hobby>) {
    return this.manageHobbyUseCase.updateHobby(id, hobbyData);
  }

  async deleteHobby(id: string) {
    return this.manageHobbyUseCase.deleteHobby(id);
  }
}
