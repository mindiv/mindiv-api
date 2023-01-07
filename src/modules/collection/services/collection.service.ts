import CollectionDao from '../daos/collection.dao';
import { CreateCollectionDto } from '../dto/create.collection.dto';

class CollectionService {
  async create(
    userId: string,
    categoryId: string,
    resource: CreateCollectionDto
  ) {
    return CollectionDao.createCollection(userId, categoryId, resource);
  }

  async list(limit: number, page: number) {
    return CollectionDao.getAllCollections(limit, page);
  }

  async listByCategory(
    collectionIdOrSlug: string,
    limit: number,
    page: number
  ) {
    return CollectionDao.getCollectionsByCategory(
      collectionIdOrSlug,
      limit,
      page
    );
  }

  async readById(collectionId: string) {
    return CollectionDao.getCollectionById(collectionId);
  }

  async readyBySlug(collectionSlug: string) {
    return CollectionDao.getCollectionBySlug(collectionSlug);
  }

  async readByIdOrSlug(collectionIdOrSlug: string) {
    return CollectionDao.getOneCollection(collectionIdOrSlug);
  }

  async remove(collectionId: string) {
    return CollectionDao.deleteCollection(collectionId);
  }
}

export default new CollectionService();
