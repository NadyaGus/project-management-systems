import { Assigner } from '../types/task';
import api from './api';

export const getAssigners = async (): Promise<
  { data: Assigner[] } | undefined
> => {
  try {
    const response = await api.get('users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
