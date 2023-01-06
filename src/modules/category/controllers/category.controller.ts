import express from 'express';
import categoryService from '../services/category.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:category-controller');

class CategoryController {
  async createCategory(req: express.Request, res: express.Response) {
    const category = await categoryService.create(req.body);
    res.status(201).send({
      response_message: 'Category created successfully',
      data: category,
    });
  }

  async getCategories(req: express.Request, res: express.Response) {
    const categories = await categoryService.list(100, 0);
    res.status(200).send({
      response_message: 'All categories',
      data: categories,
    });
  }
}

export default new CategoryController();
