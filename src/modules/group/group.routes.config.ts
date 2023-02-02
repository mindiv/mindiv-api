import { CommonRoutesConfig } from '../common/common.routes.config';
import GroupController from './controllers/group.controller';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import validateResource from '../common/middleware/validate.resource.middleware';
import { createGroupSchema } from './schema/group.schema';
import GroupMiddleware from './middleware/group.middleware';

export class GroupRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'GroupRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/api/group`)
      .post(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        validateResource(createGroupSchema),
        GroupMiddleware.validateSameGroupDoesntExist,
        GroupController.createGroup
      );
    return this.app;
  }
}
