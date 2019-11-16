import React from 'react';
import { Column, defaultTheme, Heading, Link, Row, Text } from '../ui';

export function Header() {
  return (
    <Row
      elevation={1}
      backgroundColor={defaultTheme.palette.blue.base}
      paddingX={8}
      minHeight={64}
      alignItems="center"
    >
      <Column paddingRight={16}>
        <Heading size={700} color="white">
          Gihtub Repository Search
        </Heading>
      </Column>
      <Column>
        <Link href="https://kamranahmed.info/githunt/" textDecoration="none">
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
