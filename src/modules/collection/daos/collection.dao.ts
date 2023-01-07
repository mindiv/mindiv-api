import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import generateSlug from '../../../utilities/generateSlug';
import { CreateCollectionDto } from '../dto/create.collection.dto';

const log: debug.IDebugger = debug('app:collection-dao');

class CollectionDao {
  Schema = mongooseService.getMongoose().Schema;

  collectionSchema = new this.Schema({
    name: String,
    description: String,
    cover: String,
    slug: String,
    user: { type: this.Schema.Types.ObjectId, ref: 'users' },
    category: { type: this.Schema.Types.ObjectId, ref: 'Category' },
  });

  Collection = mongooseService
    .getMongoose()
    .model('Collection', this.collectionSchema);

  constructor() {
    log('Created new instance of CollectionDao');
  }

  // Create collection
  async createCollection(
    userId: string,
    categoryId: string,
    collectionFields: CreateCollectionDto
  ) {
    const slug = generateSlug(collectionFields.name);
    const collection = new this.Collection({
      user: userId,
      category: categoryId,
      slug,
      ...collectionFields,
    });
    await collection.save();
    return collection;
  }

  // Get all collections
  async getAllCollections(limit = 25, page = 0) {
    return this.Collection.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  // Get one collection
  async getOneCollection(collectionIdOrSlug: string) {
    // check if idOrSlug is a valid MonogoDB ObjectId
    if (
      mongooseService.getMongoose().Types.ObjectId.isValid(collectionIdOrSlug)
    ) {
      return this.Collection.findOne({ _id: collectionIdOrSlug }).exec();
    } else {
      return this.Collection.findOne({ slug: collectionIdOrSlug }).exec();
    }
  }

  // Get collections by category
  async getCollectionsByCategory(categoryId: string) {
    const collections = await this.Collection.find({ category: categoryId });
    return collections;
  }
}

export default new CollectionDao();
