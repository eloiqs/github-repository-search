import { Button, SelectMenu, SelectMenuItem } from 'evergreen-ui';
import React, { useState } from 'react';
import { useSearchCriteria } from './use-search-criteria';

const languages = require('./languages.json');

export function Languages() {
  const [searchCriteria, setSearchCriteria] = useSearchCriteria();
  const [selectedLanguages, setSelectedLanguages] = useState(
    searchCriteria.languages
  );

  function onSelect(item: SelectMenuItem) {
    const selected = [...selectedLanguages, item.value] as string[];
    setSelectedLanguages(selected);
    setSearchCriteria(criteria => ({
      ...criteria,
      languages: selected
    }));
  }

  function onDeselect(deselectedItem: SelectMenuItem) {
    const languages = selectedLanguages.filter(
      language => language !== deselectedItem.value
    );
    setSelectedLanguages(languages);
    setSearchCriteria(criteria => ({
      ...criteria,
      languages
    }));
  }

  const label = selectedLanguages.length
    ? selectedLanguages.join(', ')
    : 'Filter languages';

  return (
    <SelectMenu
      isMultiSelect
      closeOnSelect
      title="Filter languages"
      options={languages}
      selected={selectedLanguages}
      onSelect={onSelect}
      onDeselect={onDeselect}
    >
      <Button iconBefore="filter">{label}</Button>
    </SelectMenu>
  );
}
