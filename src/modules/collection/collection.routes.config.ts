import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import CollectionController from './controllers/collection.controller';
import CollectionMiddleware from './middleware/collection.middleware';
import CategoryMiddleware from '../category/middleware/category.middleware';

export class CollectionRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CollectionRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/api/collection`)
      .get(CollectionController.getAllCollections)
      .post(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        CollectionController.createCollection
      );

    this.app
      .route(`/api/collection/:collectionIdOrSlug`)
      .all(CollectionMiddleware.validateCollectionExists)
      .get(CollectionController.getOneCollection)
      .put(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        CollectionMiddleware.validateCollectionExists,
        CollectionController.updateCollection
      )
      .delete(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        CollectionMiddleware.validateCollectionExists,
        CollectionController.deleteCollection
      );

    this.app
      .route(`/api/collection/:categoryIdOrSlug/category`)
      .all(CategoryMiddleware.validateCategoryExists)
      .get(CollectionController.getCollectionsByCategory);
    return this.app;
  }
}
