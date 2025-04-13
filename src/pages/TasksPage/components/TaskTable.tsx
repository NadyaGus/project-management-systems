import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Task } from '../../../types/task';
import { observer } from 'mobx-react-lite';
import { taskDrawerStore } from '../../../store/TaskDrawerStore';
import { handleStatusName } from '../../../utils/handleStatusName';

const paginationModel = { page: 0, pageSize: 10 };

export const TaskTable = observer(({ data }: { data: Task[] }) => {
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Название задачи', flex: 2 },
    { field: 'board', headerName: 'Доска', flex: 1 },
    { field: 'status', headerName: 'Статус', flex: 1 },
    { field: 'assignee', headerName: 'Исполнитель', flex: 1 },
  ];

  const rows = data.map((task) => ({
    id: task.id,
    title: task.title,
    board: task.boardName,
    status: handleStatusName(task.status),
    assignee: task.assignee.fullName,
  }));

  const getTask = (id: number) => {
    return data.find((task) => task.id === id) as Task;
  };

  return (
    <Paper sx={{ width: '100%', my: 4 }}>
      <DataGrid
        onCellClick={({ row }) =>
          taskDrawerStore.openFromTasks(getTask(row?.id))
        }
        localeText={{
          MuiTablePagination: {
            labelRowsPerPage: 'Задач на странице:',
            labelDisplayedRows: ({ from, to, count }) =>
              `${from}-${to} из ${count}`,
          },
        }}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        disableColumnSorting
        sx={{
          border: 0,
          '& .MuiDataGrid-cell:focus': {
            outline: 'none !important',
          },
        }}
      />
    </Paper>
  );
});
