import type { NextPage } from 'next';
import { NextRouter, withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getProductById } from './services/productServise';
import { getStockPrice } from './services/stockPriceService';
import _ from 'lodash';

interface StoreProps {
  router: NextRouter;
}

// interface Sku {
//   code: string;
//   name: string;
//   price?: number;
//   stock?: number;
// }

// type Store = {
//   id: number;
//   brand: string;
//   image: string;
//   skus: Sku[];
//   abv: string;
//   information: string;
//   origin: string;
//   style: string;
//   substyle: string;
// };

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
  // console.log({ productCode });

  const [product, setProduct] = useState({});
  const [infoProduct, setInfoProduct] = useState({});
  const [stock, setStock] = useState([]);
  const [price, setPrice] = useState('');

  // useEffect(() => {
  //   const getProduct = async (id) => getProductById(id);
  //   getProduct(productCode).then((product) => {
  //     // console.log('PRODUCT', product);

  //     setProduct(product);
  //   });
  // }, [productCode]);

  useEffect(() => {
    const getProduct = async (id) => {
      const product = await getProductById(id);
      setProduct(product);
    };
    getProduct(productCode);
  }, [productCode]);

  // useEffect(() => {
  //   const getStockPrices = async (skuCode) => getStockPrice(skuCode);
  //   if (product) {
  //     console.log('PRODUCT 2', product);
  //     // for each SKU, one network call
  //     // this can be done using a better way
  //     product.skus.forEach(async (sku) => {
  //       // get ONE stock and price, for ONE sku
  //       const stockPrice = await getStockPrices(sku.code);
  //       setProduct((product) => {
  //         // clone from lodash
  //         const updatedProduct = _.clone(product);
  //         const productSku = updatedProduct.skus.find(
  //           (_sku) => _sku.code === sku.code
  //         );
  //         if (stockPrice && productSku) {
  //           productSku.price = stockPrice.price;
  //           console.log(stockPrice);
  //           productSku.stock = stockPrice.stock;
  //         }

  //         setInfoProduct(updatedProduct);
  //         return updatedProduct;
  //       });
  //     });
  //   }
  // }, [product?.id]);

  useEffect(() => {
    const getStockPrices = async (skuCode) => getStockPrice(skuCode);
    if (product) {
      console.log('PRODUCT 2', product);
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
              console.log(stockPrice);
              setStock(stockPrice.stock);
              setPrice(stockPrice.price);
              productSku.stock = stockPrice.stock;
            }

            setInfoProduct(updatedProduct);
            return updatedProduct;
          });
        });
      }
    }
  }, [product?.id]);

  return (
    <Main>
      <div>{infoProduct.id}</div>
      <div>{stock}</div>
      <div>${parseInt(price) / 100}</div>
      <Link href='/'>Volver a Home</Link>
    </Main>
  );
};

export default withRouter(Store);
