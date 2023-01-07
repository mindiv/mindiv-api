import express from 'express';
import collectionService from '../services/collection.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:collection-controller');

class CollectionController {
  async createCollection(req: express.Request, res: express.Response) {
    const userId = res.locals.jwt.userId;
    const categoryId = req.body.categoryId;
    const collection = await collectionService.create(
      userId,
      categoryId,
      req.body
    );
    res.status(201).send({
      response_message: 'Collection created successfully',
      data: collection,
    });
  }
}

export default new CollectionController();
