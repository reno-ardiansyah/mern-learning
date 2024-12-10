import { Request, Response } from "express";
import { ManageHobbyUseCase } from "../../../application/use-cases/ManageHobbyUseCase";
import { CreateHobbyDto } from "../validators/HobbyValidation/CreateHobbyDto";
import { UpdateHobbyDto } from "../validators/HobbyValidation/UpdateHobbyDto";
import { validateOrReject } from "class-validator";
import { plainToClass } from "class-transformer";

export class HobbyController {
  constructor(private manageHobbyUseCase: ManageHobbyUseCase) {}

  async getHobbies(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
      const { data, totalCount } = await this.manageHobbyUseCase.getHobbies(
        page,
        limit
      );

      res.status(200).json({
        status: "success",
        currentPage: page,
        perPage: limit,
        totalCount,
        data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }

  async getAllHobbies(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.manageHobbyUseCase.getAllHobbies();
      res.status(200).json({ status: "success", data });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }

  async getHobbyById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const hobby = await this.manageHobbyUseCase.getHobbyById(id);

      if (hobby) {
        res.status(200).json({ status: "success", data: hobby });
      } else {
        res.status(404).json({ status: "error", message: "Hobby not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }

  async addHobby(req: Request, res: Response): Promise<void> {
    const createHobbyDto: any = plainToClass(CreateHobbyDto, req.body);

    try {
      await validateOrReject(createHobbyDto);
      const newHobby = await this.manageHobbyUseCase.addHobby(
        createHobbyDto.name,
        createHobbyDto.description
      );

      res.status(201).json({ status: "success", data: newHobby });
    } catch (errors) {
      res
        .status(400)
        .json({ status: "error", message: "Validation failed", errors });
    }
  }

  async updateHobby(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateHobbyDto = plainToClass(UpdateHobbyDto, req.body);

    try {
      await validateOrReject(updateHobbyDto);
      const updatedHobby = await this.manageHobbyUseCase.updateHobby(
        id,
        req.body
      );

      if (updatedHobby) {
        res.status(200).json({ status: "success", data: updatedHobby });
      } else {
        res.status(404).json({ status: "error", message: "Hobby not found" });
      }
    } catch (errors) {
      res
        .status(400)
        .json({ status: "error", message: "Validation failed", errors });
    }
  }

  async deleteHobby(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await this.manageHobbyUseCase.deleteHobby(id);
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }
}
