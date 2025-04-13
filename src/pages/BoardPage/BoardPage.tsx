import { Link, useParams } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { ROUTES } from '../../constants';
import { observer } from 'mobx-react-lite';
import { globalStore } from '../../store/GlobalStore';
import { BoardTable } from './components/BoardTable';

export const BoardPage = observer(() => {
  const params = useParams();
  const boardData = globalStore.getBoardById(
    params.boardId ? Number(params.boardId) : 0
  );

  if (!boardData) {
    return (
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link to={ROUTES.boards.href}>
          <Button variant="outlined" sx={{ my: 2 }}>
            Назад к доскам
          </Button>
        </Link>

        <Typography
          variant="h1"
          sx={{ mt: 2, mb: 4, fontWeight: 400, fontSize: 32 }}
        >
          Доска не найдена
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Link to={ROUTES.boards.href}>
        <Button variant="outlined" sx={{ my: 2 }}>
          Назад к доскам
        </Button>
      </Link>

      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{ mt: 1, mb: 4, fontWeight: 400, fontSize: 32 }}
        >
          {boardData?.name}
        </Typography>

        <Paper sx={{ width: '100%', p: 2 }}>
          <BoardTable />
        </Paper>
      </Box>
    </>
  );
});
