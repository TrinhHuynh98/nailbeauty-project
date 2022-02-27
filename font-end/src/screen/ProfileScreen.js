import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import {
  FormControl,
  TextField,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import Header from '../components/Layout/Header';
import Messagebox from '../components/Messagebox';

export default function ProfileScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdate;

  useEffect(() => {
    if (!user) {
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password and ConfirmPassword are not matched');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <div>
      <Helmet>
        <title>User Details</title>
      </Helmet>
      <Header />
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <Messagebox>{error}</Messagebox>}
          {successUpdate && (
            <Messagebox>Profile Update Successfully</Messagebox>
          )}
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '30vh' }}
          >
            <Typography component="h1" variant="h5" style={{ marginTop: 20 }}>
              {user.name}
            </Typography>
            <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
              <TextField
                required
                id="standard-required"
                label="Name"
                defaultValue={user.name}
                variant="standard"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
              <TextField
                required
                id="standard-required"
                label="Email"
                defaultValue={user.email}
                variant="standard"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
              <TextField
                id="standard-password-input"
                label="ConFirm Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </FormControl>
            <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
              <Button variant="outlined" onClick={submitHandler}>
                Update
              </Button>
            </FormControl>
          </Grid>
        </>
      )}
    </div>
  );
}
