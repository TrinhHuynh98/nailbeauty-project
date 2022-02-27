import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Button,
  FormControl,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  if (!cart.paymentMethod) {
    navigate('/payment');
  }

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success, navigate, order]);

  return (
    <div>
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <Header />
      <h1>Place Order</h1>
      <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={8} sm={8} md={8} style={{ marginTop: 20 }}>
            <Card sx={{ maxWidth: 345 }}>
              <Typography gutterBottom variant="h5" component="div">
                Shipping
              </Typography>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Name: {cart.shippingAddress.fullName}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Adress: {cart.shippingAddress.address},{' '}
                    {cart.shippingAddress.city} ,
                    {cart.shippingAddress.postalCode},{' '}
                    {cart.shippingAddress.country}
                  </Typography>
                  <Link to="/shipping">Edit</Link>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <Typography gutterBottom variant="h5" component="div">
                Cart Items
              </Typography>
              <CardActionArea>
                <CardContent>
                  {cart.cartItems.map((item) => (
                    <Grid container spacing={{ md: 3 }}>
                      <Grid item xs={6} sm={6} md={6}>
                        <Link to={`/product/${item.slug}`}>
                          <span>
                            <Avatar
                              sx={{ width: 100, height: 100 }}
                              src={item.image}
                              alt={item.name}
                            />
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {item.name}
                            </Typography>
                          </span>
                        </Link>
                      </Grid>

                      <Grid item xs={6} sm={6} md={6}>
                        <Typography gutterBottom variant="h5" component="div">
                          Price: $ {item.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}

                  <Link to="/cart">Edit</Link>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
            <Typography gutterBottom variant="h5" component="div">
              Order Summary
            </Typography>
            <Card sx={{ maxWidth: 345 }}>
              <Typography gutterBottom variant="h5" component="div">
                Items
              </Typography>
              <CardActionArea>
                <CardContent>
                  <Grid container spacing={{ md: 3 }}>
                    <Grid item xs={6} sm={6} md={6}>
                      Items
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                      ${cart.itemsPrice}
                    </Grid>
                  </Grid>
                  <Grid container spacing={{ md: 3 }}>
                    <Grid item xs={6} sm={6} md={6}>
                      Shipping
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                      ${cart.shippingPrice}
                    </Grid>
                  </Grid>
                  <Grid container spacing={{ md: 3 }}>
                    <Grid item xs={6} sm={6} md={6}>
                      Tax
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                      ${cart.taxPrice}
                    </Grid>
                  </Grid>
                  <Grid container spacing={{ md: 3 }}>
                    <Grid item xs={6} sm={6} md={6}>
                      Order Total
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                      ${cart.totalPrice}
                    </Grid>
                  </Grid>
                  <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
                    <Button
                      variant="outlined"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <Messagebox>{error}</Messagebox>}
                  </FormControl>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
