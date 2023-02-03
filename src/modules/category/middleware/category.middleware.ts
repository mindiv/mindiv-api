import expresss from 'express';
import categoryService from '../services/category.service';
import debug from 'debug';
import generateSlug from '../../../utilities/generateSlug';
import { respond, ResponseCode } from '../../../utilities/response/response';

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
    try {
      const category = await categoryService.readByIdOrSlug(
        req.params.categoryIdOrSlug
      );

      if (category) {
        res.locals.category = category;
        next();
      } else {
        respond(res, {}, 'No category found', ResponseCode.NOT_FOUND);
      }
    } catch (error) {
      respond(res, {}, 'No category found', ResponseCode.NOT_FOUND);
    }
  }

  async validateSameCategoryDoesntExist(
    req: expresss.Request,
    res: expresss.Response,
    next: expresss.NextFunction
  ) {
    const slug = generateSlug(req.body.name);
    const category = await categoryService.readByIdOrSlug(slug);
    if (category) {
      respond(res, {}, 'Category already exists', ResponseCode.BAD_REQUEST);
    } else {
      next();
    }
  }
}

export default new CategoryMiddleware();
