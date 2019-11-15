import { Button, SelectMenu, SelectMenuItem } from 'evergreen-ui';
import React, { useState } from 'react';
import { useLanguages } from './use-languages';
import { useSearchCriteria } from './use-search-criteria';

export function Languages() {
  const [searchCriteria, setSearchCriteria] = useSearchCriteria();
  const { languages } = useLanguages();
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

  const options = languages.map(lang => ({ label: lang, value: lang }));

  return (
    <SelectMenu
      isMultiSelect
      closeOnSelect
      title="Filter languages"
      options={options}
      selected={selectedLanguages}
      onSelect={onSelect}
      onDeselect={onDeselect}
    >
      <Button iconBefore="filter">{label}</Button>
    </SelectMenu>
  );
}
