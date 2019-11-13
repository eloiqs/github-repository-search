import { defaultTheme, Heading, Link, Text } from 'evergreen-ui';
import React from 'react';
import { Column, Row } from '../layout';

export function Header() {
  return (
    <Row
      elevation={1}
      backgroundColor={defaultTheme.palette.blue.base}
      paddingLeft="8px"
      paddingRight="8px"
      minHeight="64px"
      alignItems="center"
    >
      <Column paddingRight="16px">
        <Heading size={700} color="white">
          Gihtub Repository Search
        </Heading>
      </Column>
      <Column>
        <Link href="https://kamranahmed.info/githunt/">
          <Text size={500} color="white">
            – A shameless{' '}
            <Text textDecoration="underline" color="white">
              Githunt
            </Text>{' '}
            clone
          </Text>
        </Link>
      </Column>
    </Row>
  );
}
