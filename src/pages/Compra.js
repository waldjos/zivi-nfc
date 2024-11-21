/* global NDEFReader */

import React, { useState } from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemText, Button, Paper } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useProductos } from '../context/ProductosContext';

const Compra = () => {
  const { productos, modificarProducto } = useProductos();
  const [carrito, setCarrito] = useState({});
  const [saldoTarjeta, setSaldoTarjeta] = useState(0);

  const handleAddProducto = (producto) => {
    setCarrito((prev) => {
      const cantidad = prev[producto.id] ? prev[producto.id].cantidad + 1 : 1;
      return {
        ...prev,
        [producto.id]: { ...producto, cantidad },
      };
    });
  };

  const handleRemoveProducto = (producto) => {
    setCarrito((prev) => {
      if (prev[producto.id]) {
        const cantidad = prev[producto.id].cantidad - 1;
        if (cantidad <= 0) {
          const { [producto.id]: _, ...rest } = prev;
          return rest;
        } else {
          return {
            ...prev,
            [producto.id]: { ...producto, cantidad },
          };
        }
      }
      return prev;
    });
  };

  // Leer el saldo actual desde la tarjeta NFC
  const leerSaldoTarjeta = async () => {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      ndef.onreading = (event) => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          if (record.recordType === "text") {
            const data = decoder.decode(record.data);
            if (data.startsWith("Saldo:")) {
              const saldo = parseFloat(data.replace("Saldo:", "").trim());
              setSaldoTarjeta(saldo);
              alert(`Saldo en tarjeta: $${saldo}`);
            }
          }
        }
      };
    } catch (error) {
      console.error("Error al leer la tarjeta NFC:", error);
      alert("No se pudo leer la tarjeta NFC");
    }
  };

  // Escribir el saldo actualizado en la tarjeta NFC
  const escribirSaldoTarjeta = async (nuevoSaldo) => {
    try {
      const ndef = new NDEFReader();
      await ndef.write(`Saldo: ${nuevoSaldo}`);
      setSaldoTarjeta(nuevoSaldo);
      alert(`Saldo actualizado en tarjeta: $${nuevoSaldo}`);
    } catch (error) {
      console.error("Error al escribir en la tarjeta NFC:", error);
      alert("No se pudo escribir en la tarjeta NFC");
    }
  };

  const handleCompra = () => {
    // Calcular el total de la compra
    const totalCompra = Object.values(carrito).reduce((total, item) => total + item.precio * item.cantidad, 0);

    // Verificar si hay suficiente saldo
    if (totalCompra > saldoTarjeta) {
      alert("Saldo insuficiente en la tarjeta. Por favor, recargue más saldo.");
      return;
    }

    // Descontar el saldo de la tarjeta
    const nuevoSaldo = saldoTarjeta - totalCompra;
    escribirSaldoTarjeta(nuevoSaldo);

    // Actualizar la cantidad vendida de cada producto
    Object.values(carrito).forEach((item) => {
      const productoActualizado = {
        ...item,
        cantidadVendida: item.cantidadVendida + item.cantidad,
      };
      modificarProducto(productoActualizado);
    });

    // Limpiar el carrito después de la compra
    setCarrito({});
    alert('Compra realizada con éxito');
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
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Compra de Productos
        </Typography>
        <Button variant="outlined" color="primary" fullWidth onClick={leerSaldoTarjeta} sx={{ mb: 3 }}>
          Leer Saldo de Tarjeta
        </Button>
        <Typography variant="h6" align="center" gutterBottom>
          Saldo Actual: ${saldoTarjeta.toFixed(2)}
        </Typography>
        <List>
          {productos.map((producto) => (
            <ListItem key={producto.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemText
                primary={producto.nombre}
                secondary={`Precio: $${producto.precio}`}
                sx={{ flexGrow: 1 }}
              />
              <IconButton onClick={() => handleRemoveProducto(producto)} color="secondary">
                <Remove />
              </IconButton>
              <Typography variant="body1" sx={{ mx: 2 }}>
                {carrito[producto.id]?.cantidad || 0}
              </Typography>
              <IconButton onClick={() => handleAddProducto(producto)} color="primary">
                <Add />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          onClick={handleCompra}
          sx={{ textTransform: 'none', fontWeight: 'bold', mt: 3 }}
        >
          Realizar Compra
        </Button>
      </Paper>
    </Box>
  );
};

export default Compra;