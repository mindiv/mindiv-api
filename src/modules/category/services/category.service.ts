import CategoryDao from '../daos/category.dao';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { UpdateCategoryDto } from '../dto/update.category.dto';

class CategoryService {
  async create(userId: string, resource: CreateCategoryDto) {
    return CategoryDao.createCategory(userId, resource);
  }

  async list() {
    return CategoryDao.getCategories();
  }

  async update(categoryId: string, categoryFields: UpdateCategoryDto) {
    return CategoryDao.updateCategory(categoryId, categoryFields);
  }

  async readByIdOrSlug(categoryIdOrSlug: string) {
    return CategoryDao.getCategory(categoryIdOrSlug);
  }

  async delete(categoryId: string) {
    return CategoryDao.removeCategory(categoryId);
  }
}

export default new CategoryService();
