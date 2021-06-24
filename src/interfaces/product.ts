import { ObjectId, Document } from 'mongoose';

interface Comments {
  body: string;
  timestamp: string;
}
export interface Product extends Document {
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  barcode: string;
  comments: Comments[]
}
