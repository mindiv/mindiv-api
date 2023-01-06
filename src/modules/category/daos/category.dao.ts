import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import { CreateCategoryDto } from '../dto/create.category.dto';

const log: debug.IDebugger = debug('app:category-dao');

class CategoryDao {
  Schema = mongooseService.getMongoose().Schema;

  categorySchema = new this.Schema({
    name: String,
    description: String,
    cover: String,
  });

  Category = mongooseService
    .getMongoose()
    .model('Category', this.categorySchema);

  constructor() {
    log('Created new instance of CategoryDao');
  }

  async createCategory(categoryFields: CreateCategoryDto) {
    const category = new this.Category({
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
}

export default new CategoryDao();
