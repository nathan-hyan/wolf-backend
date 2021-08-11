import { Product } from "@interfaces/product";
import { model, Schema } from "mongoose";

const Products: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: false, default: 0 },
    stock: { type: Number, required: false, default: 0 },
    description: {type: String, required: false, default: ''},
    rating: {
      oneStar: { type: Number, required: false, default: 0 },
      twoStar: { type: Number, required: false, default: 0 },
      threeStar: { type: Number, required: false, default: 0 },
      fourStar: { type: Number, required: false, default: 0 },
      fiveStar: { type: Number, required: false, default: 0 },
      usersRating: { type: Number, required: false, default: 0 },
      total: {type: Number, required: false, default: 0}
    },
    category: [String],
    image: [String],
    comments: [{ body: String, timestamp: Date }],
  },
  { timestamps: true }
);

export default model<Product>("Products", Products);
