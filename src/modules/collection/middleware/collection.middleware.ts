import express from 'express';
import debug from 'debug';
import collectionService from '../services/collection.service';

const log: debug.IDebugger = debug('app:collection-middleware');

class CollectionMiddleware {
  async validateCollectionExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const collection = await collectionService.readByIdOrSlug(
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
