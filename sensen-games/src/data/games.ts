export interface Game {
  _id: string; // Changed from id: number to _id: string to match backend
  title: string;
  slug: string;
  image: string;
  video: string;
  description: string;
  platforms: string[];
  storeLinks: {
    [key: string]: string;
  };
}