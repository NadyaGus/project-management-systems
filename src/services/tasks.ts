import { Task, TaskCreate, TaskStatus } from '../types/task';
import api from './api';

const getAllTasks = async (): Promise<{ data: Task[] } | undefined> => {
  try {
    const response = await api.get('tasks');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getTaskById = async (id: number): Promise<{ data: Task } | undefined> => {
  try {
    const response = await api.get(`tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createTask = async (task: TaskCreate) => {
  try {
    const response = await api.post('tasks/create', task);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (taskId: number, task: TaskCreate) => {
  try {
    const response = await api.put(`tasks/update/${taskId}`, task);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateTaskStatus = async (taskId: number, status: TaskStatus) => {
  try {
    const response = await api.put(`tasks/updateStatus/${taskId}`, status);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getAllTasks, getTaskById, createTask, updateTask, updateTaskStatus };
