import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FormControl,
  TextField,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import CheckoutStep from '../components/CheckoutStep';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAdresss } from '../actions/cartAction';
import { useNavigate } from 'react-router-dom';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { userInfo } = userSignin;
  if (!userInfo) {
    navigate('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const shippingHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAdresss({ fullName, address, city, postalCode, country })
    );
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>Shipping Adresss</Helmet>
      <Header />
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
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="Full Name"
            defaultValue={fullName}
            variant="outlined"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="Adress"
            defaultValue={address}
            variant="outlined"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="City"
            defaultValue={city}
            variant="outlined"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="Postal Code"
            defaultValue={postalCode}
            variant="outlined"
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="Country"
            defaultValue={country}
            variant="outlined"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </FormControl>
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <Button variant="outlined" onClick={shippingHandler}>
            Continue
          </Button>
        </FormControl>
      </Grid>
      <Footer />
    </div>
  );
}
