import React from 'react';
import { PersonalAccessToken } from '../personal-access-token';
import { InfiniteSearch } from '../search';
import {
  Button,
  Column,
  defaultTheme,
  GithubIcon,
  Heading,
  Row,
  Text
} from '../ui';

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
        <Column paddingRight={16} grow>
          <Heading size={700} color="white">
            Gihtub Repository Search
          </Heading>
        </Column>
        <Column>
          <Button
            is="a"
            href="https://github.com/eloiqs/github-repository-search"
            target="_blank"
            appearance="minimal"
            iconBefore={
              (
                <GithubIcon
                  color="white"
                  width="16px"
                  style={{ marginRight: 8, marginLeft: -3 }}
                />
              ) as any
            }
          >
            <Text color="white">View Source</Text>
          </Button>
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
            <InfiniteSearch />
          </Row>
        </Column>
      </Row>
    </Column>
  );
}
