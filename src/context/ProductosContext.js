import React, { createContext, useState, useContext } from 'react';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [tasaCambio, setTasaCambio] = useState(30); // Valor inicial de la tasa de cambio

  const agregarProducto = (producto) => {
    setProductos((prev) => [...prev, producto]);
  };

  const modificarProducto = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((producto) =>
        producto.id === productoActualizado.id ? productoActualizado : producto
      )
    );
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((producto) => producto.id !== id));
  };

  return (
    <ProductosContext.Provider
      value={{ productos, agregarProducto, modificarProducto, eliminarProducto, tasaCambio, setTasaCambio }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}