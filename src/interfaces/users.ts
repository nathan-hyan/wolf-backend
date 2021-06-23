import { Document, ObjectId } from 'mongoose';

export default interface User extends Document {
  name: string;
  DNI: number;
  password: string;
  type: 0 | 1 | 2;
  storeId: ObjectId;
  storeLocation: ObjectId;
}
