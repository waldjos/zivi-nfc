import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h6" component="div">
            Zivi
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
               Home
            </Button>
            <Button color="inherit" component={Link} to="/recarga">
              Recarga
            </Button>
            <Button color="inherit" component={Link} to="/compra">
              Compra
            </Button>
            <Button color="inherit" component={Link} to="/administrador">
              Administrador
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;