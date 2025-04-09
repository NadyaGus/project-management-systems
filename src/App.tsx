import { Button, createTheme, ThemeProvider, Typography } from '@mui/material';
import { useState } from 'react';

const theme = createTheme();

function App() {
  const [state, setState] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1">Hello Avito</Typography>
      <Button onClick={() => setState('lala')}>Increment {state}</Button>
    </ThemeProvider>
  );
}

export default App;
