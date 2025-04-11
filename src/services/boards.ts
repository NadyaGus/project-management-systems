import { Board } from '../types/board';
import { Task } from '../types/task';
import api from './api';

const getAllBoards = async (): Promise<{ data: Board[] } | undefined> => {
  try {
    const response = await api.get('boards');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getBoardTasks = async (
  id: number
): Promise<{ data: Task[] } | undefined> => {
  try {
    const response = await api.get(`boards/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getAllBoards, getBoardTasks };
