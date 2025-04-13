import { Filters } from './components/Filters';
import { TaskTable } from './components/TaskTable';
import { globalStore } from '../../store/GlobalStore';
import { observer } from 'mobx-react-lite';
import { Search } from './components/Search';
import { useEffect, useState } from 'react';
import {
  filterByTitleAndAssignee,
  filterTasksByStatusAndBoard,
} from './helpers';
import { ResetFiltersButton } from './components/ResetFiltersButton';
import { Box, Typography } from '@mui/material';

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
      <Typography
        variant="h1"
        sx={{ mt: 2, mb: 2, fontWeight: 400, fontSize: 32 }}
      >
        Все задачи
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Filters
            boards={boardsData}
            filteredStatusValue={filteredStatusValue}
            filteredBoardValue={filteredBoardValue}
            setFilteredBoardValue={setFilteredBoardValue}
            setFilteredStatusValue={setFilteredStatusValue}
          />

          {searchValue || filteredStatusValue || filteredBoardValue ? (
            <ResetFiltersButton onClick={handleResetFilters} />
          ) : null}
        </Box>
      </Box>

      <TaskTable data={sortedTasks} />
    </>
  );
});
