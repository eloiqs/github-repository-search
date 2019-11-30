import React from 'react';
import { PersonalAccessToken } from '../personal-access-token';
import { InfiniteSearch } from '../search';
import { Column, defaultTheme, Heading, Link, Row, Text } from '../ui';

export function App() {
  return (
    <Column>
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
      <Row>
        <Column width="100%">
          <Row
            marginBottom={32}
            background="orangeTint"
            paddingY={8}
            justifyContent="center"
          >
            <PersonalAccessToken />
          </Row>
          <Row>
            <Column width={1032} margin="auto">
              <InfiniteSearch />
            </Column>
          </Row>
        </Column>
      </Row>
    </Column>
  );
}
