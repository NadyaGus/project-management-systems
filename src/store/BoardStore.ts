import { makeAutoObservable } from 'mobx';
import { Board } from '../types/board';
import { Task } from '../types/task';

class BoardStore {
  selectedBoard: Board | null = null;
  boardTasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedBoard(board: Board) {
    this.selectedBoard = board;
  }

  setBoardTasks(tasks: Task[]) {
    this.boardTasks = tasks;
  }

  updateTask(task: Task) {
    const taskId = task.id;
    this.boardTasks = this.boardTasks.map((t) => {
      if (t.id === taskId) {
        return task;
      }
      return t;
    });
  }
}

export const boardStore = new BoardStore();
