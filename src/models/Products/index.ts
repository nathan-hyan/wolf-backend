import { Product } from '@interfaces/product';
import { model, Schema } from 'mongoose';

const Products: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: false, default: 0 },
    stock: { type: Number, required: false, default: 0 },
    category: [String],
    image: { type: String, required: false },
    comments: [{
      body: String  
    }]
  },
  { timestamps: true },
);

export default model<Product>('Products', Products);
