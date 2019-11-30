import React, { ChangeEvent, useState } from 'react';
import { Button, Column, Heading, Link, Popover, Row, TextInput } from '../ui';
import { usePersonalAccessToken } from './use-personal-access-token';

export function PersonalAccessToken() {
  return (
    <Popover content={({ close }) => <PopoverBody close={close} />}>
      <Button appearance="minimal">Add a personal access token</Button>
    </Popover>
  );
}

type PopoverBodyProps = { close(): void };

function PopoverBody({ close }: PopoverBodyProps) {
  const [
    persistedPersonalAccessToken,
    setPersistedPersonalAccessToken
  ] = usePersonalAccessToken();

  const [personalAccesToken, setPersonalAccessToken] = useState(
    persistedPersonalAccessToken
  );

  function onPersonalAccessTokenChange(evt: ChangeEvent<HTMLInputElement>) {
    setPersonalAccessToken(evt.target.value);
  }

  function onSaveClick() {
    setPersistedPersonalAccessToken(personalAccesToken);
    close();
  }

  return (
    <Column width={280} padding={16}>
      <Row paddingBottom={16}>
        <Heading>
          <Link target="_blank" href="https://github.com/settings/tokens">
            Generate a token
          </Link>{' '}
          and add it below to avoid hitting the rate limit.
        </Heading>
      </Row>
      <Row paddingBottom={16}>
        <TextInput
          value={personalAccesToken}
          onChange={onPersonalAccessTokenChange}
        />
      </Row>
      <Row paddingBottom={16} justifyContent="flex-end">
        <Button appearance="primary" intent="success" onClick={onSaveClick}>
          Save
        </Button>
      </Row>
    </Column>
  );
}
