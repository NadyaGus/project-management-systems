import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Board } from '../../../types/board';

export const Filters = ({ boards }: { boards: Board[] }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      >
        {isFiltersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
      </Button>

      <Box sx={{ display: isFiltersOpen ? 'flex' : 'none' }}>
        <FormGroup>
          <Typography>По статусу:</Typography>
          <FormControlLabel control={<Checkbox />} label={'Низкий'} />
          <FormControlLabel control={<Checkbox />} label={'Средний'} />
          <FormControlLabel control={<Checkbox />} label={'Высокий'} />
        </FormGroup>

        <FormGroup>
          <Typography>По доске:</Typography>
          {boards.map((board) => (
            <FormControlLabel
              key={board.id}
              control={<Checkbox />}
              label={board.name}
            />
          ))}
        </FormGroup>
      </Box>
    </>
  );
};
