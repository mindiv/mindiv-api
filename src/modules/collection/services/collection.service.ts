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

  async list() {
    return CollectionDao.getAllCollections();
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

  async readByIdOrSlug(collectionIdOrSlug: string) {
    return CollectionDao.getOneCollection(collectionIdOrSlug);
  }

  async remove(collectionId: string) {
    return CollectionDao.deleteCollection(collectionId);
  }

  async update(collectionId: string, resource: any) {
    return CollectionDao.updateCollection(collectionId, resource);
  }
}

export default new CollectionService();
