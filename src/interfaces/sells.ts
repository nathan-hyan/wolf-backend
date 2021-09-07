import { ObjectId, Document } from 'mongoose';

interface Products {
  item: ObjectId;
  quantity: number;
}

interface UserInfo {
  name: string;
  whatsappNumber: number;
}

export interface Sells extends Document {
  products: Products[];
  amount: number;
  userInfo: UserInfo;
  finished: boolean;
}
