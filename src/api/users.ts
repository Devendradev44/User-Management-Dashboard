import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (user: unknown) => {
  return axios.post(API_URL, user);
};

export const updateUser = async (id: number, user: unknown) => {
  return axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};