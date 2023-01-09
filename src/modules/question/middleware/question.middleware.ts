import express from 'express';
import { respond, ResponseCode } from '../../../utilities/response/response';
import questionService from '../services/question.service';

class QuestionMiddleware {
  async validateQuestionExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const question = await questionService.readById(req.params.questionId);

      if (question) {
        res.locals.question = question;
        next();
      } else {
        respond(res, {}, 'No question found', ResponseCode.NOT_FOUND);
      }
    } catch (error) {
      respond(res, {}, 'Invalid question Id', ResponseCode.NOT_FOUND);
    }
  }
}

export default new QuestionMiddleware();
