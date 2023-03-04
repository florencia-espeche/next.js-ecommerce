import data from '../api/stock-price';

async function getStockPrice(skuCode: number): Promise<number | undefined> {
  if (skuCode && !isNaN(skuCode)) {
    return data[skuCode];
  }
}

export { getStockPrice };
