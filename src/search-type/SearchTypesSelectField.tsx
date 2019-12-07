import React from 'react';
import { SelectField } from '../ui';
import { SearchTypes, useSearchType } from './use-search-type';

export function SearchTypesSelectField() {
  const { searchType, setSearchType } = useSearchType();

  return (
    <SelectField
      label="Search type"
      value={searchType}
      onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
        setSearchType(evt.target.value as SearchTypes)
      }
      inputWidth={240}
    >
      <option value="most-starred">Most starred</option>
      <option value="trending">Trending</option>
    </SelectField>
  );
}
