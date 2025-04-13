import { TaskStatus } from '../types/task';

export const handleStatusName = (status: TaskStatus) => {
  switch (status) {
    case 'Backlog':
      return 'Новая';
    case 'InProgress':
      return 'В работе';
    case 'Done':
      return 'Выполнено';
  }
};
