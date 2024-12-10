import api from './api';
import { IHobby } from './hobbyService';

export interface IPerson {
  id: string;
  name: string;
  age: number;
  hobbies: IHobby[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IgetByPagination {
  status?: string;
  currentPage: number;
  perPage: number;
  totalCount: number;
  data: any
}

const INITIAL_URL = '/people';

const getPersons = async (page: number = 1, limit: number = 10, query: string = ''): Promise<IgetByPagination> => {
  const response = await api.get(`${INITIAL_URL}?page=${page}&limit=${limit}&query=${query}`);
  return response.data;
};

const getPersonById = async (id: string): Promise<IPerson> => {
  const response = await api.get(`${INITIAL_URL}/${id}`);
  return response.data.data;
};

const addPerson = async (name: string, age: number, hobbies: string[]): Promise<IPerson> => {
  const response = await api.post(INITIAL_URL, { 
    name, 
    age: Number(age), // Memastikan 'age' adalah number sebelum dikirim
    hobbies
  });
  return response.data.data;
};

const updatePerson = async (id: string, name: string, age: number, hobbies: string[]): Promise<IPerson> => {
  const response = await api.put(`${INITIAL_URL}/${id}`, { name, age, hobbies });
  return response.data.data;
};

const deletePerson = async (id: string): Promise<void> => {
  await api.delete(`${INITIAL_URL}/${id}`);
};

const personService = {
  getPersons,
  getPersonById,
  addPerson,
  updatePerson,
  deletePerson,
};

export default personService;
