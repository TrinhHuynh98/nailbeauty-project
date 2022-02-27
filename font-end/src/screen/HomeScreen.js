import React, { useState, useEffect } from 'react';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import { Box, Grid } from '@mui/material';
import Products from '../components/Products';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/Messagebox';
import { Helmet } from 'react-helmet-async';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Amazone</title>
      </Helmet>
      <Header />
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {products.map((item) => (
              <Products key={item._id} product={item}></Products>
            ))}
          </Grid>
        </Box>
      )}

      <Footer />
    </div>
  );
}
