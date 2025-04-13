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
  assigneeId: z.string().min(1, { message: 'Выберите исполнителя' }),
  boardId: z.string().min(1, { message: 'Выберите доску' }),
  description: z
    .string({
      required_error: 'Введите описание задачи',
    })
    .min(10, { message: 'Минимум 10 символов' }),
  priority: z.enum(['Low', 'Medium', 'High'], {
    required_error: 'Выберите приоритет',
  }),
  title: z.string().min(1, { message: 'Введите название задачи' }),
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

    if (!isValid.success) {
      return { success: false, error: isValid.error };
    }
  } catch (error) {
    console.error(error);
  }
};
