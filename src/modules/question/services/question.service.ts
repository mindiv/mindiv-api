import QuestionDao from '../daos/question.dao';
import { CreateQuestionDto } from '../dto/create.question.dto';

class QuestionService {
  async create(userId: string, resource: CreateQuestionDto) {
    return QuestionDao.createQuestion(userId, resource);
  }

  async list() {
    return QuestionDao.getAllQuestions();
  }

  async readById(questionId: string) {
    return QuestionDao.getOneQuestion(questionId);
  }

  async update(questionId: string) {
    //
  }
}

export default new QuestionService();
