import express, { response } from 'express';
import collectionService from '../services/collection.service';
import debug from 'debug';
import { respond, ResponseCode } from '../../../utilities/response/response';

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
    const message = 'Collection created successfully';
    respond(res, collection, message, ResponseCode.NO_CONTENT);
  }

  async getAllCollections(req: express.Request, res: express.Response) {
    const collections = await collectionService.list();
    respond(res, collections);
  }

  async getCollectionsByCategory(req: express.Request, res: express.Response) {
    const categoryIdOrSlug = req.params.categoryIdOrSlug;
    const collections = await collectionService.listByCategory(
      categoryIdOrSlug,
      100,
      0
    );
    const message = 'Collections by category retrieved successfully';
    respond(res, collections, message);
  }

  async getOneCollection(req: express.Request, res: express.Response) {
    const collectionIdOrSlug = req.params.collectionIdOrSlug;
    const collection = await collectionService.readByIdOrSlug(
      collectionIdOrSlug
    );
    const message = 'Collection retrieved';
    respond(res, collection, message);
  }

  async deleteCollection(req: express.Request, res: express.Response) {
    const collecionId = req.params.collectionIdOrSlug;
    const collection = await collectionService.remove(collecionId);
    const message = 'Collection deleted';
    respond(res, collection, message);
  }

  async updateCollection(req: express.Request, res: express.Response) {
    const collectionId = req.params.collectionIdOrSlug;
    const collection = await collectionService.update(collectionId, req.body);
    const message = 'Collection updated';
    respond(res, collection, message);
  }
}

export default new CollectionController();
