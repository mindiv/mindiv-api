import { CommonRoutesConfig } from '../common/common.routes.config';
import CategoryController from './controllers/category.controller';
import CategoryMiddleware from './middleware/category.middleware';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import validateResource from '../common/middleware/validate.resource.middleware';
import { createCategorySchema } from './schema/category.schema';

export class CategoryRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CategoryRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/api/category`)
      .get(CategoryController.getCategories)
      .post(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        validateResource(createCategorySchema),
        CategoryMiddleware.validateSameCategoryDoesntExist,
        CategoryController.createCategory
      );

    this.app
      .route(`/api/category/:categoryIdOrSlug`)
      .all(CategoryMiddleware.validateCategoryExists)
      .get(CategoryController.getCategory)
      .put(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        validateResource(createCategorySchema),
        CategoryController.updateCategory
      )
      .delete(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        CategoryController.deleteCategory
      );

    return this.app;
  }
}
