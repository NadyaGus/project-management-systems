import { SearchAndFilters } from '../components/SearchAndFilters';
import { CreateTaskButton } from '../components/CreateTaskButton';
import { TaskTable } from '../components/TaskTable';
import { globalStore } from '../store/GlobalStore';
import { observer } from 'mobx-react-lite';

export const TasksPage = observer(() => {
  const tasksData = globalStore.tasks;
  // TODO add fallback ui

  return (
    <>
      <SearchAndFilters />

      <TaskTable data={tasksData} />

      <CreateTaskButton />
    </>
  );
});
