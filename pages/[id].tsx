import { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import Product from '../components/Product';
import { getProductById } from './services/productServise';
import { getStockPrice } from './services/stockPriceService';

interface Sku {
  code: string;
  price: number;
  stock: number;
}

interface Product {
  abv: string;
  brand: string;
  image: string;
  name: string;
  origins: string;
  informations: string;
  skus: Sku[];
  styles: string;
  substyle: string;
}

interface StoreProps {
  product: Product;
}
const Main = styled.main`
  display: flex;
  flex: 1;
  margin: auto 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Store: NextPage<StoreProps> = ({ product }) => {
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const sku = product.skus[0];
    const getStockPriceAsync = async () => {
      const stockPrice = await getStockPrice(sku.code);
      if (stockPrice) {
        setStock(stockPrice.stock);
        setPrice(stockPrice.price / 100);
      }
    };
    getStockPriceAsync();
  }, [product]);

  return (
    <Main>
      <Product
        abv={product.abv}
        brand={product.brand}
        image={product.image}
        name={product.name}
        origin={product.origins}
        information={product.informations}
        stock={stock}
        price={price}
        style={product.styles}
        substyle={product.substyle}
      />
      <Link href='/'>Volver a Home</Link>
    </Main>
  );
};

export default Store;

export const getServerSideProps: GetServerSideProps<StoreProps> = async (
  context
) => {
  const { id } = context.query;
  const productCode = Array.isArray(id)
    ? id[0].split('-')[0]
    : id.split('-')[0];
  const product = await getProductById(productCode);
  return {
    props: { product },
  };
};
