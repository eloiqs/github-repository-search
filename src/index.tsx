import React from 'react';
import { render } from 'react-dom';
import { Header } from './header';
import { Main } from './main/Main';
import './styles.css';
import { Column, Row } from './ui';

function Index() {
  return (
    <Column>
      <Header />
      <Row>
        <Main />
      </Row>
    </Column>
  );
}

const rootElement = document.getElementById('root');
render(<Index />, rootElement);
