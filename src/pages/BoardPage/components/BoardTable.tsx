import { Box } from '@mui/material';
import { BoardColumn } from './BoardColumn';
import { blue } from '@mui/material/colors';
import { Task } from '../../../types/task';

export const BoardTable = ({ data }: { data: Task[] }) => {
  const toDoTasks = data.filter((task) => task.status === 'Backlog');
  const inProgressTasks = data.filter((task) => task.status === 'InProgress');
  const doneTasks = data.filter((task) => task.status === 'Done');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <BoardColumn
        title="TODO"
        tasks={toDoTasks}
        sx={{
          flexBasis: '32%',

          outline: `1px solid ${blue[500]}`,
          borderRadius: 1,
        }}
      />
      <BoardColumn
        title="IN PROGRESS"
        tasks={inProgressTasks}
        sx={{
          flexBasis: '32%',
          outline: `1px solid ${blue[500]}`,
          borderRadius: 1,
        }}
      />
      <BoardColumn
        title="DONE"
        tasks={doneTasks}
        sx={{
          flexBasis: '32%',
          outline: `1px solid ${blue[500]}`,
          borderRadius: 1,
        }}
      />
    </Box>
  );
};
