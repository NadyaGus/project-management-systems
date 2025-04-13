import { Button } from '@mui/material';

export const ResetFiltersButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      Сбросить фильтры
    </Button>
  );
};
