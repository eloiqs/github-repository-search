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
      width={312}
      height={264}
      marginBottom={32}
      elevation={2}
      background="tint2"
      padding={16}
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
        marginRight={8}
        minWidth={32}
        width={32}
        height={32}
        overflow="hidden"
      >
        <Image width={32} height={32} src={owner.avatar_url} />
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
            <Row paddingBottom={12}>
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
        <Row height={56}>
          <FadeText>{repo.description}</FadeText>
        </Row>
      </Column>
    </Row>
  );
}

function Footer({ repo }: RepoProps) {
  return (
    <Row>
      <Column paddingRight={12}>
        <Text>{repo.language}</Text>
      </Column>
      <Column paddingRight={12}>
        <Link
          href={`${repo.html_url}/stargazers`}
          color="neutral"
          textDecoration="none"
        >
          <Row>
            <Column paddingRight={4}>
              <Icon icon="star-empty" color="default" />
            </Column>
            <Column>
              <Text>{repo.stargazers_count}</Text>
            </Column>
          </Row>
        </Link>
      </Column>
      <Column paddingRight={12}>
        <Link
          href={`${repo.html_url}/network/members`}
          color="neutral"
          textDecoration="none"
        >
          <Row>
            <Column paddingRight={4}>
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
            <Column paddingRight={4}>
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
