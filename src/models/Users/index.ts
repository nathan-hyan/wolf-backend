import { model, Schema } from 'mongoose';
import User from '@interfaces/users';

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export default model<User>('User', UserSchema);
