import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import generateSlug from '../../../utilities/generateSlug';
import { CreateCollectionDto } from '../dto/create.collection.dto';
import categoryService from '../../category/services/category.service';

const log: debug.IDebugger = debug('app:collection-dao');

class CollectionDao {
  Schema = mongooseService.getMongoose().Schema;

  collectionSchema = new this.Schema({
    name: String,
    description: String,
    cover: String,
    slug: String,
    user: { type: this.Schema.Types.ObjectId, ref: 'User' },
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

  // get collection by id
  async getCollectionById(collecionId: string) {
    return this.Collection.findOne({ _id: collecionId }).exec();
  }

  // Get collection by slug
  async getCollectionBySlug(collectionSlug: string) {
    return this.Collection.findOne({ slug: collectionSlug });
  }

  // Get collections by category
  async getCollectionsByCategory(
    categoryIdOrSlug: string,
    limit = 25,
    page = 0
  ) {
    const category: any = await categoryService.readByIdOrSlug(
      categoryIdOrSlug
    );
    const collections = await this.Collection.find({ category: category._id })
      .limit(limit)
      .skip(limit * page)
      .populate('category user')
      .exec();
    return collections;
  }

  // Update collection
  async updateCollection(collectionId: string, collectionFields: any) {
    try {
      const slug = generateSlug(collectionFields.name);
      const existingCollection = await this.Collection.findOneAndUpdate(
        { _id: collectionId },
        { $set: { ...collectionFields, slug } },
        { new: true }
      ).exec();
      return existingCollection;
    } catch (error) {
      console.log('Error');
    }
  }

  // Delete collection
  async deleteCollection(collectionId: string) {
    return this.Collection.deleteOne({ _id: collectionId }).exec();
  }
}

export default new CollectionDao();
