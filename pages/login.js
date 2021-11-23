import React from 'react';
import Layout from '../components/Layout/Layout';
import NextLink from 'next/link';
import {
  Typography,
  Button,
  List,
  ListItem,
  TextField,
  Link,
} from '@material-ui/core';
import useStyles from '../utils/style';

const Login = () => {
  const classes = useStyles();
  return (
    <Layout title='Login'>
      <form className={classes.form}>
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
            />
          </ListItem>
          <ListItem>
            <TextField
              variant='outlined'
              fullWidth
              id='password'
              label='Password'
              inputProps={{ type: 'password' }}
            />
          </ListItem>
          <ListItem>
            <Button variant='contained' type='submit' fullWidth color='primary'>
              Login
            </Button>
          </ListItem>
          <ListItem>
            Do n0t have an account? &nbsp;
            <NextLink href='/register' passHref>
              <Link>Register Here</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Login;
