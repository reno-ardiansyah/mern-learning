import { Router } from "express";
import { ManageHobbyUseCase } from "../../../application/use-cases/ManageHobbyUseCase";
import { MongoHobbyRepository } from "../../../infrastructure/repositories/MongoHobbyRepository";
import { HobbyController } from "../controllers/HobbyController";

// Inisialisasi Repository
const hobbyRepository = new MongoHobbyRepository();

// Inisialisasi UseCase
const manageHobbyUseCase = new ManageHobbyUseCase(hobbyRepository);

// Inisialisasi Controller dengan UseCase
const hobbyController = new HobbyController(manageHobbyUseCase);

const hobbyRouter = Router();

// Define Routes
hobbyRouter.get("/all", (req, res) => hobbyController.getAllHobbies(req, res));
hobbyRouter.get("/", (req, res) => hobbyController.getHobbies(req, res));
hobbyRouter.get("/:id", (req, res) => hobbyController.getHobbyById(req, res));
hobbyRouter.post("/", (req, res) => hobbyController.addHobby(req, res));
hobbyRouter.put("/:id", (req, res) => hobbyController.updateHobby(req, res));
hobbyRouter.delete("/:id", (req, res) => hobbyController.deleteHobby(req, res));

export { hobbyRouter };
