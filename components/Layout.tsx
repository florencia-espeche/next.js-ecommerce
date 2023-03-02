import { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

type LayoutProps = {
  children: ReactNode;
};

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ccc;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 10px;
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  margin-top: auto;
`;

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <h1>Beer Store</h1>
        </Header>
        <Main>
          <Content>{children}</Content>
        </Main>
        <Footer>2023</Footer>
      </Container>
    </>
  );
};

export default Layout;
