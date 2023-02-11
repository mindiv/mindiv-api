import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { UpdateCategoryDto } from '../dto/update.category.dto';
import generateSlug from '../../../utilities/generateSlug';

const log: debug.IDebugger = debug('app:category-dao');

class CategoryDao {
  Schema = mongooseService.getMongoose().Schema;

  categorySchema = new this.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      description: {
        type: String,
        required: true,
      },
      cover: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
      user: { type: this.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
  );

  Category = mongooseService
    .getMongoose()
    .model('Category', this.categorySchema);

  constructor() {
    log('Created new instance of CategoryDao');
  }

  async createCategory(userId: string, categoryFields: CreateCategoryDto) {
    const slug = generateSlug(categoryFields.name);
    const category = new this.Category({
      user: userId,
      slug,
      ...categoryFields,
    });
    await category.save();
    return category;
  }

  async getCategories() {
    const categories = await this.Category.aggregate([
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'category',
          as: 'questions',
        },
      },
      {
        $addFields: {
          questionCount: { $size: '$questions' },
        },
      },
    ]);
    return categories;
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
      const slug = generateSlug(categoryFields.name);
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

  async deleteCategory(categoryId: string) {
    try {
      return this.Category.deleteOne({ _id: categoryId }).exec();
    } catch (error) {
      console.log('Error');
    }
  }
}

export default new CategoryDao();
