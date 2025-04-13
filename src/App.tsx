import { createTheme, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect } from 'react';
import { globalStore } from './store/GlobalStore';

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#f50057',
        },
      },
    },
  },
});

function App() {
  useEffect(() => {
    globalStore.initStore();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
