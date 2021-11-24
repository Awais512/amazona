import React, { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Typography,
  Button,
  List,
  ListItem,
  TextField,
  Link,
} from '@material-ui/core';
import useStyles from '../utils/style';
import axios from 'axios';
import { Store } from '../utils/store';
import Cookies from 'js-cookie';

const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      console.log(Cookies.set('userInfo', JSON.stringify(data)));
      router.push(redirect || '/');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
      console.log(err.message);
    }
  };
  return (
    <Layout title='Login'>
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component='h1' variant='h1'>
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant='outlined'
              fullWidth
              id='email'
              label='Email'
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant='outlined'
              fullWidth
              id='password'
              label='Password'
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant='contained' type='submit' fullWidth color='primary'>
              Login
            </Button>
          </ListItem>
          <ListItem>
            Do n0t have an account? &nbsp;
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link>Register Here</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Login;
