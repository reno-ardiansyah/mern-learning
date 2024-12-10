// src/presentation/controllers/PhoneNumberController.ts
import { Request, Response } from "express";
import { PhoneNumberService } from "../../../application/services/PhoneNumberService";

export class PhoneNumberController {
  constructor(private phoneNumberService: PhoneNumberService) {}

  async getAllPhoneNumbers(req: Request, res: Response) {
    try {
      const phoneNumbers = await this.phoneNumberService.getAllPhoneNumbers();
      res.json({
        status: "success",
        currentPage: 1, // Jika menggunakan paginasi, ganti nilai ini sesuai
        perPage: phoneNumbers.length, // Total item dalam hasil ini
        totalCount: phoneNumbers.length, // Total item yang ditemukan
        phoneNumbers
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPhoneNumbersPaginated(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const { phoneNumbers, totalCount } = await this.phoneNumberService.getPhoneNumbersPaginated(page, limit);
      res.json({
        status: "success",
        currentPage: page,
        perPage: limit,
        totalCount,
        phoneNumbers
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPhoneNumberById(req: Request, res: Response) {
    try {
      const phoneNumber = await this.phoneNumberService.getPhoneNumberById(req.params.id);
      if (phoneNumber) {
        res.json(phoneNumber);
      } else {
        res.status(404).json({ message: "PhoneNumber not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPhoneNumberByNumber(req: Request, res: Response) {
    try {
      const phoneNumber = await this.phoneNumberService.getPhoneNumberByNumber(req.params.number);
      if (phoneNumber) {
        res.json(phoneNumber);
      } else {
        res.status(404).json({ message: "PhoneNumber not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createPhoneNumber(req: Request, res: Response) {
    try {
      const phoneNumberData = {
        number: req.body.number,
        type: req.body.type,
        people: {
          id: req.body.peopleId,
          name: req.body.peopleName
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const phoneNumber = await this.phoneNumberService.createPhoneNumber(phoneNumberData);
      res.status(201).json(phoneNumber);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePhoneNumber(req: Request, res: Response) {
    try {
      const phoneNumberData = {
        number: req.body.number,
        type: req.body.type,
        people: {
          id: req.body.peopleId,
          name: req.body.peopleName
        },
        updatedAt: new Date()
      };
      const phoneNumber = await this.phoneNumberService.updatePhoneNumber(req.params.id, phoneNumberData);
      if (phoneNumber) {
        res.json(phoneNumber);
      } else {
        res.status(404).json({ message: "PhoneNumber not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deletePhoneNumber(req: Request, res: Response) {
    try {
      await this.phoneNumberService.deletePhoneNumber(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
