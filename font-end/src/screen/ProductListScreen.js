import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  deletedProduct,
  listProducts,
} from '../actions/productActions';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { Button } from '@mui/material';
// import {
//     Button,
//     TextField,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//   } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';

export default function ProductListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  //   const [open, setOpen] = React.useState(false);
  //   const handleClickOpen = (product) => {
  //     setOpen(true);
  //     dispatch(detailsProduct(product._id));
  //   };
  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: productDeleteLoading,
    error: productDeleteError,
    success: productDeleteSuccess,
  } = productDelete;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if (productDeleteSuccess) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, navigate, successCreate, productDeleteSuccess]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deletedProduct(product._id));
    }
  };

  return (
    <div>
      <Helmet>Product List</Helmet>
      <Header />
      {productDeleteLoading && <LoadingBox></LoadingBox>}
      {productDeleteError && <Messagebox>{productDeleteError}</Messagebox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <Messagebox>{errorCreate}</Messagebox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <>
          <div
            style={{ display: 'flex-end' }}
            onClick={() => createProductHandler()}
          >
            <Button> Create Product</Button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      onClick={() => navigate(`/product/${product._id}/edit`)}
                    >
                      Edit
                    </Button>

                    <Button onClick={() => deleteHandler(product)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={productDetail.name}
              />
              <TextField
                autoFocus
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={productDetail.price}
              />
              <TextField
                autoFocus
                margin="dense"
                id="img"
                label="Image"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="category"
                label="Category"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={productDetail.category}
              />

              <TextField
                autoFocus
                margin="dense"
                id="brand"
                label="Brand"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={productDetail.brand}
              />

              <TextField
                autoFocus
                margin="dense"
                id="count"
                label="Count in stock"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={productDetail.countInStock}
              />
              <TextField
                id="outlined-textarea"
                label="Description"
                placeholder="description"
                multiline
                variant="standard"
                fullWidth
                defaultValue={productDetail.description}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Update</Button>
            </DialogActions>
          </Dialog> */}
        </>
      )}

      <Footer />
    </div>
  );
}
