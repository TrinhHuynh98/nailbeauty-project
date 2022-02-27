import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction.js';
import Header from '../components/Layout/Header.js';
import Footer from '../components/Layout/Footer.js';
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/Messagebox';

export default function CartScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Header />
      <h1>Cart Screen</h1>
      <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={8} sm={8} md={8} style={{ marginTop: 20 }}>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </MessageBox>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <Grid container spacing={{ md: 3 }}>
                    <Grid key={item.product} item xs={3} sm={3} md={3}>
                      <Link to={`/product/${item.product}`}>
                        <span>
                          <Avatar
                            sx={{ width: 100, height: 100 }}
                            src={item.image}
                            alt={item.name}
                          />
                          <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                          </Typography>
                        </span>
                      </Link>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <>
                        <InputLabel id="demo-simple-select-label">
                          Qty
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={item.qty}
                          label="Qty"
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <Typography gutterBottom variant="h5" component="div">
                        Price: $ {item.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2}>
                      <Button onClick={() => removeItemHandler(item.product)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </ul>
            )}
          </Grid>

          <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <Button
                disabled={cartItems.length === 0}
                size="small"
                onClick={() => checkoutHandler()}
              >
                Process to Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}
