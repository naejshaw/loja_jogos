export interface Game {
  // allow either numeric `id` (frontend) or Mongo `_id` (backend)
  id?: number | string;
  _id?: string;
  title: string;
  slug?: string;
  developer: string;
  price: number;
  image: string;
  video?: string;
  genre: string[];
  rating: number;
  description: string;
  detailedDescription?: string;
  releaseDate?: string | Date;
  players?: string;
  platforms?: string[];
  storeLinks?: Record<string, string>;
}
