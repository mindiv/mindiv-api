import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import slugify from 'slugify';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { UpdateCategoryDto } from '../dto/update.category.dto';

const log: debug.IDebugger = debug('app:category-dao');

class CategoryDao {
  Schema = mongooseService.getMongoose().Schema;

  categorySchema = new this.Schema({
    name: String,
    description: String,
    cover: String,
    slug: String,
    user: { type: this.Schema.Types.ObjectId, ref: 'Users' },
  });

  Category = mongooseService
    .getMongoose()
    .model('Category', this.categorySchema);

  constructor() {
    log('Created new instance of CategoryDao');
  }

  async createCategory(userId: string, categoryFields: CreateCategoryDto) {
    const slug = slugify(categoryFields.name, {
      remove: undefined,
      lower: true,
    });
    const category = new this.Category({
      user: userId,
      slug,
      ...categoryFields,
    });
    await category.save();
    return category;
  }

  async getCategories(limit = 25, page = 0) {
    return this.Category.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getCategory(categoryIdOrSlug: string) {
    // check if idOrSlug is a valid MongoDB ObjectId
    if (
      mongooseService.getMongoose().Types.ObjectId.isValid(categoryIdOrSlug)
    ) {
      return this.Category.findOne({ _id: categoryIdOrSlug }).exec();
    } else {
      return this.Category.findOne({ slug: categoryIdOrSlug }).exec();
    }
  }

  async updateCategory(categoryId: string, categoryFields: UpdateCategoryDto) {
    try {
      const slug = slugify(categoryFields.name, {
        remove: undefined,
        lower: true,
      });
      const existingCategory = await this.Category.findOneAndUpdate(
        { _id: categoryId },
        { $set: { ...categoryFields, slug } },
        { new: true }
      ).exec();

      return existingCategory;
    } catch (error) {
      console.log('Error');
    }
  }

  async removeCategory(categoryId: string) {
    try {
      return this.Category.deleteOne({ _id: categoryId }).exec();
    } catch (error) {
      console.log('Error');
    }
  }
}

export default new CategoryDao();
