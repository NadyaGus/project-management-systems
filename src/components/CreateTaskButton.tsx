import { Button } from '@mui/material';

export const CreateTaskButton = ({ onClick }: { onClick: () => void }) => {
  const handleCreateTaskButton = () => {
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleCreateTaskButton}>
      Создать задачу
    </Button>
  );
};
