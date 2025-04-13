import { Box, Button, TextField } from '@mui/material';

export const Search = ({
  setSearchValue,
}: {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = e.currentTarget.search.value;
    setSearchValue(searchValue);
  };

  return (
    <Box
      component={'form'}
      onSubmit={(e) => handleSubmit(e)}
      sx={{ display: 'flex', mb: 2 }}
    >
      <TextField
        id="search"
        type="search"
        name="search"
        placeholder="Поиск"
        size="small"
        sx={{ flexGrow: 1, mr: 2 }}
      />

      <Button variant="contained" type="submit">
        Найти
      </Button>
    </Box>
  );
};
