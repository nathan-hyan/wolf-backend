import { Document } from "mongoose";

export interface Comment {
  _id?: string;
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
  price: number;
  stock: number;
  category?: string[];
  _id?: string;
  name: string;
  image: string[];
  comments: Comment[];
  description?: string;
  discount?: number;
  rating: Rating;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}
