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
import { ZodError } from 'zod';

type ZodErrorType = ZodError<{
  title: string;
  boardId: number;
  priority: 'Low' | 'Medium' | 'High';
  assigneeId: number;
  description: string;
}>;

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

  const [errors, setErrors] = useState<ZodErrorType>();

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
      const result = handleSubmitEditTask(
        e,
        values,
        taskDrawerStore.editedTask?.id as number
      );

      if (result) {
        setErrors(result.error);
      }
    } else {
      const result = handleSubmitNewTask(e);
      if (result) {
        setErrors(result.error);
      }
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
        error={errors?.formErrors?.fieldErrors.title !== undefined}
        helperText={errors?.formErrors?.fieldErrors.title}
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
        error={errors?.formErrors?.fieldErrors.description !== undefined}
        helperText={errors?.formErrors?.fieldErrors.description}
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
          error={errors?.formErrors?.fieldErrors.boardId !== undefined}
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
          error={errors?.formErrors?.fieldErrors.priority !== undefined}
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
          // error={errors?.formErrors?.fieldErrors.status !== undefined}
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
          error={errors?.formErrors?.fieldErrors.assigneeId !== undefined}
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
