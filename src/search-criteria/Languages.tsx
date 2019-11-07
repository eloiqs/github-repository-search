import { Button, SelectMenu } from 'evergreen-ui';
import React, { useEffect, useState } from 'react';
import useSearchCriteria, { initialState } from './use-search-criteria';

const languages = require('./languages.json');

export function Languages() {
  const [selectedLanguages, setSelectedLanguages] = useState([] as string[]);
  const [searchCriteria, setSearchCriteria] = useSearchCriteria(initialState);

  useEffect(() => {
    setSearchCriteria({
      ...searchCriteria,
      languages: searchCriteria.languages.concat(selectedLanguages)
    });
  }, [selectedLanguages]);

  return (
    <SelectMenu
      isMultiSelect
      closeOnSelect
      title="Filter languages"
      options={languages}
      selected={selectedLanguages}
      onSelect={item => {
        const selected = [...selectedLanguages, item.value] as string[];
        setSearchCriteria(criteria => {
          console.log(criteria);
          return {
            ...criteria,
            languages: criteria.languages.concat(item.value as string)
          };
        });
        setSelectedLanguages(selected);
      }}
      onDeselect={item => {
        const deselectedItemIndex = selectedLanguages.indexOf(
          item.value as string
        );
        const selectedItems = selectedLanguages.filter(
          (_item, i) => i !== deselectedItemIndex
        );
        setSelectedLanguages(selectedItems);
      }}
    >
      <Button>
        {selectedLanguages.length
          ? selectedLanguages.join(', ')
          : 'Filter languages'}
      </Button>
    </SelectMenu>
  );
}
