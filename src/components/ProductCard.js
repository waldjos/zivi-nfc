import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const ProductCard = ({ product, onAdd, onRemove }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    onAdd(product);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onRemove(product);
    }
  };

  return (
    <Card sx={{ maxWidth: 300, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precio: ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Subtotal: ${product.price * quantity}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="space-between" alignItems="center">
          <Button size="small" variant="contained" color="primary" onClick={handleRemove} disabled={quantity === 0}>
            -
          </Button>
          <Typography variant="body1">{quantity}</Typography>
          <Button size="small" variant="contained" color="primary" onClick={handleAdd}>
            +
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;