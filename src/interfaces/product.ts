import { Document } from "mongoose";

export interface Product extends Document{
  rating:      Rating;
  price:       number;
  stock:       number;
  description: string;
  category:    string[];
  image:       string[];
  _id:         string;
  name:        string;
  comments:    Comment[];
  createdAt:   string;
  updatedAt:   string;
}

export interface Comment {
  _id?:        string;
  body:       string;
  timestamp: string;
}

export interface Rating {
  oneStar:     number;
  twoStar:     number;
  threeStar:   number;
  fourStar:    number;
  fiveStar:    number;
  usersRating: number;
  total:       number;
}