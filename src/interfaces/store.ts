import { Document, ObjectId } from 'mongoose';

export interface Store extends Document {
  name: string;
  location: string[];
  users: ObjectId[];
  admins: ObjectId[];
}
