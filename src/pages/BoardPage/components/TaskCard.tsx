import { Avatar, Badge, Box, Paper, Typography } from '@mui/material';
import { Task } from '../../../types/task';
import { Board } from '../../../types/board';
import { taskDrawerStore } from '../../../store/TaskDrawerStore';

export const TaskCard = ({ task, board }: { task: Task; board: Board }) => {
  const handlePriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'error';
    }
  };

  const handlePriorityText = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'Низкий';
      case 'Medium':
        return 'Средний';
      case 'High':
        return 'Высокий';
    }
  };

  return (
    <Paper
      key={task.id}
      onClick={() => taskDrawerStore.openFromBoard(task, board)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        m: 1,
        '&:hover': { bgcolor: 'action.hover', cursor: 'pointer' },
      }}
    >
      <Badge
        badgeContent={handlePriorityText(task.priority)}
        color={handlePriorityColor(task.priority)}
      >
        <Typography variant="h6" sx={{ fontWeight: 400, fontSize: 16 }}>
          {task.title}
        </Typography>
      </Badge>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 400,
          fontSize: 12,
          color: 'text.secondary',
          my: 1,
        }}
      >
        <Avatar
          alt={task.assignee.fullName}
          src={task.assignee.avatarUrl}
          sx={{ mr: 1, width: 24, height: 24 }}
        />
        {task.assignee.fullName}
      </Box>

      {/* <Typography variant="h6" sx={{ fontWeight: 400, fontSize: 16 }}>
        {task.assignee.fullName}
        {task.priority}
        {task.assignee.avatarUrl}
      </Typography> */}
    </Paper>
  );
};
