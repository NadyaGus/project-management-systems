import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Box } from '@mui/material';

export const Layout = () => {
  return (
    <>
      <Box component="header">
        <Header />
      </Box>

      <Box component="main" sx={{ p: 3, mt: 7 }}>
        <Outlet />
      </Box>
    </>
  );
};
