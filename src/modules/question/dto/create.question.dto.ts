import mongoose from 'mongoose';

export interface MongooseObjectId extends mongoose.Types.ObjectId {}

export interface CreateQuestionDto {
  question: string;
  options: string[];
  correctionOption: string;
  category: MongooseObjectId;
  difficulty: 'easy' | 'medium' | 'hard';
}
