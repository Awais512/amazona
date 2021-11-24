import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../utils/store';
import Layout from '../components/Layout/Layout';

const Shipping = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  if (!userInfo) {
    router.push('/login?redirect=/shipping');
  }
  return <div>Shipping</div>;
};

export default Shipping;
