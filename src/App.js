import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Recarga from './pages/Recarga';
import Compra from './pages/Compra';
import Administrador from './pages/Administrador';
import { ProductosProvider } from './context/ProductosContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';

/* global NDEFReader */

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
});

function App() {
  return (
    <ProductosProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppBar position="static" color="primary" sx={{ boxShadow: 3, background: 'linear-gradient(90deg, #6200ea, #03dac6)' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Zivi
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/recarga" sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                  Recarga
                </Button>
                <Button color="inherit" component={Link} to="/compra" sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                  Compra
                </Button>
                <Button color="inherit" component={Link} to="/administrador" sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                  Administrador
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recarga" element={<Recarga />} />
            <Route path="/compra" element={<Compra />} />
            <Route path="/administrador" element={<Administrador />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ProductosProvider>
  );
}

export default App;