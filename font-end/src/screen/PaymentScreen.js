import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import CheckoutStep from '../components/CheckoutStep';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartAction';

export default function PaymentScreen() {
  const [paymentMethodName, setPaymentMethodName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate('/shipping');
  }

  const paymentMethodHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodName));
    navigate('/placeorder');
  };

  return (
    <div>
      <Helmet>
        <title>Payment Methods</title>
      </Helmet>
      <CheckoutStep />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '30vh' }}
      >
        <Typography component="h1" variant="h5" style={{ marginTop: 20 }}>
          Shipping
        </Typography>

        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Payment method
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={paymentMethodName}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          >
            <FormControlLabel
              value="PayPal"
              control={<Radio />}
              label="PayPal"
            />
            <FormControlLabel
              value="Strike"
              control={<Radio />}
              label="Strike"
            />
          </RadioGroup>
          <Button variant="outlined" onClick={paymentMethodHandler}>
            Continue
          </Button>
        </FormControl>
      </Grid>
    </div>
  );
}
