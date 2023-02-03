import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controllers';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import validateResource from '../common/middleware/validate.resource.middleware';
import { createUserSchema, updateUserSchema } from './schema/user.schema';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/api/users`)
      .get(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        UsersController.listUsers
      )
      .post(
        validateResource(createUserSchema),
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    this.app.param(`userId`, UsersMiddleware.extractUserId);

    this.app
      .route(`/api/users/:userId`)
      .all(
        jwtMiddleware.validJWTNeeded,
        UsersMiddleware.validateUserExists,
        UsersMiddleware.validateUserSuspended,
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction
      )
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser)
      .put(
        validateResource(updateUserSchema),
        UsersMiddleware.validateSameEmailBelongToSameUser,
        UsersMiddleware.userCantChangePermission,
        UsersController.put
      );

    return this.app;
  }
}
