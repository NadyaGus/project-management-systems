import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { taskDrawerStore } from '../store/TaskDrawerStore';
import { observer } from 'mobx-react-lite';
import { globalStore } from '../store/GlobalStore';
import { useEffect, useState } from 'react';
import { validateForm } from '../utils/validateForm';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

const drawerWidth = 600;

export const EditTaskDrawer = observer(() => {
  const isOpen = taskDrawerStore.isOpen;
  const { assigners, boards } = globalStore;

  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAssigner, setSelectedAssigner] = useState('');

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    } // Remove MUI focus error
  }, [isOpen]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    switch (event.target.name) {
      case 'boardId':
        setSelectedBoard(event.target.value);
        break;
      case 'priority':
        setSelectedPriority(event.target.value);
        break;
      case 'status':
        setSelectedStatus(event.target.value);
        break;
      case 'assigneeId':
        setSelectedAssigner(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: add validation error
    const values = Object.fromEntries(new FormData(e.currentTarget));

    const isValid = validateForm(values);

    if (isValid) {
      if (isValid.success && isValid.data) {
        globalStore.addTask(isValid.data);
      }
    }
  };

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
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">Создать задачу</Typography>
          <Button onClick={() => taskDrawerStore.toggleOpen()}>Закрыть</Button>
        </Box>

        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Название задачи"
            id="title"
            name="title"
            placeholder="Название задачи"
            fullWidth
            size="small"
          />

          <TextField
            label="Описание задачи"
            id="description"
            name="description"
            multiline
            rows={4}
            placeholder="Введите ваш текст..."
            fullWidth
            size="small"
          />

          <FormControl fullWidth size="small">
            <InputLabel id="boardId-label">Доска</InputLabel>
            <Select
              labelId="boardId-label"
              id="boardId"
              name="boardId"
              label="Доска"
              value={selectedBoard}
              onChange={(e) => handleSelectChange(e)}
            >
              {boards.map((board) => (
                <MenuItem key={board.id} value={board.id}>
                  {board.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="priority-label">Приоритет</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              name="priority"
              label="Приоритет"
              value={selectedPriority}
              onChange={(e) => handleSelectChange(e)}
            >
              <MenuItem value={'Low'}>Низкий</MenuItem>
              <MenuItem value={'Medium'}>Средний</MenuItem>
              <MenuItem value={'High'}>Высокий</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="status-label">Статус</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              label="Статус"
              value={selectedStatus}
              onChange={(e) => handleSelectChange(e)}
            >
              <MenuItem value={'Backlog'}>Backlog</MenuItem>
              <MenuItem value={'InProgress'}>In Progress</MenuItem>
              <MenuItem value={'Done'}>Done</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="assigneeId-label">Исполнитель</InputLabel>
            <Select
              labelId="assigneeId-label"
              id="assigneeId"
              name="assigneeId"
              label="Исполнитель"
              value={selectedAssigner}
              onChange={(e) => handleSelectChange(e)}
            >
              {assigners.map((assigner) => (
                <MenuItem key={assigner.id} value={assigner.id}>
                  {assigner.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {taskDrawerStore.callFromTasks && (
            <Link
              to={`${ROUTES.boards.href}/${taskDrawerStore.editedTask?.boardId}`}
            >
              <Button
                variant="contained"
                type="submit"
                onClick={() => taskDrawerStore.toggleOpen()}
              >
                Перейти на доску
              </Button>
            </Link>
          )}

          <Button variant="contained" type="submit">
            Создать задачу
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
});
