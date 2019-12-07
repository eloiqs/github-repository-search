import moment from 'moment';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useLanguages } from '../search-criteria';
import { TimeRange } from '../time';
import {
  Card,
  CardProps,
  Column,
  defaultTheme,
  FadeText,
  Heading,
  Icon,
  Image,
  Link,
  Row,
  Text
} from '../ui';
import { Repo } from './repo';

export function RepoCard({ children, ...props }: CardProps) {
  return (
    <Card
      width={312}
      height={264}
      marginBottom={32}
      elevation={2}
      background="tint1"
      padding={16}
      {...props}
    >
      {children}
    </Card>
  );
}

type RepoCardContentProps = {
  repo: Repo;
  timeRange: TimeRange;
};

export function RepoCardContent({ repo, timeRange }: RepoCardContentProps) {
  const { languages } = useLanguages();

  let languageColor: string | undefined;
  if (repo.languageColor) {
    languageColor = repo.languageColor;
  } else {
    const language = languages.find(
      language => language.name === repo.language
    );
    languageColor = language && language.color;
  }

  return (
    <Column justifyContent="space-between">
      <Row alignItems="center">
        <Card
          marginRight={8}
          minWidth={32}
          width={32}
          height={32}
          overflow="hidden"
        >
          <Image width={32} height={32} src={repo.owner.avatarUrl} />
        </Card>
        <Column justifyContent="center" grow>
          <Link href={repo.owner.url} color="neutral" textDecoration="none">
            <Row>
              <Heading size={400}>{repo.owner.name}</Heading>
            </Row>
            <Row>
              <Text>View Profile</Text>
            </Row>
          </Link>
        </Column>
        {repo.currentPeriodStars && (
          <Column>
            <Row alignItems="center">
              <Icon icon="star" size={12} color="default" paddingRight={4} />
              <Column>
                <Text fontSize={12}>
                  {`${repo.currentPeriodStars} stars ${
                    timeRange.increments === 'day'
                      ? 'today'
                      : `this ${timeRange.increments}`
                  }`}
                </Text>
              </Column>
            </Row>
          </Column>
        )}
      </Row>
      <Row>
        <Column>
          <Row>
            <Column>
              <Row>
                <Link href={repo.url} textDecoration="none">
                  <Heading size={500} color="default">
                    {repo.name}
                  </Heading>
                </Link>
              </Row>
              <Row paddingBottom={12}>
                <Text size={300} color="muted">
                  Built by ·{' '}
                  <Link
                    href={repo.owner.url}
                    color="neutral"
                    textDecoration="none"
                  >
                    {repo.owner.name}
                  </Link>
                  {repo.createdAt && (
                    <> · {moment(repo.createdAt).format('MMM D, YYYY')}</>
                  )}
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
      <Row>
        <Column paddingRight={12}>
          <Row alignItems="center">
            {languageColor && (
              <Icon icon="full-circle" color={languageColor} paddingRight={4} />
            )}
            <Text>{repo.language}</Text>
          </Row>
        </Column>
        <Column paddingRight={12}>
          <Link
            href={`${repo.url}/stargazers`}
            color="neutral"
            textDecoration="none"
          >
            <Row>
              <Column paddingRight={4}>
                <Icon icon="star-empty" color="default" />
              </Column>
              <Column>
                <Text>{repo.stars}</Text>
              </Column>
            </Row>
          </Link>
        </Column>
        <Column paddingRight={12}>
          <Link
            href={`${repo.url}/network/members`}
            color="neutral"
            textDecoration="none"
          >
            <Row>
              <Column paddingRight={4}>
                <Icon icon="fork" color="default" />
              </Column>
              <Column>
                <Text>{repo.forks}</Text>
              </Column>
            </Row>
          </Link>
        </Column>
        {repo.issues && (
          <Column>
            <Link
              href={`${repo.url}/issues`}
              color="neutral"
              textDecoration="none"
            >
              <Row>
                <Column paddingRight={4}>
                  <Icon icon="issue" color="default" />
                </Column>
                <Column>
                  <Text>{repo.issues}</Text>
                </Column>
              </Row>
            </Link>
          </Column>
        )}
      </Row>
    </Column>
  );
}

export function RepoCardLoader() {
  return (
    <ContentLoader
      height={232}
      width={280}
      speed={1}
      primaryColor="#e8eaef"
      secondaryColor={defaultTheme.colors.background.tint2}
      ariaLabel="Repo loading..."
    >
      <rect x="40" y="4" rx="4" ry="4" width="140" height="12" />
      <rect x="40" y="24" rx="4" ry="4" width="120" height="10" />
      <rect x="0" y="72" rx="4" ry="4" width="100" height="12" />
      <rect x="0" y="91" rx="4" ry="4" width="200" height="10" />
      <rect x="0" y="118" rx="4" ry="4" width="280" height="56" />
      <rect x="0" y="220" rx="4" ry="4" width="260" height="12" />
      <rect x="0" y="4" rx="4" ry="4" width="32" height="32" />
    </ContentLoader>
  );
}
