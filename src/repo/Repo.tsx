import { SearchReposResponseItemsItem } from '@octokit/rest';
import {
  Card,
  CardProps,
  Heading,
  Image,
  Link,
  Text,
  Icon
} from 'evergreen-ui';
import moment from 'moment';
import React from 'react';
import { Column, FadeText, Row } from '../layout';

export type RepoProps = {
  repo: SearchReposResponseItemsItem;
} & CardProps;

export function Repo({ repo, ...props }: RepoProps) {
  return (
    <Card
      width="312px"
      height="264px"
      marginRight="8px"
      marginLeft="8px"
      marginBottom="32px"
      elevation={2}
      background="tint2"
      padding="16px"
      {...props}
    >
      <Column justifyContent="space-between">
        <Header repo={repo} />
        <Body repo={repo} />
        <Footer repo={repo} />
      </Column>
    </Card>
  );
}

function Header({ repo: { owner } }: RepoProps) {
  return (
    <Row alignItems="center">
      <Card
        marginRight="8px"
        minWidth="32px"
        width="32px"
        height="32px"
        overflow="hidden"
      >
        <Image width="32px" height="32px" src={owner.avatar_url} />
      </Card>
      <Column justifyContent="center">
        <Link
          href={(owner as any).html_url}
          color="neutral"
          textDecoration="none"
        >
          <Row>
            <Heading size={400}>{owner.login}</Heading>
          </Row>
          <Row>
            <Text>View Profile</Text>
          </Row>
        </Link>
      </Column>
    </Row>
  );
}

function Body({ repo }: RepoProps) {
  return (
    <Row>
      <Column>
        <Row>
          <Column>
            <Row>
              <Link href={repo.html_url} textDecoration="none">
                <Heading size={500} color="default">
                  {repo.name}
                </Heading>
              </Link>
            </Row>
            <Row paddingBottom="12px">
              <Text size={300} color="muted">
                Built by ·{' '}
                <Link
                  href={(repo.owner as any).html_url}
                  color="neutral"
                  textDecoration="none"
                >
                  {repo.owner.login}
                </Link>{' '}
                · {moment(repo.created_at).format('MMM D, YYYY')}
              </Text>
            </Row>
          </Column>
          <Column />
        </Row>
        <Row height="56px">
          <FadeText>{repo.description}</FadeText>
        </Row>
      </Column>
    </Row>
  );
}

function Footer({ repo }: RepoProps) {
  return (
    <Row>
      <Column paddingRight="12px">
        <Text>{repo.language}</Text>
      </Column>
      <Column paddingRight="12px">
        <Link
          href={`${repo.html_url}/stargazers`}
          color="neutral"
          textDecoration="none"
        >
          <Row>
            <Column paddingRight="4px">
              <Icon icon="star-empty" color="default" />
            </Column>
            <Column>
              <Text>{repo.stargazers_count}</Text>
            </Column>
          </Row>
        </Link>
      </Column>
      <Column paddingRight="12px">
        <Link
          href={`${repo.html_url}/network/members`}
          color="neutral"
          textDecoration="none"
        >
          <Row>
            <Column paddingRight="4px">
              <Icon icon="fork" color="default" />
            </Column>
            <Column>
              <Text>{repo.forks_count}</Text>
            </Column>
          </Row>
        </Link>
      </Column>
      <Column>
        <Link
          href={`${repo.html_url}/issues`}
          color="neutral"
          textDecoration="none"
        >
          <Row>
            <Column paddingRight="4px">
              <Icon icon="issue" color="default" />
            </Column>
            <Column>
              <Text>{repo.open_issues_count}</Text>
            </Column>
          </Row>
        </Link>
      </Column>
    </Row>
  );
}
