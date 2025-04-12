import { Box, BoxProps, Divider, Paper, Typography } from '@mui/material';
import { Task } from '../../../types/task';
import { taskDrawerStore } from '../../../store/TaskDrawerStore';
import { observer } from 'mobx-react-lite';
import { globalStore } from '../../../store/GlobalStore';
import { Board } from '../../../types/board';
import { useParams } from 'react-router-dom';

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
          <Paper
            key={task.id}
            onClick={() => taskDrawerStore.openFromBoard(task, board)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              m: 1,
              '&:hover': { bgcolor: 'action.hover', cursor: 'pointer' },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 400, fontSize: 16 }}>
              {task.title}
            </Typography>
          </Paper>
        ))}
      </Box>
    );
  }
);
