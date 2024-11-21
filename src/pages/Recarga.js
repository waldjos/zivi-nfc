/* global NDEFReader */

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import { useProductos } from '../context/ProductosContext';

function Recarga() {
  const { tasaCambio, setTasaCambio } = useProductos(); // Traemos la tasa de cambio del contexto
  const [montoUSD, setMontoUSD] = useState('');
  const [montoVES, setMontoVES] = useState(0);
  const [metodoPago, setMetodoPago] = useState('');

  useEffect(() => {
    if (montoUSD && tasaCambio) {
      setMontoVES(montoUSD * tasaCambio);
    }
  }, [montoUSD, tasaCambio]);

  const handleRecargaNFC = async () => {
    if (!montoUSD || !metodoPago) {
      alert("Por favor, complete todos los campos antes de realizar la recarga.");
      return;
    }

    if (typeof NDEFReader === 'undefined') {
      alert("NFC no es soportado en este navegador o dispositivo.");
      return;
    }

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      await ndef.write(`Recarga de ${montoUSD} USD realizada exitosamente.`);
      alert("Recarga NFC realizada exitosamente");
    } catch (error) {
      console.error("Error al escribir en NFC:", error);
      alert("Error al realizar la recarga NFC.");
    }
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
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Recarga de Tarjeta NFC
        </Typography>
        <TextField
          label="Monto en USD"
          type="number"
          value={montoUSD}
          onChange={(e) => setMontoUSD(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Monto en Bolívares"
          value={montoVES ? montoVES.toFixed(2) : '0'} // Calcula automáticamente el monto en VES
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '10px' }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          select
          label="Método de Pago"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '10px' }}
        >
          <MenuItem value="Tarjeta">Tarjeta</MenuItem>
          <MenuItem value="Efectivo">Efectivo</MenuItem>
          <MenuItem value="Transferencia">Transferencia</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleRecargaNFC}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          Recargar NFC
        </Button>
      </Paper>
    </Box>
  );
}

export default Recarga;