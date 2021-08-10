import { ObjectId, Document } from "mongoose";

interface Comments {
  body: string;
  timestamp: string;
}

export interface Rating {
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
  usersRating: number;
  total: number;
}
export interface Product extends Document {
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  rating: Rating;
  comments: Comments[];
}
