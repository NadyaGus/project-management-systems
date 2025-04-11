import { Button } from '@mui/material';
import { taskDrawerStore } from '../store/TaskDrawerStore';

export const CreateTaskButton = () => {
  const handleCreateTaskButton = () => {
    taskDrawerStore.toggleOpen();
  };

  return (
    <Button variant="contained" onClick={handleCreateTaskButton}>
      Создать задачу
    </Button>
  );
};
