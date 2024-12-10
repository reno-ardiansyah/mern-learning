import api from './api';

export interface IPhoneNumber {
  id: string;
  number: string;
  type: string;
  people: { id: string; name: string };
  createdAt: Date;
  updatedAt: Date;
}

export interface IgetByPagination {
  status?: string;
  currentPage: number;
  perPage: number;
  totalCount: number;
  phoneNumbers: any;
}

const INITIAL_URL = '/phone-number';

const getPhoneNumbers = async (page: number = 1, limit: number = 10, query: string = ''): Promise<IgetByPagination> => {
  const response = await api.get(`${INITIAL_URL}/paginated?page=${page}&limit=${limit}&query=${query}`);
  return response.data;
};

const getPhoneNumberById = async (id: string): Promise<IPhoneNumber> => {
  const response = await api.get(`${INITIAL_URL}/${id}`);
  return response.data;
};

const addPhoneNumber = async (number: string, type: string, peopleId: string): Promise<IPhoneNumber> => {
  const response = await api.post(INITIAL_URL, { 
    number, 
    type, 
    peopleId, 
  });
  return response.data;
};

const updatePhoneNumber = async (id: string, number: string, type: string, peopleId: string, peopleName: string): Promise<IPhoneNumber> => {
  const response = await api.put(`${INITIAL_URL}/${id}`, { number, type, peopleId, peopleName });
  return response.data;
};

const deletePhoneNumber = async (id: string): Promise<void> => {
  await api.delete(`${INITIAL_URL}/${id}`);
};

const phoneNumberService = {
  getPhoneNumbers,
  getPhoneNumberById,
  addPhoneNumber,
  updatePhoneNumber,
  deletePhoneNumber,
};

export default phoneNumberService;
