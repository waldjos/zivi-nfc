import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f8',
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Bienvenido a Zivi
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary', marginBottom: 3 }}>
          ¡Tu aplicación eficiente!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigate('/recarga')}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Recarga
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleNavigate('/compra')}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Comprar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleNavigate('/administrador')}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Administrador
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;