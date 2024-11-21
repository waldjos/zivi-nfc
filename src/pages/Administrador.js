import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { useProductos } from '../context/ProductosContext';
import { Delete, Edit } from '@mui/icons-material';

function Administrador() {
  const { productos, agregarProducto, modificarProducto, eliminarProducto, tasaCambio, setTasaCambioPersistente } = useProductos();
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '' });
  const [totalDolares, setTotalDolares] = useState(0);
  const [totalBolivares, setTotalBolivares] = useState(0);
  const [productoEditando, setProductoEditando] = useState(null);

  // Manejar la adición o edición de productos
  const handleAgregarProducto = () => {
    if (productoEditando) {
      modificarProducto({ ...productoEditando, nombre: nuevoProducto.nombre, precio: parseFloat(nuevoProducto.precio) });
      setProductoEditando(null);
    } else {
      agregarProducto({ id: Date.now(), nombre: nuevoProducto.nombre, precio: parseFloat(nuevoProducto.precio), cantidadVendida: 0 });
    }
    setNuevoProducto({ nombre: '', precio: '' });
  };

  // Manejar la edición del producto seleccionado
  const handleEditarProducto = (producto) => {
    setProductoEditando(producto);
    setNuevoProducto({ nombre: producto.nombre, precio: producto.precio.toString() });
  };

  // Manejar la eliminación del producto
  const handleEliminarProducto = (id) => {
    eliminarProducto(id);
  };
// C:\Users\Usuario\zivi-nfc\public\index.html
  // Calcular totales
  const calcularTotales = () => {
    let totalUsd = 0;

    productos.forEach((producto) => {
      totalUsd += producto.precio * producto.cantidadVendida;
    });

    setTotalDolares(totalUsd);
    setTotalBolivares(totalUsd * tasaCambio);
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
          Panel de Administración
        </Typography>

        {/* Mostrar los productos vendidos */}
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Productos Vendidos
        </Typography>
        <List>
          {productos.map((producto, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText
                primary={`${producto.nombre} - ${producto.cantidadVendida} unidades vendidas`}
                secondary={`Total: $${(producto.precio * producto.cantidadVendida).toFixed(2)}`}
              />
              <Box>
                <IconButton onClick={() => handleEditarProducto(producto)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleEliminarProducto(producto.id)} color="secondary">
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Mostrar el total de las transacciones */}
        <Typography variant="h6" gutterBottom>
          Total de Transacciones
        </Typography>
        <Typography variant="body1">Total en Efectivo (USD): ${totalDolares.toFixed(2)}</Typography>
        <Typography variant="body1">Total en Bolívares (VES): {totalBolivares.toFixed(2)} Bs.</Typography>

        {/* Sección para agregar o editar productos */}
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            {productoEditando ? 'Editar Producto' : 'Agregar Producto'}
          </Typography>
          <TextField
            label="Nombre del Producto"
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Precio del Producto"
            type="number"
            value={nuevoProducto.precio}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleAgregarProducto}>
            {productoEditando ? 'Guardar Cambios' : 'Agregar Producto'}
          </Button>
        </Box>

        {/* Sección para configurar la tasa de cambio */}
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Tasa de Cambio
          </Typography>
          <TextField
            label="Tasa de Cambio (USD a VES)"
            type="number"
            value={tasaCambio}
            onChange={(e) => setTasaCambioPersistente(parseFloat(e.target.value))}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="secondary" fullWidth onClick={calcularTotales}>
            Calcular Totales
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Administrador