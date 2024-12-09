import api from './api';
import { IHobby } from './hobbyService';

export interface IPerson {
  id: string;
  name: string;
  age: number;
  hobbies: IHobby[];
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const getPersons = async (): Promise<IPerson[]> => {
  const response = await api.get('/persons');
  return response.data.data;
};

const getPersonById = async (id: string): Promise<IPerson> => {
  const response = await api.get(`/persons/${id}`);
  return response.data.data;
};

const addPerson = async (name: string, age: number, hobbies: string[], phoneNumber: string): Promise<IPerson> => {
  const response = await api.post('/persons', { name, age, hobbies, phoneNumber });
  return response.data.data;
};

const updatePerson = async (id: string, name: string, age: number, hobbies: string[], phoneNumber: string): Promise<IPerson> => {
  const response = await api.put(`/persons/${id}`, { name, age, hobbies, phoneNumber });
  return response.data.data;
};

const deletePerson = async (id: string): Promise<void> => {
  await api.delete(`/persons/${id}`);
};

const personService = {
  getPersons,
  getPersonById,
  addPerson,
  updatePerson,
  deletePerson,
};

export default personService;
