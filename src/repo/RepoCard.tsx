import moment from 'moment';
import React from 'react';
import { useLanguages } from '../search-criteria';
import { TimeRange } from '../time';
import {
  Card,
  CardProps,
  Column,
  FadeText,
  Heading,
  Icon,
  Image,
  Link,
  Row,
  Text
} from '../ui';
import { Repo } from './repo';

export type RepoCardProps = {
  repo: Repo;
  timeRange: TimeRange;
} & CardProps;

export function RepoCard({ repo, timeRange, ...props }: RepoCardProps) {
  const [languages] = useLanguages();

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
                <Icon
                  icon="full-circle"
                  color={languageColor}
                  paddingRight={4}
                />
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
    </Card>
  );
}
