import data from '../api/stock-price';
async function getStockPrice(skuCode) {
  if (skuCode && !isNaN(skuCode)) {
    return data[skuCode];
  }
}

export { getStockPrice };
