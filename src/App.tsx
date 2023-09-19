import * as React from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Account from './pages/Account';
import Saving from './pages/Saving';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Account />} />
        <Route path="account" element={<Account />} />
        <Route path="saving" element={<Saving />} />
      </Route>
    </Routes>
  );
}

const drawerWidth = 240;

function Layout() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <ListItem key={'account'} disablePadding>
          <ListItemButton onClick={() => navigate('account')} sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Account'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'saving'} disablePadding>
          <ListItemButton onClick={() => navigate('saving')} sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Saving'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            My Bank
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button onClick={() => navigate('account')} key="account" sx={{ color: '#fff' }}>
              Account
            </Button>
            <Button onClick={() => navigate('saving')} key="Saving" sx={{ color: '#fff' }}>
              Saving
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}
