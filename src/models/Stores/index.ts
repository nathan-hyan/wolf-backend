import { model, Schema } from 'mongoose';
import { Store } from '@interfaces/store';

// Types are for declaring privileges (0: super admin, 1: admin, 2: user)

const StoresSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: [{ type: String, required: true }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default model<Store>('Stores', StoresSchema);
