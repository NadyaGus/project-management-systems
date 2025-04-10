import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Task } from '../types/task';

const paginationModel = { page: 0, pageSize: 10 };

export const TaskTable = ({ data }: { data: Task[] }) => {
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Название задачи', flex: 2 },
    { field: 'priority', headerName: 'Приоритет', flex: 1 },
    { field: 'status', headerName: 'Статус', flex: 1 },
    { field: 'assignee', headerName: 'Исполнитель', flex: 1 },
  ];

  const rows = data.map((task) => ({
    id: task.id,
    title: task.title,
    priority: task.priority,
    status: task.status,
    assignee: task.assignee.fullName,
  }));

  return (
    <Paper sx={{ width: '100%', my: 4 }}>
      <DataGrid
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
        sx={{ border: 0 }}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
      />
    </Paper>
  );
};
