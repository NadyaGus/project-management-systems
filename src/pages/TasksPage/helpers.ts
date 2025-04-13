import { Task } from '../../types/task';

export const filterByTitleAndAssignee = (
  tasks: Task[],
  searchValue: string
) => {
  if (!searchValue) {
    return tasks;
  }
  const filteredByTitle = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredByName = tasks.filter((task) =>
    task.assignee.fullName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return filteredByTitle.concat(filteredByName);
};

export const filterTasksByStatusAndBoard = (
  tasks: Task[],
  status: string,
  board: string
) => {
  if (!status && !board) {
    return tasks;
  }

  const filteredTasks = tasks.filter((task) => {
    if (status && !board) {
      return task.status === status;
    }
    if (!status && board) {
      return task.boardName === board;
    }
    return task.status === status && task.boardName === board;
  });

  return filteredTasks;
};
