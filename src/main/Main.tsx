import React from 'react';
import { Column, Row } from '../layout';
import { PersonalAccessToken } from '../personal-access-token';
import { ExpandableSearch } from '../search';

export function Main() {
  return (
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
          <ExpandableSearch />
        </Column>
      </Row>
    </Column>
  );
}
