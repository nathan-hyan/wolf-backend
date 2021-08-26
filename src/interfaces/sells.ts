import { ObjectId, Document } from 'mongoose';

export interface CartItem{
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}

export interface Info {
  name: string;
  whatsApp: number;
}
export interface Purchase extends Document {
  products: CartItem[];
  userInfo: Info;
  amount: number;
  finished: boolean;
}