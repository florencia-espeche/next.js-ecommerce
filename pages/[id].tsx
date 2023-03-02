import type { NextPage } from 'next';
import { NextRouter, withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getProductById } from './services/productServise';
import { getStockPrice } from './services/stockPriceService';
import Product from '../components/Product';
import _ from 'lodash';

interface StoreProps {
  router: NextRouter;
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

const Store: NextPage<StoreProps> = ({ router }) => {
  const productCode = router.query.id.split('-')[0];

  const [product, setProduct] = useState({});
  const [infoProduct, setInfoProduct] = useState({});
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const getProduct = async (id) => {
      const product = await getProductById(id);
      setProduct(product);
    };
    getProduct(productCode);
  }, [productCode]);

  useEffect(() => {
    const getStockPrices = async (skuCode) => getStockPrice(skuCode);
    const interval = setInterval(async () => {
      if (product) {
        // for each SKU, one network call
        // this can be done using a better way
        if (product && product.skus) {
          product.skus.forEach(async (sku) => {
            // get ONE stock and price, for ONE sku
            const stockPrice = await getStockPrices(sku.code);
            setProduct((product) => {
              // clone from lodash
              const updatedProduct = _.clone(product);
              const productSku = updatedProduct.skus.find(
                (_sku) => _sku.code === sku.code
              );
              if (stockPrice && productSku) {
                productSku.price = stockPrice.price;
                setStock(stockPrice.stock);
                setPrice((parseFloat(stockPrice.price) / 100).toFixed(2));
                productSku.stock = stockPrice.stock;
              }

              setInfoProduct(updatedProduct);
              return updatedProduct;
            });
          });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [product?.id]);

  return (
    <Main>
      <Product
        abv={infoProduct.abv}
        brand={infoProduct.brand}
        image={infoProduct.image}
        name={infoProduct.name}
        origin={infoProduct.origins}
        information={infoProduct.informations}
        stock={stock}
        price={price}
        style={infoProduct.styles}
        substyle={infoProduct.substyle}
      />
      <Link href='/'>Volver a Home</Link>
    </Main>
  );
};

export default withRouter(Store);
