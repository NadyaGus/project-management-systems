export type Assigner = {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: number;
};

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Backlog' | 'InProgress' | 'Done';

export type Task = {
  boardId?: number;
  assignee: Assigner;
  boardName: string;
  description: string;
  id: 0;
  priority: TaskPriority;
  status: TaskStatus;
  title: string;
};

export type TaskCreate = {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: TaskPriority;
  title: string;
};
