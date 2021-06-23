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
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    storeId: { type: Schema.Types.ObjectId, ref: 'Stores' },
    storeBranch: { type: String, required: true },
  },
  { timestamps: true },
);

export default model<Sells>('Sells', SellsSchema);
