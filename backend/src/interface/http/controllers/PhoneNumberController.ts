import { Request, Response } from 'express';
import { PhoneNumberService } from '../../../application/services/PhoneNumberService';

export class PhoneNumberController {
  constructor(private phoneNumberService: PhoneNumberService) {}

  async getPhoneNumbers(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { data, totalCount } = await this.phoneNumberService.getPhoneNumbers(page, limit);

    res.json({
      status: 'success',
      currentPage: page,
      perPage: limit,
      totalCount,
      data,
    });
  }

  async getPhoneNumberById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const phoneNumber = await this.phoneNumberService.getPhoneNumberById(id);
    if (phoneNumber) {
      res.json({ status: 'success', data: phoneNumber });
    } else {
      res.status(404).json({ status: 'error', message: 'PhoneNumber not found' });
    }
  }

  async addPhoneNumber(req: Request, res: Response): Promise<void> {
    const { personId, number, type } = req.body;
    const newPhoneNumber = await this.phoneNumberService.addPhoneNumber(personId, number, type);
    res.status(201).json({ status: 'success', data: newPhoneNumber });
  }

  async updatePhoneNumber(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { number, type } = req.body;
    const updatedPhoneNumber = await this.phoneNumberService.updatePhoneNumber(id, number, type);
    if (updatedPhoneNumber) {
      res.json({ status: 'success', data: updatedPhoneNumber });
    } else {
      res.status(404).json({ status: 'error', message: 'PhoneNumber not found' });
    }
  }

  async deletePhoneNumber(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.phoneNumberService.deletePhoneNumber(id);
    res.status(204).json({ status: 'success' });
  }
}
