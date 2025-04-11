import { makeAutoObservable } from 'mobx';
import { Task } from '../types/task';

class TaskDrawerStore {
  isOpen: boolean = false;
  editTask: Task | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  setEditTask(task: Task) {
    this.toggleOpen();
    this.editTask = task;
  }
}

export const taskDrawerStore = new TaskDrawerStore();
