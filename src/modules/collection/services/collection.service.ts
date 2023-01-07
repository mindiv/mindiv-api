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

  async readByIdOrSlug(collectionIdOrSlug: string) {
    return CollectionDao.getOneCollection(collectionIdOrSlug);
  }
}

export default new CollectionService();
