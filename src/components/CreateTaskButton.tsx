import { Button } from '@mui/material';

export const CreateTaskButton = () => {
  const handleCreateTaskButton = () => {
    console.log('Create task button clicked');
    // TODO сделать создание задачи
  };

  return (
    <Button variant="contained" onClick={handleCreateTaskButton}>
      Создать задачу
    </Button>
  );
};
