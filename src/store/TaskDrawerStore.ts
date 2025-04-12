import { makeAutoObservable, runInAction } from 'mobx';
import { Task } from '../types/task';
import { Board } from '../types/board';

class TaskDrawerStore {
  isOpen: boolean = false;
  editedTask: Task | null = null;
  boardTask: Board | null = null;
  callFromHeader: boolean = false;
  callFromBoard: boolean = false;
  callFromTasks: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      setTimeout(() => {
        runInAction(() => {
          this.editedTask = null;
          this.boardTask = null;
          this.callFromHeader = false;
          this.callFromBoard = false;
          this.callFromTasks = false;
        });
      }, 400);
    }
  }

  openFromHeader() {
    this.callFromHeader = true;
    this.toggleOpen();
  }

  openFromBoard(task: Task, board: Board) {
    this.editedTask = task;
    this.callFromBoard = true;
    this.boardTask = board;
    this.toggleOpen();
  }

  openFromTasks(task: Task) {
    this.editedTask = task;
    this.callFromTasks = true;
    this.toggleOpen();
  }
}

export const taskDrawerStore = new TaskDrawerStore();
