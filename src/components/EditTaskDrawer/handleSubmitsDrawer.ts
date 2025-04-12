import { globalStore } from '../../store/GlobalStore';
import { taskDrawerStore } from '../../store/TaskDrawerStore';
import { validateEditTaskForm } from '../../utils/validateEditTaskForm';
import { validateNewTaskForm } from '../../utils/validateNewTaskForm';

export const handleSubmitNewTask = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // TODO: add validation error
  const values = Object.fromEntries(new FormData(e.currentTarget));

  const isValid = validateNewTaskForm(values);

  if (isValid) {
    if (isValid.success && isValid.data) {
      globalStore.addTask(isValid.data);
      taskDrawerStore.toggleOpen();
    }
  }
};

export const handleSubmitEditTask = (
  e: React.FormEvent<HTMLFormElement>,
  taskId?: number
) => {
  e.preventDefault();
  // TODO: add validation error
  const values = Object.fromEntries(new FormData(e.currentTarget));

  const isValid = validateEditTaskForm(values);

  if (isValid) {
    if (isValid.success && isValid.data) {
      globalStore.updateTask(isValid.data, taskId);
      taskDrawerStore.toggleOpen();
    }
  }
};
