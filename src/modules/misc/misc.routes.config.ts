import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import MiscController from './controllers/misc.controller';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import commonPermissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';

export class MiscRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MiscRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/api/stats`)
      .get(
        jwtMiddleware.validJWTNeeded,
        commonPermissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        MiscController.getStats
      );
    return this.app;
  }
}
