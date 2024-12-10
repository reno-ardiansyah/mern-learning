import { Router } from 'express';
import { MongoPhoneNumberRepository } from '../../../infrastructure/repositories/MongoPhoneNumberRepository';
import { ManagePhoneNumberUseCase } from '../../../application/usecases/ManagePhoneNumberUseCase';
import { PhoneNumberService } from '../../../application/services/PhoneNumberService';
import { PhoneNumberController } from '../controllers/PhoneNumberController';

const phoneNumberRouter = Router();

const phoneNumberRepository = new MongoPhoneNumberRepository();
const managePhoneNumberUseCase = new ManagePhoneNumberUseCase(phoneNumberRepository);
const phoneNumberService = new PhoneNumberService(managePhoneNumberUseCase);
const phoneNumberController = new PhoneNumberController(phoneNumberService);

phoneNumberRouter.get('/', (req, res) => phoneNumberController.getAllPhoneNumbers(req, res));
phoneNumberRouter.get('/paginated', (req, res) => phoneNumberController.getPhoneNumbersPaginated(req, res));
phoneNumberRouter.get('/:id', (req, res) => phoneNumberController.getPhoneNumberById(req, res));
phoneNumberRouter.get('/number/:number', (req, res) => phoneNumberController.getPhoneNumberByNumber(req, res));
phoneNumberRouter.post('/', (req, res) => phoneNumberController.createPhoneNumber(req, res));
phoneNumberRouter.put('/:id', (req, res) => phoneNumberController.updatePhoneNumber(req, res));
phoneNumberRouter.delete('/:id', (req, res) => phoneNumberController.deletePhoneNumber(req, res));

export { phoneNumberRouter };
