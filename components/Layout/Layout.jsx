import React from 'react';
import Head from 'next/head';
import {
  AppBar,
  Container,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';

import useStyles from '../../utils/style';
import { theme } from '../../utils/theme';
import { ThemeProvider } from '@material-ui/core/styles';

const Layout = ({ children, title, description }) => {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Amazona` : 'Amazona'}</title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static' className={classes.navbar}>
          <Toolbar>
            <NextLink href='/' passHref>
              <Link>
                <Typography className={classes.brand}>Amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <NextLink href='/cart' passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href='/login' passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>

        <Container className={classes.main}>{children}</Container>

        <footer className={classes.footer}>
          <Typography>All Rights Reserved. Amazona</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
