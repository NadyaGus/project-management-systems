import { z } from 'zod';
import { TaskCreate } from '../types/task';

const taskCreateSchema = z.object({
  assigneeId: z.number(),
  boardId: z.number(),
  description: z.string(),
  priority: z.enum(['Low', 'Medium', 'High']),
  title: z.string(),
});

const taskCreateFormSchema = z.object({
  assigneeId: z.string(),
  boardId: z.string(),
  description: z.string(),
  priority: z.enum(['Low', 'Medium', 'High']),
  title: z.string(),
});

const checkFormType = (data: unknown) => {
  return taskCreateFormSchema.safeParse(data);
};

export const validateNewTaskForm = (data: unknown) => {
  try {
    const isValid = checkFormType(data);

    if (isValid.success) {
      const validFormData: TaskCreate = {
        assigneeId: Number(isValid.data.assigneeId),
        boardId: Number(isValid.data.boardId),
        description: isValid.data.description,
        priority: isValid.data.priority as TaskCreate['priority'],
        title: isValid.data.title,
      };

      const isValidData = taskCreateSchema.safeParse(validFormData);
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
