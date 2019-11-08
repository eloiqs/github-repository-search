import React from 'react';
import { Column, Row } from '../layout';
import { PersonalAccessToken } from '../personal-access-token/PersonalAccessToken';
import { Languages } from '../search-criteria/Languages';
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
            <Languages />
          </Row>
          <Row flexWrap="wrap" justifyContent="center">
            <SearchResults />
          </Row>
        </Column>
      </Row>
    </Column>
  );
}
