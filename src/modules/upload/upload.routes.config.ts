import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';

export class UploadRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UploadRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/api/upload')
      .post(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        )
      );
    return this.app;
  }
}
