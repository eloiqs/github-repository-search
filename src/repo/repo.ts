export type Repo = {
  name: string;
  url: string;
  owner: {
    name: string;
    url: string;
    avatarUrl: string;
  };
  createdAt?: string;
  description: string;
  language: string;
  languageColor?: string;
  stars: number;
  currentPeriodStars?: number;
  forks: number;
  issues?: number;
};
