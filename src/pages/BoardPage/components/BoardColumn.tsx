import { Box, BoxProps, Divider, Typography } from '@mui/material';
import { Task } from '../../../types/task';
import { observer } from 'mobx-react-lite';
import { globalStore } from '../../../store/GlobalStore';
import { Board } from '../../../types/board';
import { useParams } from 'react-router-dom';
import { TaskCard } from './TaskCard';

type BoardColumnProps = {
  title: 'TODO' | 'IN PROGRESS' | 'DONE';
  tasks: Task[];
} & BoxProps;

export const BoardColumn = observer(
  ({ title, tasks, ...props }: BoardColumnProps) => {
    const params = useParams();
    const boardId = Number(params.boardId);
    const board = globalStore.getBoardById(boardId ?? 0) as Board;

    return (
      <Box {...props}>
        <Typography
          variant="h5"
          sx={{
            p: 2,
            fontWeight: 600,
            fontSize: 20,
            width: '100%',
          }}
        >
          {title}
        </Typography>

        <Divider />

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} board={board} />
        ))}
      </Box>
    );
  }
);
