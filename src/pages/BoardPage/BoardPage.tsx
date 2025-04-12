import { Link, useLoaderData, useParams } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { ROUTES } from '../../constants';
import { observer } from 'mobx-react-lite';
import { Task } from '../../types/task';
import { globalStore } from '../../store/GlobalStore';
import { BoardTable } from './components/BoardTable';

export const BoardPage = observer(() => {
  const loaderData = useLoaderData<{ data: Task[] }>();

  const params = useParams();
  const boardData = globalStore.getBoardById(
    params.boardId ? Number(params.boardId) : 0
  );

  if (!boardData) {
    return <div>Board not found</div>;
    // TODO: add not found page
  }

  return (
    <>
      <Link to={ROUTES.boards.href}>
        <Button>К Доскам </Button>
      </Link>

      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 400, fontSize: 20 }}>
          {boardData?.name}
        </Typography>

        <Paper sx={{ width: '100%', p: 2 }}>
          <BoardTable data={loaderData.data} />
        </Paper>
      </Box>
    </>
  );
});
