import { makeAutoObservable, runInAction } from 'mobx';
import { Assigner, Task, TaskCreate, TaskUpdate } from '../types/task';
import { getAssigners } from '../services/users';
import { getAllBoards } from '../services/boards';
import { Board } from '../types/board';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from '../services/tasks';
import { boardStore } from './BoardStore';

class GlobalStore {
  assigners: Assigner[] = [];
  boards: Board[] = [];
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async initStore() {
    const newAssigners = await getAssigners().then((res) => res?.data || []);
    const newBoards = await getAllBoards().then((res) => res?.data || []);
    const newTasks = await getAllTasks().then((res) => res?.data || []);

    runInAction(() => {
      this.assigners = newAssigners;
      this.boards = newBoards;
      this.tasks = newTasks;
    });
  }

  setAssigners(assigners: Assigner[]) {
    this.assigners = assigners;
  }

  setBoards(boards: Board[]) {
    this.boards = boards;
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  getBoardById(id: number) {
    return this.boards.find((board) => board.id === id);
  }

  async addTask(task: TaskCreate) {
    try {
      const newTaskResponse: { data: { id: number } } = await createTask(task);

      try {
        const newTask = await getTaskById(newTaskResponse.data.id);
        if (newTask) {
          runInAction(() => {
            this.tasks = [...this.tasks, newTask.data];
          });
        } else {
          console.error('Failed to add new task in state');
        }
      } catch {
        console.error('Failed to add new task in state');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateTask(task: TaskUpdate, id: number) {
    try {
      await updateTask(id, task);
      const updatedTask = await getTaskById(id).then((res) => res?.data);

      if (!updatedTask) {
        console.error('Failed to update task in state');
      }

      if (updatedTask) {
        runInAction(() => {
          this.tasks = this.tasks.map((task) =>
            task.id === id ? updatedTask : task
          );
          boardStore.updateTask(updatedTask);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export const globalStore = new GlobalStore();
