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
}

export default new CollectionService();
