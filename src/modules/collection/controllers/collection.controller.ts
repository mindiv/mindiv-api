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

  async getAllCollections(req: express.Request, res: express.Response) {
    const collections = await collectionService.list(100, 0);
    res.status(200).send({
      response_message: 'All collections',
      data: collections,
    });
  }

  async getOneCollection(req: express.Request, res: express.Response) {
    const collectionIdOrSlug = req.params.collectionIdOrSlug;
    const collection = await collectionService.readByIdOrSlug(
      collectionIdOrSlug
    );
    res.status(200).send({
      response_message: 'Collection fetched',
      data: collection,
    });
  }
}

export default new CollectionController();
