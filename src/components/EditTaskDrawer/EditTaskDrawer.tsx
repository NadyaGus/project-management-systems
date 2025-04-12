import { Box, Button, Drawer, Typography } from '@mui/material';
import { taskDrawerStore } from '../../store/TaskDrawerStore';
import { observer } from 'mobx-react-lite';
import { TaskForm } from './TaskForm';

const drawerWidth = 600;

export const EditTaskDrawer = observer(() => {
  const isOpen = taskDrawerStore.isOpen;

  const isOpenFromTasks = taskDrawerStore.callFromTasks;
  const isOpenFromBoard = taskDrawerStore.callFromBoard;

  const drawerTitle =
    isOpenFromTasks || isOpenFromBoard
      ? 'Редактировать задачу'
      : 'Создать задачу';

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={() => taskDrawerStore.toggleOpen()}
    >
      <Box sx={{ p: 2, pb: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">{drawerTitle}</Typography>
            <Button onClick={() => taskDrawerStore.toggleOpen()}>
              Закрыть
            </Button>
          </Box>

          <TaskForm />
        </Box>
      </Box>
    </Drawer>
  );
});
