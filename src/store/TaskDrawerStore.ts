import { makeAutoObservable } from 'mobx';

class TaskDrawerStore {
  isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}

export const taskDrawerStore = new TaskDrawerStore();
