import express from 'express';
import { respond } from '../../../utilities/response/response';
import categoryService from '../../category/services/category.service';
import collectionService from '../../collection/services/collection.service';
import questionService from '../../question/services/question.service';
import usersService from '../../users/services/users.service';

class MiscController {
  async getStats(req: express.Request, res: express.Response) {
    const categories = await categoryService.list();
    const collections = await collectionService.list();
    const questions = await questionService.list();
    const users = await usersService.list();

    const payload = {
      categories: categories.length,
      collections: collections.length,
      questions: questions.length,
      users: users.length,
    };

    respond(res, payload);
  }
}

export default new MiscController();
