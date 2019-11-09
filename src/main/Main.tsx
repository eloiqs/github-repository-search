import React from 'react';
import { Column, Row } from '../layout';
import { PersonalAccessToken } from '../personal-access-token/PersonalAccessToken';
import { CreatedAt, Languages } from '../search-criteria';
import { SearchResults } from '../search-results/SearchResults';

export function Main() {
  return (
    <Column width="100%">
      <Row
        marginBottom="32px"
        background="orangeTint"
        paddingY="16px"
        justifyContent="center"
      >
        <PersonalAccessToken />
      </Row>
      <Row>
        <Column width="1032px" margin="auto">
          <Row marginBottom="32px" paddingX="16px" justifyContent="flex-end">
            <Column marginRight="16px">
              <Languages />
            </Column>
            <Column>
              <CreatedAt />
            </Column>
          </Row>
          <Row flexWrap="wrap" justifyContent="center">
            <SearchResults />
          </Row>
        </Column>
      </Row>
    </Column>
  );
}
