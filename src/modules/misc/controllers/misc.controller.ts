import express from 'express';
import { respond } from '../../../utilities/response/response';
import CategoryDao from '../../category/daos/category.dao';
import QuestionDao from '../../question/daos/question.dao';
import UsersDao from '../../users/daos/users.dao';

class MiscController {
  async getStats(req: express.Request, res: express.Response) {
    const categories = await CategoryDao.Category.countDocuments({}).exec();
    const questions = await QuestionDao.Question.countDocuments({}).exec();
    const users = await UsersDao.User.countDocuments({}).exec();

    const payload = {
      categories,
      questions,
      users,
    };

    respond(res, payload);
  }
}

export default new MiscController();
