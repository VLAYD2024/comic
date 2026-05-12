export type ComicPage = {
  src: string;
  caption?: string;
};

export type Comic = {
  slug: string;
  title: string;
  author: string;
  cover: string;
  year: number;
  description: string;
  tags: string[];
  pages: ComicPage[];
};
