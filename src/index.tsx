import { Heading, defaultTheme } from 'evergreen-ui';
import React from 'react';
import { render } from 'react-dom';
import { Column, Row } from './layout';
import { Main } from './main/Main';
import './styles.css';

function Index() {
  return (
    <Column>
      <Row
        elevation={1}
        backgroundColor={defaultTheme.palette.blue.base}
        paddingLeft="8px"
        paddingRight="8px"
        minHeight="64px"
        alignItems="center"
      >
        <Heading size={700} color="white">
          Gihtub Repository Search
        </Heading>
      </Row>
      <Row>
        <Main />
      </Row>
    </Column>
  );
}

const rootElement = document.getElementById('root');
render(<Index />, rootElement);
