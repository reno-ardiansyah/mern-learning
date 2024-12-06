import { Router } from 'express';
import { HobbyService } from '../../../application/services/HobbyService';
import { MongoHobbyRepository } from '../../../infrastructure/repositories/MongoHobbyRepository';
import { HobbyController } from '../controllers/HobbyController';

const hobbyRouter = Router();
const hobbyService = new HobbyService(new MongoHobbyRepository());
const hobbyController = new HobbyController(hobbyService);

hobbyRouter.get('/', (req, res) => hobbyController.getHobbies(req, res));
hobbyRouter.get('/:id', (req, res) => hobbyController.getHobbyById(req, res));
hobbyRouter.post('/', (req, res) => hobbyController.addHobby(req, res));
hobbyRouter.put('/:id', (req, res) => hobbyController.updateHobby(req, res));
hobbyRouter.delete('/:id', (req, res) => hobbyController.deleteHobby(req, res));

export { hobbyRouter };
