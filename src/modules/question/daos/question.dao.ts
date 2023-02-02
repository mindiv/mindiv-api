import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import { CreateQuestionDto } from '../dto/create.question.dto';

const log: debug.IDebugger = debug('app:question-dao');

class QuestionDao {
  Schema = mongooseService.getMongoose().Schema;

  questionSchema = new this.Schema(
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correctOption: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
      },
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
      },
      user: { type: this.Schema.Types.ObjectId, ref: 'User' },
      categoryId: { type: this.Schema.Types.ObjectId, ref: 'Category' },
      collectionId: { type: this.Schema.Types.ObjectId, ref: 'Collection' },
      group: { type: this.Schema.Types.ObjectId, ref: 'Group' },
    },
    { timestamps: true }
  );

  Question = mongooseService
    .getMongoose()
    .model('Question', this.questionSchema);

  constructor() {
    log('Created new instance of QuestionDao');
  }

  // Create a question
  async createQuestion(userId: string, questionFields: CreateQuestionDto) {
    const question = new this.Question({
      user: userId,
      ...questionFields,
    });
    await question.save();
    return question;
  }

  // Get all questions
  async getAllQuestions() {
    return this.Question.find().exec();
  }

  async getQuestionsToAnswer(numberOfQuestions: any, difficulty: any) {
    const questions = await this.Question.find({ difficulty })
      .limit(numberOfQuestions)
      .exec();
    return questions;
  }

  // Get one question
  async getOneQuestion(questionId: string) {
    return this.Question.findOne({ _id: questionId });
  }

  // Update question
  async updateQuestion(questionId: string, questionFields: CreateQuestionDto) {
    try {
      const existingQuestion = await this.Question.findOneAndUpdate(
        { _id: questionId },
        { $set: questionFields },
        { new: true }
      ).exec();

      return existingQuestion;
    } catch (error) {
      console.log('Error');
    }
  }

  // Remove question
  async removeQuestion(questionId: string) {
    try {
      return this.Question.deleteOne({ _id: questionId });
    } catch (error) {
      console.log('Error');
    }
  }
}

export default new QuestionDao();
