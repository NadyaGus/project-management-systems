import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import {
  handleSubmitEditTask,
  handleSubmitNewTask,
} from './handleSubmitsDrawer';
import { taskDrawerStore } from '../../store/TaskDrawerStore';
import { useEffect, useState } from 'react';
import { globalStore } from '../../store/GlobalStore';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

export const TaskForm = observer(() => {
  const isOpen = taskDrawerStore.isOpen;
  const { assigners, boards } = globalStore;

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    } // Remove MUI focus error
  }, [isOpen]);

  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAssigner, setSelectedAssigner] = useState('');

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
    if (isOpenFromTasks || isOpenFromBoard) {
      e.preventDefault();
      const values = Object.fromEntries(new FormData(e.currentTarget));
      if (taskDrawerStore.callFromBoard) {
        values['boardId'] = String(taskDrawerStore.boardTask?.id);
      }
      handleSubmitEditTask(e, values, taskDrawerStore.editedTask?.id as number);
    } else {
      handleSubmitNewTask(e);
    }
  };

  const isOpenFromTasks = taskDrawerStore.callFromTasks;
  const isOpenFromBoard = taskDrawerStore.callFromBoard;
  const isNewTask = taskDrawerStore.callFromHeader;

  const taskTitle = isOpenFromTasks
    ? taskDrawerStore.editedTask?.title
    : isOpenFromBoard
      ? taskDrawerStore.editedTask?.title
      : '';

  const taskDescription = isOpenFromTasks
    ? taskDrawerStore.editedTask?.description
    : isOpenFromBoard
      ? taskDrawerStore.editedTask?.description
      : '';

  const taskBoardId = isOpenFromTasks
    ? String(taskDrawerStore.editedTask?.boardId)
    : isOpenFromBoard
      ? String(taskDrawerStore.boardTask?.id)
      : selectedBoard;

  const taskPriority = isOpenFromTasks
    ? String(taskDrawerStore.editedTask?.priority)
    : isOpenFromBoard
      ? String(taskDrawerStore.editedTask?.priority)
      : selectedPriority;

  const taskStatus = isOpenFromTasks
    ? String(taskDrawerStore.editedTask?.status)
    : isOpenFromBoard
      ? String(taskDrawerStore.editedTask?.status)
      : selectedStatus;

  const taskAssigner = taskDrawerStore.editedTask?.assignee;

  useEffect(() => {
    setSelectedBoard(taskBoardId);
    setSelectedPriority(taskPriority);
    setSelectedStatus(isNewTask ? 'Backlog' : taskStatus);

    const taskAssignerId = assigners.find(
      (assigner) => assigner.fullName === taskAssigner?.fullName
    )?.id;
    setSelectedAssigner(String(taskAssignerId || ''));
  }, [
    taskBoardId,
    taskPriority,
    taskStatus,
    taskAssigner,
    assigners,
    isNewTask,
  ]);

  const buttonText =
    isOpenFromTasks || isOpenFromBoard ? 'Сохранить задачу' : 'Создать задачу';

  return (
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
        defaultValue={taskTitle}
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
        defaultValue={taskDescription}
      />

      <FormControl fullWidth size="small">
        <InputLabel id="boardId-label">Доска</InputLabel>
        <Select
          disabled={taskDrawerStore.callFromBoard}
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
          disabled={isNewTask}
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
        {buttonText}
      </Button>
    </Box>
  );
});
