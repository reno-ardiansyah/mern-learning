import { Request, Response } from "express";
import { PersonService } from "../../../application/services/PersonService";

export class PersonController {
  constructor(private personService: PersonService) {}

  async getPersons(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { data, totalCount } = await this.personService.getPersons(
      page,
      limit
    );

    const response = {
      status: "success",
      currentPage: page,
      perPage: limit,
      totalCount,
      data: data.map((person) => ({
        id: person.id,
        name: person.name,
        age: person.age,
        hobbies: person.hobbies,
        phoneNumber: person.phoneNumber,
        createdAt: person.createdAt,
        updatedAt: person.updatedAt,
      })),
    };

    res.json(response);
  }

  async getPersonById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const person = await this.personService.getPersonById(id);
    if (person) {
      res.json({
        status: "success",
        data: {
          id: person.id,
          name: person.name,
          age: person.age,
          hobbies: person.hobbies,
          phoneNumber: person.phoneNumber,
          createdAt: person.createdAt,
          updatedAt: person.updatedAt,
        },
      });
    } else {
      res.status(404).json({ status: "error", message: "Person not found" });
    }
  }

  async addPerson(req: Request, res: Response): Promise<void> {
    const { name, age, hobbies, phoneNumber } = req.body;
    if (
      typeof name !== "string" ||
      typeof age !== "number" ||
      !Array.isArray(hobbies) ||
      typeof phoneNumber !== "string" ||
      !name ||
      !age ||
      !hobbies.length ||
      !phoneNumber
    ) {
      res.status(400).json({
        status: "error",
        message:
          "name harus string, age harus number, hobbies harus array, phoneNumber harus string dan tidak boleh kosong",
      });
      return;
    }
    const newPerson = await this.personService.addPerson(
      name,
      age,
      hobbies,
      phoneNumber
    );
    res.status(201).json({
      status: "success",
      data: {
        id: newPerson.id,
        name: newPerson.name,
        age: newPerson.age,
        hobbies: newPerson.hobbies,
        phoneNumber: newPerson.phoneNumber,
        createdAt: newPerson.createdAt,
        updatedAt: newPerson.updatedAt,
      },
    });
  }

  async updatePerson(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    const updatedPerson = await this.personService.updatePerson(id, req.body);
    if (updatedPerson) {
      res.json({
        status: "success",
        data: {
          id: updatedPerson.id,
          name: updatedPerson.name,
          age: updatedPerson.age,
          hobbies: updatedPerson.hobbies,
          phoneNumber: updatedPerson.phoneNumber,
          createdAt: updatedPerson.createdAt,
          updatedAt: updatedPerson.updatedAt,
        },
      });
    } else {
      res.status(404).json({ status: "error", message: "Person not found" });
    }
  }

  async deletePerson(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.personService.deletePerson(id);
    res.status(204).json({ status: "success" });
  }
}
