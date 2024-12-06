import { Router } from 'express';
import { PhoneNumberService } from '../../../application/services/PhoneNumberService';
import { MongoPhoneNumberRepository } from '../../../infrastructure/repositories/MongoPhoneNumberRepository';
import { MongoPersonRepository } from '../../../infrastructure/repositories/MongoPersonRepository';
import { PhoneNumberController } from '../controllers/PhoneNumberController';

const phoneRouter = Router();
const phoneNumberService = new PhoneNumberService(new MongoPhoneNumberRepository(), new MongoPersonRepository());
const phoneNumberController = new PhoneNumberController(phoneNumberService);

phoneRouter.get('/', (req, res) => phoneNumberController.getPhoneNumbers(req, res));
phoneRouter.get('/:id', (req, res) => phoneNumberController.getPhoneNumberById(req, res));
phoneRouter.post('/', (req, res) => phoneNumberController.addPhoneNumber(req, res));
phoneRouter.put('/:id', (req, res) => phoneNumberController.updatePhoneNumber(req, res));
phoneRouter.delete('/:id', (req, res) => phoneNumberController.deletePhoneNumber(req, res));

export { phoneRouter };
