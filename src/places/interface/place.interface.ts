export interface IPlace {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  category_id: string;
  average_rating: number;
  photos: string[];
  created_at: Date;
  updated_at: Date;
}
