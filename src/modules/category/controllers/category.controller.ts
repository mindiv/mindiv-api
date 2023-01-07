import express from 'express';
import categoryService from '../services/category.service';
import debug from 'debug';
import { respond, ResponseCode } from '../../../utilities/response/response';

const log: debug.IDebugger = debug('app:category-controller');

class CategoryController {
  async createCategory(req: express.Request, res: express.Response) {
    const userId = res.locals.jwt.userId;
    const category = await categoryService.create(userId, req.body);
    respond(
      res,
      category,
      'Category created successfully',
      ResponseCode.NO_CONTENT
    );
  }

  async getCategories(req: express.Request, res: express.Response) {
    const categories = await categoryService.list(100, 0);
    respond(res, categories);
  }

  async updateCategory(req: express.Request, res: express.Response) {
    const categoryId = req.params.categoryIdOrSlug;
    const category = await categoryService.update(categoryId, req.body);
    respond(res, category, 'Category updated');
  }

  async getCategory(req: express.Request, res: express.Response) {
    const categoryIdOrSlug = req.params.categoryIdOrSlug;
    const category = await categoryService.readByIdOrSlug(categoryIdOrSlug);
    respond(res, category);
  }

  async deleteCategory(req: express.Request, res: express.Response) {
    const categoryId = req.params.categoryIdOrSlug;
    const category = await categoryService.delete(categoryId);
    respond(res, category);
  }
}

export default new CategoryController();
