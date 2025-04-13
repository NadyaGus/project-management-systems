import { Filters } from './components/Filters';
import { CreateTaskButton } from '../../components/CreateTaskButton';
import { TaskTable } from './components/TaskTable';
import { globalStore } from '../../store/GlobalStore';
import { observer } from 'mobx-react-lite';
import { taskDrawerStore } from '../../store/TaskDrawerStore';
import { Search } from './components/Search';
import { useEffect, useState } from 'react';
import {
  filterByTitleAndAssignee,
  filterTasksByStatusAndBoard,
} from './helpers';
import { ResetFiltersButton } from './components/ResetFiltersButton';

export const TasksPage = observer(() => {
  const tasksData = globalStore.tasks;
  const boardsData = globalStore.boards;
  // TODO add fallback ui

  const [sortedTasks, setSortedTasks] = useState(tasksData);
  const [searchValue, setSearchValue] = useState('');
  const [filteredStatusValue, setFilteredStatusValue] = useState('');
  const [filteredBoardValue, setFilteredBoardValue] = useState('');

  const handleResetFilters = () => {
    setSearchValue('');
    setFilteredStatusValue('');
    setFilteredBoardValue('');
  };

  useEffect(() => {
    setSortedTasks(tasksData);
    handleResetFilters();
  }, [tasksData]);

  useEffect(() => {
    if (!searchValue && !filteredStatusValue && !filteredBoardValue) {
      setSortedTasks(tasksData);
      return;
    }
    const filtered = filterByTitleAndAssignee(tasksData, searchValue);

    const filteredTasks = filterTasksByStatusAndBoard(
      filtered,
      filteredStatusValue,
      filteredBoardValue
    );
    setSortedTasks(filteredTasks);
  }, [searchValue, filteredStatusValue, filteredBoardValue, tasksData]);

  return (
    <>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Filters
        boards={boardsData}
        filteredStatusValue={filteredStatusValue}
        filteredBoardValue={filteredBoardValue}
        setFilteredBoardValue={setFilteredBoardValue}
        setFilteredStatusValue={setFilteredStatusValue}
      />

      <ResetFiltersButton onClick={() => handleResetFilters()} />

      <TaskTable data={sortedTasks} />

      <CreateTaskButton onClick={() => taskDrawerStore.openFromHeader()} />
    </>
  );
});
