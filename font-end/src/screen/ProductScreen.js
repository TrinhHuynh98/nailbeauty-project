import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Chip,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
// import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function ProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  const addToCartHander = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <Helmet>
        <title>Product Detail</title>
      </Helmet>
      <Header />
      <>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <Messagebox>{error}</Messagebox>
        ) : (
          <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
                <img
                  className="img-large"
                  src={product.image}
                  alt={product.name}
                ></img>
              </Grid>
              <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
                <h1>{product.name}</h1>

                <Rating rating={product.rating} numViews={product.numReviews} />

                <p>Price: ${product.price}</p>
              </Grid>

              <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Price: ${product.price}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        Status:{' '}
                        {product.countInStock > 0 ? (
                          <Chip label="In Stock" color="success" />
                        ) : (
                          <Chip label="Unavialable" color="primary" />
                        )}
                      </Typography>
                      {product.countInStock > 0 && (
                        <>
                          <InputLabel id="demo-simple-select-label">
                            Qty
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={qty}
                            label="Qty"
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </>
                      )}
                    </CardContent>
                  </CardActionArea>

                  {product.countInStock > 0 && (
                    <Button size="small" onClick={addToCartHander}>
                      Add to card
                    </Button>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </>

      <Footer />
    </div>
  );
}

// export default ProductScreen;
