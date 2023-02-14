import QuestionDao from '../daos/question.dao';
import { CreateQuestionDto } from '../dto/create.question.dto';

class QuestionService {
  async create(userId: string, resource: CreateQuestionDto) {
    return QuestionDao.createQuestion(userId, resource);
  }

  async list(page: number, limit: number) {
    return QuestionDao.getQuestions(page, limit);
  }

  async listQuestionsToAnswer(
    numberOfQuestions: any,
    difficulty: any,
    categories: any
  ) {
    return QuestionDao.getQuestionsToAnswer(
      numberOfQuestions,
      difficulty,
      categories
    );
  }

  async readById(questionId: string) {
    return QuestionDao.getOneQuestion(questionId);
  }

  async update(questionId: string, resource: CreateQuestionDto) {
    return QuestionDao.updateQuestion(questionId, resource);
  }

  async delete(questionId: string) {
    return QuestionDao.deleteQuestion(questionId);
  }
}

export default new QuestionService();
