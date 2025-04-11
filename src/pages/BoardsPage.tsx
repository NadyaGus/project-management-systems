import { Box, Button, List, ListItem, Paper, Typography } from '@mui/material';
import { globalStore } from '../store/GlobalStore';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

export const BoardsPage = () => {
  const boards = globalStore.boards;
  return (
    <Paper sx={{ width: '100%', my: 4 }}>
      <List>
        {boards.map((board) => (
          <ListItem key={board.id}>
            <Paper
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Typography variant="h6" sx={{ fontWeight: 400, fontSize: 16 }}>
                  {board.name}
                </Typography>
              </Box>

              <Link to={`${ROUTES.boards.href}/${board.id}`}>
                <Button variant="outlined">К Доске</Button>
              </Link>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
