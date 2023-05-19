import type { NextPage } from 'next';
import { getProducts } from './services/productServise';
import styled from 'styled-components';
import Product from '../components/Product';
import Link from 'next/link';

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

type Item = {
  id: number;
  brand: string;
  image: string;
};

type PropsItems = {
  items: Item[];
};

const Home: NextPage<PropsItems> = ({ items }) => {
  return (
    <Main>
      {items &&
        items.map((item) => (
          <Link
            key={item.id}
            href={`/${item.id}-${item.brand
              .toLowerCase()
              .replace(/\s+/g, '-')}`}
          >
            <Product image={item.image} brand={item.brand} />
          </Link>
        ))}
    </Main>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await getProducts();
  return {
    props: {
      items: res,
    },
    revalidate: 10,
  };
}
