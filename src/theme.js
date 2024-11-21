// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',  // Color verde suave
    },
    secondary: {
      main: '#8BC34A',  // Verde claro
    },
    background: {
      default: '#f5f5f5',  // Fondo gris suave
    },
    text: {
      primary: '#212121',  // Texto oscuro
      secondary: '#757575',  // Texto gris
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    button: {
      fontWeight: 600,
    },
  },
});

export default theme;
