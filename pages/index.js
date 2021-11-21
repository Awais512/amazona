import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Chip,
} from '@material-ui/core';

import data from '../utils/data';

export default function Home() {
  return (
    <div>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {data.products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              <CardActionArea>
                <CardMedia component='img' image={product.image} />
                <CardContent>
                  <Typography>{product.name}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button size='small' color='primary' variant='contained'>
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
