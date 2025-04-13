import { Box, List, ListItem, Paper, Typography } from '@mui/material';
import { globalStore } from '../store/GlobalStore';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

export const BoardsPage = () => {
  const boards = globalStore.boards;
  return (
    <>
      <Typography
        variant="h1"
        sx={{ mt: 2, mb: 2, fontWeight: 400, fontSize: 32 }}
      >
        Все доски
      </Typography>

      <Paper sx={{ width: '100%', my: 4 }}>
        <List>
          {boards.map((board, index) => (
            <Link key={board.id} to={`${ROUTES.boards.href}/${board.id}`}>
              <ListItem>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderBottom:
                      index !== boards.length - 1
                        ? '1px solid #E0E0E0'
                        : 'none',

                    '&:hover': {
                      cursor: 'pointer',
                      bgcolor: '#f4f5ff',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontSize: 16, color: 'black' }}
                      >
                        {board.name}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 120,
                          fontSize: 12,
                          color: 'white',
                          bgcolor: '#2196F3',
                          borderRadius: 2,
                        }}
                      >
                        Всего задач: {board.taskCount}
                      </Box>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 400, fontSize: 16, color: 'gray' }}
                    >
                      {board.description}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </>
  );
};
