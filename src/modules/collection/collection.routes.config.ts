import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import collectionController from './controllers/collection.controller';

export class CollectionRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CollectionRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/collection`)
      .get()
      .post(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        collectionController.createCollection
      );
    return this.app;
  }
}
