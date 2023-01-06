import express from 'express';
import categoryService from '../services/category.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:category-controller');

class CategoryController {
  async createCategory(req: express.Request, res: express.Response) {
    const userId = res.locals.jwt.userId;
    console.log('IDD', userId);
    const category = await categoryService.create(userId, req.body);
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

  async updateCategory(req: express.Request, res: express.Response) {
    const categoryId = req.params.categoryIdOrSlug;
    const category = await categoryService.update(categoryId, req.body);
    res.status(200).send({
      response_message: 'Category updated successfully',
      data: category,
    });
  }

  async getCategory(req: express.Request, res: express.Response) {
    const categoryIdOrSlug = req.params.categoryIdOrSlug;
    const category = await categoryService.readByIdOrSlug(categoryIdOrSlug);
    res.status(200).send({
      response_message: 'Category fetched',
      data: category,
    });
  }

  async deleteCategory(req: express.Request, res: express.Response) {
    const categoryId = req.params.categoryIdOrSlug;
    const category = await categoryService.delete(categoryId);
    res.status(200).send({
      response_message: `Category deleted`,
      data: category,
    });
  }
}

export default new CategoryController();
