import { model, Schema } from 'mongoose';
import { Sells } from '@interfaces/sells';

const SellsSchema: Schema = new Schema(
  {
    products: [
      {
        item: { type: Schema.Types.ObjectId, ref: 'Products' },
        quantity: Number,
      },
    ],
    amount: Number,
  },
  { timestamps: true },
);

export default model<Sells>('Sells', SellsSchema);
