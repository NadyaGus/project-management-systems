import { Box } from '@mui/material';
import { BoardColumn } from './BoardColumn';
import { blue } from '@mui/material/colors';
import { Task } from '../../../types/task';
import { observer } from 'mobx-react-lite';
import { boardStore } from '../../../store/BoardStore';
import { useEffect, useState } from 'react';

export const BoardTable = observer(() => {
  const data = boardStore.boardTasks;

  const [toDoTasks, setToDoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  useEffect(() => {
    const toDo = data.filter((task) => task.status === 'Backlog');
    const inProgress = data.filter((task) => task.status === 'InProgress');
    const done = data.filter((task) => task.status === 'Done');

    setToDoTasks(toDo);
    setInProgressTasks(inProgress);
    setDoneTasks(done);
  }, [data]);

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
});
