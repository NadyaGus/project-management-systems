import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { ROUTES } from '../constants';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CreateTaskButton } from './CreateTaskButton';
import { observer } from 'mobx-react-lite';
import { taskDrawerStore } from '../store/TaskDrawerStore';

const drawerWidth = 240;

export const Header = observer(() => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [ROUTES.issues, ROUTES.boards];
  const [alignment, setAlignment] = useState(() => location.pathname);

  useEffect(() => {
    setAlignment(location.pathname);
  }, [location]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to={item.href}>
                <ListItemText primary={item.name.toUpperCase()} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleOpacityStyle = (item: { href: string; name: string }) => {
    return alignment !== '/boards' && alignment !== '/issues'
      ? 1
      : alignment === item.href
        ? 1
        : 0.5;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: '#5263c3' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button
                  sx={{
                    color: '#fff',
                    opacity: handleOpacityStyle(item),
                    '&:hover': { opacity: 0.8 },
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>
          <CreateTaskButton onClick={() => taskDrawerStore.openFromHeader()} />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
});
