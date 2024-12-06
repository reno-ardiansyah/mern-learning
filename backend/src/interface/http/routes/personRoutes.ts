import { Router } from 'express';
import { PersonService } from '../../../application/services/PersonService';
import { MongoPersonRepository } from '../../../infrastructure/repositories/MongoPersonRepository';
import { PersonController } from '../controllers/PersonController';

const personRouter = Router();
const personService = new PersonService(new MongoPersonRepository());
const personController = new PersonController(personService);

personRouter.get('/', (req, res) => personController.getPersons(req, res));
personRouter.get('/:id', (req, res) => personController.getPersonById(req, res));
personRouter.post('/', (req, res) => personController.addPerson(req, res));
personRouter.put('/:id', (req, res) => personController.updatePerson(req, res));
personRouter.delete('/:id', (req, res) => personController.deletePerson(req, res));

export { personRouter };
