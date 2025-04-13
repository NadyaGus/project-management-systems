import { Button } from '@mui/material';

export const ResetFiltersButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button variant="outlined" onClick={onClick}>
      Сбросить фильтры
    </Button>
  );
};
