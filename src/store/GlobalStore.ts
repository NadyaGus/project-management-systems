import { makeAutoObservable, runInAction } from 'mobx';
import { Assigner, Task, TaskCreate } from '../types/task';
import { getAssigners } from '../services/users';
import { getAllBoards } from '../services/boards';
import { Board } from '../types/board';
import { createTask, getAllTasks, getTaskById } from '../services/tasks';

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

  async addTask(task: TaskCreate) {
    try {
      const id: { data: { id: 47 } } = await createTask(task);

      try {
        const newTask = await getTaskById(id.data.id);
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
}

export const globalStore = new GlobalStore();
