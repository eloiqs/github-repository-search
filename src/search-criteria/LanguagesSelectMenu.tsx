import React, { useState } from 'react';
import { Button, SelectMenu, SelectMenuItem } from '../ui';
import { createSearchCriteria } from './search-criteria';
import { useLanguages } from './use-languages';
import { useSearchCriteria } from './use-search-criteria';

export function LanguagesSelectMenu() {
  const { getSearchCriteria, setSearchCriteria } = useSearchCriteria();
  const { languages } = useLanguages();
  const [selectedLanguages, setSelectedLanguages] = useState(
    getSearchCriteria().languages
  );

  function onSelect(item: SelectMenuItem) {
    const selected = [...selectedLanguages, item.value] as string[];
    setSelectedLanguages(selected);
    setSearchCriteria(criteria =>
      createSearchCriteria(selected, criteria.timeRange)
    );
  }

  function onDeselect(deselectedItem: SelectMenuItem) {
    const languages = selectedLanguages.filter(
      language => language !== deselectedItem.value
    );
    setSelectedLanguages(languages);
    setSearchCriteria(criteria =>
      createSearchCriteria(languages, criteria.timeRange)
    );
  }

  const label = selectedLanguages.length
    ? selectedLanguages.join(', ')
    : 'Filter languages';

  const options = languages.map(({ name }) => ({ label: name, value: name }));

  return (
    <SelectMenu
      isMultiSelect
      title="Filter languages"
      options={options}
      selected={selectedLanguages}
      onSelect={onSelect}
      onDeselect={onDeselect}
    >
      <Button iconBefore="filter" data-testid="languages-filter">
        {label}
      </Button>
    </SelectMenu>
  );
}
