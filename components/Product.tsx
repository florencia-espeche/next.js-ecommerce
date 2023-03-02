import React from 'react';
import styled from 'styled-components';

interface ProductProps {
  abv?: string;
  brand: string;
  image: string;
  information?: string;
  name?: string;
  origin?: string;
  price?: number;
  stock?: number;
  style?: string;
  substyle?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 200px;
  margin: 5px 0;
  gap: 5px;
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Image = styled.img`
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
`;

const Name = styled.h2`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #333;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

const Product: React.FC<ProductProps> = ({
  brand,
  image,
  price,
  abv,
  name,
  origin,
  information,
  stock,
  style,
  substyle,
}) => {
  return (
    <Wrapper>
      <Image src={image} alt={brand} />
      <Name>{brand}</Name>
      {stock && <span>Stock:{stock}</span>}
      {price && <Price>Price: ${price}</Price>}
      {abv && <span>Abv: {abv}</span>}
      {name && <span>Name: {name}</span>}
      {origin && <span>Origin: {origin}</span>}
      {information && <span>{information}</span>}
      {style && <span>{style}</span>}
      {substyle && <span>{substyle}</span>}
    </Wrapper>
  );
};

export default Product;
