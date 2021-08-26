import { model, Schema } from 'mongoose';
import { Purchase } from '@interfaces/sells';

const SellsSchema: Schema = new Schema(
  {
    products: [
      {
        item: { type: Schema.Types.ObjectId, ref: 'Products' },
        name: String,
        quantity: Number,
        price: Number
      },
    ],
    userInfo: {
      name: {type: String, required: true},
      whatsApp: {type: Number, required: true}
    },
    amount: Number,
    finished: {type: Boolean, required: false}
  },
  { timestamps: true },
);

export default model<Purchase>('Sells', SellsSchema);
