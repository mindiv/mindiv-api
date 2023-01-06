import expresss from 'express';
import categoryService from '../services/category.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:category-middleware');

class CategoryMiddleware {
  async validateRequiredCategoryFields(
    req: expresss.Request,
    res: expresss.Response,
    next: expresss.NextFunction
  ) {
    if (req.body && req.body.name && req.body.description && req.body.cover) {
      next();
    } else {
      res.status(400).send({
        error: [`Missing required fields`],
      });
    }
  }

  async validateCategoryExists(
    req: expresss.Request,
    res: expresss.Response,
    next: expresss.NextFunction
  ) {
    const category = await categoryService.readByIdOrSlug(
      req.params.categoryIdOrSlug
    );

    if (category) {
      res.locals.category = category;
      next();
    } else {
      res.status(404).send({
        response_message: 'No category found',
        data: {},
      });
    }
  }
}

export default new CategoryMiddleware();
