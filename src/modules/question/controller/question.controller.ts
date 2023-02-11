import express from 'express';
import { respond, ResponseCode } from '../../../utilities/response/response';
import debug from 'debug';
import questionService from '../services/question.service';

const log: debug.IDebugger = debug('app:question-controller');

class QuestionController {
  async createQuestion(req: express.Request, res: express.Response) {
    const userId = res.locals.jwt.userId;
    const question = await questionService.create(userId, req.body);
    respond(res, question, 'Question created', ResponseCode.CREATED);
  }

  async getQuestions(req: express.Request, res: express.Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const questions = await questionService.list(page, limit);
    respond(res, questions);
  }

  async getQuestionsToAnswer(req: express.Request, res: express.Response) {
    const numberOfQuestions = req.query.noq || 10;
    const difficulty = req.query.diff || 'easy';

    const questions = await questionService.listQuestionsToAnswer(
      numberOfQuestions,
      difficulty
    );
    respond(res, questions);
  }

  async getOneQuestion(req: express.Request, res: express.Response) {
    const questionId = req.params.questionId;
    const question = await questionService.readById(questionId);
    respond(res, question);
  }

  async updateQuestion(req: express.Request, res: express.Response) {
    const questionId = req.params.questionId;
    const question = await questionService.update(questionId, req.body);
    respond(res, question, 'Question updated');
  }

  async deleteQuestion(req: express.Request, res: express.Response) {
    const questionId = req.params.questionId;
    const question = await questionService.delete(questionId);
    respond(res, question, 'Question deleted');
  }
}

export default new QuestionController();
