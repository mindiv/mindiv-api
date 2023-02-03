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

  async getAllQuestion(req: express.Request, res: express.Response) {
    const questions = await questionService.list();
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
}

export default new QuestionController();
