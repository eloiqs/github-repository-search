import React from 'react';
import { Column, Row } from '../layout';
import { PersonalAccessToken } from '../personal-access-token/PersonalAccessToken';
import { Languages } from '../search-criteria/Languages';
import { SearchResults } from '../search-results/SearchResults';

export function Main() {
  return (
    <Column>
      <Row
        background="orangeTint"
        paddingBottom="16px"
        paddingTop="16px"
        justifyContent="center"
      >
        <PersonalAccessToken />
      </Row>
      <Row padding={16} justifyContent="flex-end">
        <Column>
          <Languages />
        </Column>
      </Row>
      <SearchResults />
    </Column>
  );
}
