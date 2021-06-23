import { ObjectId, Document } from 'mongoose';

interface Products {
  item: ObjectId;
  quantity: number;
}

export interface Sells extends Document {
  products: Products[];
  amount: number;
  userId: ObjectId;
  storeId: ObjectId;
}
