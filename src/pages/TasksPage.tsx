import { useLoaderData } from 'react-router-dom';
import { Task } from '../types/task';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { CreateTaskButton } from '../components/CreateTaskButton';
import { TaskTable } from '../components/TaskTable';

export const TasksPage = () => {
  const loaderData = useLoaderData<{ data: Task[] }>();

  return (
    <>
      <SearchAndFilters />

      <TaskTable data={loaderData.data} />

      <CreateTaskButton />
    </>
  );
};
