import { Box } from '@mui/material';
import { BoardColumn } from './BoardColumn';
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
    <Box sx={{ overflow: 'scroll' }}>
      <Box sx={{ display: 'flex', margin: '0 auto', width: 'auto' }}>
        <BoardColumn
          title="TODO"
          tasks={toDoTasks}
          sx={{
            minWidth: 400,
            flexGrow: 1,
          }}
        />
        <BoardColumn
          title="IN PROGRESS"
          tasks={inProgressTasks}
          sx={{
            minWidth: 400,
            flexGrow: 1,
            borderLeft: '1px solid #E0E0E0',
            borderRight: '1px solid #E0E0E0',
          }}
        />
        <BoardColumn
          title="DONE"
          tasks={doneTasks}
          sx={{
            minWidth: 400,
            flexGrow: 1,
          }}
        />
      </Box>
    </Box>
  );
});
