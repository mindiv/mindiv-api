import CategoryDao from '../daos/category.dao';
import { CreateCategoryDto } from '../dto/create.category.dto';

class CategoryService {
  async create(resource: CreateCategoryDto) {
    return CategoryDao.createCategory(resource);
  }

  async list(limit: number, page: number) {
    return CategoryDao.getCategories(limit, page);
  }
}

export default new CategoryService();
