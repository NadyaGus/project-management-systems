import { z } from 'zod';
import { TaskUpdate } from '../types/task';

const taskEditSchema = z.object({
  assigneeId: z.number(),
  boardId: z.string(),
  description: z.string(),
  priority: z.enum(['Low', 'Medium', 'High']),
  status: z.enum(['Backlog', 'InProgress', 'Done']),
  title: z.string(),
});

const taskEditFormSchema = z.object({
  assigneeId: z.string(),
  boardId: z.string(),
  description: z.string(),
  priority: z.enum(['Low', 'Medium', 'High']),
  status: z.enum(['Backlog', 'InProgress', 'Done']),
  title: z.string(),
});

const checkFormType = (data: unknown) => {
  return taskEditFormSchema.safeParse(data);
};

export const validateEditTaskForm = (data: unknown) => {
  try {
    const isValid = checkFormType(data);

    if (isValid.success) {
      const validFormData = {
        assigneeId: Number(isValid.data.assigneeId),
        boardId: isValid.data.boardId,
        description: isValid.data.description,
        priority: isValid.data.priority as TaskUpdate['priority'],
        status: isValid.data.status as TaskUpdate['status'],
        title: isValid.data.title,
      };

      const isValidData = taskEditSchema.safeParse(validFormData);

      if (isValidData.success) {
        return { success: true, data: isValidData.data };
      } else {
        return { success: false, error: isValidData.error };
      }
    }
  } catch (error) {
    console.error(error);
  }
};
