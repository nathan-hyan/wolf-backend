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
    userInfo: {
      name: {type: String, required: true},
      whatsappNumber: {type: Number, required: true}
    },
    amount: Number,
  },
  { timestamps: true },
);

export default model<Sells>('Sells', SellsSchema);
