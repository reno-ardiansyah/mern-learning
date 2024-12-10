import { Router } from 'express';
import { PersonService } from '../../../application/services/PersonService';
import { PersonController } from '../controllers/PersonController';
import { ManagePersonUseCase } from '../../../application/use-cases/ManagePersonUseCase';
import { MongoPersonRepository } from '../../../infrastructure/repositories/MongoPersonRepository';

const personRouter = Router();

// Instantiate the repository, use case, service, and controller
const personRepository = new MongoPersonRepository();
const managePersonUseCase = new ManagePersonUseCase(personRepository);
const personService = new PersonService(managePersonUseCase);
const personController = new PersonController(personService);

personRouter.get('/', (req, res) => personController.getPersons(req, res));
personRouter.get('/all', (req, res) => personController.getAllPersons(req, res));
personRouter.get('/:id', (req, res) => personController.getPersonById(req, res));
personRouter.post('/', (req, res) => personController.addPerson(req, res));
personRouter.put('/:id', (req, res) => personController.updatePerson(req, res));
personRouter.delete('/:id', (req, res) => personController.deletePerson(req, res));

export { personRouter };
