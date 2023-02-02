import mongoose from 'mongoose';

export interface MongooseObjectId extends mongoose.Types.ObjectId {}

export interface CreateGroupDto {
  name: string;
  description?: string;
  cover?: string;
  category: MongooseObjectId;
  collection: MongooseObjectId;
}
