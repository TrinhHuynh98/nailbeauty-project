import React, { useState, useEffect } from 'react';
import {
  FormControl,
  TextField,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, signin } from '../actions/userActions';
import Header from '../components/Layout/Header';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password and confirm password not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Header />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '30vh' }}
      >
        <Typography component="h1" variant="h5" style={{ marginTop: 20 }}>
          Register
        </Typography>
        {loading && <LoadingBox></LoadingBox>}
        {error && <Messagebox>{error}</Messagebox>}
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            required
            id="standard-required"
            label="Name"
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
            label="Confirm Password"
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
            Register
          </Button>
        </FormControl>
        <Link to={`/signin?redirect=${redirect}`}>Already have an account</Link>
      </Grid>
    </>
  );
}
