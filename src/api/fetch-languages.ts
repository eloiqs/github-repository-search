import jsyaml from 'js-yaml';

const githubLinguistYmlUrl =
  'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

export async function fetchLanguages() {
  const res = await fetch(githubLinguistYmlUrl);
  const yml = await res.text();

  const json = jsyaml.safeLoad(yml);
  const languages = Object.keys(json).map(language => ({
    name: language,
    color: json[language].color
  }));

  return languages;
}
