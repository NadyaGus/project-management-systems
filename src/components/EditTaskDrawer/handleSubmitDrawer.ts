import { globalStore } from '../../store/GlobalStore';
import { taskDrawerStore } from '../../store/TaskDrawerStore';
import { validateForm } from '../../utils/validateForm';

export const handleSubmitDrawer = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // TODO: add validation error
  const values = Object.fromEntries(new FormData(e.currentTarget));

  const isValid = validateForm(values);

  if (isValid) {
    if (isValid.success && isValid.data) {
      globalStore.addTask(isValid.data);
      taskDrawerStore.toggleOpen();
    }
  }
};
