import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export const Search = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [search, setSearch] = useState(searchValue);

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(search);
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
        value={search}
        onChange={(e) => handleChangeInput(e)}
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
