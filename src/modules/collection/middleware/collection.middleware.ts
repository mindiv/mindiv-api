import express from 'express';
import debug from 'debug';
import CollectionService from '../services/collection.service';
import generateSlug from '../../../utilities/generateSlug';
import { respond, ResponseCode } from '../../../utilities/response/response';

const log: debug.IDebugger = debug('app:collection-middleware');

class CollectionMiddleware {
  async validateSameCollectionDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const slug = generateSlug(req.body.name);
    const collection = await CollectionService.readByIdOrSlug(slug);
    if (collection) {
      respond(res, {}, 'Colelction already exists', ResponseCode.BAD_REQUEST);
    } else {
      next();
    }
  }

  async validateCollectionExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const collection = await CollectionService.readByIdOrSlug(
      req.params.collectionIdOrSlug
    );

    if (collection) {
      res.locals.collection = collection;
      next();
    } else {
      res.status(404).send({
        response_message: 'No collection found',
        data: {},
      });
    }
  }
}

export default new CollectionMiddleware();
