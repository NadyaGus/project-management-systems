import { makeAutoObservable } from 'mobx';
import { Task } from '../types/task';

class TaskDrawerStore {
  isOpen: boolean = false;
  editedTask: Task | null = null;
  callFromHeader: boolean = false;
  callFromBoard: boolean = false;
  callFromTasks: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.editedTask = null;
      this.callFromHeader = false;
      this.callFromBoard = false;
      this.callFromTasks = false;
    }
  }

  openFromHeader() {
    this.callFromHeader = true;
    this.toggleOpen();
  }

  openFromBoard(task: Task) {
    this.editedTask = task;
    this.callFromBoard = true;
    this.toggleOpen();
  }

  openFromTasks(task: Task) {
    this.editedTask = task;
    this.callFromTasks = true;
    this.toggleOpen();
  }
}

export const taskDrawerStore = new TaskDrawerStore();
