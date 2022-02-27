import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Rating from './Rating';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Products(props) {
  const { product } = props;

  return (
    <>
      <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <Link to={`/product/${product._id}`}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
              />
            </Link>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions>
            <Rating rating={product.rating} numViews={product.numReviews} />
          </CardActions>
          {product.countInStock === 0 ? (
            <Button disabled size="small">
              Out of stock
            </Button>
          ) : (
            <Button size="small">Add to card</Button>
          )}

          <Item></Item>
        </Card>
      </Grid>
    </>
  );
}

export default Products;
