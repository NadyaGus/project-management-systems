import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Input,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export const SearchAndFilters = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  return (
    <>
      <Box component={'search'}>
        <Input
          type="search"
          placeholder="Поиск"
          sx={{ mr: 2 }}
          inputProps={{ 'aria-label': 'search' }}
        />
        <Button
          variant="outlined"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          {isFiltersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
        </Button>
      </Box>

      <Box sx={{ display: isFiltersOpen ? 'flex' : 'none' }}>
        <FormGroup>
          <Typography>По статусу:</Typography>
          <FormControlLabel control={<Checkbox />} label={'Низкий'} />
          <FormControlLabel control={<Checkbox />} label={'Средний'} />
          <FormControlLabel control={<Checkbox />} label={'Высокий'} />
        </FormGroup>

        <FormGroup>
          <Typography>По доске:</Typography>
          <FormControlLabel control={<Checkbox />} label={'1'} />
        </FormGroup>
      </Box>
    </>
  );
};
