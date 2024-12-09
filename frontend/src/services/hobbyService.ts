import api from './api';

export interface IHobby {
  id: string;
  name: string;
  description: string;
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

const getHobbies = async (page: number = 1, limit: number = 10): Promise<IgetByPagination> => {
  const response = await api.get(`/hobbies?page=${page}&limit=${limit}`);
  return response.data;
};

const getHobbyById = async (id: string): Promise<IHobby> => {
  const response = await api.get(`/hobbies/${id}`);
  
  return response.data.data;
};

const addHobby = async (name: string, description: string): Promise<IHobby> => {
  const response = await api.post('/hobbies', { name, description });
  return response.data.data;
};

const updateHobby = async (id: string, name: string, description: string): Promise<IHobby> => {
  const response = await api.put(`/hobbies/${id}`, { name, description });
  return response.data.data;
};

const deleteHobby = async (id: string): Promise<void> => {
  await api.delete(`/hobbies/${id}`);
};

const hobbyService = {
  getHobbies,
  getHobbyById,
  addHobby,
  updateHobby,
  deleteHobby,
};

export default hobbyService;
