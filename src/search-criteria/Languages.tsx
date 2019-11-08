import { Button, SelectMenu } from 'evergreen-ui';
import React, { useEffect, useState } from 'react';
import useSearchCriteria, { initialState } from './use-search-criteria';

const languages = require('./languages.json');

export function Languages() {
  const [searchCriteria, setSearchCriteria] = useSearchCriteria(initialState);
  const [selectedLanguages, setSelectedLanguages] = useState(
    searchCriteria.languages
  );

  useEffect(() => {
    setSearchCriteria({
      ...searchCriteria,
      languages: selectedLanguages
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
