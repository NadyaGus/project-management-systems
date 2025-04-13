import { Filters } from './components/Filters';
import { CreateTaskButton } from '../../components/CreateTaskButton';
import { TaskTable } from './components/TaskTable';
import { globalStore } from '../../store/GlobalStore';
import { observer } from 'mobx-react-lite';
import { taskDrawerStore } from '../../store/TaskDrawerStore';
import { Search } from './components/Search';
import { useEffect, useState } from 'react';

export const TasksPage = observer(() => {
  const tasksData = globalStore.tasks;
  const boardsData = globalStore.boards;
  // TODO add fallback ui

  const [filteredTasks, setFilteredTasks] = useState(tasksData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setFilteredTasks(tasksData);
  }, [tasksData]);

  useEffect(() => {
    if (searchValue) {
      const filteredByTitle = tasksData.filter((task) =>
        task.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      const filteredByName = tasksData.filter((task) =>
        task.assignee.fullName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredTasks(filteredByTitle.concat(filteredByName));
    } else {
      setFilteredTasks(tasksData);
    }
  }, [searchValue, tasksData]);

  return (
    <>
      <Search setSearchValue={setSearchValue} />
      <Filters boards={boardsData} />

      <TaskTable data={filteredTasks} />

      <CreateTaskButton onClick={() => taskDrawerStore.openFromHeader()} />
    </>
  );
});
