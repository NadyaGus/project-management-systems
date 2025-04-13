import {
  Box,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Board } from '../../../types/board';
import { TaskStatus } from '../../../types/task';
import { handleStatusName } from '../../../utils/handleStatusName';

export const Filters = ({
  boards,
  filteredStatusValue,
  filteredBoardValue,
  setFilteredStatusValue,
  setFilteredBoardValue,
}: {
  boards: Board[];
  filteredStatusValue: string;
  filteredBoardValue: string;
  setFilteredStatusValue: React.Dispatch<React.SetStateAction<string>>;
  setFilteredBoardValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');

  useEffect(() => {
    setSelectedStatus(filteredStatusValue);
    setSelectedBoard(filteredBoardValue);
  }, [filteredStatusValue, filteredBoardValue]);

  const selectOptions: { title: string; value: TaskStatus }[] = [
    { title: 'TODO', value: 'Backlog' },
    { title: 'IN PROGRESS', value: 'InProgress' },
    { title: 'DONE', value: 'Done' },
  ];

  const handleSelectStatusChange = (e: SelectChangeEvent) => {
    setSelectedStatus(e.target.value);
    setFilteredStatusValue(e.target.value);
  };

  const handleSelectBoardChange = (e: SelectChangeEvent) => {
    setSelectedBoard(e.target.value);
    setFilteredBoardValue(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
      }}
    >
      <FormGroup>
        <FormControl fullWidth size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="status-filter-label">Статус</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            name="status-filter"
            label="Статус"
            value={selectedStatus}
            onChange={(e) => handleSelectStatusChange(e)}
          >
            {selectOptions.map((select) => (
              <MenuItem key={select.value} value={select.value}>
                {handleStatusName(select.value)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormControl
          fullWidth
          size="small"
          sx={{ minWidth: { xs: 160, md: 400 } }}
        >
          <InputLabel id="board-filter-label">Доска</InputLabel>
          <Select
            labelId="board-filter-label"
            id="board-filter"
            name="board-filter"
            label="Доска"
            value={selectedBoard}
            onChange={(e) => handleSelectBoardChange(e)}
          >
            {boards.map((board) => (
              <MenuItem key={board.id} value={board.name}>
                {board.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormGroup>
    </Box>
  );
};
