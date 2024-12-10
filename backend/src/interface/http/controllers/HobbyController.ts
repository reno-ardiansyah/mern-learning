import { Request, Response } from 'express';
import { HobbyService } from '../../../application/services/HobbyService';
import { CreateHobbyDto } from '../validators/HobbyValidation/CreateHobbyDto';
import { UpdateHobbyDto } from '../validators/HobbyValidation/UpdateHobbyDto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class HobbyController {
  constructor(private hobbyService: HobbyService) {}

  async getHobbies(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { data, totalCount } = await this.hobbyService.getHobbies(page, limit);

    const response = {
      status: 'success',
      currentPage: page,
      perPage: limit,
      totalCount,
      data,
    };

    res.json(response);
  }

  async getAllHobbies(req: Request, res: Response): Promise<void> {
    const data = await this.hobbyService.getAllHobbies()
    res.json(data);
  }

  async getHobbyById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const hobby = await this.hobbyService.getHobbyById(id);
    if (hobby) {
      res.json({ status: 'success', data: hobby });
    } else {
      res.status(404).json({ status: 'error', message: 'Hobby not found' });
    }
  }

  async addHobby(req: Request, res: Response): Promise<void> {
    const createHobbyDto: any = plainToClass(CreateHobbyDto, req.body);

    try {
      await validateOrReject(createHobbyDto);
      const newHobby = await this.hobbyService.addHobby(createHobbyDto.name, createHobbyDto.description);
      res.status(201).json({ status: 'success', data: newHobby });
    } catch (errors) {
      res.status(400).json({ status: 'error', message: 'Validation failed', errors });
    }
  }

  async updateHobby(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateHobbyDto = plainToClass(UpdateHobbyDto, req.body);

    try {
      await validateOrReject(updateHobbyDto);
      const updatedHobby = await this.hobbyService.updateHobby(id, req.body);
      if (updatedHobby) {
        res.json({ status: 'success', data: updatedHobby });
      } else {
        res.status(404).json({ status: 'error', message: 'Hobby not found' });
      }
    } catch (errors) {
      res.status(400).json({ status: 'error', message: 'Validation failed', errors });
    }
  }

  async deleteHobby(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.hobbyService.deleteHobby(id);
    res.status(204).json({ status: 'success' });
  }
}
