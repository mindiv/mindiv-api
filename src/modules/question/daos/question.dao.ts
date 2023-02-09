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
      answer: {
        type: String,
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
      category: { type: this.Schema.Types.ObjectId, ref: 'Category' },
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
  async getQuestions(page: number, limit = 20) {
    const skip = (page - 1) * limit;

    const questions = await this.Question.find({})
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.Question.countDocuments({}).exec();
    const pageCount = Math.ceil(total / limit);

    return {
      questions,
      pageInfo: {
        currentPage: page,
        limit,
        pageCount,
        total,
      },
    };
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
