import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import db from '../utils/db';

import NextLink from 'next/link';
import Layout from '../components/Layout/Layout';

import Product from '../models/Product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Store } from '../utils/store';
import Rating from '@material-ui/lab/Rating';

export default function Home({ products }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const addToCart = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is Out of Stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                    <List>
                      <ListItem>
                        <Rating value={product.rating} readOnly></Rating>
                        <Link href='#reviews'>
                          <Typography>
                            ({product.numReviews} reviews)
                          </Typography>
                        </Link>
                      </ListItem>
                    </List>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button
                  size='small'
                  color='primary'
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, '-reviews').lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
